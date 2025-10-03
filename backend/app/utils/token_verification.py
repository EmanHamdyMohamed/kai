import logging
from typing import Any, Optional

from firebase_admin import auth
from firebase_admin.exceptions import FirebaseError


async def verify_firebase_token(token: str) -> Optional[dict[str, Any]]:
    """Verify a Firebase ID token on the server side.

    Args:
        token: The Firebase ID token to verify
        
    Returns:
        Decoded token payload if valid, None if invalid
    """
    try:
        # This is the correct way to use verifyIdToken - on the backend
        decoded_token = auth.verify_id_token(token)
        
        logging.info("Token verified successfully", extra={
            "user_id": decoded_token.get('uid'),
            "email": decoded_token.get('email')
        })
        
        return decoded_token
        
    except FirebaseError as e:
        logging.error("Firebase token verification failed", extra={
            "error_code": e.code,
            "error_message": str(e)
        })
        return None
        
    except Exception as e:
        logging.error("Unexpected error during token verification", extra={
            "error": str(e)
        })
        return None
