import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TemplateSelector from "../templates/TemplateSelector";
import ColorPicker from "../templates/ColorPicker";
import type { ResumeData } from "../../utils/types";

interface Props {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}

const SectionNavigation: React.FC<Props> = ({
  resumeData,
  setResumeData,
  activeIndex,
  setActiveIndex,
  total,
}) => (
  <nav
    aria-label="Section navigation"
    className="flex justify-between items-center mb-6 border-b border-gray-300 py-1"
  >
    <div className="flex items-center gap-2">
      <TemplateSelector
        selectedTemplate={resumeData.template}
        onChange={(template) =>
          setResumeData((prev) => ({ ...prev, template }))
        }
      />
      <ColorPicker
        selectedColor={resumeData.accent_color}
        onChange={(color) =>
          setResumeData((prev) => ({ ...prev, accent_color: color }))
        }
      />
    </div>
    <div className="flex items-center">
      {activeIndex > 0 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
          className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Previous
        </motion.button>
      )}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={() => setActiveIndex((prev) => Math.min(prev + 1, total - 1))}
        className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
          activeIndex === total - 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={activeIndex === total - 1}
      >
        Next
        <ChevronRight className="size-4" aria-hidden="true" />
      </motion.button>
    </div>
  </nav>
);

export default SectionNavigation;
