// Central API configuration
// In development: reads from .env (VITE_API_URL=http://localhost:5001)
// In production: reads from Vercel environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export default API_BASE_URL;
