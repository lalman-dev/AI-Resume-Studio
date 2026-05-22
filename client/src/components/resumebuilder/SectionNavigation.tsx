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

const SECTION_LABELS = [
  "Personal Info",
  "Summary",
  "Experience",
  "Education",
  "Projects",
  "Skills",
];

const SectionNavigation: React.FC<Props> = ({
  resumeData,
  setResumeData,
  activeIndex,
  setActiveIndex,
  total,
}) => {
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === total - 1;
  const prevLabel = SECTION_LABELS[activeIndex - 1] ?? "Previous";
  const nextLabel = SECTION_LABELS[activeIndex + 1] ?? "Next";

  return (
    <nav
      aria-label="Resume section navigation"
      className="flex justify-between items-center mb-6 border-b border-gray-200 py-2"
    >
      {/* Left — template + colour controls */}
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

      {/* Right — step indicator + prev/next */}
      <div className="flex items-center gap-1">
        {/* Step indicator — visible + announced */}
        <span
          className="text-xs text-gray-400 tabular-nums px-2"
          aria-live="polite"
          aria-label={`Step ${activeIndex + 1} of ${total}: ${SECTION_LABELS[activeIndex]}`}
        >
          {activeIndex + 1} / {total}
        </span>

        <motion.button
          whileHover={!isFirst ? { scale: 1.05 } : {}}
          whileTap={!isFirst ? { scale: 0.95 } : {}}
          type="button"
          onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
          disabled={isFirst}
          aria-disabled={isFirst}
          aria-label={`Go to previous section: ${prevLabel}`}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Previous
        </motion.button>

        <motion.button
          whileHover={!isLast ? { scale: 1.05 } : {}}
          whileTap={!isLast ? { scale: 0.95 } : {}}
          type="button"
          onClick={() =>
            setActiveIndex((prev) => Math.min(prev + 1, total - 1))
          }
          disabled={isLast}
          aria-disabled={isLast}
          aria-label={`Go to next section: ${nextLabel}`}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Next
          <ChevronRight className="size-4" aria-hidden="true" />
        </motion.button>
      </div>
    </nav>
  );
};

export default SectionNavigation;
