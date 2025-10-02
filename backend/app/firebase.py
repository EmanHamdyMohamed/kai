import logging

import firebase_admin
from firebase_admin import credentials, firestore_async

from .config import Settings

settings = Settings()
_firebase_app = None
_firestore_client = None


def initialize_firebase():
    """Initialize Firebase Admin SDK."""

    global _firebase_app
    
    if _firebase_app is not None:
        logging.info("✅ Firebase already initialized")
        return _firebase_app

    # Path to service account key
    cred_path = settings.FIREBASE_CREDENTIALS_PATH
    cred_dict = {
        "type": settings.FIREBASE_TYPE,
        "project_id": settings.FIREBASE_PROJECT_ID,
        "private_key_id": settings.FIREBASE_PRIVATE_KEY_ID,
        "private_key": settings.FIREBASE_PRIVATE_KEY.replace('\\n', '\n') if settings.FIREBASE_PRIVATE_KEY else None,
        "client_email": settings.FIREBASE_CLIENT_EMAIL,
        "client_id": settings.FIREBASE_CLIENT_ID,
        "auth_uri": settings.FIREBASE_AUTH_URI,
        "token_uri": settings.FIREBASE_TOKEN_URI,
        "auth_provider_x509_cert_url": settings.FIREBASE_AUTH_PROVIDER_CERT_URL,
        "client_x509_cert_url": settings.FIREBASE_CLIENT_CERT_URL,
        "universe_domain": settings.FIREBASE_UNIVERSE_DOMAIN,
    }

    # Initialize with credentials
    cred = credentials.Certificate(cred_dict)
    # Store the app reference
    _firebase_app = firebase_admin.initialize_app(cred)
    logging.info("✅ Firebase initialized successfully")
    return _firebase_app


def get_firestore_client():
    """Get Firestore database client singleton."""

    global _firestore_client
    if _firestore_client is None:
        if _firebase_app is None:
            initialize_firebase()
        
        # Get database name
        db_name = settings.FIRESTORE_DB_NAME or ""
        
        # Connect to specific database
        # For named databases, use the database parameter
        _firestore_client = firestore_async.client(
            app=_firestore_client, database_id=db_name
        )
        
        logging.info(f"✅ Firestore client connected to database: {db_name}")
    
    return _firestore_client


def get_db():
    """Alias for get_firestore_client()"""
    return get_firestore_client()