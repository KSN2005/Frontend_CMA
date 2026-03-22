import React from "react";
import { Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white border-t border-white/10 py-8 sm:py-10 px-4 sm:px-6 overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">

        {/* Brand */}
        <div className="text-center sm:text-left">
          <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CMA Himanshu Sharma
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Financial expert helping businesses grow with smart strategies.
          </p>
        </div>

        {/* Links */}
        <div className="text-center">
          <h3 className="font-semibold text-sm sm:text-base mb-3">Quick Links</h3>
          <ul className="space-y-1 sm:space-y-2 text-slate-400 text-xs sm:text-sm">
            <li className="hover:text-white transition cursor-pointer">Home</li>
            <li className="hover:text-white transition cursor-pointer">Services</li>
            <li className="hover:text-white transition cursor-pointer">About</li>
            <li className="hover:text-white transition cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Social */}
        <div className="text-center sm:text-right">
          <h3 className="font-semibold text-sm sm:text-base mb-3">Connect</h3>
          <div className="flex gap-4 justify-center sm:justify-end text-slate-400">
            <Linkedin size={20} className="cursor-pointer hover:text-white transition" />
            <Github size={20} className="cursor-pointer hover:text-white transition" />
            <Mail size={20} className="cursor-pointer hover:text-white transition" />
          </div>
        </div>

      </div>

      <div className="text-center text-slate-500 text-xs sm:text-sm mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;