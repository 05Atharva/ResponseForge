from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
import uuid

app = FastAPI()

# ---------------- CORS Setup ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Template Setup ----------------
env = Environment(loader=FileSystemLoader("templates"))

# ---------------- Serve Static Files ----------------
app.mount("/static", StaticFiles(directory="generated_reports"), name="static")

# ---------------- Conditional Mapping Function ----------------
def generate_dynamic_sections(user_input):
    dynamic = {
        "compliance_section": "",
        "csirt_section": "",
        "containment_section": "",
        "threat_response_section": ""
    }

    # Compliance logic
    compliance = user_input.get("compliance_standards", [])
    if "HIPAA" in compliance:
        dynamic["compliance_section"] = (
            "This organization must report data breaches to health authorities "
            "within 72 hours as per HIPAA standards."
        )
    elif "GDPR" in compliance:
        dynamic["compliance_section"] = (
            "As per GDPR, any breach must be reported to the Data Protection Authority "
            "within 72 hours of discovery."
        )
    elif "PCI-DSS" in compliance:
        dynamic["compliance_section"] = (
            "As a PCI-DSS compliant company, all cardholder data incidents must be reported "
            "to the appropriate bank and card brands immediately."
        )

    # CSIRT logic based on company size
    size = user_input.get("company_size", "").lower()
    if size in ["micro", "small"]:
        dynamic["csirt_section"] = (
            "The organization maintains a lightweight CSIRT supported by external MSSPs "
            "due to limited internal staffing."
        )
    else:
        dynamic["csirt_section"] = (
            "The organization has a fully staffed internal CSIRT and SOC to ensure 24/7 "
            "incident detection and response capabilities."
        )

    # Containment based on cloud provider
    cloud = user_input.get("cloud_services", [])
    if "AWS" in cloud:
        dynamic["containment_section"] = (
            "Containment includes revoking IAM roles, disabling access keys, "
            "and isolating affected EC2 instances on AWS."
        )
    elif "Azure" in cloud:
        dynamic["containment_section"] = (
            "Containment involves deactivating Azure AD accounts and isolating affected "
            "resources in the virtual network."
        )
    elif "GCP" in cloud:
        dynamic["containment_section"] = (
            "GCP-specific containment includes disabling service accounts, terminating VMs, "
            "and revoking access tokens."
        )

    # Threat-specific response
    threats = user_input.get("top_threats", [])
    if "Ransomware" in threats:
        dynamic["threat_response_section"] = (
            "Ransomware-specific response includes disconnecting infected systems, "
            "restoring from verified backups, and notifying law enforcement if necessary."
        )
    elif "Phishing" in threats:
        dynamic["threat_response_section"] = (
            "Phishing response includes resetting credentials, alerting affected users, "
            "and updating email filtering rules."
        )
    elif "DDoS" in threats:
        dynamic["threat_response_section"] = (
            "DDoS mitigation involves engaging with cloud WAF/DDoS protection services "
            "and rate-limiting traffic at the edge."
        )

    return dynamic

# ---------------- Report Generation Endpoint ----------------
@app.post("/generate-report/")
async def generate_report(request: Request):
    user_input = await request.json()

    # 1. Apply conditional mapping logic
    dynamic_sections = generate_dynamic_sections(user_input)

    # 2. Merge dynamic + static input (direct mappings already expected to be passed)
    final_data = {
        **user_input,
        **dynamic_sections,
        "company_name": user_input.get("company_name", "N/A"),
        "industry_sector": user_input.get("industry_sector", "N/A"),
        "number_of_endpoints": user_input.get("number_of_endpoints", "N/A"),
        "infrastructure_type": user_input.get("infrastructure_type", "N/A"),
        "edr_siem_used": user_input.get("edr_siem_used", "N/A"),
        "incident_commander": user_input.get("incident_commander", "N/A"),
        "audience_roles": user_input.get("audience_roles", "N/A"),
        "critical_systems": user_input.get("critical_systems", "N/A"),
        "backup_system": user_input.get("backup_system", "N/A"),
        "detection_tools": user_input.get("detection_tools", "N/A"),
        "disclosure_time": user_input.get("disclosure_time", "N/A"),
        "response_playbooks": user_input.get("response_playbooks", "N/A")
    }

    # 3. Render Jinja2 HTML
    template = env.get_template("incident_template.html")
    html_content = template.render(final_data)

    # 4. Generate unique PDF path
    file_id = str(uuid.uuid4())
    file_path = f"generated_reports/{file_id}.pdf"

    # 5. Generate PDF with WeasyPrint
    HTML(string=html_content).write_pdf(file_path)

    # 6. Return download link
    return {"download_url": f"http://localhost:8000/static/{file_id}.pdf"}
