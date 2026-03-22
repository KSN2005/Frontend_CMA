import React from "react";
import { Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10 py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CMA Himanshu Sharma
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Financial expert helping businesses grow with smart strategies.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-slate-400">
            <li>Home</li>
            <li>Services</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-3">Connect</h3>
          <div className="flex gap-4 text-slate-400">
            <Linkedin className="cursor-pointer hover:text-white" />
            <Github className="cursor-pointer hover:text-white" />
            <Mail className="cursor-pointer hover:text-white" />
          </div>
        </div>

      </div>

      <div className="text-center text-slate-500 text-sm mt-10">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;