import { memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PersonalInfoForm from "../Personal&ProfessionalInfo/PersonalInfoForm";
import SummaryForm from "../Personal&ProfessionalInfo/SummaryForm";
import ExperienceForm from "../Personal&ProfessionalInfo/ExperienceForm";
import EducationForm from "../Personal&ProfessionalInfo/EducationForm";
import ProjectsForm from "../Personal&ProfessionalInfo/ProjectsForm";
import SkillsForm from "../Personal&ProfessionalInfo/SkillsForm";
import type { ResumeData } from "../../utils/types";
import api from "../../configs/api";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Save } from "lucide-react";

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

const SectionContent: React.FC<Props> = memo(
  ({
    activeIndex,
    resumeData,
    setResumeData,
    removeBackground,
    setRemoveBackGround,
  }) => {
    const activeSection = sections[activeIndex];
    const { resumeId } = useParams<{ resumeId: string }>();
    const { token } = useAppSelector((state) => state.auth);

    const saveResume = useCallback(async () => {
      try {
        if (!resumeId) throw new Error("resumeId is required");

        const updatedResumeData = structuredClone(resumeData);
        if (typeof resumeData.personal_info?.image === "object") {
          delete updatedResumeData.personal_info.image;
        }

        const formData = new FormData();
        formData.append("resumeId", resumeId);
        formData.append("resumeData", JSON.stringify(updatedResumeData));
        if (removeBackground) formData.append("removeBackground", "yes");
        if (typeof resumeData.personal_info?.image === "object") {
          formData.append("image", resumeData.personal_info.image as File);
        }

        const { data } = await api.put("/api/resumes/update", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setResumeData(data.resume);
        toast.success(data.message);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to save resume");
        }
      }
    }, [resumeId, resumeData, removeBackground, token, setResumeData]);

    const handleSave = useCallback(() => {
      toast.promise(saveResume(), {
        loading: "Saving...",
        success: null,
        error: null,
      });
    }, [saveResume]);

    return (
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
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
          </motion.div>
        </AnimatePresence>

        {/* Save button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a1a18] text-white text-sm font-medium hover:bg-[#2d2d2b] transition-colors"
        >
          <Save className="w-3.5 h-3.5" aria-hidden="true" />
          Save Changes
        </motion.button>
      </div>
    );
  },
);

SectionContent.displayName = "SectionContent";

export default SectionContent;