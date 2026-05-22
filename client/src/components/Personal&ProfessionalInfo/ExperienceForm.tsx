import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Plus, Sparkles, Trash2, Loader2 } from "lucide-react";
import api from "../../configs/api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface Experience {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  description: string;
  is_current: boolean;
}

interface ExperienceFormProps {
  data: Experience[];
  onChange: (updated: Experience[]) => void;
}

const empty: Experience = {
  company: "",
  position: "",
  start_date: "",
  end_date: "",
  description: "",
  is_current: false,
};

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const addExperience = () => onChange([...data, { ...empty }]);

  const removeExperience = (index: number) =>
    onChange(data.filter((_, i) => i !== index));

  const updateExperience = <K extends keyof Experience>(
    index: number,
    field: K,
    value: Experience[K],
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const enhanceDescription = async (index: number) => {
    if (!data[index].description.trim()) {
      toast.error("Write a job description first");
      return;
    }
    setLoadingIndex(index);
    try {
      const res = await api.post("/api/ai/enhance-job-desc", {
        userContent: data[index].description,
      });
      updateExperience(index, "description", res.data.result);
      toast.success("Description enhanced");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "AI enhancement failed");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <motion.section
      aria-labelledby="experience-heading"
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h3
            id="experience-heading"
            className="flex items-center gap-2 text-base font-semibold text-gray-900"
          >
            <Briefcase className="w-4 h-4 text-gray-400" aria-hidden="true" />
            Experience
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">Your work history</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={addExperience}
          aria-label="Add experience"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#1a1a18] text-white rounded-lg hover:bg-[#2d2d2b] transition-all"
        >
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          Add
        </motion.button>
      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="text-center py-10 text-gray-400 border border-dashed border-gray-200 rounded-lg">
          <Briefcase
            className="w-8 h-8 mx-auto mb-2 text-gray-300"
            aria-hidden="true"
          />
          <p className="text-sm">No experience added yet</p>
          <p className="text-xs mt-1">Click Add to get started</p>
        </div>
      )}

      {/* Experience entries */}
      <AnimatePresence>
        {data.map((exp, index) => (
          <motion.fieldset
            key={index}
            className="border border-gray-200 rounded-xl p-5 space-y-4 bg-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {/* Fieldset header */}
            <div className="flex justify-between items-center">
              <legend className="text-sm font-semibold text-gray-700">
                Experience #{index + 1}
              </legend>
              <button
                type="button"
                onClick={() => removeExperience(index)}
                aria-label={`Remove experience ${index + 1}`}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Company + Position */}
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor={`company-${index}`}
                  className="text-xs font-medium text-gray-500 uppercase tracking-wide"
                >
                  Company
                </label>
                <input
                  id={`company-${index}`}
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  placeholder="Acme Corp"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-300"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor={`position-${index}`}
                  className="text-xs font-medium text-gray-500 uppercase tracking-wide"
                >
                  Job Title
                </label>
                <input
                  id={`position-${index}`}
                  value={exp.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  placeholder="Frontend Engineer"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor={`start-${index}`}
                  className="text-xs font-medium text-gray-500 uppercase tracking-wide"
                >
                  Start Date
                </label>
                <input
                  id={`start-${index}`}
                  type="month"
                  value={exp.start_date}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor={`end-${index}`}
                  className="text-xs font-medium text-gray-500 uppercase tracking-wide"
                >
                  End Date
                </label>
                <input
                  id={`end-${index}`}
                  type="month"
                  value={exp.end_date}
                  disabled={exp.is_current}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 transition-all"
                />
              </div>
            </div>

            {/* Currently working checkbox */}
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={exp.is_current}
                onChange={(e) =>
                  updateExperience(index, "is_current", e.target.checked)
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Currently working here
            </label>

            {/* Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={`desc-${index}`}
                  className="text-xs font-medium text-gray-500 uppercase tracking-wide"
                >
                  Job Description
                </label>
                <button
                  type="button"
                  onClick={() => enhanceDescription(index)}
                  disabled={loadingIndex === index}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-all"
                >
                  {loadingIndex === index ? (
                    <Loader2
                      className="w-3 h-3 animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <Sparkles className="w-3 h-3" aria-hidden="true" />
                  )}
                  {loadingIndex === index ? "Enhancing..." : "Enhance with AI"}
                </button>
              </div>
              <textarea
                id={`desc-${index}`}
                rows={4}
                value={exp.description}
                onChange={(e) =>
                  updateExperience(index, "description", e.target.value)
                }
                placeholder="Describe your key responsibilities and achievements..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all placeholder:text-gray-300"
              />
            </div>
          </motion.fieldset>
        ))}
      </AnimatePresence>
    </motion.section>
  );
};

export default ExperienceForm;
