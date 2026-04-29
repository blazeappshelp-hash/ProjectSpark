import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
        scrolled ? "pt-4" : "pt-0"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`flex items-center transition-all duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl border border-white/10 py-2.5 px-6 rounded-full mx-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] gap-10"
            : "bg-transparent py-8 px-6 border-b border-transparent gap-16"
        }`}
      >
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-black text-white tracking-tight"
        >
          Spark
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-10">
          {/* NAV LINKS */}
          <div className="flex items-center gap-8 text-sm font-medium">
            <Link
              to="/"
              className={`transition ${
                isActive("/") ? "text-blue-500" : "text-white/60 hover:text-white"
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`transition ${
                isActive("/about")
                  ? "text-blue-500"
                  : "text-white/60 hover:text-white"
              }`}
            >
              About
            </Link>

            {/* ✅ DIRECT EVENTS LINK */}
            <Link
              to="/events"
              className={`transition ${
                isActive("/events")
                  ? "text-blue-500"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Events
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5 border-l border-white/10 pl-10">
            <Link
              to="/joinus"
              className={`text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-full transition ${
                scrolled
                  ? "bg-blue-600 text-white hover:bg-blue-500 hover:scale-105"
                  : "border border-white/20 text-white hover:border-blue-500 hover:text-blue-400"
              }`}
            >
              Join Us
            </Link>

            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/project%E2%80%8E%E2%80%8E-spark/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition text-lg"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://www.instagram.com/spark.offl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition text-lg"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="absolute top-full left-4 right-4 mt-2 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-5 text-white">
              <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>

              {/* ✅ DIRECT EVENTS LINK */}
              <Link to="/events" onClick={() => setMobileOpen(false)}>
                Events
              </Link>

              <Link
                to="/joinus"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 bg-blue-600 rounded-xl text-center font-bold"
              >
                Join Us
              </Link>

              <div className="flex justify-center gap-8 pt-4 border-t border-white/5">
                <FaLinkedinIn size={20} />
                <FaInstagram size={20} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM LINE */}
      {!scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
    </motion.nav>
  );
};

export default Navbar;
