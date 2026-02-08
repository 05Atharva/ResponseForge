# ResponseForge - Sample Data & Section Mapping Guide

## 🎯 Sample Answers for All Questions

Use the following sample data to test PDF generation:

---

### Section 1: Organization Information

| Question | Sample Answer |
|----------|---------------|
| **Organization Name** | AeroVajra Cybersecurity Solutions Pvt. Ltd. |
| **Organization Logo** | *(Optional - skip or use any PNG image)* |
| **Industry** | Information Technology & Security Services |
| **Infrastructure Environment** | AWS, Azure *(select multiple)* |

---

### Section 2: Security Team Structure

| Question | Sample Answer |
|----------|---------------|
| **Incident Commander** | Sarang Shigwan (CISO) - sarang.shigwan@aerovajra.com - +91 98765 43210 |
| **SOC Analysts** | Atharva Kanawade (Senior SOC Analyst) - atharva.k@aerovajra.com - +91 98765 11111<br>Aryan Suryawanshi (SOC Analyst L2) - aryan.s@aerovajra.com - +91 98765 22222<br>Aarav Thigale (SOC Analyst L1) - aarav.t@aerovajra.com - +91 98765 33333 |
| **Cloud/Infrastructure Remediation Owner** | Aditya Shinde (Cloud Security Engineer) - aditya.shinde@aerovajra.com - +91 98765 44444 |
| **Legal/Compliance Owner** | Sarang Shigwan (DPO & Compliance Lead) - legal@aerovajra.com - +91 98765 55555 |

---

### Section 3: Incident Severity Classification

| Question | Sample Answer |
|----------|---------------|
| **Severity Levels** | Critical, High, Medium, Low *(select all four)* |
| **Severity Determination Criteria** | Severity is determined based on the following factors:<br>1. Number of affected users/systems<br>2. Impact on business operations<br>3. Data sensitivity involved<br>4. Regulatory implications<br>5. Reputational risk<br><br>Critical: Data breach affecting >1000 users, ransomware, or complete system outage<br>High: Unauthorized access to sensitive data, partial system outage<br>Medium: Malware on individual systems, policy violations<br>Low: Suspicious activity requiring investigation, failed attacks |

---

### Section 4: Escalation & Communication

| Question | Sample Answer |
|----------|---------------|
| **Escalation Matrix** | Level 1 (0-30 min): SOC Analysts - Aarav Thigale, Aryan Suryawanshi<br>Level 2 (30 min-2 hrs): Senior SOC - Atharva Kanawade<br>Level 3 (2+ hrs): Incident Commander - Sarang Shigwan<br>Level 4 (Critical): CISO + Legal - Sarang Shigwan, Aditya Shinde<br>Level 5 (Executive): CEO + Board notification required |
| **Communication Channels** | Slack, Microsoft Teams, Phone *(select all three)* |
| **Critical Incident Notifications** | 1. Sarang Shigwan (CISO) - +91 98765 43210 - sarang.shigwan@aerovajra.com<br>2. Atharva Kanawade (SOC Lead) - +91 98765 11111 - atharva.k@aerovajra.com<br>3. Aditya Shinde (Infra Lead) - +91 98765 44444 - aditya.shinde@aerovajra.com<br>4. External Legal Counsel - +91 22 1234 5678 - legal@lawfirm.com<br>5. Cyber Insurance Provider - 1800-123-4567 - claims@cyberinsurance.com |

---

### Section 5: Incident Response Execution

