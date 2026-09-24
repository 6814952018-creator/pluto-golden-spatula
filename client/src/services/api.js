const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function apiFetch(path, options) {
  const response = await fetch(`${API_URL}${path}`, { headers: { 'Content-Type': 'application/json' }, ...options });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message || 'Request failed');
  return body;
}

export const api = {
  register: (payload) => apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  me: (token) => apiFetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }),
  logout: (token) => apiFetch('/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } }),
  champions: (query = '') => apiFetch(`/api/champions${query ? `?q=${encodeURIComponent(query)}` : ''}`),
  traits: () => apiFetch('/api/traits'),
  items: () => apiFetch('/api/items'),
  guides: () => apiFetch('/api/guides'),
  teamComps: () => apiFetch('/api/team-comps'),
  analyze: (championIds, itemAssignments = []) => apiFetch('/api/team/analyze', { method: 'POST', body: JSON.stringify({ championIds, itemAssignments }) }),
  recommend: (championIds, itemAssignments = []) => apiFetch('/api/team/recommend', { method: 'POST', body: JSON.stringify({ championIds, itemAssignments }) })
};

export function adminApi(token, resource, method, id, payload) {
  return apiFetch(`/api/${resource}${id ? `/${id}` : ''}`, { method, headers: { Authorization: `Bearer ${token}` }, body: payload ? JSON.stringify(payload) : undefined });
}
