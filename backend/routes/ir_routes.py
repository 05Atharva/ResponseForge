"""
Incident Response Routes
========================
API endpoints for generating NIST SP 800-61 compliant IR templates.
"""

from flask import Blueprint, request, jsonify
from validators.input_validator import validate_questionnaire
from utils.template_renderer import (
    render_ir_template, 
    generate_filename, 
    convert_to_text
)


# =============================================================================
# Blueprint Configuration
# =============================================================================

ir_blueprint = Blueprint('ir', __name__)


# =============================================================================
# API Endpoints
# =============================================================================

@ir_blueprint.route('/generate-ir-template', methods=['POST'])
def generate_ir_template():
    """
    Generate a NIST SP 800-61 compliant Incident Response template.
    
    This endpoint:
    1. Receives questionnaire data as JSON
    2. Validates all required fields
    3. Renders the IR template using Jinja2
    4. Returns the rendered document
    
    Request Body (JSON):
        See validators/input_validator.py for the full field specification.
        
    Returns:
        JSON response with:
        - success: Boolean indicating success/failure
        - document: Rendered IR document (on success)
        - filename: Suggested filename for download (on success)
        - errors: List of validation errors (on failure)
        
    HTTP Status Codes:
        200: Success - document generated
        400: Bad Request - validation errors or missing data
        500: Server Error - template rendering failed
    """
    # -------------------------------------------------------------------------
    # Verify request has JSON content
    # -------------------------------------------------------------------------
    
    if not request.is_json:
        return jsonify({
            'success': False,
            'errors': ['Request must have Content-Type: application/json']
        }), 400
    
    # -------------------------------------------------------------------------
    # Parse request data
    # -------------------------------------------------------------------------
    
    try:
        data = request.get_json()
    except Exception:
        return jsonify({
            'success': False,
            'errors': ['Invalid JSON in request body']
        }), 400
    
    if not data or not isinstance(data, dict):
        return jsonify({
            'success': False,
            'errors': ['Request body must be a JSON object']
        }), 400
    
    # -------------------------------------------------------------------------
    # Validate input
    # -------------------------------------------------------------------------
    
    is_valid, validated_data, errors = validate_questionnaire(data)
    
    if not is_valid:
        return jsonify({
            'success': False,
            'errors': errors
        }), 400
    
    # -------------------------------------------------------------------------
    # Render template
    # -------------------------------------------------------------------------
    
    try:
        # Render the IR document
        document = render_ir_template(validated_data)
        
        # Convert to text if requested
        output_format = validated_data.get('outputFormat', 'md')
        if output_format == 'txt':
            document = convert_to_text(document)
        
        # Generate filename
        filename = generate_filename(
            validated_data.get('organizationName', 'Organization'),
            output_format
        )
        
    except Exception as e:
        # Log the error (in production, use proper logging)
        print(f'Template rendering error: {str(e)}')
        
        return jsonify({
            'success': False,
            'errors': ['Failed to generate document. Please try again.']
        }), 500
    
    # -------------------------------------------------------------------------
    # Return success response
    # -------------------------------------------------------------------------
    
    return jsonify({
        'success': True,
        'document': document,
        'filename': filename
    }), 200


@ir_blueprint.route('/template-options', methods=['GET'])
def get_template_options():
    """
    Return available options for dropdown and multiselect fields.
    
    This endpoint provides the frontend with the valid options for:
    - Infrastructure environments
    - Severity levels
    - Communication channels
    - Output formats
    
    Returns:
        JSON object with all available options
    """
    return jsonify({
        'infrastructureOptions': ['AWS', 'Azure', 'GCP', 'On-Premises'],
        'severityLevels': ['Low', 'Medium', 'High', 'Critical'],
        'communicationChannels': ['Email', 'Phone', 'Slack', 'Microsoft Teams', 'Other'],
        'outputFormats': [
            {'value': 'md', 'label': 'Markdown (.md)'},
            {'value': 'txt', 'label': 'Text (.txt)'}
        ]
    }), 200
