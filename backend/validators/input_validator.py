"""
Input Validator Module
======================
Validates and sanitizes all user input from the questionnaire.

This module enforces:
- Required field validation
- Type checking
- Content sanitization to prevent template injection
- Field length limits
"""

import bleach
from typing import Dict, List, Tuple, Any, Optional


# =============================================================================
# Constants
# =============================================================================

# Maximum field lengths to prevent abuse
MAX_TEXT_LENGTH = 500
MAX_MULTILINE_LENGTH = 2000

# Valid options for dropdown/multiselect fields
VALID_INFRASTRUCTURE_OPTIONS = ['AWS', 'Azure', 'GCP', 'On-Premises']
VALID_SEVERITY_LEVELS = ['Low', 'Medium', 'High', 'Critical']
VALID_COMMUNICATION_CHANNELS = ['Email', 'Phone', 'Slack', 'Microsoft Teams', 'Other']
VALID_OUTPUT_FORMATS = ['pdf']


# =============================================================================
# Sanitization Functions
# =============================================================================

def sanitize_text(value: str, max_length: int = MAX_TEXT_LENGTH) -> str:
    """
    Sanitize text input by removing HTML tags and limiting length.
    
    Args:
        value: Raw input string
        max_length: Maximum allowed length
        
    Returns:
        Sanitized string with HTML stripped and length limited
    """
    if not isinstance(value, str):
        return ''
    
    # Strip HTML tags using bleach
    cleaned = bleach.clean(value, tags=[], strip=True)
    
    # Trim whitespace
    cleaned = cleaned.strip()
    
    # Limit length
    return cleaned[:max_length]


def sanitize_multiline(value: str) -> str:
    """
    Sanitize multiline text input.
    
    Args:
        value: Raw multiline input string
        
    Returns:
        Sanitized string
    """
    return sanitize_text(value, MAX_MULTILINE_LENGTH)


# =============================================================================
# Validation Functions
# =============================================================================

def validate_required_text(data: Dict, field: str, errors: List[str], 
                          multiline: bool = False) -> Optional[str]:
    """
    Validate and sanitize a required text field.
    
    Args:
        data: Input data dictionary
        field: Field name to validate
        errors: List to append error messages to
        multiline: Whether this is a multiline field
        
    Returns:
        Sanitized value or None if invalid
    """
    value = data.get(field)
    
    if value is None or value == '':
        errors.append(f'{field}: This field is required.')
        return None
    
    if not isinstance(value, str):
        errors.append(f'{field}: Must be a text value.')
        return None
    
    sanitized = sanitize_multiline(value) if multiline else sanitize_text(value)
    
    if not sanitized:
        errors.append(f'{field}: This field cannot be empty.')
        return None
    
    return sanitized


def validate_optional_text(data: Dict, field: str, errors: List[str]) -> Optional[str]:
    """
    Validate and sanitize an optional text field.
    
    Args:
        data: Input data dictionary
        field: Field name to validate
        errors: List to append error messages to
        
    Returns:
        Sanitized value or empty string if not provided
    """
    value = data.get(field)
    
    if value is None or value == '':
        return ''
    
    if not isinstance(value, str):
        errors.append(f'{field}: Must be a text value.')
        return ''
    
    return sanitize_text(value)


def validate_dropdown(data: Dict, field: str, valid_options: List[str], 
                     errors: List[str]) -> Optional[str]:
    """
    Validate a required dropdown field.
    
    Args:
        data: Input data dictionary
        field: Field name to validate
        valid_options: List of valid option values
        errors: List to append error messages to
        
    Returns:
        Validated value or None if invalid
    """
    value = data.get(field)
    
    if value is None or value == '':
        errors.append(f'{field}: This field is required.')
        return None
    
    if not isinstance(value, str):
        errors.append(f'{field}: Invalid selection.')
        return None
    
    if value not in valid_options:
        errors.append(f'{field}: Invalid option. Must be one of: {", ".join(valid_options)}')
        return None
    
    return value


def validate_multiselect(data: Dict, field: str, valid_options: List[str],
                        errors: List[str], min_selections: int = 1) -> Optional[List[str]]:
    """
    Validate a required multiselect field.
    
    Args:
        data: Input data dictionary
        field: Field name to validate
        valid_options: List of valid option values
        errors: List to append error messages to
        min_selections: Minimum number of selections required
        
    Returns:
        List of validated values or None if invalid
    """
    value = data.get(field)
    
    if value is None:
        errors.append(f'{field}: This field is required.')
        return None
    
    if not isinstance(value, list):
        errors.append(f'{field}: Must be a list of selections.')
        return None
    
    if len(value) < min_selections:
        errors.append(f'{field}: At least {min_selections} selection(s) required.')
        return None
    
    # Validate each selection
    validated = []
    for item in value:
        if not isinstance(item, str):
            errors.append(f'{field}: Invalid selection type.')
            return None
        if item not in valid_options:
            errors.append(f'{field}: Invalid option "{item}".')
            return None
        validated.append(item)
    
    return validated


def validate_boolean(data: Dict, field: str, errors: List[str], 
                    required: bool = True) -> Optional[bool]:
    """
    Validate a boolean field.
    
    Args:
        data: Input data dictionary
        field: Field name to validate
        errors: List to append error messages to
        required: Whether the field is required
        
    Returns:
        Boolean value or None if invalid
    """
    value = data.get(field)
    
    if value is None:
        if required:
            errors.append(f'{field}: This field is required.')
        return None
    
    if not isinstance(value, bool):
        errors.append(f'{field}: Must be true or false.')
        return None
    
    return value


# =============================================================================
# Main Validation Function
# =============================================================================

