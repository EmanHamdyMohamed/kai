from pydantic import BaseModel, Field, validator
from enum import Enum
from typing import Optional
from datetime import datetime


class UserProfile(BaseModel):
    uid: str
    full_name: str
    email: str


class AnalyzeBody(BaseModel):
    """Request body for text analysis."""

    text: str = Field(min_length=1, max_length=10000, description="Text to analyze")

    @validator('text')
    def validate_text(cls, v):
        if not v.strip():
            raise ValueError('Text cannot be empty')
        if len(v.strip()) < 3:
            raise ValueError('Text too short for meaningful analysis')
        return v.strip()


class RequestStatus(Enum):
    """Status of analysis requests."""

    completed = 'completed'
    processing = 'processing'
    pending = 'pending'
    failed = 'failed'


class UserAnalyzeRequest(BaseModel):
    """User analysis request model for Firestore storage."""

    id: Optional[str] = Field(default=None, description="Document ID")
    user_id: str = Field(description="Firebase user ID")
    text: str = Field(description="Text to analyze")
    status: RequestStatus = Field(default=RequestStatus.pending, description="Request status")
    result: Optional[dict] = Field(default=None, description="Analysis result")
    error_message: Optional[str] = Field(default=None, description="Error message if failed")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Request creation timestamp")
    updated_at: datetime = Field(default_factory=datetime.utcnow, description="Last update timestamp")
    completed_at: Optional[datetime] = Field(default=None, description="Completion timestamp")
