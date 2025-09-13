import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,
});

const auth = axios.create({
  baseURL: `${API_BASE}/auth`,
  withCredentials: true,
});

export { api, auth };
