import { Download, FileText, Wand2, Zap } from "lucide-react";
import Title from "./Title";
import { motion } from "framer-motion";

const Feature = () => {
  return (
    <div id="feature" className="flex flex-col items-center mt-20">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 1, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
        className="flex items-center gap-2 text-sm text-blue-500 bg-blue-400/10 border border-indigo-200 rounded-full px-4 py-1"
      >
        <Zap size={14} />
        <span>Easy process</span>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Title
          title="Craft Your Resume"
          description="Effortlessly generate a standout resume in just minutes using our streamlined AI‑powered process."
        />
      </motion.div>

      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Animated Image */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-50 md:max-w-xs rounded-3xl m-15"
          style={{
            boxShadow:
              "10px 10px 45px rgba(0,0,0,0.25), 10px 10px 40px rgba(0,0,0,0.25)",
          }}
          src="/src/assets/feature.jpg"
          alt="Resume illustration"
        />

        {/* Feature Cards */}
        <div className="space-y-10 px-4 md:px-0">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6 max-w-md"
          >
            <div className="p-6 aspect-square bg-violet-100 rounded-full">
              <FileText className="w-7 h-7 text-violet-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-700">
                Smart Resume Templates
              </h3>
              <p className="text-sm text-slate-600">
                Choose from modern, recruiter‑friendly designs tailored to your
                career goals.
              </p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-6 max-w-md"
          >
            <div className="p-6 aspect-square bg-green-100 rounded-full">
              <Wand2 className="w-7 h-7 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-700">
                AI‑Powered Suggestions
              </h3>
              <p className="text-sm text-slate-600">
                Get instant guidance on phrasing, formatting, and keywords to
                stand out.
              </p>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-6 max-w-md"
          >
            <div className="p-6 aspect-square bg-orange-100 rounded-full">
              <Download className="w-7 h-7 text-orange-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-700">
                Easy Export & Sharing
              </h3>
              <p className="text-sm text-slate-600">
                Download your resume as PDF or share it instantly with
                recruiters.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
