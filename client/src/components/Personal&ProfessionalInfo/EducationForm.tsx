import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const empty: Education = {
  institution: "",
  degree: "",
  field: "",
  graduation_date: "",
  gpa: "",
};

const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const addEducation = () => onChange([...data, { ...empty }]);

  const removeEducation = (index: number) =>
    onChange(data.filter((_, i) => i !== index));

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string,
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const fieldConfig: {
    id: (i: number) => string;
    field: keyof Education;
    label: string;
    type: string;
    placeholder?: string;
    colSpan?: string;
  }[] = [
    {
      id: (i) => `institution-${i}`,
      field: "institution",
      label: "Institution",
      type: "text",
      placeholder: "MIT, Stanford...",
    },
    {
      id: (i) => `degree-${i}`,
      field: "degree",
      label: "Degree",
      type: "text",
      placeholder: "B.Tech, B.Sc...",
    },
    {
      id: (i) => `field-${i}`,
      field: "field",
      label: "Field of Study",
      type: "text",
      placeholder: "Computer Science",
    },
    {
      id: (i) => `grad-${i}`,
      field: "graduation_date",
      label: "Graduation Date",
      type: "month",
    },
    {
      id: (i) => `gpa-${i}`,
      field: "gpa",
      label: "GPA / Score",
      type: "text",
      placeholder: "8.5 / 10",
    },
  ];

  return (
    <motion.section
      aria-labelledby="education-heading"
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h3
            id="education-heading"
            className="flex items-center gap-2 text-base font-semibold text-gray-900"
          >
            <GraduationCap
              className="w-4 h-4 text-gray-400"
              aria-hidden="true"
            />
            Education
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Your academic background
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={addEducation}
          aria-label="Add education"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#1a1a18] text-white rounded-lg hover:bg-[#2d2d2b] transition-all"
        >
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          Add
        </motion.button>
      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="text-center py-10 text-gray-400 border border-dashed border-gray-200 rounded-lg">
          <GraduationCap
            className="w-8 h-8 mx-auto mb-2 text-gray-300"
            aria-hidden="true"
          />
          <p className="text-sm">No education added yet</p>
          <p className="text-xs mt-1">Click Add to get started</p>
        </div>
      )}

      {/* Entries */}
      <AnimatePresence>
        {data.map((education, index) => (
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
                Education #{index + 1}
              </legend>
              <button
                type="button"
                onClick={() => removeEducation(index)}
                aria-label={`Remove education ${index + 1}`}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {fieldConfig.map(({ id, field, label, type, placeholder }) => (
                <div key={field} className="space-y-1">
                  <label
                    htmlFor={id(index)}
                    className="text-xs font-medium text-gray-500 uppercase tracking-wide"
                  >
                    {label}
                  </label>
                  <input
                    id={id(index)}
                    type={type}
                    value={education[field]}
                    onChange={(e) =>
                      updateEducation(index, field, e.target.value)
                    }
                    placeholder={placeholder}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-300"
                  />
                </div>
              ))}
            </div>
          </motion.fieldset>
        ))}
      </AnimatePresence>
    </motion.section>
  );
};

export default EducationForm;
