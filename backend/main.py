from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
import uuid

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Jinja2 Template Setup
env = Environment(loader=FileSystemLoader("templates"))

# Serve static PDFs
app.mount("/static", StaticFiles(directory="generated_reports"), name="static")

@app.post("/generate-report/")
async def generate_report(request: Request):
    data = await request.json()
    template = env.get_template("incident_template.html")
    html_content = template.render(data)

    file_id = str(uuid.uuid4())
    file_path = f"generated_reports/{file_id}.pdf"
    HTML(string=html_content).write_pdf(file_path)

    return {"download_url": f"http://localhost:8000/static/{file_id}.pdf"}
