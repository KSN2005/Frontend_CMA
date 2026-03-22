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
    <div className="bg-black text-white min-h-screen px-6 py-20">

      {/* 🌈 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-black" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Our Services
        </h1>

        <p className="text-center text-slate-400 mb-16">
          Professional financial solutions tailored for your business
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {services.map((service, index) => {
            const isHighlight = index === 1;

            return (
              <motion.div
                key={service._id || index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className={`p-8 rounded-2xl backdrop-blur-lg border transition
                  ${
                    isHighlight
                      ? "bg-white/20 border-blue-400 shadow-xl"
                      : "bg-white/10 border-white/20"
                  }`}
              >
                {/* Title */}
                <h2 className="text-2xl font-semibold mb-4">
                  {service.title}
                </h2>

                {/* Description */}
                <p className="text-slate-300 text-sm mb-8">
                  {service.description}
                </p>

                {/* CTA */}
                <Link to="/contact">
                  <button
                    className={`w-full py-3 rounded-lg font-medium transition
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