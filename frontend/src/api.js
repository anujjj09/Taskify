// API helper functions
const API_BASE = process.env.REACT_APP_API_URL || '';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });
  if (!res.ok) {
    let msg = 'Request failed';
    try { const data = await res.json(); msg = data.error || msg; } catch (_) {}
    throw new Error(msg);
  }
  return res.json();
}

export const api = {
  listTasks: () => request('/api/tasks'),
  createTask: (data) => request('/api/tasks', { method: 'POST', body: JSON.stringify(data) }),
  updateTask: (id, data) => request(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTask: (id) => request(`/api/tasks/${id}`, { method: 'DELETE' })
};

export { API_BASE };