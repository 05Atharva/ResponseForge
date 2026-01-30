/**
 * API Service Module
 * ==================
 * Handles all communication with the ResponseForge backend API.
 */

import axios from 'axios';

// API base URL - change this for production
const API_BASE_URL = 'http://127.0.0.1:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 second timeout
});

/**
 * Generate an Incident Response template.
 * 
 * @param {Object} formData - The questionnaire form data
 * @returns {Promise<Object>} - Response with document and filename
 */
export const generateIRTemplate = async (formData) => {
    try {
        const response = await apiClient.post('/generate-ir-template', formData);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with an error
            return error.response.data;
        } else if (error.request) {
            // Request was made but no response
            return {
                success: false,
                errors: ['Unable to connect to the server. Please ensure the backend is running.'],
            };
        } else {
            // Something else went wrong
            return {
                success: false,
                errors: ['An unexpected error occurred. Please try again.'],
            };
        }
    }
};

/**
 * Get template options for dropdowns and multiselects.
 * 
 * @returns {Promise<Object>} - Available options
 */
export const getTemplateOptions = async () => {
    try {
        const response = await apiClient.get('/template-options');
        return response.data;
    } catch (error) {
        // Return default options if API fails
        return {
            infrastructureOptions: ['AWS', 'Azure', 'GCP', 'On-Premises'],
            severityLevels: ['Low', 'Medium', 'High', 'Critical'],
            communicationChannels: ['Email', 'Phone', 'Slack', 'Microsoft Teams', 'Other'],
            outputFormats: [
                { value: 'md', label: 'Markdown (.md)' },
                { value: 'txt', label: 'Text (.txt)' },
            ],
        };
    }
};

/**
 * Download a document as a file.
 * 
 * @param {string} content - Document content
 * @param {string} filename - Filename for download
 */
export const downloadDocument = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
