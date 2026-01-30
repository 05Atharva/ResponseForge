/**
 * ResponseForge Main Application
 * ===============================
 * NIST SP 800-61 Compliant IR Template Generator
 */

import { useState, useEffect } from 'react';
import './App.css';
import { generateIRTemplate, getTemplateOptions, downloadDocument } from './services/apiService';

// Form section components
import OrganizationInfo from './components/OrganizationInfo';
import SecurityTeamStructure from './components/SecurityTeamStructure';
import SeverityClassification from './components/SeverityClassification';
import EscalationCommunication from './components/EscalationCommunication';
import IncidentResponseExecution from './components/IncidentResponseExecution';
import OutputPreferences from './components/OutputPreferences';
import DocumentPreview from './components/DocumentPreview';
import FormNavigation from './components/FormNavigation';

// =============================================================================
// Initial Form State
// =============================================================================

const initialFormState = {
  // Section 4.1: Organization Information
  organizationName: '',
  industry: '',
  infrastructureEnvironment: '',

  // Section 4.2: Security Team Structure
  incidentCommander: '',
  socAnalysts: '',
  cloudRemediationOwner: '',
  legalComplianceOwner: '',

  // Section 4.3: Incident Severity Classification
  severityLevels: [],
  severityDetermination: '',

  // Section 4.4: Escalation & Communication
  escalationMatrix: '',
  communicationChannels: [],
  criticalIncidentNotifications: '',

  // Section 4.5: Incident Response Execution
  maintainsForensicEvidence: null,
  forensicEvidenceLocation: '',
  conductPostIncidentReviews: null,

  // Section 4.6: Output Preferences
  outputFormat: 'md',
};

// Section titles and order
const sections = [
  { id: 'organization', title: 'Organization Information', icon: '🏢' },
  { id: 'team', title: 'Security Team Structure', icon: '👥' },
  { id: 'severity', title: 'Incident Severity', icon: '⚠️' },
  { id: 'escalation', title: 'Escalation & Communication', icon: '📢' },
  { id: 'execution', title: 'Response Execution', icon: '🔧' },
  { id: 'output', title: 'Output Preferences', icon: '📄' },
  { id: 'preview', title: 'Preview & Download', icon: '✅' },
];

// =============================================================================
// Main App Component
// =============================================================================

