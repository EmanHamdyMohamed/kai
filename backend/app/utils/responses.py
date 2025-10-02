from typing import Any

from fastapi import HTTPException, status
from fastapi.responses import JSONResponse

from app.models.response import ErrorResponse, SuccessResponse


def success_response(
    data: Any = None,
    message: str = "Operation completed successfully",
    status_code: int = status.HTTP_200_OK
) -> JSONResponse:
    """Create a standardized success response.
    
    Args:
        data: Response data payload
        message: Success message
        status_code: HTTP status code
        
    Returns:
        JSONResponse with success structure
    """
    response = SuccessResponse(
        data=data,
        message=message,
        status_code=status_code
    )
    return JSONResponse(
        content=response.dict(),
        status_code=status_code
    )


def error_response(
    message: str = "An error occurred",
    error: str = None,
    status_code: int = status.HTTP_400_BAD_REQUEST
) -> JSONResponse:
    """Create a standardized error response.
    
    Args:
        message: Error message
        error: Detailed error information
        status_code: HTTP status code
        
    Returns:
        JSONResponse with error structure
    """
    response = ErrorResponse(
        error=error or message,
    )
    response.message = message
    response.status_code = status_code
    return JSONResponse(
        content=response.dict(),
        status_code=status_code
    )


def validation_error_response(
    message: str = "Validation failed",
    error: str = None
) -> JSONResponse:
    """Create a validation error response."""
    return error_response(
        message=message,
        error=error or message,
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY
    )


def not_found_response(resource: str = "Resource") -> JSONResponse:
    """Create a not found error response."""
    return error_response(
        message=f"{resource} not found",
        error=f"{resource} not found",
        status_code=status.HTTP_404_NOT_FOUND
    )


def unauthorized_response(message: str = "Unauthorized access") -> JSONResponse:
    """Create an unauthorized error response."""
    return error_response(
        message=message,
        error=message,
        status_code=status.HTTP_401_UNAUTHORIZED
    )


def forbidden_response(message: str = "Access forbidden") -> JSONResponse:
    """Create a forbidden error response."""
    return error_response(
        message=message,
        error=message,
        status_code=status.HTTP_403_FORBIDDEN
    )


def internal_server_error_response(message: str = "Internal server error") -> JSONResponse:
    """Create an internal server error response."""
    return error_response(
        message=message,
        error=message,
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
    )


def handle_exception(exception: Exception) -> JSONResponse:
    """Handle exceptions and return appropriate error response.

    Args:
        exception: The exception to handle
 
    Returns:
        JSONResponse with appropriate error structure
    """
    if isinstance(exception, HTTPException):
        return error_response(
            message=exception.detail,
            status_code=exception.status_code
        )
    
    # Handle specific exception types
    if isinstance(exception, ValueError):
        return validation_error_response(
            message="Invalid input provided",
            error=str(exception)
        )
    
    if isinstance(exception, KeyError):
        return validation_error_response(
            message="Required field missing",
            error=f"Missing field: {str(exception)}"
        )
    
    # Default to internal server error
    return internal_server_error_response(
        message="An unexpected error occurred"
    )
