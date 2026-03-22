import React, { useEffect, useState } from "react";
import { fetchServices } from "../api/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchServices();
        setServices(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  return (
    <div className="relative w-full bg-black text-white min-h-screen px-4 sm:px-6 py-16 md:py-20 overflow-x-hidden overflow-y-visible" role="main" aria-label="Services page">

      {/* 🌈 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-black pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 sm:mb-4">
          Our Services
        </h1>

        <p className="text-center text-slate-400 text-sm sm:text-base mb-12 sm:mb-16">
          Professional financial solutions tailored for your business
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">

          {services.map((service, index) => {
            const isHighlight = index === 1;

            return (
              <motion.div
                key={service._id || index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-5 sm:p-6 md:p-8 rounded-2xl backdrop-blur-lg border transition h-full flex flex-col
                  ${
                    isHighlight
                      ? "bg-white/20 border-blue-400 shadow-xl"
                      : "bg-white/10 border-white/20"
                  }`}
              >
                {/* Title */}
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">
                  {service.title}
                </h2>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm mb-6 sm:mb-8 flex-grow">
                  {service.description}
                </p>

                {/* CTA */}
                <Link to="/contact" className="w-full">
                  <button
                    className={`w-full py-2 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base active:scale-95
                      ${
                        isHighlight
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "border border-white hover:bg-white hover:text-black"
                      }`}
                  >
                    Enquire Now →
                  </button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;