function App() {
  // Form state
  const [formData, setFormData] = useState(initialFormState);
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Options for dropdowns
  const [options, setOptions] = useState({
    infrastructureOptions: ['AWS', 'Azure', 'GCP', 'On-Premises'],
    severityLevels: ['Low', 'Medium', 'High', 'Critical'],
    communicationChannels: ['Email', 'Phone', 'Slack', 'Microsoft Teams', 'Other'],
    outputFormats: [
      { value: 'md', label: 'Markdown (.md)' },
      { value: 'txt', label: 'Text (.txt)' },
    ],
  });

  // Generated document state
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const [generatedFilename, setGeneratedFilename] = useState('');

  // Fetch options on mount
  useEffect(() => {
    const fetchOptions = async () => {
      const opts = await getTemplateOptions();
      setOptions(opts);
    };
    fetchOptions();
  }, []);

  // ---------------------------------------------------------------------------
  // Form Handlers
  // ---------------------------------------------------------------------------

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleMultiSelectChange = (field, value, isChecked) => {
    setFormData(prev => {
      const currentValues = prev[field] || [];
      if (isChecked) {
        return { ...prev, [field]: [...currentValues, value] };
      } else {
        return { ...prev, [field]: currentValues.filter(v => v !== value) };
      }
    });
  };

  // ---------------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------------

  const validateSection = (sectionIndex) => {
    const sectionErrors = [];

    switch (sectionIndex) {
      case 0: // Organization Info
        if (!formData.organizationName.trim()) sectionErrors.push('Organization name is required');
        if (!formData.industry.trim()) sectionErrors.push('Industry is required');
        if (!formData.infrastructureEnvironment) sectionErrors.push('Infrastructure environment is required');
        break;
      case 1: // Security Team
        if (!formData.incidentCommander.trim()) sectionErrors.push('Incident Commander is required');
        if (!formData.socAnalysts.trim()) sectionErrors.push('SOC Analysts information is required');
        if (!formData.cloudRemediationOwner.trim()) sectionErrors.push('Cloud/Infrastructure Remediation Owner is required');
        if (!formData.legalComplianceOwner.trim()) sectionErrors.push('Legal/Compliance Owner is required');
        break;
      case 2: // Severity
        if (formData.severityLevels.length === 0) sectionErrors.push('At least one severity level must be selected');
        if (!formData.severityDetermination.trim()) sectionErrors.push('Severity determination criteria is required');
        break;
      case 3: // Escalation
        if (!formData.escalationMatrix.trim()) sectionErrors.push('Escalation matrix is required');
        if (formData.communicationChannels.length === 0) sectionErrors.push('At least one communication channel must be selected');
        if (!formData.criticalIncidentNotifications.trim()) sectionErrors.push('Critical incident notification list is required');
        break;
      case 4: // Execution
        if (formData.maintainsForensicEvidence === null) sectionErrors.push('Please indicate if forensic evidence is maintained');
        if (formData.maintainsForensicEvidence && !formData.forensicEvidenceLocation.trim()) {
          sectionErrors.push('Forensic evidence location is required');
        }
        if (formData.conductPostIncidentReviews === null) sectionErrors.push('Please indicate if post-incident reviews are conducted');
        break;
      case 5: // Output
        if (!formData.outputFormat) sectionErrors.push('Output format is required');
        break;
      default:
        break;
    }

    return sectionErrors;
  };

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------

  const handleNext = () => {
    const sectionErrors = validateSection(currentSection);
    if (sectionErrors.length > 0) {
      setErrors(sectionErrors);
      return;
    }
    setErrors([]);
    setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
  };

  const handlePrevious = () => {
    setErrors([]);
    setCurrentSection(prev => Math.max(prev - 1, 0));
  };

  const handleSectionClick = (index) => {
    // Only allow going back or to the current section
    if (index <= currentSection) {
      setCurrentSection(index);
      setErrors([]);
    }
  };

  // ---------------------------------------------------------------------------
  // Submit
  // ---------------------------------------------------------------------------

  const handleSubmit = async () => {
    // Validate all sections
    let allErrors = [];
    for (let i = 0; i < 6; i++) {
      allErrors = [...allErrors, ...validateSection(i)];
    }

    if (allErrors.length > 0) {
      setErrors(allErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    const result = await generateIRTemplate(formData);

    setIsSubmitting(false);

    if (result.success) {
      setGeneratedDocument(result.document);
      setGeneratedFilename(result.filename);
      setCurrentSection(6); // Move to preview
    } else {
      setErrors(result.errors || ['Failed to generate document']);
    }
  };

  const handleDownload = () => {
    if (generatedDocument && generatedFilename) {
      downloadDocument(generatedDocument, generatedFilename);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setCurrentSection(0);
    setErrors([]);
    setGeneratedDocument(null);
    setGeneratedFilename('');
  };

  // ---------------------------------------------------------------------------
  // Render Section Content
  // ---------------------------------------------------------------------------

  const renderSectionContent = () => {
    switch (currentSection) {
      case 0:
        return (
          <OrganizationInfo
            formData={formData}
            onChange={handleInputChange}
            infrastructureOptions={options.infrastructureOptions}
          />
        );
      case 1:
        return (
          <SecurityTeamStructure
            formData={formData}
            onChange={handleInputChange}
          />
        );
      case 2:
        return (
          <SeverityClassification
            formData={formData}
            onChange={handleInputChange}
            onMultiSelect={handleMultiSelectChange}
            severityOptions={options.severityLevels}
          />
        );
      case 3:
        return (
          <EscalationCommunication
            formData={formData}
            onChange={handleInputChange}
            onMultiSelect={handleMultiSelectChange}
            channelOptions={options.communicationChannels}
          />
        );
      case 4:
        return (
          <IncidentResponseExecution
            formData={formData}
            onChange={handleInputChange}
          />
        );
      case 5:
        return (
          <OutputPreferences
            formData={formData}
            onChange={handleInputChange}
            formatOptions={options.outputFormats}
          />
        );
      case 6:
        return (
          <DocumentPreview
            document={generatedDocument}
            filename={generatedFilename}
            onDownload={handleDownload}
            onReset={handleReset}
          />
        );
      default:
        return null;
    }
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>🛡️ ResponseForge</h1>
          <p>NIST SP 800-61 Compliant Incident Response Plan Generator</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Progress Indicator */}
        <div className="progress-container">
          <div className="progress-steps">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`progress-step ${index === currentSection ? 'active' : ''} ${index < currentSection ? 'completed' : ''}`}
                onClick={() => handleSectionClick(index)}
              >
                <span className="step-icon">{section.icon}</span>
                <span className="step-title">{section.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="form-container">
          <div className="form-section">
            <h2>{sections[currentSection].icon} {sections[currentSection].title}</h2>

            {/* Error Display */}
            {errors.length > 0 && (
              <div className="error-container">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section Content */}
            {renderSectionContent()}
          </div>

          {/* Navigation */}
          {currentSection < 6 && (
            <FormNavigation
              currentSection={currentSection}
              totalSections={sections.length - 1}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>ResponseForge • Based on NIST SP 800-61 Rev. 2</p>
      </footer>
    </div>
  );
}

export default App;
