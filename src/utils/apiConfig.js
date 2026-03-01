/**
 * Centralized API configuration for the application.
 * Uses environment variable in production and localhost in development.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_URL = `${API_BASE_URL}/api`;

export default API_URL;
