import React, { useState } from "react";
import { submitInquiry } from "../api/api";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await submitInquiry(formData);
      setSuccess(res.data?.message || "✅ Inquiry sent successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setSuccess("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full bg-black text-white min-h-screen px-4 sm:px-6 py-12 sm:py-16 md:py-20 overflow-x-hidden overflow-y-visible">

      {/* 🌈 Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-black pointer-events-none" />
      <div className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-blue-500/20 blur-3xl rounded-full -top-32 -left-32 md:-top-40 md:-left-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 sm:mb-4"
        >
          Contact Me
        </motion.h1>

        <p className="text-center text-slate-400 mb-8 sm:mb-12 text-sm sm:text-base">
          Let's discuss how I can help your business grow 🚀
        </p>

        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">

          {/* INFO CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-5 sm:p-6 md:p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl h-fit"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
              Get in Touch
            </h2>

            <div className="space-y-3 sm:space-y-4 text-slate-300 text-sm sm:text-base">
              <p>📧 himanshu@email.com</p>
              <p>📞 +91 12345 67890</p>
              <p>📍 Delhi, India</p>
            </div>

            <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-slate-400">
              Financial Accounting • Cost Management • Tax • Advisory
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-5 sm:p-6 md:p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl"
          >

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full bg-transparent border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-400 transition"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className="w-full bg-transparent border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-400 transition"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone (optional)"
                className="w-full bg-transparent border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-400 transition"
              />

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-black border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-400 transition"
              >
                <option value="">Select Service</option>
                <option>Financial Accounting</option>
                <option>Cost Management</option>
                <option>Tax Compliance</option>
                <option>Internal Audit</option>
                <option>Business Advisory</option>
              </select>

              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message..."
                className="w-full bg-transparent border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-400 transition resize-none"
              />

              {/* Status */}
              {success && (
                <p className="text-xs sm:text-sm text-center text-green-400">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 active:scale-95 transition font-semibold text-sm sm:text-base disabled:opacity-50"
              >
                {loading ? "Sending..." : "Submit Inquiry 🚀"}
              </button>

            </form>

          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;