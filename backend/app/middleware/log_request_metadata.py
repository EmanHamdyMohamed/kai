import logging
import time
import uuid
from fastapi import Request
from starlette.middleware.base import RequestResponseEndpoint


async def log_request_metadata(request: Request, call_next: RequestResponseEndpoint):
    """Log the request metadata before and after making an HTTP request.

    Args:
        request (Request): The incoming HTTP request.
        call_next (RequestResponseEndpoint): The next middleware to call in the chain.

    Returns:
        Response: The HTTP response returned by the next middleware.
    """
    if request.url.path == '/health':
        response = await call_next(request)
        return response
    request_id = str(uuid.uuid4())
    tracing_params = {
        'request_id': request_id
    }

    client = request.client.host if request.client else None
    request_url = str(request.url)
    request_method = request.method

    request_metadata = {
        'client': client,
        'url': request_url,
        'method': request_method,
        **tracing_params
    }
    logging.info(f'Starting http request {str(request_metadata)}')
    start_time = time.time()
    response = await call_next(request)
    end_time = time.time()
    execution_time = end_time - start_time
    response_status_code = response.status_code
    request_metadata['request_duration'] = execution_time
    if response_status_code:
        request_metadata['status_code'] = response_status_code
    logging.info(f'HTTP request complete {str(request_metadata)}')
    response.headers['X-Request-ID'] = request_id

    return response
