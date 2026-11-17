/**
 * API SERVICE LAYER
 * Connects React frontend to Express + PostgreSQL backend with automatic local fallback.
 */

const API_BASE_URL = '/api';

const getHeaders = (token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

export const api = {
  // Authentication
  async login(username, password) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      return await res.json();
    } catch (e) {
      // Local fallback for standalone mode
      if (username === 'admin' && password === 'rakib2026') {
        return { success: true, token: 'mock-jwt-token' };
      }
      return { success: false, message: 'Could not connect to backend server.' };
    }
  },

  // Profile
  async getProfile() {
    try {
      const res = await fetch(`${API_BASE_URL}/profile`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: false };
  },

  async updateProfile(profileData, token) {
    const res = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(profileData)
    });
    return await res.json();
  },

  async updateAbout(aboutData, token) {
    const res = await fetch(`${API_BASE_URL}/profile/about`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(aboutData)
    });
    return await res.json();
  },

  // Skills
  async getSkills() {
    try {
      const res = await fetch(`${API_BASE_URL}/skills`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: false };
  },

  async addSkill(skill, token) {
    const res = await fetch(`${API_BASE_URL}/skills`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(skill)
    });
    return await res.json();
  },

  async updateSkill(id, skill, token) {
    const res = await fetch(`${API_BASE_URL}/skills/${id}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(skill)
    });
    return await res.json();
  },

  async deleteSkill(id, token) {
    const res = await fetch(`${API_BASE_URL}/skills/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token)
    });
    return await res.json();
  },

  // Projects
  async getProjects() {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: false };
  },

  async addProject(project, token) {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(project)
    });
    return await res.json();
  },

  async updateProject(id, project, token) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(project)
    });
    return await res.json();
  },

  async deleteProject(id, token) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token)
    });
    return await res.json();
  },

  // Contact Messages
  async sendMessage(messageData) {
    const res = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });
    return await res.json();
  },

  async getMessages(token) {
    const res = await fetch(`${API_BASE_URL}/messages`, {
      headers: getHeaders(token)
    });
    return await res.json();
  },

  async deleteMessage(id, token) {
    const res = await fetch(`${API_BASE_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token)
    });
    return await res.json();
  }
};
