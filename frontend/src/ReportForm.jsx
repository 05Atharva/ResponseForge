import React, { useState } from 'react';
import axios from 'axios';
import './ReportForm.css'; // Assuming you'll have a separate CSS file

export default function ReportForm() {
  const [formData, setFormData] = useState({});
  const [downloadUrl, setDownloadUrl] = useState(null);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const prev = formData[name] || [];
      const updated = checked
        ? [...prev, value]
        : prev.filter(v => v !== value);
      setFormData({ ...formData, [name]: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/generate-report/", formData);
      setDownloadUrl(res.data.download_url);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <div className="form-container">
      <h2>Incident Response Form</h2>
      <form onSubmit={handleSubmit} className="ir-form">
        <input 
          name="company_name" 
          placeholder="Company Name" 
          onChange={handleChange} 
          className="form-input"
        />
        <input 
          name="industry_sector" 
          placeholder="Industry Sector" 
          onChange={handleChange} 
          className="form-input"
        />
        <input 
          name="compliance_standards" 
          placeholder="Compliance Standards" 
          onChange={handleChange} 
          className="form-input"
        />
        <input 
          name="csirt_model" 
          placeholder="CSIRT Model" 
          onChange={handleChange} 
          className="form-input"
        />
        <input 
          name="incident_commander" 
          placeholder="Incident Commander" 
          onChange={handleChange} 
          className="form-input"
        />
        <input 
          name="audience_roles" 
          placeholder="Audience Roles" 
          onChange={handleChange} 
          className="form-input"
        />
        <input 
          name="number_of_endpoints" 
          placeholder="Number of Endpoints" 
          onChange={handleChange} 
          className="form-input"
        />
        <input 
          name="infrastructure_type" 
          placeholder="Infrastructure Type" 
          onChange={handleChange} 
          className="form-input"
        />
        <input 
          name="containment_strategies" 
          placeholder="Containment Strategies" 
          onChange={handleChange} 
          className="form-input"
        />
        <input 
          name="critical_apps" 
          placeholder="Critical Systems" 
          onChange={handleChange} 
          className="form-input"
        />
        <input 
          name="backup_system" 
          placeholder="Backup System" 
          onChange={handleChange} 
          className="form-input"
        />
        <input 
          name="edr_siem_used" 
          placeholder="EDR/SIEM Used" 
          onChange={handleChange} 
          className="form-input"
        />
        <input 
          name="detection_tools" 
          placeholder="Detection Tools" 
          onChange={handleChange} 
          className="form-input"
        />
        <input 
          name="disclosure_time" 
          placeholder="Disclosure Time" 
          onChange={handleChange} 
          className="form-input"
        />
        <input 
          name="top_threats" 
          placeholder="Top Threats" 
          onChange={handleChange} 
          className="form-input"
        />
        <input 
          name="response_playbooks" 
          placeholder="Response Playbooks" 
          onChange={handleChange} 
          className="form-input"
        />
        <button type="submit" className="submit-btn">Generate Report</button>
      </form>
      {downloadUrl && (
        <div className="download-section">
          <h4>✅ Report Ready:</h4>
          <a 
            href={downloadUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="download-link"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}