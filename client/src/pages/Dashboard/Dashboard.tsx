import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Resume } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import CreateResumeModal from "./CreateResumeModal";
import UploadResumeModal from "./UploadResumeModal";
import EditResumeModal from "./EditResumeModal";
import { useAppSelector } from "../../app/hooks";
import api from "../../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";
import { AxiosError } from "axios";

const Dashboard = () => {
  const { user, token } = useAppSelector((state) => state.auth);

  const [allResumes, setAllResumes] = useState<Resume[]>([]);
  const [showCreateResume, setShowCreateResume] = useState<boolean>(false);
  const [showUploadResume, setShowUploadResume] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [resume, setResume] = useState<File | null>(null);
  const [editResumeId, setEditResumeId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const colors: string[] = [
    "#9333ea",
    "#d97706",
    "#dc2626",
    "#0284c7",
    "#16a34a",
  ];

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Something went wrong");
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createResume = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        toast.error(
          axiosError.response?.data?.message || "Something went wrong"
        );
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  };

  const uploadResume = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!resume) {
        toast.error("Please upload a resume first");
        setIsLoading(false);
        return;
      }
      const resumeText = await pdfToText(resume);
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } }
      );
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Something went wrong");
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAllResumes((prev) =>
      prev.map((r) => (r._id === editResumeId ? { ...r, title } : r))
    );
    setEditResumeId("");
    setTitle("");
  };

  const deleteResume = async (resumeId: string) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      setAllResumes((prev) => prev.filter((resume) => resume._id !== resumeId));
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <main className="min-h-screen bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient.png')] bg-cover">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Hello, Alex{" "}
        </p>

        {/* Create + Upload buttons */}
        <section className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-purple-200 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon
              aria-label="Create new resume"
              className="size-11 transition-all duration-300 p-2.5 bg-linear-to-r from-purple-300 to-purple-500 text-white rounded-full"
            />
            <p className="text-sm group-hover:text-purple-600 transition-all">
              Create New Resume
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-indigo-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon
              aria-label="Upload resume"
              className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-indigo-200 to-indigo-500 text-white rounded-full "
            />
            <p className="text-sm group-hover:text-indigo-600 transition-all">
              Upload Resume
            </p>
          </motion.button>
        </section>

        <hr className="border-slate-300 my-6 sm:w-76" />

        {/* Resume List */}
        {allResumes.length === 0 ? (
          <p aria-live="polite" className="text-slate-500 text-sm">
            No resumes yet. Create or upload one to get started.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
            {allResumes.map((resume, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <motion.button
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  key={resume._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                    borderColor: baseColor + "40",
                  }}
                >
                  <FilePenLineIcon
                    aria-label="Resume file"
                    className="size-7 group-hover:scale-105 transition-all"
                    style={{ color: baseColor }}
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                    style={{ color: baseColor }}
                  >
                    {resume.title}
                  </motion.p>
                  <p
                    className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                    style={{ color: baseColor + "90" }}
                  >
                    updated on {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                  <motion.div
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute top-1 right-1 group-hover:flex items-center hidden"
                  >
                    <TrashIcon
                      aria-label="Delete resume"
                      onClick={() => deleteResume(resume._id)}
                      className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                    />
                    <PencilIcon
                      aria-label="Edit resume"
                      onClick={() => {
                        setEditResumeId(resume._id);
                        setTitle(resume.title);
                      }}
                      className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                    />
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        )}

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
      </div>
    </main>
  );
};

export default Dashboard;
