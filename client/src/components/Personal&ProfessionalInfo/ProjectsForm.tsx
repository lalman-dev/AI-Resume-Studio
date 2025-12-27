import React from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

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

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const addProject = () => {
    onChange([...data, { name: "", type: "", description: "", link: "" }]);
  };

  const removeProject = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateProject = (
    index: number,
    field: keyof Project,
    value: string
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <motion.section
      aria-labelledby="projects-heading"
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <h3
          id="projects-heading"
          className="flex items-center gap-2 text-lg font-semibold text-gray-900"
        >
          Projects
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
          aria-label="Add project"
        >
          <Plus className="size-4" /> Add Project
        </motion.button>
      </div>

      {data.map((proj, index) => (
        <motion.div
          key={index}
          className="p-4 border border-gray-200 rounded-lg space-y-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-800">Project #{index + 1}</h4>
            <button
              type="button"
              onClick={() => removeProject(index)}
              className="text-red-500 hover:text-red-700"
              aria-label={`Remove project ${index + 1}`}
            >
              <Trash2 className="size-4" />
            </button>
          </div>

          <input
            value={proj.name}
            onChange={(e) => updateProject(index, "name", e.target.value)}
            placeholder="Project Name"
            className="w-full px-3 py-2 text-sm border rounded-lg"
          />
          <input
            value={proj.type}
            onChange={(e) => updateProject(index, "type", e.target.value)}
            placeholder="Project Type (e.g., Web App, Mobile App)"
            className="w-full px-3 py-2 text-sm border rounded-lg"
          />
          <textarea
            value={proj.description}
            onChange={(e) =>
              updateProject(index, "description", e.target.value)
            }
            rows={4}
            placeholder="Describe the project, your role, and achievements..."
            className="w-full px-3 py-2 text-sm border rounded-lg resize-none"
          />
          <input
            value={proj.link}
            onChange={(e) => updateProject(index, "link", e.target.value)}
            placeholder="Project Link (GitHub, Live Demo)"
            className="w-full px-3 py-2 text-sm border rounded-lg"
          />
        </motion.div>
      ))}
    </motion.section>
  );
};

export default ProjectsForm;
