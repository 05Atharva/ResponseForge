/**
 * DocumentPreview Component
 * ==========================
 * Preview and download the generated IR document
 */

import { useState } from 'react';
import PropTypes from 'prop-types';

function DocumentPreview({ document, filename, onDownload, onReset }) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    if (!document) {
        return (
            <div className="preview-empty">
                <p>No document generated yet. Please complete the questionnaire.</p>
            </div>
        );
    }

    const handleDownloadClick = () => {
        setShowConfirmation(true);
    };

    const confirmDownload = () => {
        setShowConfirmation(false);
        onDownload();
    };

    return (
        <div className="document-preview">
            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>Confirm Information</h3>
                        <p>Please confirm that the information provided is correct and that you will use this document for legal purposes only.</p>
                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setShowConfirmation(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={confirmDownload}>I Confirm & Download</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Message */}
            <div className="success-message">
                <span className="success-icon">✅</span>
                <h3>Document Generated Successfully!</h3>
                <p>Your NIST SP 800-61 compliant Incident Response Plan is ready.</p>
            </div>

            {/* Filename */}
            <div className="filename-display">
                <span className="file-icon">📄</span>
                <code>{filename}</code>
            </div>

            {/* Action Buttons */}
            <div className="preview-actions">
                <button className="btn btn-primary btn-large" onClick={handleDownloadClick}>
                    ⬇️ Download Document
                </button>
                <button className="btn btn-secondary" onClick={onReset}>
                    🔄 Create New Document
                </button>
            </div>

            {/* Document Preview */}
            <div className="preview-container">
                <h4>Document Preview</h4>
                <div className="preview-content">
                    <pre>{document}</pre>
                </div>
            </div>

            {/* Notes */}
            <div className="preview-notes">
                <h4>📌 Important Notes</h4>
                <ul>
                    <li>Review the document carefully before distributing</li>
                    <li>Ensure all contact information is accurate</li>
                    <li>Update the document regularly as your organization changes</li>
                    <li>Store the document securely and control access</li>
                    <li>Consider integrating with your incident management tools</li>
                </ul>
            </div>
        </div>
    );
}

DocumentPreview.propTypes = {
    document: PropTypes.string,
    filename: PropTypes.string,
    onDownload: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
};

export default DocumentPreview;
