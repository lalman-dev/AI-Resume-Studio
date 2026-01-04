import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Plus, Sparkles, Trash2, Loader2 } from "lucide-react";
import api from "../../configs/api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

/*TYPES*/

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

/* 
   COMPONENT
*/

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  /*
     LOCAL STATE HELPERS
 */

  const addExperience = () => {
    onChange([
      ...data,
      {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
        is_current: false,
      },
    ]);
  };

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = <K extends keyof Experience>(
    index: number,
    field: K,
    value: Experience[K]
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  /* 
     AI ENHANCEMENT
*/

  const enhanceDescription = async (index: number) => {
    const experience = data[index];

    if (!experience.description.trim()) {
      toast.error("Please write a job description first");
      return;
    }

    setLoadingIndex(index);

    try {
      const res = await api.post("/api/ai/enhance-job-desc", {
        userContent: experience.description,
      });

      updateExperience(index, "description", res.data.result);
      toast.success("Job description enhanced");
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

  /* RENDER*/

  return (
    <motion.section
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Experience
          </h3>
          <p className="text-sm text-gray-500">Add your work experience</p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3" />
          No experience added yet
        </div>
      )}

      {/* EXPERIENCE LIST */}
      <div className="space-y-4">
        {data.map((exp, index) => (
          <motion.div
            key={index}
            className="p-4 border rounded-lg space-y-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* HEADER */}
            <div className="flex justify-between">
              <h4 className="font-medium">Experience #{index + 1}</h4>
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* INPUTS */}
            <div className="grid md:grid-cols-2 gap-3">
              <input
                value={exp.company}
                onChange={(e) =>
                  updateExperience(index, "company", e.target.value)
                }
                placeholder="Company"
                className="input"
              />

              <input
                value={exp.position}
                onChange={(e) =>
                  updateExperience(index, "position", e.target.value)
                }
                placeholder="Job Title"
                className="input"
              />

              <input
                type="month"
                value={exp.start_date}
                onChange={(e) =>
                  updateExperience(index, "start_date", e.target.value)
                }
                className="input"
              />

              <input
                type="month"
                value={exp.end_date}
                disabled={exp.is_current}
                onChange={(e) =>
                  updateExperience(index, "end_date", e.target.value)
                }
                className="input disabled:bg-gray-100"
              />
            </div>

            {/* CURRENT CHECKBOX */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={exp.is_current}
                onChange={(e) =>
                  updateExperience(index, "is_current", e.target.checked)
                }
              />
              Currently working here
            </label>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Job Description</label>

                <button
                  type="button"
                  onClick={() => enhanceDescription(index)}
                  disabled={loadingIndex === index}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
                >
                  {loadingIndex === index ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  Enhance with AI
                </button>
              </div>

              <textarea
                rows={4}
                value={exp.description}
                onChange={(e) =>
                  updateExperience(index, "description", e.target.value)
                }
                placeholder="Describe your responsibilities..."
                className="w-full text-sm px-3 py-2 rounded border resize-none"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ExperienceForm;
