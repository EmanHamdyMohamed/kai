import json
import logging
from datetime import datetime

import openai

from app.config import Settings
from app.models.user import RequestStatus

openai.api_key = Settings().OPENAI_API_KEY


def validate_custom_json(data: dict, required_fields: list) -> bool:
    """Validate custom JSON format."""
    # Check if it's a dict
    if not isinstance(data, dict):
        return False
    
    # Check required fields
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return False
    
    # Check for empty values
    null_fields = [field for field in required_fields if not data.get(field)]
    if null_fields:
        return False
    
    return True


async def request_text_analyze(request_id: str, text_to_analyze: str, db):
    """Background task to analyze text and update status."""
    try:
        logging.info(f'Starting analysis for request ID: {request_id}')
        
        # Update status to processing
        doc_ref = db.collection('analyze_request').document(request_id)
        await doc_ref.update({
            'status': RequestStatus.processing.value,
            'updated_at': datetime.utcnow().isoformat()
        })
        logging.info(f'Updated status to processing for request: {request_id}')
        
        # Perform analysis
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Extract summary and sentiment and keywords from text"},
                {"role": "user", "content": f"{text_to_analyze}"}
            ],
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "name": "text_analysis",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "summary": {"type": "string"},
                            "sentiment": {"type": "string", "enum": ["positive", "negative", "neutral"]},
                            "keywords": {
                                "type": "array",
                                "items": {"type": "string"}
                            },
                        },
                        "required": ["summary", "sentiment", "keywords"]
                    }
                }
            }
        )
        
        result_string = response.choices[0].message.content
        logging.info(f'Analysis completed for request: {request_id}')
        logging.info(f'Raw result: {result_string}')
        status = RequestStatus.completed.value
        
        # Parse JSON result
        try:
            result_json = json.loads(result_string)
            is_valid = validate_custom_json(result_json, ["summary", "sentiment", "keywords"])
            if not is_valid:
                status = RequestStatus.failed.value
            logging.info(f'Parsed JSON result: {result_json}, is_valid: {is_valid}')
        except json.JSONDecodeError as e:
            logging.info(f'Failed to parse JSON result: {e}')
            # Fallback to string result
            result_json = {
                "summary": "Analysis completed",
                "sentiment": "neutral",
                "keywords": [],
                "raw_result": result_string,
                "parse_error": str(e)
            }
        
        # Update status to completed with JSON result
        await doc_ref.update({
            'status': status,
            'result': result_json,  # Store as JSON object
            'updated_at': datetime.utcnow().isoformat(),
            'completed_at': datetime.utcnow().isoformat()
        })
        logging.info(f'Updated status to completed for request: {request_id}')
        
    except Exception as e:
        logging.error(f'Error analyzing text for request {request_id}: {e}')
        
        # Update status to error
        try:
            doc_ref = db.collection('analyze_request').document(request_id)
            await doc_ref.update({
                'status': RequestStatus.failed.value,
                'error_message': str(e),
                'updated_at': datetime.utcnow().isoformat()
            })
            logging.info(f'Updated status to error for request: {request_id}')
        except Exception as update_error:
            logging.error(f'Failed to update error status for request {request_id}: {update_error}')
