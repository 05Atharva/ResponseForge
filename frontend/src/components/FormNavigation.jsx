/**
 * FormNavigation Component
 * =========================
 * Navigation buttons for the multi-step form
 */

import PropTypes from 'prop-types';

function FormNavigation({ currentSection, totalSections, onPrevious, onNext, onSubmit, isSubmitting }) {
    const isLastSection = currentSection === totalSections - 1;
    const isFirstSection = currentSection === 0;

    return (
        <div className="form-navigation">
            {/* Previous Button */}
            <button
                type="button"
                className="btn btn-secondary"
                onClick={onPrevious}
                disabled={isFirstSection}
            >
                ← Previous
            </button>

            {/* Progress Indicator */}
            <div className="nav-progress">
                <span className="progress-text">
                    Step {currentSection + 1} of {totalSections}
                </span>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
                    />
                </div>
            </div>

            {/* Next / Submit Button */}
            {isLastSection ? (
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="spinner"></span>
                            Generating...
                        </>
                    ) : (
                        '🚀 Generate Document'
                    )}
                </button>
            ) : (
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onNext}
                >
                    Next →
                </button>
            )}
        </div>
    );
}

FormNavigation.propTypes = {
    currentSection: PropTypes.number.isRequired,
    totalSections: PropTypes.number.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
};

export default FormNavigation;
