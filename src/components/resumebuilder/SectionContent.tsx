import { motion, AnimatePresence } from "framer-motion";
import PersonalInfoForm from "../Personal&ProfessionalInfo/PersonalInfoForm";
import SummaryForm from "../Personal&ProfessionalInfo/SummaryForm";
import ExperienceForm from "../Personal&ProfessionalInfo/ExperienceForm";
import type { ResumeData } from "../../utils/types";
import EducationForm from "../Personal&ProfessionalInfo/EducationForm";
import ProjectsForm from "../Personal&ProfessionalInfo/ProjectsForm";
import SkillsForm from "../Personal&ProfessionalInfo/SkillsForm";

interface Props {
  activeIndex: number;
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  removeBackground: boolean;
  setRemoveBackGround: React.Dispatch<React.SetStateAction<boolean>>;
}

const sections = [
  "personal",
  "summary",
  "experience",
  "education",
  "projects",
  "skills",
];

const SectionContent: React.FC<Props> = ({
  activeIndex,
  resumeData,
  setResumeData,
  removeBackground,
  setRemoveBackGround,
}) => {
  const activeSection = sections[activeIndex];

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {activeSection === "personal" && (
            <PersonalInfoForm
              data={resumeData.personal_info}
              onChange={(data) =>
                setResumeData((prev) => ({ ...prev, personal_info: data }))
              }
              removeBackground={removeBackground}
              setRemoveBackGround={setRemoveBackGround}
            />
          )}
          {activeSection === "summary" && (
            <SummaryForm
              data={resumeData.professional_summary}
              onChange={(data) =>
                setResumeData((prev) => ({
                  ...prev,
                  professional_summary: data,
                }))
              }
            />
          )}
          {activeSection === "experience" && (
            <ExperienceForm
              data={resumeData.experience}
              onChange={(data) =>
                setResumeData((prev) => ({ ...prev, experience: data }))
              }
            />
          )}
          {activeSection === "education" && (
            <EducationForm
              data={resumeData.education}
              onChange={(data) =>
                setResumeData((prev) => ({ ...prev, education: data }))
              }
            />
          )}
          {activeSection === "projects" && (
            <ProjectsForm
              data={resumeData.project}
              onChange={(data) =>
                setResumeData((prev) => ({ ...prev, project: data }))
              }
            />
          )}
          {activeSection === "skills" && (
            <SkillsForm
              data={resumeData.skills}
              onChange={(data) =>
                setResumeData((prev) => ({ ...prev, skills: data }))
              }
            />
          )}
          {/* TODO: SkillsForm */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SectionContent;
