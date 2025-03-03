import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const login = async (email, password) => {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);
  
  const response = await api.post('/auth/login', formData);
  return response.data;
};

export const signup = async (email, password) => {
  const response = await api.post('/auth/signup', { email, password });
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Content services
export const generateContent = async (niche, contentType, keywords) => {
  const response = await api.post('/content/generate', {
    niche,
    content_type: contentType,
    keywords,
  });
  return response.data;
};

export const saveContent = async (title, contentType, keywords, text) => {
  const response = await api.post('/content/save', {
    content_data: {
      title,
      content_type: contentType,
      keywords: keywords.join(','),
    },
    content_text: text,
  });
  return response.data;
};

export const getContentHistory = async (skip = 0, limit = 10) => {
  const response = await api.get(`/content/history?skip=${skip}&limit=${limit}`);
  return response.data;
};

export const getContentById = async (id) => {
  const response = await api.get(`/content/${id}`);
  return response.data;
};

// Analytics services
export const getAnalytics = async () => {
  const response = await api.get('/analytics');
  return response.data;
};

export default api;