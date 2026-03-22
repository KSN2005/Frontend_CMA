import React, { useEffect, useState } from "react";
import { fetchContent } from "../api/api";
import { motion } from "framer-motion";

const About = () => {
  const [content, setContent] = useState({
    title: "",
    description: "",
    bannerImage: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchContent("about");
        setContent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden">

      {/* 🌈 Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-black" />
      <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-purple-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* ================= HERO ================= */}
      <section className="relative z-10 text-center py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          {content.title || "About CMA Himanshu Sharma"}
        </motion.h1>

        {content.bannerImage && (
          <motion.img
            src={content.bannerImage}
            alt="About banner"
            className="mt-4 sm:mt-6 mx-auto rounded-2xl shadow-2xl max-h-64 sm:max-h-96 w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
      </section>

      {/* ================= ABOUT TEXT ================= */}
      <section className="relative z-10 px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-5 sm:p-8 text-base sm:text-lg text-slate-200 leading-relaxed shadow-xl"
        >
          {loading ? (
            <p className="animate-pulse">Loading about text...</p>
          ) : (
            <p>
              {content.description ||
                "I am a Cost and Management Accountant helping businesses improve profitability, optimize cost structures, and ensure compliance with financial regulations."}
            </p>
          )}
        </motion.div>
      </section>

      {/* ================= EXPERTISE ================= */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Core Expertise
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">

          {[
            {
              title: "Financial Accounting",
              desc: "Financial statements, bookkeeping and reporting.",
            },
            {
              title: "Cost Management",
              desc: "Cost analysis and profit optimization strategies.",
            },
            {
              title: "Tax Compliance",
              desc: "Ensuring businesses comply with tax regulations.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 sm:p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg text-center transition"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                {item.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative z-10 text-center pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Want to grow your business financially?
          </h2>

          <p className="text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base">
            Let's work together to optimize your costs and increase profitability.
          </p>

          <a
            href="/contact"
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:scale-105 active:scale-95 transition inline-block font-semibold text-sm sm:text-base"
          >
            Get in Touch 🚀
          </a>
        </motion.div>
      </section>

    </div>
  );
};

export default About;