import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchContent, fetchSettings, fetchServices } from "../api/api";
import { motion } from "framer-motion";

const Home = () => {
  const [content, setContent] = useState({});
  const [settings, setSettings] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [typedText, setTypedText] = useState("");
  const fullText =
    content.title || "CMA Himanshu Sharma";

  // ✨ Typing Effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [fullText]);

  // 🚀 Load Data
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      let page = {};
      let site = {};
      let svc = [];

      try {
        page = await fetchContent("home");
      } catch (e) {}

      try {
        site = await fetchSettings();
      } catch (e) {}

      try {
        svc = await fetchServices();
      } catch (e) {}

      setContent(page || {});
      setSettings(site || {});
      setServices(svc || []);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <p className="animate-pulse text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-black text-white overflow-x-hidden overflow-y-visible">

      {/* 🌈 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-black" />
      <div className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] bg-blue-500/20 blur-3xl rounded-full -top-32 -left-32 md:-top-40 md:-left-40 pointer-events-none" />
      <div className="absolute w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-purple-500/20 blur-3xl rounded-full -bottom-32 -right-32 md:-bottom-40 md:-right-40 pointer-events-none" />

      {/* ================= HERO ================= */}
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 md:py-0">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          {/* Logo */}
          {settings.logo && (
            <motion.img
              src={settings.logo}
              alt="logo"
              className="h-16 mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* ✨ Typing Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {typedText}
            <span className="animate-pulse">|</span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-10">
            {content.description ||
              "Helping businesses grow with expert financial management and tax strategies."}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
            <Link to="/services" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl font-semibold text-sm sm:text-base"
              >
                View Services 🚀
              </motion.button>
            </Link>

            <Link to="/contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3 border border-white rounded-xl font-semibold text-sm sm:text-base"
              >
                Contact Me 📩
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl mx-auto">
          {services.slice(0, 3).map((service, index) => (
            <motion.div
              key={service._id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-4 sm:p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:scale-105 transition active:scale-95"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                {service.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link to="/services">
            <button className="px-6 sm:px-8 py-2 sm:py-3 border rounded-lg hover:bg-white hover:text-black transition text-sm sm:text-base font-semibold">
              View All Services →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;