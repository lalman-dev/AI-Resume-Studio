import React, { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../app/hooks";
import api from "../../configs/api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface SummaryFormProps {
  data: string;
  onChange: (value: string) => void;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ data, onChange }) => {
  const { token } = useAppSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      const prompt = `enhance my professional summary "${data}"`;
      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        { headers: { Authorization: token } }
      );
      onChange(response.data.enhancedContent);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setIsGenerating(false);
    }
  };

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
          disabled={isGenerating}
          onClick={generateSummary}
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" aria-hidden="true" />
          )}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
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