def validate_questionnaire(data: Dict) -> Tuple[bool, Dict[str, Any], List[str]]:
    """
    Validate all questionnaire fields from the IR template generator.
    
    This function validates the exact 16 questions defined in the requirements:
    
    Organization Information (Q1-3):
    - organizationName: Required text
    - industry: Required text
    - infrastructureEnvironment: Required dropdown
    
    Security Team Structure (Q4-7):
    - incidentCommander: Required text
    - socAnalysts: Required multiline text
    - cloudRemediationOwner: Required text
    - legalComplianceOwner: Required text
    
    Incident Severity Classification (Q8-9):
    - severityLevels: Required multiselect
    - severityDetermination: Required multiline text
    
    Escalation & Communication (Q10-12):
    - escalationMatrix: Required multiline text
    - communicationChannels: Required multiselect
    - criticalIncidentNotifications: Required multiline text
    
    Incident Response Execution Details (Q13-15):
    - maintainsForensicEvidence: Required boolean
    - forensicEvidenceLocation: Conditional text (if Q13 = yes)
    - conductPostIncidentReviews: Required boolean
    
    Output Preferences (Q16):
    - outputFormat: Required dropdown
    
    Args:
        data: Raw input dictionary from the frontend
        
    Returns:
        Tuple of:
        - is_valid: Boolean indicating if all validation passed
        - validated_data: Dictionary of sanitized, validated data
        - errors: List of validation error messages
    """
    errors: List[str] = []
    validated: Dict[str, Any] = {}
    
    # -------------------------------------------------------------------------
    # Section 4.1: Organization Information
    # -------------------------------------------------------------------------
    
    # Q1: Organization name
    validated['organizationName'] = validate_required_text(
        data, 'organizationName', errors
    )
    
    # Q1b: Organization Logo (Optional)
    # Basic validation to ensure it's a string if present
    logo = data.get('organizationLogo')
    if logo:
        if isinstance(logo, str) and (logo.startswith('data:image/') or len(logo) < 1000000): # Basic sanity check
             validated['organizationLogo'] = logo
        else:
             # If invalid, just ignore it rather than erroring out the whole form
             validated['organizationLogo'] = None
    else:
        validated['organizationLogo'] = None
    
    # Q2: Industry
    validated['industry'] = validate_required_text(
        data, 'industry', errors
    )
    
    # Q3: Infrastructure environment
    validated['infrastructureEnvironment'] = validate_dropdown(
        data, 'infrastructureEnvironment', VALID_INFRASTRUCTURE_OPTIONS, errors
    )
    
    # -------------------------------------------------------------------------
    # Section 4.2: Security Team Structure
    # -------------------------------------------------------------------------
    
    # Q4: Incident Commander
    validated['incidentCommander'] = validate_required_text(
        data, 'incidentCommander', errors
    )
    
    # Q5: SOC Analysts
    validated['socAnalysts'] = validate_required_text(
        data, 'socAnalysts', errors, multiline=True
    )
    
    # Q6: Cloud/Infrastructure Remediation Owner
    validated['cloudRemediationOwner'] = validate_required_text(
        data, 'cloudRemediationOwner', errors
    )
    
    # Q7: Legal/Compliance Owner
    validated['legalComplianceOwner'] = validate_required_text(
        data, 'legalComplianceOwner', errors
    )
    
    # -------------------------------------------------------------------------
    # Section 4.3: Incident Severity Classification
    # -------------------------------------------------------------------------
    
    # Q8: Severity levels
    validated['severityLevels'] = validate_multiselect(
        data, 'severityLevels', VALID_SEVERITY_LEVELS, errors
    )
    
    # Q9: Severity determination description
    validated['severityDetermination'] = validate_required_text(
        data, 'severityDetermination', errors, multiline=True
    )
    
    # -------------------------------------------------------------------------
    # Section 4.4: Escalation & Communication
    # -------------------------------------------------------------------------
    
    # Q10: Escalation matrix
    validated['escalationMatrix'] = validate_required_text(
        data, 'escalationMatrix', errors, multiline=True
    )
    
    # Q11: Communication channels
    validated['communicationChannels'] = validate_multiselect(
        data, 'communicationChannels', VALID_COMMUNICATION_CHANNELS, errors
    )
    
    # Q12: Critical incident notifications
    validated['criticalIncidentNotifications'] = validate_required_text(
        data, 'criticalIncidentNotifications', errors, multiline=True
    )
    
    # -------------------------------------------------------------------------
    # Section 4.5: Incident Response Execution Details
    # -------------------------------------------------------------------------
    
    # Q13: Maintains forensic evidence
    validated['maintainsForensicEvidence'] = validate_boolean(
        data, 'maintainsForensicEvidence', errors
    )
    
    # Q14: Forensic evidence location (conditional on Q13)
    if validated.get('maintainsForensicEvidence') is True:
        validated['forensicEvidenceLocation'] = validate_required_text(
            data, 'forensicEvidenceLocation', errors
        )
    else:
        validated['forensicEvidenceLocation'] = ''
    
    # Q15: Conducts post-incident reviews
    validated['conductPostIncidentReviews'] = validate_boolean(
        data, 'conductPostIncidentReviews', errors
    )
    
    # -------------------------------------------------------------------------
    # Section 4.6: Output Preferences
    # -------------------------------------------------------------------------
    
    # Q16: Output format
    validated['outputFormat'] = validate_dropdown(
        data, 'outputFormat', VALID_OUTPUT_FORMATS, errors
    )
    
    # -------------------------------------------------------------------------
    # Return validation result
    # -------------------------------------------------------------------------
    
    is_valid = len(errors) == 0
    
    return is_valid, validated, errors
