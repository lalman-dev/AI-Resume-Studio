import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkle,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PersonalInfoForm from "../components/PersonalInfoForm";

interface ResumeData {
  _id: string;
  title: string;
  personal_info: any;
  professional_summary: string;
  experience: any[];
  education: any[];
  project: any[];
  skills: string[];
  template: string;
  accent_color: string;
  public: boolean;
}

interface Section {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ResumeBuilder: React.FC = () => {
  const { resumeId } = useParams<{ resumeId: string }>();

  const [resumeData, setResumeData] = useState<ResumeData>({
    _id: "",
    title: "",
    personal_info: "",
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [removeBackground, setRemoveBackGround] = useState<boolean>(false);

  const sections: Section[] = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkle },
  ];

  const activeSection = sections[activeSectionIndex];

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (resume) {
      setResumeData(resume as ResumeData);
      document.title = resume.title;
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Back link */}
      <header className="max-w-7xl mx-auto px-6 py-6">
        <Link
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
          to="/app"
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          <span>Back to Dashboard</span>
        </Link>
      </header>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Form - Left side */}
          <section
            aria-labelledby="resume-form-heading"
            className="relative lg:col-span-5 rounded-lg overflow-hidden"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              <h2 id="resume-form-heading" className="sr-only">
                Resume Form
              </h2>

              {/* Progress Bar */}
              <motion.hr
                layout
                className="absolute top-0 left-0 right-0 border-2 border-gray-200"
              />
              <motion.hr
                layout
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    (activeSectionIndex * 100) / (sections.length - 1)
                  }%`,
                }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 h-1 bg-linear-to-r from-cyan-300  via-purple-400 to-blue-600 border-none"
              />

              {/* Section Navigation */}
              <nav
                aria-label="Section navigation"
                className="flex justify-between items-center mb-6 border-b border-gray-300 py-1"
              >
                <div></div>
                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0)
                        )
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className="size-4" aria-hidden="true" />
                      Previous
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1)
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSectionIndex === sections.length - 1
                        ? "opacity-50"
                        : ""
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </motion.button>
                </div>
              </nav>

              {/* Form Content */}
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {activeSection.id === "personal" && (
                    <motion.div
                      key="personal-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <PersonalInfoForm
                        data={resumeData.personal_info}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personal_info: data,
                          }))
                        }
                        removeBackground={removeBackground}
                        setRemoveBackGround={setRemoveBackGround}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Preview - right side panel */}
          <aside className="lg:col-span-7" aria-label="Resume preview">
            {/* TODO: Add preview content */}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ResumeBuilder;
