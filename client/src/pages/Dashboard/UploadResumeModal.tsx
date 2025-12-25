import { motion } from "framer-motion";
import { XIcon, UploadCloudIcon, Loader2Icon } from "lucide-react";
import React from "react";

interface UploadResumeModalProps {
  isOpen: boolean;
  title: string;
  resumeFile: File | null;
  isLoading: boolean; // <-- new prop
  onChangeTitle: (value: string) => void;
  onChangeFile: (file: File | null) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

const UploadResumeModal: React.FC<UploadResumeModalProps> = ({
  isOpen,
  title,
  resumeFile,
  isLoading,
  onChangeTitle,
  onChangeFile,
  onSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
    >
      <motion.form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
      >
        <h2 className="text-xl font-bold mb-4">Upload an existing Resume</h2>
        <input
          onChange={(e) => onChangeTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="Enter resume title"
          className="w-full px-4 py-2 mb-4 focus:border-indigo-600 ring-indigo-600"
          required
        />
        <div>
          <label
            htmlFor="resume-input"
            className="block text-sm text-slate-700"
          >
            Select Resume File
            <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-indigo-500 hover:text-indigo-600 cursor-pointer transition-colors">
              {resumeFile ? (
                <p className="truncate max-w-xs">{resumeFile.name}</p>
              ) : (
                <UploadCloudIcon />
              )}
            </div>
          </label>
          <input
            type="file"
            id="resume-input"
            accept=".pdf"
            hidden
            onChange={(e) => onChangeFile(e.target.files?.[0] ?? null)}
          />
        </div>

        {/* Spinner replaces button when loading */}
        {isLoading ? (
          <div className="flex justify-center items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="flex items-center justify-center py-2"
            >
              <Loader2Icon className="size-6 text-indigo-600" />
            </motion.div>
            <span className="ml-2 text-indigo-600">Uploading...</span>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Upload Resume
          </motion.button>
        )}

        <XIcon
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
        />
      </motion.form>
    </motion.div>
  );
};

export default UploadResumeModal;
