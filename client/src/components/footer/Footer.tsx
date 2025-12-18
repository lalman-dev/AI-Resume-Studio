import logo from "/logo.png";
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";
import { footerSections } from "../../utils/footerLinks";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full bg-linear-to-b from-[#f6f1ff] via-[#F1EAFF] to-[#FFFFFF] text-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-center md:justify-between">
        {/* Footer Links */}
        {footerSections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-400 font-medium">{section.title}</p>
            <ul className="mt-2 space-y-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-cyan-600 hover:underline transition"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="text-xs text-white bg-linear-to-r from-purple-400 to-blue-400 rounded-md ml-2 px-2 py-1">
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Logo + Tagline */}
        <div className="flex flex-col justify-center items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 mb-6"
          >
            <img alt="logo" className="w-30 md:w-40" src={logo} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center max-w-xl text-sm font-normal leading-relaxed"
          >
            Empowering job seekers worldwide with AI‑driven resume tools. Craft
            polished resumes in minutes and unlock new career opportunities.
          </motion.p>
        </div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
          <a href="#">AI Resume-Studio </a> © 2025. All rights reserved.
        </div>
      </motion.div>

      {/* Social Links */}
      <SocialLinks />
    </motion.footer>
  );
};

export default Footer;
