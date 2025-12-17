import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { dummyResumeData } from "../../assets/assets";
import type { ResumeData } from "../../assets/types";
import ProgressBar from "./ProgressBar";
import SectionNavigation from "./SectionNavigation";
import SectionContent from "./SectionContent";
import ResumePreviewPanel from "./ResumePreviewPanel";

const ResumeBuilder: React.FC = () => {
  const { resumeId } = useParams<{ resumeId: string }>();

  const [resumeData, setResumeData] = useState<ResumeData>({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
    createdAt: "",
    updatedAt: "",
    userId: "",
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackGround] = useState(false);

  useEffect(() => {
    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (resume) {
      setResumeData(resume as ResumeData);
      document.title = resume.title;
    }
  }, [resumeId]);

  return (
    <main className="min-h-screen">
      {/* Back link */}
      <header className="max-w-7xl mx-auto px-6 py-6">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          <span>Back to Dashboard</span>
        </Link>
      </header>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Form Panel */}
          <section className="relative lg:col-span-5 rounded-lg overflow-hidden bg-white shadow-sm border border-gray-200 p-6 pt-1">
            <h2 id="resume-form-heading" className="sr-only">
              Resume Form
            </h2>

            <ProgressBar activeIndex={activeSectionIndex} total={6} />

            <SectionNavigation
              resumeData={resumeData}
              setResumeData={setResumeData}
              activeIndex={activeSectionIndex}
              setActiveIndex={setActiveSectionIndex}
              total={6}
            />

            <SectionContent
              activeIndex={activeSectionIndex}
              resumeData={resumeData}
              setResumeData={setResumeData}
              removeBackground={removeBackground}
              setRemoveBackGround={setRemoveBackGround}
            />
          </section>

          {/* Preview Panel */}
          <ResumePreviewPanel resumeData={resumeData} />
        </div>
      </div>
    </main>
  );
};

export default ResumeBuilder;
