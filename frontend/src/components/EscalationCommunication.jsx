/**
 * EscalationCommunication Component
 * ==================================
 * Questions 10-12 from the questionnaire
 */

import PropTypes from 'prop-types';

function EscalationCommunication({ formData, onChange, onMultiSelect, channelOptions }) {
    return (
        <div className="form-fields">
            {/* Q10: Escalation Matrix */}
            <div className="form-group">
                <label htmlFor="escalationMatrix">
                    What is the escalation matrix for security incidents?
                    <span className="required">*</span>
                </label>
                <textarea
                    id="escalationMatrix"
                    value={formData.escalationMatrix}
                    onChange={(e) => onChange('escalationMatrix', e.target.value)}
                    placeholder="Describe the escalation path for different severity levels...

Example:
- P1 (Critical): Notify CISO within 15 min, CEO within 30 min
- P2 (High): Notify Security Lead within 1 hour
- P3 (Medium): Notify SOC Manager within 4 hours
- P4 (Low): Document and review in weekly meeting"
                    rows={6}
                    required
                />
            </div>

            {/* Q11: Communication Channels */}
            <div className="form-group">
                <label>
                    Which communication channels are used during incidents?
                    <span className="required">*</span>
                </label>
                <div className="checkbox-group channels">
                    {channelOptions.map((channel) => (
                        <label key={channel} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={formData.communicationChannels.includes(channel)}
                                onChange={(e) => onMultiSelect('communicationChannels', channel, e.target.checked)}
                            />
                            <span className="channel-icon">
                                {channel === 'Email' && '📧'}
                                {channel === 'Phone' && '📞'}
                                {channel === 'Slack' && '💬'}
                                {channel === 'Microsoft Teams' && '📱'}
                                {channel === 'Other' && '📋'}
                            </span>
                            {channel}
                        </label>
                    ))}
                </div>
            </div>

            {/* Q12: Critical Incident Notifications */}
            <div className="form-group">
                <label htmlFor="criticalIncidentNotifications">
                    Who must be notified during a critical security incident?
                    <span className="required">*</span>
                </label>
                <textarea
                    id="criticalIncidentNotifications"
                    value={formData.criticalIncidentNotifications}
                    onChange={(e) => onChange('criticalIncidentNotifications', e.target.value)}
                    placeholder="List personnel, roles, or groups that must be notified...

Example:
- Chief Information Security Officer (CISO)
- Chief Information Officer (CIO)
- Legal Counsel
- Public Relations
- Board of Directors (for major incidents)"
                    rows={5}
                    required
                />
            </div>
        </div>
    );
}

EscalationCommunication.propTypes = {
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onMultiSelect: PropTypes.func.isRequired,
    channelOptions: PropTypes.array.isRequired,
};

export default EscalationCommunication;
