from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
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
<<<<<<< HEAD
    allow_origins=["http://localhost:3000"],
=======
    allow_origins=[
        "http://localhost:3000",  
        "http://localhost:8000",  # FastAPI server
        "http://127.0.0.1:3000",  # Additional localhost variations
        "http://127.0.0.1:8000"
    ],
>>>>>>> 018a768e3d637baec78cbd1f329a58fdffeebd03
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure generated_reports directory exists
os.makedirs("generated_reports", exist_ok=True)

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
<<<<<<< HEAD
    notes = []
=======
    if isinstance(compliance, str):
        compliance = [compliance]
    
>>>>>>> 018a768e3d637baec78cbd1f329a58fdffeebd03
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
<<<<<<< HEAD
    team_members = int(user_input.get("internal_team_count", 0))
    if size in ["micro", "small"]:
        if team_members == 0:
            dynamic["csirt_section"] = "A lightweight CSIRT is coordinated with third-party MSSP support due to limited internal resources."
        else:
            dynamic["csirt_section"] = f"A lean internal CSIRT with {team_members} members handles incidents, supported by MSSPs as needed."
=======
    if "micro" in size or "small" in size:
        dynamic["csirt_section"] = (
            "The organization maintains a lightweight CSIRT supported by external MSSPs "
            "due to limited internal staffing."
        )
>>>>>>> 018a768e3d637baec78cbd1f329a58fdffeebd03
    else:
        dynamic["csirt_section"] = f"The organization operates a fully staffed internal CSIRT with {team_members} members, ensuring 24/7 response coverage."

    # Cloud Services and Containment
    cloud = user_input.get("cloud_services", [])
    if isinstance(cloud, str):
        cloud = [cloud]
    
    if "AWS" in cloud:
<<<<<<< HEAD
        dynamic["containment_section"] += "AWS-specific containment includes IAM key revocation, EC2 isolation, and CloudTrail log analysis. "
    if "Azure" in cloud:
        dynamic["containment_section"] += "Azure-specific response includes Azure AD lockout, NSG reconfiguration, and Sentinel alerts. "
    if "Google Cloud Platform" in cloud:
        dynamic["containment_section"] += "GCP-specific actions include service account deactivation, audit log review, and firewall rule blocking. "
=======
        dynamic["containment_section"] = (
            "Containment includes revoking IAM roles, disabling access keys, "
            "and isolating affected EC2 instances on AWS."
        )
    elif "Azure" in cloud:
        dynamic["containment_section"] = (
            "Containment involves deactivating Azure AD accounts and isolating affected "
            "resources in the virtual network."
        )
    elif "Google Cloud Platform" in cloud:
        dynamic["containment_section"] = (
            "GCP-specific containment includes disabling service accounts, terminating VMs, "
            "and revoking access tokens."
        )
>>>>>>> 018a768e3d637baec78cbd1f329a58fdffeebd03

    # Threat Response
    threats = user_input.get("top_threats", [])
<<<<<<< HEAD
    response_notes = []
=======
    if isinstance(threats, str):
        threats = [threats]
    
>>>>>>> 018a768e3d637baec78cbd1f329a58fdffeebd03
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
    try:
        user_input = await request.json()

<<<<<<< HEAD
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
=======
        # 1. Apply conditional mapping logic
        dynamic_sections = generate_dynamic_sections(user_input)

        # 2. Merge dynamic + static input 
        final_data = {
            **user_input,
            **dynamic_sections,
            "company_name": user_input.get("company_name", "N/A"),
            "industry_sector": user_input.get("industry_sector", "N/A"),
            "number_of_endpoints": user_input.get("number_of_endpoints", "N/A"),
            "infrastructure_type": user_input.get("server_hosting", "N/A"),
            "edr_siem_used": user_input.get("edr_siem_details", "N/A"),
            "incident_commander": user_input.get("incident_commander", "N/A"),
            "audience_roles": user_input.get("audience_roles", "N/A"),
            "critical_systems": user_input.get("critical_apps", "N/A"),
            "backup_system": user_input.get("backup_system", "N/A"),
            "detection_tools": user_input.get("security_tools", "N/A"),
            "disclosure_time": "Immediate",
            "response_playbooks": "Custom Playbooks Based on Identified Threats"
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
        return {
            "download_url": f"/static/{file_id}.pdf",
            "file_id": file_id
        }
    except Exception as e:
        print(f"Error generating report: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ---------------- PDF Download Endpoint ----------------
@app.get("/download/{file_id}")
async def download_report(file_id: str):
    file_path = f"generated_reports/{file_id}.pdf"
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(
        path=file_path, 
        media_type="application/pdf", 
        filename=f"Incident_Response_Plan_{file_id}.pdf"
    )

# Optional: Cleanup endpoint to remove old files
@app.on_event("startup")
def cleanup_old_reports():
    try:
        for filename in os.listdir("generated_reports"):
            file_path = os.path.join("generated_reports", filename)
            # Remove files older than 1 day
            if os.path.isfile(file_path) and (os.path.getmtime(file_path) < (time.time() - 86400)):
                os.unlink(file_path)
    except Exception as e:
        print(f"Error during cleanup: {e}")
>>>>>>> 018a768e3d637baec78cbd1f329a58fdffeebd03
