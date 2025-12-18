import { Check, Layout } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Template {
  id: "classic" | "minimal" | "minimal-image" | "modern";
  name: string;
  preview: string;
}

interface TemplateSelectorProps {
  selectedTemplate: Template["id"];
  onChange: (id: Template["id"]) => void;
}

const templates: Template[] = [
  {
    id: "classic",
    name: "Classic",
    preview:
      "A timeless, professional layout with clear sections and elegant typography for easy readability.",
  },
  {
    id: "minimal",
    name: "Minimal",
    preview:
      "A sleek, understated design that emphasizes simplicity and clean structure with subtle accents.",
  },
  {
    id: "minimal-image",
    name: "Minimal Image",
    preview:
      "A modern minimalist style enhanced with a profile image, balancing clarity with a personal touch.",
  },
  {
    id: "modern",
    name: "Modern",
    preview:
      "A bold, contemporary format featuring strong headings, dynamic accents, and a visually engaging layout.",
  },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 text-sm text-purple-700 bg-linear-to-br from-purple-50 to-purple-100 ring-indigo-300 hover:ring transition-all px-3 py-2 rounded-lg"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Layout size={14} /> <span className="max-sm:hidden">Template</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full w-72 p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm"
            role="listbox"
          >
            {templates.map((template) => (
              <motion.div
                key={template.id}
                onClick={() => {
                  onChange(template.id);
                  setIsOpen(false);
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? "border-indigo-300 hover:border-indigo-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                role="option"
                aria-selected={selectedTemplate === template.id}
              >
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2">
                    <div className="size-5 bg-purple-400 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-800">{template.name}</h4>
                  <p className="mt-2 p-2 bg-purple-50 rounded text-xs text-gray-500 italic">
                    {template.preview}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplateSelector;
