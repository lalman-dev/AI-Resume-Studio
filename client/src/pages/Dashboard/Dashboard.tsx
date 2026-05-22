import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Resume } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import CreateResumeModal from "./CreateResumeModal";
import UploadResumeModal from "./UploadResumeModal";
import EditResumeModal from "./EditResumeModal";
import { useAppSelector } from "../../app/hooks";
import api from "../../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";
import { handleAxiosError } from "../../utils/errorHandler";

// Skeleton card
const SkeletonCard = () => (
  <div className="w-full sm:w-36 h-48 rounded-xl border border-gray-100 bg-gray-50 animate-pulse" />
);

const Dashboard = () => {
  const { token, user } = useAppSelector((state) => state.auth);

  const [allResumes, setAllResumes] = useState<Resume[]>([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllResumes(data.resumes);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createResume = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setAllResumes((prev) => [...prev, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const uploadResume = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!resume) {
        toast.error("Please upload a resume first");
        return;
      }
      const resumeText = await pdfToText(resume);
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await api.put(
        "/api/resumes/update",
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setAllResumes((prev) =>
        prev.map((r) => (r._id === editResumeId ? { ...r, title } : r)),
      );
      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const deleteResume = async (resumeId: string) => {
    try {
      if (!window.confirm("Delete this resume? This cannot be undone.")) return;
      const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllResumes((prev) => prev.filter((r) => r._id !== resumeId));
      toast.success(data.message);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "#F5F7FA",
        backgroundImage: `
          linear-gradient(to right, #dde3ec 1px, transparent 1px),
          linear-gradient(to bottom, #dde3ec 1px, transparent 1px)
        `,
        backgroundSize: "28px 28px",
      }}
    >
      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(245,247,250,0.95) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-serif text-2xl font-bold text-[#1a1a18] tracking-tight">
            {user?.name ? `${user.name}'s Resumes` : "My Resumes"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, edit, and manage your resumes
          </p>
        </div>

        {/* Action cards — Create + Upload */}
        <section aria-label="Resume actions" className="flex gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateResume(true)}
            aria-label="Create new resume"
            className="w-full sm:w-36 h-48 flex flex-col items-center justify-center rounded-xl gap-3 bg-white border border-dashed border-gray-300 text-gray-500 hover:border-[#1a1a18] hover:text-[#1a1a18] transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#1a1a18] transition-all duration-200">
              <PlusIcon
                className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors"
                aria-hidden="true"
              />
            </div>
            <span className="text-xs font-medium text-center px-2">
              Create New
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowUploadResume(true)}
            aria-label="Upload existing resume"
            className="w-full sm:w-36 h-48 flex flex-col items-center justify-center rounded-xl gap-3 bg-white border border-dashed border-gray-300 text-gray-500 hover:border-[#1a1a18] hover:text-[#1a1a18] transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#1a1a18] transition-all duration-200">
              <UploadCloudIcon
                className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors"
                aria-hidden="true"
              />
            </div>
            <span className="text-xs font-medium text-center px-2">
              Upload PDF
            </span>
          </motion.button>
        </section>

        <div className="border-t border-gray-200 mb-6" />

        {/* Resume grid */}
        {isLoading ? (
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </div>
        ) : allResumes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-gray-400" aria-hidden="true" />
            </div>
            <p className="text-sm font-medium text-gray-600">No resumes yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Create or upload one to get started
            </p>
          </motion.div>
        ) : (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(136px, 1fr))",
            }}
            aria-live="polite"
          >
            <AnimatePresence>
              {allResumes.map((resume, index) => (
                <motion.div
                  key={resume._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  className="relative group"
                >
                  {/* Card */}
                  <button
                    onClick={() => navigate(`/app/builder/${resume._id}`)}
                    className="w-full h-48 flex flex-col items-center justify-center rounded-xl gap-2 bg-white border border-gray-200 hover:border-[#1a1a18] hover:shadow-sm transition-all duration-200"
                    aria-label={`Open ${resume.title}`}
                  >
                    <FilePenLineIcon
                      className="w-7 h-7 text-gray-400 group-hover:text-[#1a1a18] transition-colors"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-medium text-gray-700 text-center px-3 line-clamp-2">
                      {resume.title}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {new Date(resume.updatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </button>

                  {/* Hover actions */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute top-2 right-2 hidden group-hover:flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        setEditResumeId(resume._id);
                        setTitle(resume.title);
                      }}
                      aria-label={`Rename ${resume.title}`}
                      className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-[#1a1a18] hover:border-gray-400 transition-all"
                    >
                      <PencilIcon className="w-3 h-3" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => deleteResume(resume._id)}
                      aria-label={`Delete ${resume.title}`}
                      className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-300 transition-all"
                    >
                      <TrashIcon className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateResumeModal
        isOpen={showCreateResume}
        title={title}
        onChangeTitle={setTitle}
        onSubmit={createResume}
        onClose={() => {
          setShowCreateResume(false);
          setTitle("");
        }}
      />
      <UploadResumeModal
        isOpen={showUploadResume}
        title={title}
        isLoading={isLoading}
        resumeFile={resume}
        onChangeTitle={setTitle}
        onChangeFile={setResume}
        onSubmit={uploadResume}
        onClose={() => {
          setShowUploadResume(false);
          setTitle("");
          setResume(null);
        }}
      />
      <EditResumeModal
        isOpen={!!editResumeId}
        title={title}
        onChangeTitle={setTitle}
        onSubmit={editTitle}
        onClose={() => {
          setEditResumeId("");
          setTitle("");
        }}
      />
    </main>
  );
};

export default Dashboard;
