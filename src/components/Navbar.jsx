import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchSettings } from "../api/api";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "CMA Himanshu Sharma",
    logo: "",
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

  // ✨ Detect scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 
      ${scrolled 
        ? "bg-slate-900/80 backdrop-blur-lg shadow-lg border-b border-white/10" 
        : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo and Site Name */}
        <div className="flex items-center gap-3 flex-1">
          {/* ✅ Dynamic Logo */}
          {!settingsLoading && settings.logo && (
            <img
              src={settings.logo}
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          )}
          
          {/* ✅ Dynamic Site Name */}
          <h1 className="text-xl md:text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {settingsLoading ? "Loading..." : settings.siteName}
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-lg">
          {navLinks.map((link, i) => (
            <Link key={i} to={link.path}>
              <span className="relative group cursor-pointer">
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <div
          className="md:hidden cursor-pointer z-50"
          onClick={() => setOpen(!open)}
        >
          <div
            className={`w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${
              open ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-lg border-t border-white/10 transition-all duration-300 ${
          open ? "max-h-80 py-6" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center space-y-6 text-lg">
          {navLinks.map((link, i) => (
            <Link key={i} to={link.path} onClick={() => setOpen(false)}>
              <span className="hover:text-blue-400 transition">
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;