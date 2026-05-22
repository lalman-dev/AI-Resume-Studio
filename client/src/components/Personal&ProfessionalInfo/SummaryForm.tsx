import React, { useState } from "react";
import { Loader2, Sparkles, FileText } from "lucide-react";
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
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    if (!data.trim()) {
      toast.error("Write a draft summary first so AI has something to enhance");
      return;
    }
    try {
      setIsGenerating(true);
      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: `enhance my professional summary "${data}"` },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      onChange(response.data.enhancedContent);
      toast.success("Summary enhanced");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "AI enhancement failed");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const charCount = data?.length ?? 0;

  return (
    <motion.section
      aria-labelledby="summary-heading"
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="border-b border-gray-100 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3
              id="summary-heading"
              className="flex items-center gap-2 text-base font-semibold text-gray-900"
            >
              <FileText className="w-4 h-4 text-gray-400" aria-hidden="true" />
              Professional Summary
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              A concise overview of your career highlights
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            disabled={isGenerating}
            onClick={generateSummary}
            aria-label="Enhance summary with AI"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-[#1a1a18] text-white rounded-lg hover:bg-[#2d2d2b] disabled:opacity-50 transition-all"
          >
            {isGenerating ? (
              <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
            ) : (
              <Sparkles className="w-3 h-3" aria-hidden="true" />
            )}
            {isGenerating ? "Enhancing..." : "AI Enhance"}
          </motion.button>
        </div>
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <label htmlFor="summary-textarea" className="sr-only">
          Professional Summary
        </label>
        <textarea
          id="summary-textarea"
          value={data ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          placeholder="e.g. Frontend engineer with 3+ years building scalable React applications. Passionate about clean UI, performance, and developer experience..."
          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all placeholder:text-gray-300"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400 italic">
            Aim for 3–4 sentences. Lead with your role, then skills, then
            impact.
          </p>
          <span
            className={`text-xs tabular-nums ${charCount > 600 ? "text-red-400" : "text-gray-400"}`}
          >
            {charCount} chars
          </span>
        </div>
      </div>
    </motion.section>
  );
};

export default SummaryForm;
