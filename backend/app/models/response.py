from typing import Generic, TypeVar

from pydantic import BaseModel, Field

# Generic type for response data
T = TypeVar('T')


class ResponseBase(BaseModel, Generic[T]):
    """Base model for response."""

    status_code: int = Field(default=200, alias="statusCode")
    data: T | None = None
    message: str = Field(default="", description="Response message")


class SuccessResponse(ResponseBase[T]):
    """Response model for successful operations."""

    success: bool = True


class ErrorResponse(ResponseBase[None]):
    """Response model for error operations."""

    success: bool = False
    error: str = Field(default=400, description="Error message")
