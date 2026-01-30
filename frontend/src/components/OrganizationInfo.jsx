/**
 * OrganizationInfo Component
 * ==========================
 * Questions 1-3 from the questionnaire
 */

import PropTypes from 'prop-types';

function OrganizationInfo({ formData, onChange, infrastructureOptions }) {
    return (
        <div className="form-fields">
            {/* Q1: Organization Name */}
            <div className="form-group">
                <label htmlFor="organizationName">
                    What is the name of your organization?
                    <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => onChange('organizationName', e.target.value)}
                    placeholder="Enter organization name"
                    required
                />
            </div>

            {/* Q2: Industry */}
            <div className="form-group">
                <label htmlFor="industry">
                    Which industry does your organization operate in?
                    <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => onChange('industry', e.target.value)}
                    placeholder="e.g., Healthcare, Finance, Technology"
                    required
                />
            </div>

            {/* Q3: Infrastructure Environment */}
            <div className="form-group">
                <label htmlFor="infrastructureEnvironment">
                    What is your primary infrastructure environment?
                    <span className="required">*</span>
                </label>
                <select
                    id="infrastructureEnvironment"
                    value={formData.infrastructureEnvironment}
                    onChange={(e) => onChange('infrastructureEnvironment', e.target.value)}
                    required
                >
                    <option value="">Select an option...</option>
                    {infrastructureOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

OrganizationInfo.propTypes = {
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    infrastructureOptions: PropTypes.array.isRequired,
};

export default OrganizationInfo;
