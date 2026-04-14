import axios from "axios";

// ✅ FIXED: Proper environment variable handling
const getBaseURL = () => {
  const rawUrl = import.meta.env.VITE_API_BASE_URL;
  
  // If env var not set, use default
  if (!rawUrl || rawUrl.trim() === "") {
    console.warn("⚠️ VITE_API_BASE_URL not set, using default localhost");
    return "http://localhost:5000";
  }
  
  // Normalize: trim and remove trailing slashes
  return rawUrl.trim().replace(/\/+$/, "");
};

const BASE_URL = getBaseURL();

if (import.meta.env.DEV) {
  console.log("✅ Frontend API Base URL:", BASE_URL);
}

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Contact - Corrected endpoint
export const submitInquiry = (payload) =>
  api.post("/api/contact", payload);

// ✅ Services
export const fetchServices = () =>
  api.get("/api/services").then((res) => res.data);

// ✅ Content
export const fetchContent = (page) =>
  api.get(`/api/content/${page}`).then((res) => res.data);

// ✅ Settings
export const fetchSettings = () =>
  api.get("/api/settings").then((res) => res.data);