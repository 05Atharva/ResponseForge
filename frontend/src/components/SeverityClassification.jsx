/**
 * SeverityClassification Component
 * =================================
 * Questions 8-9 from the questionnaire
 */

import PropTypes from 'prop-types';

function SeverityClassification({ formData, onChange, onMultiSelect, severityOptions }) {
    return (
        <div className="form-fields">
            {/* Q8: Severity Levels */}
            <div className="form-group">
                <label>
                    What incident severity levels does your organization use?
                    <span className="required">*</span>
                </label>
                <div className="checkbox-group">
                    {severityOptions.map((level) => (
                        <label key={level} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={formData.severityLevels.includes(level)}
                                onChange={(e) => onMultiSelect('severityLevels', level, e.target.checked)}
                            />
                            <span className={`severity-badge severity-${level.toLowerCase()}`}>
                                {level}
                            </span>
                        </label>
                    ))}
                </div>
                <span className="help-text">
                    Select all severity levels that apply to your organization.
                </span>
            </div>

            {/* Q9: Severity Determination */}
            <div className="form-group">
                <label htmlFor="severityDetermination">
                    Briefly describe how severity is determined in your organization.
                    <span className="required">*</span>
                </label>
                <textarea
                    id="severityDetermination"
                    value={formData.severityDetermination}
                    onChange={(e) => onChange('severityDetermination', e.target.value)}
                    placeholder="Describe the criteria used to classify incident severity levels..."
                    rows={5}
                    required
                />
                <span className="help-text">
                    Include factors such as business impact, number of affected systems, data sensitivity, etc.
                </span>
            </div>
        </div>
    );
}

SeverityClassification.propTypes = {
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onMultiSelect: PropTypes.func.isRequired,
    severityOptions: PropTypes.array.isRequired,
};

export default SeverityClassification;
