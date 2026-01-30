/**
 * SecurityTeamStructure Component
 * ================================
 * Questions 4-7 from the questionnaire
 */

import PropTypes from 'prop-types';

function SecurityTeamStructure({ formData, onChange }) {
    return (
        <div className="form-fields">
            {/* Q4: Incident Commander */}
            <div className="form-group">
                <label htmlFor="incidentCommander">
                    Who is the Incident Commander for security incidents?
                    <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="incidentCommander"
                    value={formData.incidentCommander}
                    onChange={(e) => onChange('incidentCommander', e.target.value)}
                    placeholder="Name and/or title"
                    required
                />
                <span className="help-text">
                    The person responsible for overall coordination during security incidents.
                </span>
            </div>

            {/* Q5: SOC Analysts */}
            <div className="form-group">
                <label htmlFor="socAnalysts">
                    Who are the SOC Analysts involved in incident response?
                    <span className="required">*</span>
                </label>
                <textarea
                    id="socAnalysts"
                    value={formData.socAnalysts}
                    onChange={(e) => onChange('socAnalysts', e.target.value)}
                    placeholder="List names, roles, and/or contact information..."
                    rows={4}
                    required
                />
                <span className="help-text">
                    Include all personnel responsible for security monitoring and initial incident analysis.
                </span>
            </div>

            {/* Q6: Cloud/Infrastructure Remediation Owner */}
            <div className="form-group">
                <label htmlFor="cloudRemediationOwner">
                    Who is responsible for cloud or infrastructure remediation?
                    <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="cloudRemediationOwner"
                    value={formData.cloudRemediationOwner}
                    onChange={(e) => onChange('cloudRemediationOwner', e.target.value)}
                    placeholder="Name and/or title"
                    required
                />
                <span className="help-text">
                    The person who implements containment and recovery at the infrastructure level.
                </span>
            </div>

            {/* Q7: Legal/Compliance Owner */}
            <div className="form-group">
                <label htmlFor="legalComplianceOwner">
                    Who handles legal, compliance, or regulatory coordination?
                    <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="legalComplianceOwner"
                    value={formData.legalComplianceOwner}
                    onChange={(e) => onChange('legalComplianceOwner', e.target.value)}
                    placeholder="Name and/or title"
                    required
                />
                <span className="help-text">
                    The person responsible for legal implications and regulatory notifications.
                </span>
            </div>
        </div>
    );
}

SecurityTeamStructure.propTypes = {
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SecurityTeamStructure;
