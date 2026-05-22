import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  Share2Icon,
  CheckIcon,
} from "lucide-react";
import type { ResumeData } from "../../utils/types";
import ProgressBar from "./ProgressBar";
import SectionNavigation from "./SectionNavigation";
import SectionContent from "./SectionContent";
import ResumePreviewPanel from "./ResumePreviewPanel";
import { useAppSelector } from "../../app/hooks";
import api from "../../configs/api";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../utils/errorHandler";

const emptyResume: ResumeData = {
  _id: "",
  title: "",
  personal_info: {
    full_name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    profession: "",
    image: "",
  },
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
};

const ResumeBuilder: React.FC = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const { token } = useAppSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState<ResumeData>(emptyResume);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackGround] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.resume) {
        setResumeData(data.resume);
        document.title = `${data.resume.title} — AI Resume Studio`;
      }
    } catch (err) {
      handleAxiosError(err, "Failed to load resume");
    }
  };

  useEffect(() => {
    if (resumeId) loadExistingResume();
  }, [resumeId]);

  const changeResumeVisibility = async () => {
    try {
      if (!resumeId) throw new Error("resumeId is required");
      const updated = { ...resumeData, public: !resumeData.public };
      const { data } = await api.put(
        "/api/resumes/update",
        { resumeId, resumeData: updated },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setResumeData(data.resume);
      toast.success(data.message);
    } catch (err) {
      handleAxiosError(err, "Failed to update visibility");
    }
  };

  // Clipboard share — no alert() fallback
  const handleShare = async () => {
    const base = window.location.href.split("/app/")[0];
    const url = `${base}/view/${resumeId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy link — try copying from the address bar");
    }
  };

  // Proper print — print CSS handles hiding app chrome
  const downloadResume = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Back link */}
          <Link
            to="/app"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
            <span>Dashboard</span>
          </Link>

          {/* Resume title */}
          <span className="hidden md:block text-sm font-medium text-gray-700 truncate max-w-xs">
            {resumeData.title || "Untitled Resume"}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Share — only when public */}
            {resumeData.public && (
              <button
                onClick={handleShare}
                aria-label="Copy share link"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all"
              >
                {copied ? (
                  <CheckIcon
                    className="w-3.5 h-3.5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <Share2Icon className="w-3.5 h-3.5" aria-hidden="true" />
                )}
                {copied ? "Copied!" : "Share"}
              </button>
            )}

            {/* Visibility toggle */}
            <button
              onClick={changeResumeVisibility}
              aria-label={
                resumeData.public ? "Make resume private" : "Make resume public"
              }
              aria-pressed={resumeData.public}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                resumeData.public
                  ? "border-[#1a1a18] bg-[#1a1a18] text-white hover:bg-[#2d2d2b]"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900"
              }`}
            >
              {resumeData.public ? (
                <EyeIcon className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <EyeOffIcon className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              {resumeData.public ? "Public" : "Private"}
            </button>

            {/* Download */}
            <button
              onClick={downloadResume}
              aria-label="Download resume as PDF"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all"
            >
              <DownloadIcon className="w-3.5 h-3.5" aria-hidden="true" />
              Download
            </button>
          </div>
        </div>
      </header>

      {/* Builder body */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Form panel */}
          <section
            className="relative lg:col-span-5 rounded-xl overflow-hidden bg-white border border-gray-200 p-6 pt-1"
            aria-labelledby="resume-form-heading"
          >
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

          {/* Preview panel */}
          <ResumePreviewPanel resumeData={resumeData} />
        </div>
      </div>
    </main>
  );
};

export default ResumeBuilder;
 