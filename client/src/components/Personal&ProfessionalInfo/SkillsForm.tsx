import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Zap } from "lucide-react";

interface SkillsFormProps {
  data: string[];
  onChange: (updated: string[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const addSkill = () => onChange([...data, ""]);

  const removeSkill = (index: number) =>
    onChange(data.filter((_, i) => i !== index));

  const updateSkill = (index: number, value: string) => {
    const updated = [...data];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <motion.section
      aria-labelledby="skills-heading"
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h3
            id="skills-heading"
            className="flex items-center gap-2 text-base font-semibold text-gray-900"
          >
            <Zap className="w-4 h-4 text-gray-400" aria-hidden="true" />
            Skills
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Add your technical and professional skills
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={addSkill}
          aria-label="Add skill"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#1a1a18] text-white rounded-lg hover:bg-[#2d2d2b] transition-all"
        >
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          Add
        </motion.button>
      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="text-center py-10 text-gray-400 border border-dashed border-gray-200 rounded-lg">
          <Zap
            className="w-8 h-8 mx-auto mb-2 text-gray-300"
            aria-hidden="true"
          />
          <p className="text-sm">No skills added yet</p>
          <p className="text-xs mt-1">Click Add to get started</p>
        </div>
      )}

      {/* Skills grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <AnimatePresence>
          {data.map((skill, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor={`skill-${index}`} className="sr-only">
                Skill {index + 1}
              </label>
              <input
                id={`skill-${index}`}
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
                placeholder="e.g. React, TypeScript"
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-300"
              />
              <button
                type="button"
                onClick={() => removeSkill(index)}
                aria-label={`Remove skill ${index + 1}`}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default SkillsForm;
