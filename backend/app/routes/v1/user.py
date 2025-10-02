import logging
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, BackgroundTasks, Request, status

from app.dependencies import DbDependency
from app.models.response import SuccessResponse
from app.models.user import AnalyzeBody, RequestStatus
from app.services.analyze_text import request_text_analyze
from app.utils.responses import handle_exception, success_response


router = APIRouter(prefix="/user", tags=["Auth"])


@router.get(
    "/me",
    response_model=SuccessResponse[dict],
    status_code=status.HTTP_200_OK,
    description="Create new user",
    responses={
        201: {"description": "User created successfully"},
        400: {"description": "Bad request - Invalid input or user already exists"},
        422: {"description": "Validation error"},
        500: {"description": "Internal server error"}
    },
)
def get_user_profile(request: Request) -> SuccessResponse[dict]:
    """Create a new user account.

    Args:
        request: api request

    Returns:
        SignupResponse: Success response with user data

    Raises:
        HTTPException: If user creation fails
    """
    try:
        user = request.state.user
        return success_response(
            data={
                "uid": user['user_id'],
                "name": user['name'],
                "email": user['email']
            },
            message="User created successfully",
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return handle_exception(e)


@router.post(
    "/analyze",
    response_model=SuccessResponse[dict],
    status_code=status.HTTP_200_OK,
    description="Create new user",
    responses={
        201: {"description": "User created successfully"},
        400: {"description": "Bad request - Invalid input or user already exists"},
        422: {"description": "Validation error"},
        500: {"description": "Internal server error"}
    },
)
async def analyze_text(
    request: Request,
    analyze_body: AnalyzeBody,
    db: DbDependency,
    background_tasks: BackgroundTasks
):
    user = request.state.user
    doc_ref = await db.collection('analyze_request').add({
        "user_id": user['user_id'],
        "text": analyze_body.text,
        "status": RequestStatus.pending.value,
        "created_at": datetime.utcnow().isoformat()
    })
    # # Get the document data
    print('doc_ref', doc_ref)
    text_to_analyze = analyze_body.text
    document_id = doc_ref[1].id
    background_tasks.add_task(request_text_analyze, document_id, text_to_analyze, db)
    return success_response(
        data={
            "document_id": document_id,
            'text': analyze_body.text,
            'status': RequestStatus.pending.value
        },
        message="Analysis request created successfully",
        status_code=status.HTTP_200_OK
    )


@router.get(
    "/analyze",
    response_model=SuccessResponse[dict],
    status_code=status.HTTP_200_OK,
    description="Get user's analysis requests",
    responses={
        200: {"description": "Analysis requests retrieved successfully"},
        400: {"description": "Bad request - Invalid parameters"},
        422: {"description": "Validation error"},
        500: {"description": "Internal server error"}
    },
)
async def get_user_analyze_requests(
    request: Request,
    db: DbDependency,
    limit: Optional[int] = 50,
    offset: Optional[int] = 0
):
    """Get user's analysis requests with pagination."""
    try:
        user = request.state.user
        user_id = user['user_id']
        
        # Query user's analysis requests
        query = db.collection('analyze_request').where('user_id', '==', user_id)
        query = query.order_by('created_at', direction='DESCENDING')
        query = query.limit(limit).offset(offset)
        
        # count total items
        total_count_query = db.collection('analyze_request').where('user_id', '==', user_id).count()
        total_count_result = await total_count_query.get()
        total_count = total_count_result[0][0].value
        # Execute query
        docs = await query.get()
        
        # Convert documents to list of dictionaries
        requests = []
        for doc in docs:
            doc_data = doc.to_dict()
            doc_data['id'] = doc.id  # Add document ID
            requests.append(doc_data)
        
        return success_response(
            data={
                'requests': requests,
                'total': total_count,
                'limit': limit,
                'offset': offset
            },
            message="Analysis requests retrieved successfully",
            status_code=status.HTTP_200_OK
        )
        
    except Exception as e:
        logging.error(f"Error getting analysis requests: {e}")
        return handle_exception(e)
