// src/services/api.js
import axios from "axios";

// Automatically select the correct API base:
// - production (Vercel) → live Render backend
// - development (localhost) → local backend
const API_BASE = import.meta.env.PROD
  ? "https://olfactum-api.onrender.com/api"
  : "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
