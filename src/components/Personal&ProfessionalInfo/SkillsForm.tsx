import React from "react";
import { motion } from "framer-motion";
import { Sparkle, Plus, Trash2, ArrowUpAZ, ArrowDownZA } from "lucide-react";

interface SkillsFormProps {
  data: string[];
  onChange: (updated: string[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const [input, setInput] = React.useState("");

  const addSkill = (value?: string) => {
    const skill = (value ?? input).trim();
    if (!skill) return;
    // prevent duplicates (case-insensitive)
    const exists = data.some((s) => s.toLowerCase() === skill.toLowerCase());
    if (exists) {
      setInput("");
      return;
    }
    onChange([...data, skill]);
    setInput("");
  };

  const removeSkill = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...data];
    updated[index] = value;
    onChange(updated);
  };

  const clearAll = () => onChange([]);

  const sortAZ = () => onChange([...data].sort((a, b) => a.localeCompare(b)));
  const sortZA = () => onChange([...data].sort((a, b) => b.localeCompare(a)));

  const suggestions = [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Semantic HTML",
    "React Router",
    "Redux Toolkit",
    "Vite",
  ];

  return (
    <motion.section
      aria-labelledby="skills-heading"
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header + actions */}
      <div className="flex items-center justify-between">
        <h3
          id="skills-heading"
          className="flex items-center gap-2 text-lg font-semibold text-gray-900"
        >
          <Sparkle className="size-5 text-purple-600" aria-hidden="true" />
          Skills
        </h3>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={sortAZ}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            aria-label="Sort skills A to Z"
            title="Sort A → Z"
          >
            <ArrowUpAZ className="size-3.5" aria-hidden="true" />
            A→Z
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={sortZA}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            aria-label="Sort skills Z to A"
            title="Sort Z → A"
          >
            <ArrowDownZA className="size-3.5" aria-hidden="true" />
            Z→A
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            aria-label="Clear all skills"
            title="Clear all"
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
            Clear
          </motion.button>
        </div>
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addSkill();
          }}
          type="text"
          placeholder="Add a skill (e.g., React, TypeScript) or a soft skill"
          className="flex-1 px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          aria-label="New skill"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => addSkill()}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          aria-label="Add skill"
        >
          <Plus className="size-4" aria-hidden="true" />
          Add
        </motion.button>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <motion.button
            key={s}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => addSkill(s)}
            className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            aria-label={`Add suggested skill ${s}`}
            title={s}
          >
            {s}
          </motion.button>
        ))}
      </div>

      {/* Skills list */}
      {data.length === 0 ? (
        <p className="text-sm text-gray-500">
          No skills added yet. Use the input above or pick from suggestions.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {data.map((skill, index) => (
            <motion.div
              key={`${skill}-${index}`}
              className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <input
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
                type="text"
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                aria-label={`Skill ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label={`Remove skill ${skill || index + 1}`}
                title="Remove"
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default SkillsForm;
