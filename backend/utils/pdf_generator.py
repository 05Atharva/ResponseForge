"""
PDF Generator Module
====================
Handles PDF generation from HTML templates using WeasyPrint.

This module provides functionality to render HTML templates and convert
them to professional PDF documents.
"""

import os
import io
from datetime import datetime
from typing import Dict, Any
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML, CSS


# =============================================================================
# Template Directory Configuration
# =============================================================================

# Get the directory where this module is located
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# Templates are stored in the backend/templates directory
TEMPLATE_DIR = os.path.join(os.path.dirname(CURRENT_DIR), 'templates')


# =============================================================================
# HTML Template Rendering
# =============================================================================

def render_html_template(validated_data: Dict[str, Any]) -> str:
    """
    Render the HTML template for PDF generation.
    
    Args:
        validated_data: Dictionary of validated and sanitized user input
        
    Returns:
        Rendered HTML as a string
        
    Raises:
        TemplateNotFound: If the template file is missing
        TemplateSyntaxError: If the template has syntax errors
    """
    # Create Jinja2 environment
    env = Environment(
        loader=FileSystemLoader(TEMPLATE_DIR),
        autoescape=True,
        trim_blocks=True,
        lstrip_blocks=True
    )
    
    # Load the HTML template
    template = env.get_template('nist_ir_pdf_template.html.j2')
    
    # Prepare context with additional metadata (same as template_renderer)
    context = {
        **validated_data,
        'generated_date': datetime.now().strftime('%Y-%m-%d'),
        'generated_time': datetime.now().strftime('%H:%M:%S'),
        'document_version': '1.0'
    }
    
    # Render and return
    return template.render(context)


# =============================================================================
# PDF Generation
# =============================================================================

def generate_pdf(html_content: str) -> bytes:
    """
    Convert HTML content to PDF using WeasyPrint.
    
    Args:
        html_content: Rendered HTML content as string
        
    Returns:
        PDF document as bytes
        
    Raises:
        Exception: If PDF generation fails
    """
    # Path to CSS file
    css_path = os.path.join(TEMPLATE_DIR, 'pdf_styles.css')
    
    # Create HTML object from string
    html = HTML(string=html_content, base_url=TEMPLATE_DIR)
    
    # Create CSS object
    css = CSS(filename=css_path)
    
    # Generate PDF and return bytes
    pdf_bytes = html.write_pdf(stylesheets=[css])
    
    return pdf_bytes


def generate_pdf_from_data(validated_data: Dict[str, Any]) -> bytes:
    """
    Generate PDF directly from validated data.
    
    This is a convenience function that combines template rendering
    and PDF generation in one call.
    
    Args:
        validated_data: Dictionary of validated and sanitized user input
        
    Returns:
        PDF document as bytes
    """
    # Render HTML template
    html_content = render_html_template(validated_data)
    
    # Generate PDF
    pdf_bytes = generate_pdf(html_content)
    
    return pdf_bytes
