import { motion } from "framer-motion";
import { XIcon } from "lucide-react";
import React from "react";

interface EditResumeModalProps {
  isOpen: boolean;
  title: string;
  onChangeTitle: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

const EditResumeModal: React.FC<EditResumeModalProps> = ({
  isOpen,
  title,
  onChangeTitle,
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
        <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
        <input
          onChange={(e) => onChangeTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="Enter resume title"
          className="w-full px-4 py-2 mb-4 focus:border-purple-600 ring-purple-600"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
        >
          Update
        </motion.button>
        <XIcon
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
        />
      </motion.form>
    </motion.div>
  );
};

export default EditResumeModal;
