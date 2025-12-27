import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Plus, Sparkles, Trash2, Loader2 } from "lucide-react";
import { useAppSelector } from "../../app/hooks";
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

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const { token } = useAppSelector((state) => state.auth);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string | boolean
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const enhanceDescription = async (index: number) => {
    try {
      setLoadingIndex(index);
      const prompt = `enhance my job description "${data[index].description}"`;

      const response = await api.post(
        "/api/ai/enhance-experience",
        { userContent: prompt },
        { headers: { Authorization: token } }
      );

      updateExperience(index, "description", response.data.enhancedContent);
      toast.success("Description enhanced with AI");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <motion.section
      className="space-y-6"
      aria-labelledby="experience-heading"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Heading + Add button */}
      <div className="flex items-center justify-between">
        <div>
          <h3
            id="experience-heading"
            className="flex items-center gap-2 text-lg font-semibold text-gray-900"
          >
            Experience
          </h3>
          <p className="text-sm text-gray-500">
            Add your previous work experience
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
          aria-label="Add experience"
        >
          <Plus className="size-4" aria-hidden="true" />
          Add Experience
        </motion.button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-600" />
          <p>No work experience added yet.</p>
          <p className="text-sm">Click “Add Experience” to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <motion.div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">
                  Experience #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  aria-label={`Remove experience ${index + 1}`}
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </div>

              {/* Experience Input form */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  type="text"
                  placeholder="Company Name"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />

                <input
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  type="text"
                  placeholder="Job Title"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />

                <input
                  value={experience.start_date}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />

                <input
                  value={experience.end_date}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  type="month"
                  disabled={experience.is_current}
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:bg-gray-100"
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.is_current}
                  onChange={(e) =>
                    updateExperience(index, "is_current", e.target.checked)
                  }
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">
                  Currently working here
                </span>
              </label>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor={`description-${index}`}
                    className="text-sm font-medium text-gray-700"
                  >
                    Job Description
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => enhanceDescription(index)}
                    disabled={loadingIndex === index}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
                  >
                    {loadingIndex === index ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" aria-hidden="true" />
                    )}
                    {loadingIndex === index
                      ? "Enhancing..."
                      : "Enhance With AI"}
                  </motion.button>
                </div>
                <textarea
                  id={`description-${index}`}
                  value={experience.description}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  rows={4}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                  placeholder="Describe your key responsibilities and achievements..."
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default ExperienceForm;
