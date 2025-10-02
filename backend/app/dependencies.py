from typing import Annotated

from fastapi import Depends, HTTPException, status
from firebase_admin import firestore

from app.config import Settings
from app.firebase import get_firestore_client


# Dependency to get Firestore client
def get_db():
    """Dependency to get Firestore database client."""
    try:
        db = get_firestore_client()
        return db
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database connection failed: {str(e)}"
        )


# Type alias for dependency injection
DbDependency = Annotated[firestore.Client, Depends(get_db)]

SettingsDependency = Annotated[Settings, Depends(Settings())]
