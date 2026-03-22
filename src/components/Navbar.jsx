import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✨ Detect scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 📱 Toggle mobile menu and body scroll lock
  const toggleMenu = () => {
    const newOpen = !open;
    setOpen(newOpen);
    
    // Prevent body scroll when menu is open on mobile
    if (newOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  };

  // ✅ Close menu when navigating
  const closeMenu = () => {
    setOpen(false);
    document.body.classList.remove("menu-open");
  };

  // ✅ Close menu on resize (window goes to desktop size)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false);
        document.body.classList.remove("menu-open");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  // ✅ Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 overflow-x-hidden
      ${scrolled 
        ? "bg-slate-900/80 backdrop-blur-lg shadow-lg border-b border-white/10" 
        : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">

        {/* Logo - Responsive and truncated on mobile */}
        <Link to="/" onClick={closeMenu}>
          <h1 className="text-base sm:text-lg md:text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent truncate max-w-[150px] sm:max-w-none hover:opacity-80 transition">
            CMA Himanshu
            <span className="hidden sm:inline"> Sharma</span>
          </h1>
        </Link>

        {/* Desktop Menu - Hidden on mobile */}
        <div className="hidden md:flex space-x-2 lg:space-x-8 text-base md:text-lg items-center">
          {navLinks.map((link, i) => (
            <Link key={i} to={link.path}>
              <span className="relative group cursor-pointer hover:text-blue-400 transition py-2 px-1">
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          ))}
        </div>

        {/* Hamburger Menu Button - Visible only on mobile */}
        <button
          className="md:hidden cursor-pointer z-50 p-2 rounded-lg hover:bg-white/10 transition relative"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {/* Hamburger Icon */}
          <div className="flex flex-col gap-1.5 w-6 h-5 justify-center">
            <div
              className={`w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu - Only visible on mobile, hidden on desktop */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-lg border-t border-white/10 transition-all duration-300 overflow-hidden ${
          open ? "max-h-screen opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
        role="menu"
      >
        <div className="flex flex-col items-stretch space-y-1 px-4 py-6 max-h-[calc(100vh-64px)] overflow-y-auto">
          {navLinks.map((link, i) => (
            <Link 
              key={i} 
              to={link.path} 
              onClick={closeMenu}
              role="menuitem"
            >
              <span className="block hover:text-blue-400 transition py-3 px-4 rounded-lg hover:bg-white/5 text-base font-medium">
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Backdrop - Click to close */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;