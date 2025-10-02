import logging
from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict

logging.basicConfig(level='DEBUG', format="%(levelname)s: %(message)s")


class Settings(BaseSettings):
    JWT_SECRET_KEY: Optional[str] = "your-secret-key-here"
    JWT_ALGORITHM: Optional[str] = "HS256"
    SERVICE_ACCOUNT_KEY: Optional[str] = None
    FIREBASE_CREDENTIALS_PATH: Optional[str] = ""
    FIREBASE_WEB_API_KEY: Optional[str] = None
    
    # Firebase credentials
    FIREBASE_TYPE: Optional[str] = "service_account"
    FIREBASE_PROJECT_ID: Optional[str] = None
    FIREBASE_PRIVATE_KEY_ID: Optional[str] = None
    FIREBASE_PRIVATE_KEY: Optional[str] = None
    FIREBASE_CLIENT_EMAIL: Optional[str] = None
    FIREBASE_CLIENT_ID: Optional[str] = None
    FIREBASE_AUTH_URI: Optional[str] = ""
    FIREBASE_TOKEN_URI: Optional[str] = ""
    FIREBASE_AUTH_PROVIDER_CERT_URL: Optional[str] = ""
    FIREBASE_CLIENT_CERT_URL: Optional[str] = ""
    FIREBASE_UNIVERSE_DOMAIN: Optional[str] = ""
    
    # Firestore Database Configuration
    FIRESTORE_DB_NAME: Optional[str] = ""  # Default database name
    
    OPENAI_API_KEY: Optional[str] = ""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
