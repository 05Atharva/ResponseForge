from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
import uuid
import os

app = FastAPI()

# ---------------- CORS Setup ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Template Setup ----------------
env = Environment(loader=FileSystemLoader("templates"))

# ---------------- Serve Static Files ----------------
os.makedirs("generated_reports", exist_ok=True)
app.mount("/static", StaticFiles(directory="generated_reports"), name="static")

# ---------------- Dynamic Mapping Logic ----------------
def generate_dynamic_sections(user_input):
    dynamic = {
        "compliance_section": "",
        "csirt_section": "",
        "containment_section": "",
        "threat_response_section": "",
        "recovery_section": "",
        "audience_scope_section": "",
        "prior_breach_section": "",
        "infra_summary_section": ""
    }

    # Compliance Standards
    compliance = user_input.get("compliance_standards", [])
    notes = []
    if "HIPAA" in compliance:
        notes.append("HIPAA requires reporting of health data breaches within 72 hours to relevant health authorities.")
    if "GDPR" in compliance:
        notes.append("GDPR mandates notification to the Data Protection Authority within 72 hours of breach discovery.")
    if "PCI-DSS" in compliance:
        notes.append("PCI-DSS requires immediate notification to card brands and banks in case of cardholder data breaches.")
    if "ISO 27001" in compliance:
        notes.append("ISO 27001 provides a framework for managing information security risks during incident handling.")
    if "Other" in compliance:
        notes.append("The organization adheres to additional industry-specific regulations.")
    dynamic["compliance_section"] = " ".join(notes)

    # CSIRT Structure
    size = user_input.get("company_size", "").lower()
    team_members = int(user_input.get("internal_team_count", 0))
    if size in ["micro", "small"]:
        if team_members == 0:
            dynamic["csirt_section"] = "A lightweight CSIRT is coordinated with third-party MSSP support due to limited internal resources."
        else:
            dynamic["csirt_section"] = f"A lean internal CSIRT with {team_members} members handles incidents, supported by MSSPs as needed."
    else:
        dynamic["csirt_section"] = f"The organization operates a fully staffed internal CSIRT with {team_members} members, ensuring 24/7 response coverage."

    # Cloud Services and Containment
    cloud = user_input.get("cloud_services", [])
    if "AWS" in cloud:
        dynamic["containment_section"] += "AWS-specific containment includes IAM key revocation, EC2 isolation, and CloudTrail log analysis. "
    if "Azure" in cloud:
        dynamic["containment_section"] += "Azure-specific response includes Azure AD lockout, NSG reconfiguration, and Sentinel alerts. "
    if "Google Cloud Platform" in cloud:
        dynamic["containment_section"] += "GCP-specific actions include service account deactivation, audit log review, and firewall rule blocking. "

    # Threat Response
    threats = user_input.get("top_threats", [])
    response_notes = []
    if "Ransomware" in threats:
        response_notes.append("Ransomware strategy includes network isolation, backup restoration, and legal consultation.")
    if "Phishing" in threats:
        response_notes.append("Phishing handling includes credential resets, email gateway tuning, and user awareness refreshers.")
    if "Insider Threat" in threats:
        response_notes.append("Insider threat management includes access reviews, monitoring, and HR/legal escalation.")
    if "Malware" in threats:
        response_notes.append("Malware incidents involve forensic imaging, AV scanning, and endpoint re-imaging.")
    if "Data Breach" in threats:
        response_notes.append("Breach containment requires encryption review, regulator notifications, and public relations coordination.")
    if "Other" in threats:
        response_notes.append("Additional threat-specific response procedures are maintained for unlisted risks.")
    dynamic["threat_response_section"] = " ".join(response_notes)

    # Recovery Strategy
    dynamic["recovery_section"] = f"Recovery efforts will prioritize restoring {user_input.get('critical_systems', 'business-critical systems')} from {user_input.get('backup_system', 'available backups')} within defined RTO/RPO objectives."

    # Infra Summary
    infra_type = user_input.get("infrastructure_type", "")
    endpoints = user_input.get("number_of_endpoints", "")
    dynamic["infra_summary_section"] = f"The infrastructure includes {infra_type.lower()} servers and manages {endpoints} endpoints."

    # Audience
    audience = user_input.get("audience_roles", "IT and Security Teams")
    dynamic["audience_scope_section"] = f"This plan is structured for clear understanding and execution by {audience}."

    # Breach History
    prior_breach = user_input.get("prior_incidents", "")
    if prior_breach:
        dynamic["prior_breach_section"] = f"Historical incidents noted: {prior_breach}"
    else:
        dynamic["prior_breach_section"] = "No prior significant incidents reported."

    return dynamic

# ---------------- PDF Generation Endpoint ----------------
@app.post("/generate-report/")
async def generate_report(request: Request):
    user_input = await request.json()

    # Merge static input with dynamic mappings
    dynamic_sections = generate_dynamic_sections(user_input)
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

    # Render the HTML template
    template = env.get_template("incident_template.html")
    html_content = template.render(final_data)

    # Generate PDF file
    file_id = str(uuid.uuid4())
    file_path = f"generated_reports/{file_id}.pdf"
    HTML(string=html_content).write_pdf(file_path)

    # Return download URL
    return {"download_url": f"http://localhost:8000/download/{file_id}"}

# ---------------- PDF Download Endpoint ----------------
@app.get("/download/{file_id}")
def download_pdf(file_id: str):
    file_path = f"generated_reports/{file_id}.pdf"
    return FileResponse(
        path=file_path,
        filename="incident_response_plan.pdf",
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=incident_response_plan.pdf"}
    )