| Question | Sample Answer |
|----------|---------------|
| **Does the organization maintain forensic evidence?** | Yes |
| **Evidence Storage Location** | AWS S3 Bucket (s3://aerovajra-forensics-vault) with versioning enabled, cross-region replication to Mumbai (ap-south-1) and Singapore (ap-southeast-1). Physical evidence stored in secure server room at HQ with biometric access. Chain of custody maintained via Jira Service Management. |
| **Does the organization conduct post-incident reviews?** | Yes |

---

### Section 6: Output Preferences

| Question | Sample Answer |
|----------|---------------|
| **Output Format** | PDF *(recommended for complete testing)* |

---

## 📍 Question-to-Section Mapping

### Single Section Impact (Questions affecting ONE section)

| Question | PDF Section Affected |
|----------|---------------------|
| Infrastructure Environment | **1.4** Infrastructure Environment |
| SOC Analysts | **2.3.5** SOC Analysts |
| Cloud/Infrastructure Remediation Owner | **2.3.6** Infrastructure & Cloud Remediation |
| Legal/Compliance Owner | **2.3.7** Legal & Compliance Coordination |
| Severity Determination Criteria | **3.2.4** Incident Prioritization (sub-text) |
| Escalation Matrix | **3.2.5** Incident Notification |
| Communication Channels | **3.2.5** Incident Notification |
| Critical Incident Notifications | **3.2.5** Incident Notification |
| Forensic Evidence (Yes/No) | **3.3.2** Evidence Gathering and Handling |
| Evidence Storage Location | **3.3.2** Evidence Gathering and Handling |
| Post-Incident Reviews (Yes/No) | **3.4.1** Lessons Learned |
| Output Format | *(Controls output only, not in PDF content)* |

---

### Multiple Section Impact (Questions affecting MORE than one section)

| Question | PDF Sections Affected | Count |
|----------|----------------------|-------|
| **Organization Name** | Title Page, Document Info, Section Headers (2.3.4, 3.2.4, 3.3.2, 3.4.1) | **6+ sections** |
| **Industry** | Title Page, Document Info | **2 sections** |
| **Incident Commander** | **2.3.4** Team Leadership | **1 section** |
| **Severity Levels** | **3.2.4** Incident Prioritization (Table rows) | **1 section** |

---

## 📊 Summary Statistics

| Category | Count |
|----------|-------|
| **Total Form Questions** | 14 questions |
| **Questions affecting single section** | 11 questions |
| **Questions affecting multiple sections** | 3 questions (Organization Name, Industry, Severity Levels - though severity really just populates table rows) |
| **Most impactful question** | **Organization Name** - appears in Title Page, Document Info, Page Headers, and multiple section contexts |

---

## 🔄 Visual Section Flow

```
Form Section              →    PDF Section(s)
═══════════════════════════════════════════════════════════════
Organization Info         →    Title Page, Document Info, Headers
├── Organization Name     →    Title, Doc Info, 2.3.4, 3.2.4, 3.3.2, 3.4.1
├── Industry              →    Title Page, Doc Info
└── Infrastructure        →    Section 1.4

Security Team             →    Section 2.3 (Incident Response Team Structure)
├── Incident Commander    →    2.3.4 Team Leadership
├── SOC Analysts          →    2.3.5 SOC Analysts
├── Cloud Remediation     →    2.3.6 Infrastructure & Cloud Remediation
└── Legal/Compliance      →    2.3.7 Legal & Compliance Coordination

Severity Classification   →    Section 3.2.4 (Incident Prioritization)
├── Severity Levels       →    3.2.4 Priority Table
└── Determination         →    3.2.4 Criteria Text

Escalation & Comm         →    Section 3.2.5 (Incident Notification)
├── Escalation Matrix     →    3.2.5 Escalation Text
├── Comm Channels         →    3.2.5 Channels List
└── Critical Notifs       →    3.2.5 Notification List

Response Execution        →    Section 3.3 & 3.4
├── Forensic Evidence     →    3.3.2 Evidence Gathering
├── Evidence Location     →    3.3.2 Evidence Location
└── Post-Incident Reviews →    3.4.1 Lessons Learned
```

---

## 📝 Copy-Paste Ready JSON (For API Testing)

```json
{
  "organizationName": "AeroVajra Cybersecurity Solutions Pvt. Ltd.",
  "industry": "Information Technology & Security Services",
  "infrastructureEnvironment": "AWS, Azure",
  "incidentCommander": "Sarang Shigwan (CISO) - sarang.shigwan@aerovajra.com - +91 98765 43210",
  "socAnalysts": "Atharva Kanawade (Senior SOC Analyst) - atharva.k@aerovajra.com\nAryan Suryawanshi (SOC Analyst L2) - aryan.s@aerovajra.com\nAarav Thigale (SOC Analyst L1) - aarav.t@aerovajra.com",
  "cloudRemediationOwner": "Aditya Shinde (Cloud Security Engineer) - aditya.shinde@aerovajra.com",
  "legalComplianceOwner": "Sarang Shigwan (DPO & Compliance Lead) - legal@aerovajra.com",
  "severityLevels": ["Critical", "High", "Medium", "Low"],
  "severityDetermination": "Critical: Data breach affecting >1000 users, ransomware, or complete system outage\nHigh: Unauthorized access to sensitive data, partial system outage\nMedium: Malware on individual systems, policy violations\nLow: Suspicious activity requiring investigation",
  "escalationMatrix": "Level 1: SOC Analysts (0-30 min)\nLevel 2: Senior SOC Lead (30 min-2 hrs)\nLevel 3: Incident Commander (2+ hrs)\nLevel 4: CISO + Legal (Critical)\nLevel 5: CEO + Board (Executive)",
  "communicationChannels": ["Slack", "Microsoft Teams", "Phone"],
  "criticalIncidentNotifications": "1. Sarang Shigwan (CISO) - +91 98765 43210\n2. Atharva Kanawade (SOC Lead) - +91 98765 11111\n3. Aditya Shinde (Infra Lead) - +91 98765 44444",
  "maintainsForensicEvidence": true,
  "forensicEvidenceLocation": "AWS S3 Bucket (s3://aerovajra-forensics-vault) with versioning enabled",
  "conductPostIncidentReviews": true,
  "outputFormat": "pdf"
}
```
