/**
 * OutputPreferences Component
 * ============================
 * Question 16 from the questionnaire
 */

import PropTypes from 'prop-types';

function OutputPreferences({ formData, onChange }) {
    return (
        <div className="form-fields">
            {/* Hidden input to maintain PDF format */}
            <input type="hidden" value="pdf" />

            {/* PDF Format Display */}
            <div className="form-group">
                <label>Output Format</label>
                <div className="format-options">
                    <label className="format-card selected">
                        <span className="format-icon">📄</span>
                        <span className="format-label">PDF Document</span>
                        <span className="format-description">
                            Professional PDF with headers, footers, and formatted tables
                        </span>
                    </label>
                </div>
            </div>

            {/* Summary */}
            <div className="form-summary">
                <h3>📋 Ready to Generate</h3>
                <p>
                    Click "Generate Document" below to create your customized NIST SP 800-61
                    compliant Incident Response Plan. Your professional PDF document will
                    include a title page, table of contents, and all your organization-specific details.
                </p>
            </div>
        </div>
    );
}

OutputPreferences.propTypes = {
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default OutputPreferences;

