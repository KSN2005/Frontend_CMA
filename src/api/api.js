import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Contact
export const submitInquiry = (payload) =>
  api.post("/contact", payload);

// ✅ Services
export const fetchServices = () =>
  api.get("/services").then((res) => res.data);

// ✅ Content
export const fetchContent = (page) =>
  api.get(`/content/${page}`).then((res) => res.data);

// ✅ Settings
export const fetchSettings = () =>
  api.get("/settings").then((res) => res.data);