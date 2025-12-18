import React from "react";
import { motion } from "framer-motion";
import ResumePreview from "./ResumePreview";
import type { ResumeData } from "../../utils/types";


interface ResumePreviewPanelProps {
  resumeData: ResumeData;
}

const ResumePreviewPanel: React.FC<ResumePreviewPanelProps> = ({
  resumeData,
}) => {
  return (
    <motion.aside
      className="lg:col-span-7 max-lg:mt-6"
      aria-label="Resume preview"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      
      <ResumePreview
        data={resumeData}
        template={resumeData.template}
        accentColor={resumeData.accent_color}
      />
    </motion.aside>
  );
};

export default ResumePreviewPanel;
