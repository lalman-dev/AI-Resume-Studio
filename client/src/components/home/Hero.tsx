import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAppSelector } from "../../app/hooks";
import Logo from "../logo";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Feature", href: "#feature" },
  { label: "Testimonial", href: "#testimonial" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: "10k+", label: "Resumes created" },
  { value: "4 min", label: "Avg. build time" },
  { value: "Free", label: "No credit card" },
];

const Hero = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main
      className="relative isolate flex flex-col items-center min-h-screen text-gray-800 overflow-hidden"
      style={{
        backgroundColor: "#F5F7FA",
        backgroundImage: `
          linear-gradient(to right, #dde3ec 1px, transparent 1px),
          linear-gradient(to bottom, #dde3ec 1px, transparent 1px)
        `,
        backgroundSize: "28px 28px",
      }}
    >
      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% 25%, rgba(245,247,250,0.93) 0%, transparent 100%)",
        }}
      />

      {/* ── Navbar ── */}
      <nav className="relative z-10 flex items-center justify-between w-full px-6 md:px-12 lg:px-20 py-4 border-b border-black/5">
        {/* Logo */}
        <Link to="/" aria-label="AI Resume Studio home">
          <Logo variant="dark" size="sm" />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!user && (
            <Link
              to="/app?state=login"
              className="px-5 py-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-all duration-200"
            >
              Login
            </Link>
          )}
          {!user && (
            <Link
              to="/app?state=register"
              className="px-5 py-2 rounded-full bg-[#1a1a18] text-white text-sm font-medium hover:bg-[#2d2d2b] transition-all duration-200"
            >
              Get Started
            </Link>
          )}
          {user && (
            <Link
              to="/app"
              className="px-5 py-2 rounded-full bg-[#1a1a18] text-white text-sm font-medium hover:bg-[#2d2d2b] transition-all duration-200"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Mobile burger */}
        <button
          aria-label="Open menu"
          className="md:hidden p-1 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-white/90 backdrop-blur-md md:hidden"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {label}
              </a>
            ))}

            <div className="flex flex-col items-center gap-3 mt-2 w-full px-12">
              {!user && (
                <Link
                  to="/app?state=register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center px-6 py-3 rounded-full bg-[#1a1a18] text-white text-sm font-medium"
                >
                  Get Started
                </Link>
              )}
              {!user && (
                <Link
                  to="/app?state=login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center px-6 py-3 rounded-full border border-gray-300 text-sm font-medium text-gray-700"
                >
                  Login
                </Link>
              )}
              {user && (
                <Link
                  to="/app"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center px-6 py-3 rounded-full bg-[#1a1a18] text-white text-sm font-medium"
                >
                  Dashboard
                </Link>
              )}
            </div>

            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-6 p-1 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero body ── */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 mt-20 md:mt-28 max-w-3xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-500 mb-8 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Powered by OpenAI
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-4xl md:text-5xl lg:text-[56px] font-bold text-[#1a1a18] leading-[1.12] tracking-tight mb-5"
        >
          Get your dream job with{" "}
          <span className="text-blue-600">AI Powered Resume</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-base md:text-lg text-gray-500 leading-relaxed max-w-md mb-10"
        >
          Create, edit, download or share your resume in minutes — no design
          skills needed.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex items-center gap-4 mb-20"
        >
          <Link
            to="/app?state=register"
            className="px-7 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-sm"
          >
            Create Now
          </Link>
          <a
            href="#feature"
            className="px-7 py-3 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:border-gray-400 hover:text-gray-900 transition-all duration-200"
          >
            See Features →
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-start gap-10 md:gap-16 border-t border-gray-200 pt-8 w-full justify-center"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-serif text-xl md:text-2xl font-bold text-[#1a1a18]">
                {value}
              </span>
              <span className="text-xs text-gray-400 tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </section>
    </main>
  );
};

export default Hero;
