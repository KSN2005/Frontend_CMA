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
      console.log("📤 Contact form submit payload:", formData);
      const res = await submitInquiry(formData);
      console.log("📥 Contact submit response:", res.data);

      setSuccess(res.data?.message || "✅ Inquiry sent successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact submit error:", err);
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Try again.";
      setSuccess(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen px-6 py-20">

      {/* 🌈 Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-black" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Contact Me
        </motion.h1>

        <p className="text-center text-slate-400 mb-12">
          Let’s discuss how I can help your business grow 🚀
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* INFO CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl"
          >
            <h2 className="text-2xl font-semibold mb-6">
              Get in Touch
            </h2>

            <div className="space-y-4 text-slate-300">
              <p>📧 himanshu@email.com</p>
              <p>📞 +91 12345 67890</p>
              <p>📍 Delhi, India</p>
            </div>

            <div className="mt-6 text-sm text-slate-400">
              Financial Accounting • Cost Management • Tax • Advisory
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl"
          >

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone (optional)"
                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400"
              />

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-black border border-white/20 rounded-lg px-4 py-3"
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
                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400"
              />

              {/* Status */}
              {success && (
                <p className="text-sm text-center text-green-400">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition"
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