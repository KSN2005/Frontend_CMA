import React, { useState, useEffect } from "react";
import { Linkedin, Github, Mail } from "lucide-react";
import { fetchSettings } from "../api/api";

const Footer = () => {
  const [settings, setSettings] = useState({
    siteName: "CMA Himanshu Sharma",
    logo: "",
    email: "contact@example.com",
    phone: "+91 12345 67890",
    address: "Delhi, India",
    description: "Financial expert helping businesses grow with smart strategies.",
  });
  const [settingsLoading, setSettingsLoading] = useState(true);

  // ✅ Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setSettingsLoading(true);
        const data = await fetchSettings();
        setSettings(prev => ({
          ...prev,
          siteName: data.siteName || "CMA Himanshu Sharma",
          logo: data.logo || "",
          email: data.email || "contact@example.com",
          phone: data.phone || "+91 12345 67890",
          address: data.address || "Delhi, India",
          description: data.description || "Financial expert helping businesses grow with smart strategies.",
        }));
      } catch (err) {
        console.error("❌ Error loading settings:", err);
        // Keep default values
      } finally {
        setSettingsLoading(false);
      }
    };

    loadSettings();
  }, []);

  return (
    <footer className="bg-black text-white border-t border-white/10 py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            {!settingsLoading && settings.logo && (
              <img
                src={settings.logo}
                alt="Logo"
                className="h-12 w-auto object-contain"
              />
            )}
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {settingsLoading ? "Loading..." : settings.siteName}
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-2">
            {settings.description}
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact Info</h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            {settings.email && <li>📧 {settings.email}</li>}
            {settings.phone && <li>📞 {settings.phone}</li>}
            {settings.address && <li>📍 {settings.address}</li>}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-3">Connect</h3>
          <div className="flex gap-4 text-slate-400">
            <Linkedin className="cursor-pointer hover:text-white transition" />
            <Github className="cursor-pointer hover:text-white transition" />
            <Mail className="cursor-pointer hover:text-white transition" />
          </div>
        </div>

      </div>

      <div className="text-center text-slate-500 text-sm mt-10">
        © {new Date().getFullYear()} {!settingsLoading ? settings.siteName : "Website"}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;