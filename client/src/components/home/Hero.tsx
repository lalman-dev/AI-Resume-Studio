import { useState } from "react";
import logo from "../../../public/logo.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "../../utils/faq";
import { Menu, Video, X } from "lucide-react";
import { Answer } from "./FaqAnswer";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="isolate flex items-center flex-col justify-start bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient.png')] bg-cover text-sm text-gray-800 max-md:px-4 text-center min-h-screen relative">
      <nav className="flex items-center justify-between w-full md:px-16 lg:px-20 relative z-10">
        {/* Logo */}
        <a href="#" aria-label="Ai-builder Logo">
          <img
            src={logo}
            alt="Ai-builder Logo"
            className="w-30 md:w-40 h-auto"
          />
        </a>

        {/* Desktop MENU LINKS */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <a
            href="#"
            className="hover:text-cyan-600 hover:underline hover:scale-110 transition-all duration-300"
          >
            Home
          </a>
          <a
            href="#feature"
            className="hover:text-cyan-600 hover:underline hover:scale-110 transition-all duration-300"
          >
            Feature
          </a>
          <a
            href="#testimonial"
            className="hover:text-cyan-600 hover:underline hover:scale-110 transition-all duration-300"
          >
            Testimonial
          </a>
          <a
            href="#contact"
            className="hover:text-cyan-600 hover:underline hover:scale-110 transition-all duration-300"
          >
            Contact
          </a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <Link
            to="/app?state=register"
            className="px-6 py-2 bg-linear-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-500 transition-all duration-300 hover:scale-105 active:scale-95 rounded-full border border-white text-white"
          >
            Get Started
          </Link>
          <Link
            to="/app?state=login"
            className="px-6 py-2 bg-white hover:bg-gray-300 transition-all duration-300 hover:scale-110 active:scale-95 rounded-full border border-gray-400 hover:text-cyan-600"
          >
            Login
          </Link>
        </div>

        {/* Mobile BURGER MENU */}
        <button
          aria-label="open menu"
          className="size-6 md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <Menu />
        </button>

        {/* Mobile Animated MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "100%", y: "-100%", opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ x: "100%", y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-white/60 backdrop-blur flex flex-col items-center justify-center gap-8 font-medium text-lg z-20 md:hidden"
            >
              <a href="#">Home</a>
              <a href="#feature">Feature</a>
              <a href="#testimonial">Testimonial</a>
              <a href="#contact">Contact</a>

              {/* Close Button */}
              <button
                aria-label="close menu"
                className="size-6 md:hidden"
                onClick={() => setMenuOpen(false)}
              >
                <X />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO CONTENT */}
      <div className="flex flex-col items-center justify-center w-full relative z-0 mt-15">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl text-gray-700 font-medium md:font-bold leading-tight"
        >
          Get your dream job with <br />
          <span className="bg-linear-to-r from-purple-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent font-normal">
            AI Powered Resume
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-2xl mt-6 text-gray-600"
        >
          Create, Edit, Download or Share your Resume within few minutes.
        </motion.p>

        {/* CREATE & DEMO BUTTON */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex justify-center items-center gap-5 w-full h-auto rounded-2xl mt-10"
        >
          <Link
            to="/app"
            className="relative inline-flex items-center justify-center px-6 py-2 rounded-full text-white font-medium
             bg-linear-to-r from-purple-400 to-blue-500
             hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 rounded-full p-0.5 bg-linear-to-r from-purple-500 via-cyan-500 to-blue-500 animate-glow">
              <span className="block w-full h-full rounded-full"></span>
            </span>
            <span className="relative z-10">Create Now</span>
          </Link>

          <Link
            to="/"
            className="px-6 inline-flex gap-0.5 py-2 bg-white hover:bg-gray-300 transition-all duration-300 hover:scale-110 active:scale-95 rounded-full border border-gray-400 text-gray-500 hover:text-gray-700"
          >
            <Video className="w-5 h-5 " />
            Try Demo
          </Link>
        </motion.div>

        {/* FAQ LINKS */}
        <div className="space-y-4 text-center mt-8 text-slate-500 w-full max-w-2xl mx-auto px-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-gray-300 pb-2"
            >
              <p
                className="cursor-pointer font-medium hover:text-slate-700"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
              </p>
              <AnimatePresence>
                {openIndex === index && <Answer text={faq.answer} />}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      
    </main>
  );
};

export default Hero;
