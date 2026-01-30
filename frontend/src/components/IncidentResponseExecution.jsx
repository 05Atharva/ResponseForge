/**
 * IncidentResponseExecution Component
 * =====================================
 * Questions 13-15 from the questionnaire
 */

import PropTypes from 'prop-types';

function IncidentResponseExecution({ formData, onChange }) {
    return (
        <div className="form-fields">
            {/* Q13: Forensic Evidence */}
            <div className="form-group">
                <label>
                    Does your organization maintain forensic evidence during incidents?
                    <span className="required">*</span>
                </label>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="maintainsForensicEvidence"
                            checked={formData.maintainsForensicEvidence === true}
                            onChange={() => onChange('maintainsForensicEvidence', true)}
                        />
                        <span className="radio-text">Yes</span>
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="maintainsForensicEvidence"
                            checked={formData.maintainsForensicEvidence === false}
                            onChange={() => onChange('maintainsForensicEvidence', false)}
                        />
                        <span className="radio-text">No</span>
                    </label>
                </div>
                <span className="help-text">
                    Forensic evidence preservation is important for legal proceedings and post-incident analysis.
                </span>
            </div>

            {/* Q14: Forensic Evidence Location (Conditional) */}
            {formData.maintainsForensicEvidence === true && (
                <div className="form-group conditional-field">
                    <label htmlFor="forensicEvidenceLocation">
                        Where is forensic evidence stored?
                        <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="forensicEvidenceLocation"
                        value={formData.forensicEvidenceLocation}
                        onChange={(e) => onChange('forensicEvidenceLocation', e.target.value)}
                        placeholder="e.g., Secure evidence locker, Cloud storage bucket, Dedicated forensic server"
                        required
                    />
                    <span className="help-text">
                        Specify the secure location where evidence is preserved with chain of custody.
                    </span>
                </div>
            )}

            {/* Q15: Post-Incident Reviews */}
            <div className="form-group">
                <label>
                    Does your organization conduct post-incident reviews?
                    <span className="required">*</span>
                </label>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="conductPostIncidentReviews"
                            checked={formData.conductPostIncidentReviews === true}
                            onChange={() => onChange('conductPostIncidentReviews', true)}
                        />
                        <span className="radio-text">Yes</span>
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="conductPostIncidentReviews"
                            checked={formData.conductPostIncidentReviews === false}
                            onChange={() => onChange('conductPostIncidentReviews', false)}
                        />
                        <span className="radio-text">No</span>
                    </label>
                </div>
                <span className="help-text">
                    Post-incident reviews (lessons learned) help improve future incident response capabilities.
                </span>
            </div>
        </div>
    );
}

IncidentResponseExecution.propTypes = {
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default IncidentResponseExecution;
