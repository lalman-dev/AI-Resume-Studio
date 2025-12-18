import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface SummaryFormProps {
  data: string;
  onChange: (value: string) => void;
  setResumeData?: React.Dispatch<React.SetStateAction<any>>;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ data, onChange }) => {
  return (
    <motion.section
      className="space-y-4"
      aria-labelledby="summary-heading"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Heading + AI Enhance button */}
      <div className="flex items-center justify-between">
        <div>
          <h3
            id="summary-heading"
            className="flex items-center gap-2 text-lg font-semibold text-gray-900"
          >
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Provide a concise overview of your career highlights
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
          aria-label="Enhance summary with AI"
        >
          <Sparkles className="size-4" aria-hidden="true" />
          AI Enhance
        </motion.button>
      </div>

      {/* Textarea */}
      <div>
        <label htmlFor="summary-textarea" className="sr-only">
          Professional Summary
        </label>
        <motion.textarea
          id="summary-textarea"
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Craft a powerful professional summary that showcases your core strengths, unique value, and career aspirations..."
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
        <p className=" text-xs text-center max-w-4/5 mx-auto text-gray-500 italic">
          Guideline: Keep your summary concise (around 3 to 4 sentences) and
          emphasize your most impactful skills and accomplishments.
        </p>
      </div>
    </motion.section>
  );
};

export default SummaryForm;
