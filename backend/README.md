# ResponseForge Backend

Flask-based API for generating NIST SP 800-61 compliant Incident Response templates.

## Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

## API Endpoints

- `POST /api/generate-ir-template` - Generate IR document from questionnaire input

## Security Features

- Rate limiting (10 requests/minute/IP)
- Request size validation (max 16KB)
- Input sanitization
- Template injection prevention
- CORS configuration
