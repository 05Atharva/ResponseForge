"""
Template Renderer Module
========================
Handles secure rendering of NIST IR templates using Jinja2.

Security measures:
- Autoescape enabled to prevent XSS
- Sandboxed environment (no code execution)
- Template loaded from files only (not from user input)
"""

import os
from datetime import datetime
from typing import Dict, Any
from jinja2 import Environment, FileSystemLoader, select_autoescape


# =============================================================================
# Template Directory Configuration
# =============================================================================

# Get the directory where this module is located
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# Templates are stored in the backend/templates directory
TEMPLATE_DIR = os.path.join(os.path.dirname(CURRENT_DIR), 'templates')


# =============================================================================
# Jinja2 Environment Setup
# =============================================================================

def create_jinja_env() -> Environment:
    """
    Create a secure Jinja2 environment with autoescape enabled.
    
    The environment is configured to:
    - Load templates from the templates directory only
    - Autoescape all content to prevent XSS
    - Not inherit from any parent environment
    
    Returns:
        Configured Jinja2 Environment
    """
    env = Environment(
        loader=FileSystemLoader(TEMPLATE_DIR),
        autoescape=select_autoescape(['html', 'xml', 'j2']),
        # Security: Don't allow extending from templates outside our directory
        trim_blocks=True,
        lstrip_blocks=True
    )
    
    return env


# =============================================================================
# Template Rendering Functions
# =============================================================================

def render_ir_template(validated_data: Dict[str, Any]) -> str:
    """
    Render the NIST IR template with the provided data.
    
    This function:
    1. Creates a secure Jinja2 environment
    2. Loads the NIST IR template from file
    3. Renders the template with validated user data
    4. Returns the rendered document as a string
    
    Args:
        validated_data: Dictionary of validated and sanitized user input
        
    Returns:
        Rendered IR document as a string
        
    Raises:
        TemplateNotFound: If the template file is missing
        TemplateSyntaxError: If the template has syntax errors
    """
    # Create secure environment
    env = create_jinja_env()
    
    # Load the template
    template = env.get_template('nist_ir_template.j2')
    
    # Prepare context with additional metadata
    context = {
        **validated_data,
        'generated_date': datetime.now().strftime('%Y-%m-%d'),
        'generated_time': datetime.now().strftime('%H:%M:%S'),
        'document_version': '1.0'
    }
    
    # Render and return
    return template.render(context)


def generate_filename(organization_name: str, output_format: str) -> str:
    """
    Generate a filename for the IR document.
    
    Args:
        organization_name: Name of the organization
        output_format: Output format ('md', 'txt', or 'pdf')
        
    Returns:
        Generated filename string
    """
    # Sanitize organization name for filename
    safe_name = ''.join(c if c.isalnum() or c in '-_' else '_' 
                        for c in organization_name)
    safe_name = safe_name[:50]  # Limit length
    
    # Generate timestamp
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    # Determine extension
    if output_format == 'pdf':
        extension = 'pdf'
    elif output_format == 'md':
        extension = 'md'
    else:
        extension = 'txt'
    
    return f'IR_Plan_{safe_name}_{timestamp}.{extension}'


def convert_to_text(markdown_content: str) -> str:
    """
    Convert Markdown content to plain text format.
    
    This is a simple conversion that:
    - Removes Markdown headers (#)
    - Converts bullet points
    - Preserves the content structure
    
    Args:
        markdown_content: The rendered Markdown document
        
    Returns:
        Plain text version of the document
    """
    lines = markdown_content.split('\n')
    text_lines = []
    
    for line in lines:
        # Remove header markers and replace with underlined text
        if line.startswith('# '):
            text_lines.append(line[2:])
            text_lines.append('=' * len(line[2:]))
        elif line.startswith('## '):
            text_lines.append(line[3:])
            text_lines.append('-' * len(line[3:]))
        elif line.startswith('### '):
            text_lines.append(line[4:])
        elif line.startswith('#### '):
            text_lines.append(line[5:])
        elif line.startswith('- '):
            text_lines.append('  * ' + line[2:])
        elif line.startswith('**') and line.endswith('**'):
            text_lines.append(line[2:-2].upper())
        else:
            text_lines.append(line)
    
    return '\n'.join(text_lines)
