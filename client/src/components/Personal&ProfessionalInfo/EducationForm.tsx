import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

interface Education {
  institution: string;
  degree: string;
  field: string;
  graduation_date: string;
  gpa: string;
}

interface EducationFormProps {
  data: Education[];
  onChange: (updated: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation: Education = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <motion.section
      className="space-y-6"
      aria-labelledby="education-heading"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Heading + Add button */}
      <div className="flex items-center justify-between">
        <div>
          <h3
            id="education-heading"
            className="flex items-center gap-2 text-lg font-semibold text-gray-900"
          >
            Education
          </h3>
          <p className="text-sm text-gray-500">Add your education details</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          aria-label="Add education"
        >
          <Plus className="size-4" aria-hidden="true" />
          Add Education
        </motion.button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-600" />
          <p>No education details added yet.</p>
          <p className="text-sm">Click “Add Education” to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <motion.div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">
                  Education #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  aria-label={`Remove education ${index + 1}`}
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </div>

              {/* Education Input form */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={education.institution}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  type="text"
                  placeholder="Institution Name"
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />

                <input
                  value={education.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  type="text"
                  placeholder="Degree Title"
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />

                <input
                  value={education.field}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  type="text"
                  placeholder="Field of Study"
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />

                <input
                  value={education.graduation_date}
                  onChange={(e) =>
                    updateEducation(index, "graduation_date", e.target.value)
                  }
                  type="month"
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />

                <input
                  value={education.gpa}
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                  type="text"
                  placeholder="GPA"
                  className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default EducationForm;
