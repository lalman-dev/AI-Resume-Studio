import React, { useState } from "react";
import { Check, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ColorOption {
  name: string;
  value: string;
}

interface ColorPickerProps {
  selectedColor: string;
  onChange: (color: string) => void;
}

const colors: ColorOption[] = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Green", value: "#10B981" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Gray", value: "#6B7280" },
  { name: "Black", value: "#1F2937" },
];

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 text-sm text-purple-700 bg-linear-to-br from-purple-50 to-purple-100 ring-indigo-300 hover:ring transition-all px-3 py-2 rounded-lg"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Palette size={16} /> <span className="max-sm:hidden">Accent</span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-4 w-60 gap-2 absolute top-full left-0 z-10 bg-white rounded-md border border-gray-200 shadow-sm p-2"
            role="listbox"
          >
            {colors.map((color) => (
              <motion.button
                key={color.value}
                onClick={() => {
                  onChange(color.value);
                  setIsOpen(false);
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="relative group flex flex-col items-center cursor-pointer focus:outline-none"
                role="option"
                aria-selected={selectedColor === color.value}
              >
                <div
                  className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors"
                  style={{ backgroundColor: color.value }}
                />
                {selectedColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check className="text-white w-5 h-5" />
                  </div>
                )}
                <span className="text-xs text-center mt-1 text-gray-600">
                  {color.name}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;
