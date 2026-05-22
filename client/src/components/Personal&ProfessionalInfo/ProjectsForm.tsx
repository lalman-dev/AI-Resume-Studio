import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, Plus, Trash2 } from "lucide-react";

interface Project {
  name: string;
  type: string;
  description: string;
  link: string;
}

interface ProjectsFormProps {
  data: Project[];
  onChange: (updated: Project[]) => void;
}

const empty: Project = { name: "", type: "", description: "", link: "" };

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const addProject = () => onChange([...data, { ...empty }]);

  const removeProject = (index: number) =>
    onChange(data.filter((_, i) => i !== index));

  const updateProject = (
    index: number,
    field: keyof Project,
    value: string,
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <motion.section
      aria-labelledby="projects-heading"
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h3
            id="projects-heading"
            className="flex items-center gap-2 text-base font-semibold text-gray-900"
          >
            <FolderGit2 className="w-4 h-4 text-gray-400" aria-hidden="true" />
            Projects
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Showcase your best work
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={addProject}
          aria-label="Add project"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#1a1a18] text-white rounded-lg hover:bg-[#2d2d2b] transition-all"
        >
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          Add
        </motion.button>
      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="text-center py-10 text-gray-400 border border-dashed border-gray-200 rounded-lg">
          <FolderGit2
            className="w-8 h-8 mx-auto mb-2 text-gray-300"
            aria-hidden="true"
          />
          <p className="text-sm">No projects added yet</p>
          <p className="text-xs mt-1">Click Add to get started</p>
        </div>
      )}

      {/* Entries */}
      <AnimatePresence>
        {data.map((proj, index) => (
          <motion.fieldset
            key={index}
            className="border border-gray-200 rounded-xl p-5 space-y-4 bg-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex justify-between items-center">
              <legend className="text-sm font-semibold text-gray-700">
                Project #{index + 1}
              </legend>
              <button
                type="button"
                onClick={() => removeProject(index)}
                aria-label={`Remove project ${index + 1}`}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor={`proj-name-${index}`}
                  className="text-xs font-medium text-gray-500 uppercase tracking-wide"
                >
                  Project Name
                </label>
                <input
                  id={`proj-name-${index}`}
                  value={proj.name}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  placeholder="AI Resume Studio"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-300"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor={`proj-type-${index}`}
                  className="text-xs font-medium text-gray-500 uppercase tracking-wide"
                >
                  Type
                </label>
                <input
                  id={`proj-type-${index}`}
                  value={proj.type}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                  placeholder="Web App, Mobile App..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor={`proj-link-${index}`}
                className="text-xs font-medium text-gray-500 uppercase tracking-wide"
              >
                Link
              </label>
              <input
                id={`proj-link-${index}`}
                value={proj.link}
                onChange={(e) => updateProject(index, "link", e.target.value)}
                placeholder="github.com/username/project"
                type="url"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-300"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor={`proj-desc-${index}`}
                className="text-xs font-medium text-gray-500 uppercase tracking-wide"
              >
                Description
              </label>
              <textarea
                id={`proj-desc-${index}`}
                value={proj.description}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                rows={4}
                placeholder="What did you build, what was your role, what impact did it have?"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all placeholder:text-gray-300"
              />
            </div>
          </motion.fieldset>
        ))}
      </AnimatePresence>
    </motion.section>
  );
};

export default ProjectsForm;
