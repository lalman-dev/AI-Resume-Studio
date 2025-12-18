import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  Share2Icon,
} from "lucide-react";
import { dummyResumeData } from "../../assets/assets";
import type { ResumeData } from "../../utils/types";
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

  const changeResumeVisibility = async () => {
    setResumeData({ ...resumeData, public: !resumeData.public });
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert("Share is not supported on this browser.");
    }
  };

  return (
    <main className="min-h-screen">
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between">
        {/* Back link */}{" "}
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          <span>Back to Dashboard</span>
        </Link>
        {/* share , print button */}
        <div className="flex items-center justify-end gap-2">
          {resumeData.public && (
            <button
              onClick={handleShare}
              className="flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-300 hover:ring transition-colors"
            >
              <Share2Icon className="size-4" /> Share
            </button>
          )}
          <button
            onClick={changeResumeVisibility}
            className="flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-indigo-100 to-indigo-200 text-indigo-600 rounded-lg ring-indigo-300 hover:ring transition-colors"
          >
            {resumeData.public ? (
              <EyeIcon className="size-4" />
            ) : (
              <EyeOffIcon className="size-4" />
            )}
            {resumeData.public ? "Public" : "Private"}
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors"
          >
            <DownloadIcon className="size-4" /> Download
          </button>
        </div>
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
