import logging

from fastapi.responses import JSONResponse
from firebase_admin import auth
from starlette.requests import Request

from app.utils.responses import unauthorized_response, validation_error_response
from app.utils.token_verification import verify_firebase_token


async def authorize_token(request: Request, call_next):
    excluded_paths = ["/health", "/", "/docs", "/openapi.json"]
    if request.url.path in excluded_paths or request.method == "OPTIONS":
        response = await call_next(request)
        return response
    authorization = request.headers.get('authorization')
    if not authorization:
        return unauthorized_response(
            message="Invalid authorization header"
        )
    if not authorization.startswith("Bearer "):
        return unauthorized_response(
            message="Invalid authorization header"
        )
    token = authorization.split("Bearer ")[1]
    if not token:
        return unauthorized_response(
            message="Invalid authorization header"
        )

    try:
        # Use the new utility function for better error handling
        decoded_token = await verify_firebase_token(token)
        
        if not decoded_token:
            return unauthorized_response("Invalid or expired token")
        
        # Add user info to request state
        request.state.user = {
            "user_id": decoded_token['uid'],
            "name": decoded_token.get('name'),
            "email": decoded_token.get('email'),
            "email_verified": decoded_token.get('email_verified', False)
        }
        
        return await call_next(request)
        
    except Exception as e:
        logging.error("Authentication failed", extra={
            "error": str(e),
            "path": request.url.path
        }, exc_info=True)
        return JSONResponse(
            content={'detail': 'Authentication failed'},
            status_code=500
        )
