// Shared API base URL - auto-detects local vs production
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : '/api';

// Auth helpers
const Auth = {
  getToken: () => localStorage.getItem('agri_token'),
  getUser:  () => JSON.parse(localStorage.getItem('agri_user') || 'null'),
  isLoggedIn: () => !!localStorage.getItem('agri_token'),
  logout: () => { localStorage.removeItem('agri_token'); localStorage.removeItem('agri_user'); window.location.href = '/login.html'; },
  save: (token, user) => { localStorage.setItem('agri_token', token); localStorage.setItem('agri_user', JSON.stringify(user)); }
};

// Fetch wrapper with auth header
async function apiFetch(endpoint, options = {}) {
  const token = Auth.getToken();
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers };
  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  return res.json();
}
