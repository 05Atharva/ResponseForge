"""Test script for PDF generation debugging"""
import traceback
import sys

print("Starting test...")
sys.stdout.flush()

try:
    print("Step 1: Importing modules...")
    sys.stdout.flush()
    from utils.pdf_generator import render_html_template, generate_pdf
    print("Step 1: Success")
    sys.stdout.flush()
    
    print("Step 2: Preparing test data...")
    sys.stdout.flush()
    test_data = {
        'organizationName': 'Test Corp',
        'industry': 'Technology',
        'infrastructureEnvironment': 'AWS',
        'incidentCommander': 'John Doe',
        'socAnalysts': 'Jane Smith',
        'cloudRemediationOwner': 'Bob Wilson',
        'legalComplianceOwner': 'Alice Brown',
        'severityLevels': ['Critical', 'High'],
        'severityDetermination': 'Based on impact',
        'escalationMatrix': 'P1 goes to CTO',
        'communicationChannels': ['Email', 'Slack'],
        'criticalIncidentNotifications': 'CEO, CTO',
        'maintainsForensicEvidence': True,
        'forensicEvidenceLocation': 'Secure vault',
        'conductPostIncidentReviews': True,
    }
    print("Step 2: Success")
    sys.stdout.flush()
    
    print("Step 3: Rendering HTML template...")
    sys.stdout.flush()
    html_content = render_html_template(test_data)
    print(f"Step 3: Success - HTML length: {len(html_content)} chars")
    sys.stdout.flush()
    
    print("Step 4: Generating PDF...")
    sys.stdout.flush()
    pdf_bytes = generate_pdf(html_content)
    print(f"Step 4: Success - PDF size: {len(pdf_bytes)} bytes")
    sys.stdout.flush()
    
    # Save PDF to file
    with open('test_output.pdf', 'wb') as f:
        f.write(pdf_bytes)
    print("Test PDF saved to test_output.pdf")
    
except Exception as e:
    print(f"ERROR: {type(e).__name__}: {e}")
    traceback.print_exc()
    sys.stdout.flush()
