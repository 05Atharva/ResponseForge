import React, { useState } from 'react';

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
      // Simulating API call
      console.log("Form data submitted:", formData);
      // In a real app, you would send data to your backend
      // const res = await axios.post("http://localhost:8000/generate-report/", formData);
      // setDownloadUrl(res.data.download_url);
      
      // For demo purposes, set a dummy download URL
      setDownloadUrl("#");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderSelect = (name, label, options, required = false) => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select 
        id={name}
        name={name} 
        onChange={handleChange}
        className="form-select"
        required={required}
      >
        <option value="">-- Select --</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
  
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Incident Response Plan Generator</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Direct Mapping Fields */}
          <div className="form-group">
            <label htmlFor="company_name">Company Name</label>
            <input 
              id="company_name"
              name="company_name" 
              placeholder="Enter your company name" 
              onChange={handleChange} 
              className="form-input"
              required
            />
          </div>
          
          {/* Question 1: Company Size */}
          {renderSelect(
            "company_size",
            "1. What is your company size?",
            ["Micro (1-10)", "Small (11-50)", "Medium (51-250)", "Large (251-1000)", "Enterprise (1000+)"],
            true
          )}
          
          {/* Question 2: Industry Sector */}
          <div className="form-group">
            <label htmlFor="industry_sector">2. What is your industry sector?</label>
            <input 
              id="industry_sector"
              name="industry_sector" 
              placeholder="e.g., Healthcare, Finance, Technology" 
              onChange={handleChange} 
              className="form-input"
              required
            />
          </div>
          
          {/* Question 3: Endpoints */}
          {renderSelect(
            "number_of_endpoints",
            "3. How many endpoints do you manage?",
            ["Less than 10", "10-50", "51-250", "251-1000", "1000+"]
          )}
          
          {/* Question 4: Cloud Services */}
          <div className="form-group">
            <label>4. Do you use cloud services? Which ones?</label>
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="aws"
                  name="cloud_services"
                  value="AWS"
                  onChange={handleChange}
                />
                <label htmlFor="aws">AWS</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="azure"
                  name="cloud_services"
                  value="Azure"
                  onChange={handleChange}
                />
                <label htmlFor="azure">Azure</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="gcp"
                  name="cloud_services"
                  value="Google Cloud Platform"
                  onChange={handleChange}
                />
                <label htmlFor="gcp">Google Cloud Platform</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="other_cloud"
                  name="cloud_services"
                  value="Other"
                  onChange={handleChange}
                />
                <label htmlFor="other_cloud">Other</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="no_cloud"
                  name="cloud_services"
                  value="None"
                  onChange={handleChange}
                />
                <label htmlFor="no_cloud">None</label>
              </div>
            </div>
          </div>
          
          {/* Question 5: Server Hosting */}
          {renderSelect(
            "server_hosting",
            "5. Are your servers hosted on-premise or in the cloud?",
            ["On-premise only", "Cloud only", "Hybrid (both on-premise and cloud)"]
          )}
          
          {/* Question 6: EDR/SIEM */}
          <div className="form-group">
            <label>6. Do you have an EDR or SIEM solution?</label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  id="edr_siem_yes"
                  name="has_edr_siem"
                  value="Yes"
                  onChange={handleChange}
                />
                <label htmlFor="edr_siem_yes">Yes</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  id="edr_siem_no"
                  name="has_edr_siem"
                  value="No"
                  onChange={handleChange}
                />
                <label htmlFor="edr_siem_no">No</label>
              </div>
            </div>
            <div className="conditional-input">
              <input
                name="edr_siem_details"
                placeholder="If yes, please specify which ones"
                onChange={handleChange}
                className="form-input mt-2"
              />
            </div>
          </div>
          
          {/* Question 7: Firewall/IDS/IPS */}
          <div className="form-group">
            <label>7. Do you have a firewall or IDS/IPS in place?</label>
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="firewall"
                  name="security_tools"
                  value="Firewall"
                  onChange={handleChange}
                />
                <label htmlFor="firewall">Firewall</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="ids"
                  name="security_tools"
                  value="IDS"
                  onChange={handleChange}
                />
                <label htmlFor="ids">IDS (Intrusion Detection System)</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="ips"
                  name="security_tools"
                  value="IPS"
                  onChange={handleChange}
                />
                <label htmlFor="ips">IPS (Intrusion Prevention System)</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="none_security"
                  name="security_tools"
                  value="None"
                  onChange={handleChange}
                />
                <label htmlFor="none_security">None</label>
              </div>
            </div>
          </div>
          
          {/* Question 8: Compliance Standards */}
          <div className="form-group">
            <label>8. Which compliance standards do you follow?</label>
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="gdpr"
                  name="compliance_standards"
                  value="GDPR"
                  onChange={handleChange}
                />
                <label htmlFor="gdpr">GDPR</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="hipaa"
                  name="compliance_standards"
                  value="HIPAA"
                  onChange={handleChange}
                />
                <label htmlFor="hipaa">HIPAA</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="pci"
                  name="compliance_standards"
                  value="PCI-DSS"
                  onChange={handleChange}
                />
                <label htmlFor="pci">PCI-DSS</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="iso27001"
                  name="compliance_standards"
                  value="ISO 27001"
                  onChange={handleChange}
                />
                <label htmlFor="iso27001">ISO 27001</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="other_compliance"
                  name="compliance_standards"
                  value="Other"
                  onChange={handleChange}
                />
                <label htmlFor="other_compliance">Other</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="none_compliance"
                  name="compliance_standards"
                  value="None"
                  onChange={handleChange}
                />
                <label htmlFor="none_compliance">None</label>
              </div>
            </div>
          </div>
          
          {/* Question 9: Dedicated IR Team */}
          <div className="form-group">
            <label>9. Do you have a dedicated internal IR/security team?</label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  id="ir_team_yes"
                  name="has_ir_team"
                  value="Yes"
                  onChange={handleChange}
                />
                <label htmlFor="ir_team_yes">Yes</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  id="ir_team_no"
                  name="has_ir_team"
                  value="No"
                  onChange={handleChange}
                />
                <label htmlFor="ir_team_no">No</label>
              </div>
            </div>
            <div className="conditional-input">
              <input
                name="ir_team_size"
                placeholder="If yes, how many team members?"
                onChange={handleChange}
                className="form-input mt-2"
                type="number"
                min="0"
              />
            </div>
          </div>
          
          {/* Question 10: Outsourced Security */}
          <div className="form-group">
            <label>10. Do you outsource any part of your security (MSSP, etc.)?</label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  id="outsource_yes"
                  name="outsources_security"
                  value="Yes"
                  onChange={handleChange}
                />
                <label htmlFor="outsource_yes">Yes</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  id="outsource_no"
                  name="outsources_security"
                  value="No"
                  onChange={handleChange}
                />
                <label htmlFor="outsource_no">No</label>
              </div>
            </div>
            <div className="conditional-input">
              <input
                name="outsource_details"
                placeholder="If yes, what services are outsourced?"
                onChange={handleChange}
                className="form-input mt-2"
              />
            </div>
          </div>
          
          {/* Question 11: Existing IR Plan */}
          <div className="form-group">
            <label>11. Do you currently have an IR plan in place?</label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  id="ir_plan_yes"
                  name="has_ir_plan"
                  value="Yes"
                  onChange={handleChange}
                />
                <label htmlFor="ir_plan_yes">Yes</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  id="ir_plan_no"
                  name="has_ir_plan"
                  value="No"
                  onChange={handleChange}
                />
                <label htmlFor="ir_plan_no">No</label>
              </div>
            </div>
            <div className="conditional-input">
              <input
                name="ir_plan_details"
                placeholder="If yes, when was it last updated?"
                onChange={handleChange}
                className="form-input mt-2"
              />
            </div>
          </div>
          
          {/* Question 12 (listed as 13): Previous Breach */}
          <div className="form-group">
            <label>12. Have you experienced a breach or major incident before?</label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  id="breach_yes"
                  name="had_breach"
                  value="Yes"
                  onChange={handleChange}
                />
                <label htmlFor="breach_yes">Yes</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  id="breach_no"
                  name="had_breach"
                  value="No"
                  onChange={handleChange}
                />
                <label htmlFor="breach_no">No</label>
              </div>
            </div>
            <div className="conditional-input">
              <textarea
                name="breach_details"
                placeholder="If yes, please provide brief details"
                onChange={handleChange}
                className="form-textarea mt-2"
                rows="2"
              />
            </div>
          </div>
          
          {/* Question 13 (listed as 14): Top Threats */}
          <div className="form-group">
            <label>13. What are the top cyber threats you're most concerned about?</label>
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="ransomware"
                  name="top_threats"
                  value="Ransomware"
                  onChange={handleChange}
                />
                <label htmlFor="ransomware">Ransomware</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="phishing"
                  name="top_threats"
                  value="Phishing"
                  onChange={handleChange}
                />
                <label htmlFor="phishing">Phishing</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="ddos"
                  name="top_threats"
                  value="DDoS"
                  onChange={handleChange}
                />
                <label htmlFor="ddos">DDoS</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="insider"
                  name="top_threats"
                  value="Insider Threat"
                  onChange={handleChange}
                />
                <label htmlFor="insider">Insider Threat</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="malware"
                  name="top_threats"
                  value="Malware"
                  onChange={handleChange}
                />
                <label htmlFor="malware">Malware</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="data_breach"
                  name="top_threats"
                  value="Data Breach"
                  onChange={handleChange}
                />
                <label htmlFor="data_breach">Data Breach</label>
              </div>
            </div>
            <div className="conditional-input">
              <input
                name="other_threats"
                placeholder="Other threats (please specify)"
                onChange={handleChange}
                className="form-input mt-2"
              />
            </div>
          </div>
          
          {/* Additional Direct Mapping Fields */}
          <div className="form-group">
            <label htmlFor="incident_commander">Incident Commander</label>
            <input 
              id="incident_commander"
              name="incident_commander" 
              placeholder="Name and title of incident commander" 
              onChange={handleChange} 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="audience_roles">Audience Roles</label>
            <input 
              id="audience_roles"
              name="audience_roles" 
              placeholder="Who will use this plan? (e.g., IT, Management, Legal)" 
              onChange={handleChange} 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="backup_system">Backup System</label>
            <input 
              id="backup_system"
              name="backup_system" 
              placeholder="What backup solutions do you use?" 
              onChange={handleChange} 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="critical_apps">Critical Systems</label>
            <textarea 
              id="critical_apps"
              name="critical_apps" 
              placeholder="List your business-critical systems and applications" 
              onChange={handleChange} 
              className="form-textarea"
              rows="3"
            />
          </div>
          
          <button type="submit" className="submit-btn">Generate Incident Response Plan</button>
        </form>
        
        {downloadUrl && (
          <div className="download-section">
            <h4 className="text-green-600 font-bold mt-6">✅ Report Ready:</h4>
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

        <style jsx>{`
          .form-group {
            margin-bottom: 1rem;
          }
          
          label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
          }
          
          .form-input, .form-select, .form-textarea {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 0.25rem;
            font-size: 1rem;
          }
          
          .form-textarea {
            min-height: 80px;
          }
          
          .checkbox-group, .radio-group {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem 1.5rem;
            margin-top: 0.5rem;
          }
          
          .checkbox-item, .radio-item {
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }
          
          .submit-btn {
            display: block;
            width: 100%;
            padding: 0.75rem;
            margin-top: 1.5rem;
            background-color: #4a90e2;
            color: white;
            font-weight: bold;
            border: none;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          
          .submit-btn:hover {
            background-color: #3a80d2;
          }
          
          .download-link {
            display: inline-block;
            margin-top: 0.5rem;
            padding: 0.5rem 1rem;
            background-color: #4caf50;
            color: white;
            text-decoration: none;
            border-radius: 0.25rem;
            font-weight: 500;
          }
          
          .download-link:hover {
            background-color: #45a049;
          }
        `}</style>
      </div>
    </div>
  );
}