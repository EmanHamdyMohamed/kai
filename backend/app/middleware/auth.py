import logging

from fastapi.responses import JSONResponse
from firebase_admin import auth
from starlette.requests import Request

from app.utils.responses import unauthorized_response, validation_error_response


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
        decoded_token = auth.verify_id_token(token)
        # print("Decoded token:", decoded_token)
        
        # Add user info to request state (use request.state, not request.user)
        print(decoded_token)
        request.state.user = {
            "user_id": decoded_token['uid'],  # Firebase uses 'uid', not 'user_id'
            "name": decoded_token['name'],
            "email": decoded_token['email'],
            "email_verified": decoded_token.get('email_verified', False)
        }
        
        return await call_next(request)
        
    except auth.InvalidIdTokenError:
        return unauthorized_response("Invalid or expired token")
    except auth.ExpiredIdTokenError:
        return unauthorized_response("Token has expired")
    except (ValueError, TypeError) as e:
        logging.exception(e, stack_info=True)
        return validation_error_response(
            error=str(e),
            message="Token validation failed"
        )
    except Exception as e:
        print('-----------------', e)
        logging.exception(e, stack_info=True)
        return JSONResponse(
            content={'detail': 'Authentication failed'},
            status_code=500
        )
