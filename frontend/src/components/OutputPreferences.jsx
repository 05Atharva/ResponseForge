/**
 * OutputPreferences Component
 * ============================
 * Question 16 from the questionnaire
 */

import PropTypes from 'prop-types';

function OutputPreferences({ formData, onChange, formatOptions }) {
    return (
        <div className="form-fields">
            {/* Q16: Output Format */}
            <div className="form-group">
                <label htmlFor="outputFormat">
                    Which format would you like the Incident Response document in?
                    <span className="required">*</span>
                </label>
                <div className="format-options">
                    {formatOptions.map((format) => (
                        <label key={format.value} className={`format-card ${formData.outputFormat === format.value ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="outputFormat"
                                value={format.value}
                                checked={formData.outputFormat === format.value}
                                onChange={(e) => onChange('outputFormat', e.target.value)}
                            />
                            <span className="format-icon">
                                {format.value === 'md' ? '📝' : '📄'}
                            </span>
                            <span className="format-label">{format.label}</span>
                            <span className="format-description">
                                {format.value === 'md'
                                    ? 'Rich formatting with headers, tables, and lists'
                                    : 'Plain text format for maximum compatibility'
                                }
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Summary */}
            <div className="form-summary">
                <h3>📋 Ready to Generate</h3>
                <p>
                    Click "Generate Document" below to create your customized NIST SP 800-61
                    compliant Incident Response Plan. You'll be able to preview and download
                    the document on the next screen.
                </p>
            </div>
        </div>
    );
}

OutputPreferences.propTypes = {
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    formatOptions: PropTypes.array.isRequired,
};

export default OutputPreferences;
