# ResponseForge

🛡️ **NIST SP 800-61 Compliant Incident Response Plan Generator**

ResponseForge is a web application that generates customized, NIST-compliant Incident Response (IR) templates tailored to an organization's structure and operational needs.

## Features

- ✅ **NIST SP 800-61 Compliance** - Follows the ARTEMIS framework structure
- ✅ **16-Question Questionnaire** - Captures organization-specific inputs
- ✅ **Secure Backend** - Template rendering with input validation and sanitization
- ✅ **Modern UI** - Dark theme with glassmorphism effects
- ✅ **Multiple Output Formats** - Markdown (.md) and Text (.txt)
- ✅ **Security-First Design** - Rate limiting, XSS prevention, template injection protection

## Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The API will be available at `http://127.0.0.1:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The UI will be available at `http://localhost:5173`

## Project Structure

```
responseforge/
├── backend/
│   ├── app.py                 # Flask application entry point
│   ├── requirements.txt       # Python dependencies
│   ├── routes/
│   │   └── ir_routes.py       # API endpoints
│   ├── templates/
│   │   └── nist_ir_template.j2  # NIST IR Jinja2 template
│   ├── validators/
│   │   └── input_validator.py  # Input validation & sanitization
│   └── utils/
│       └── template_renderer.py  # Secure template rendering
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main application component
│   │   ├── App.css            # Global styles
│   │   ├── components/        # Form section components
│   │   │   ├── OrganizationInfo.jsx
│   │   │   ├── SecurityTeamStructure.jsx
│   │   │   ├── SeverityClassification.jsx
│   │   │   ├── EscalationCommunication.jsx
│   │   │   ├── IncidentResponseExecution.jsx
│   │   │   ├── OutputPreferences.jsx
│   │   │   ├── DocumentPreview.jsx
│   │   │   └── FormNavigation.jsx
│   │   └── services/
│   │       └── apiService.js  # API integration
│   └── package.json
└── README.md
```

## Questionnaire Sections

The questionnaire follows the exact specification:

### 1. Organization Information
- Organization name
- Industry
- Primary infrastructure environment (AWS/Azure/GCP/On-Premises)

### 2. Security Team Structure
- Incident Commander
- SOC Analysts
- Cloud/Infrastructure Remediation Owner
- Legal/Compliance Owner

### 3. Incident Severity Classification
- Severity levels (Low/Medium/High/Critical)
- Severity determination criteria

### 4. Escalation & Communication
- Escalation matrix
- Communication channels
- Critical incident notification list

### 5. Incident Response Execution
- Forensic evidence maintenance (Yes/No)
- Forensic evidence location (conditional)
- Post-incident reviews (Yes/No)

### 6. Output Preferences
- Output format (Markdown/Text)

## Generated Document Structure

The generated IR plan follows NIST SP 800-61 with these sections:

1. **Introduction** - Context, Purpose, Audience
2. **Organizing a CSIRT** - Team structure, models, personnel
3. **Handling an Incident**
   - 3.1 Preparation
   - 3.2 Detection and Analysis
   - 3.3 Containment, Eradication, and Recovery
   - 3.4 Post-Incident Activity
4. **Coordination and Information Sharing**
5. **Appendices**
   - A: Situation Update Template
   - B: Resolution Action Plan Template
   - C: Evidence Register Template
   - D: Assets and Key Contacts
   - E: Glossary

## Security Features

| Threat | Mitigation |
|--------|------------|
| Template Injection | Jinja2 autoescape, no user input in template logic |
| XSS | Content sanitization with Bleach |
| Input Tampering | Server-side validation, type enforcement |
| Missing Fields | Required field validation |
| Large Payloads | Request size limit (16KB), field length limits |
| Rate Abuse | 10 requests/minute per IP |

## API Reference

### Generate IR Template

```http
POST /api/generate-ir-template
Content-Type: application/json

{
  "organizationName": "string",
  "industry": "string",
  "infrastructureEnvironment": "AWS|Azure|GCP|On-Premises",
  "incidentCommander": "string",
  "socAnalysts": "string",
  "cloudRemediationOwner": "string",
  "legalComplianceOwner": "string",
  "severityLevels": ["Low", "Medium", "High", "Critical"],
  "severityDetermination": "string",
  "escalationMatrix": "string",
  "communicationChannels": ["Email", "Phone", "Slack", "Microsoft Teams", "Other"],
  "criticalIncidentNotifications": "string",
  "maintainsForensicEvidence": true|false,
  "forensicEvidenceLocation": "string",
  "conductPostIncidentReviews": true|false,
  "outputFormat": "md|txt"
}
```

### Get Template Options

```http
GET /api/template-options
```

## License

Based on NIST SP 800-61 Rev. 2: Computer Security Incident Handling Guide