import axios from "axios";

// ✅ FIXED: Proper environment variable handling
const getBaseURL = () => {
  const rawUrl = import.meta.env.VITE_API_BASE_URL;

  if (!rawUrl || rawUrl.trim() === "") {
    if (import.meta.env.DEV) {
      console.warn("⚠️ VITE_API_BASE_URL not set, using default localhost");
      return "http://localhost:5000";
    }
    console.error("❌ VITE_API_BASE_URL is missing in production. Set it in Render environment variables.");
    return "";
  }

  let normalized = rawUrl.trim().replace(/\/+$/g, "");
  if (normalized.endsWith("/api")) {
    normalized = normalized.replace(/\/api$/, "");
  }

  return normalized;
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