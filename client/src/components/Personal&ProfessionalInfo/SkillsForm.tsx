import React from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

interface SkillsFormProps {
  data: string[];
  onChange: (updated: string[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const addSkill = () => {
    onChange([...data, ""]);
  };

  const removeSkill = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...data];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <motion.section
      aria-labelledby="skills-heading"
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <h3
          id="skills-heading"
          className="flex items-center gap-2 text-lg font-semibold text-gray-900"
        >
          Skills
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={addSkill}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
          aria-label="Add skill"
        >
          <Plus className="size-4" /> Add Skill
        </motion.button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No skills added yet.</p>
          <p className="text-sm">Click “Add Skill” to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((skill, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <input
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
                placeholder="Enter a skill (e.g., React, TypeScript)"
                className="flex-1 px-3 py-2 text-sm border rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700"
                aria-label={`Remove skill ${index + 1}`}
              >
                <Trash2 className="size-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default SkillsForm;
