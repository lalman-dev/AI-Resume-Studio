import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import type { Resume } from "../utils/types";
import ResumePreview from "../components/ResumePreview";
import Loader from "../components/Loader";
import { ArrowLeftIcon } from "lucide-react";
import { motion } from "framer-motion";

const Preview = () => {
  const { resumeId } = useParams<{ resumeId: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resumeData, setResumeData] = useState<Resume | null>(null);

  useEffect(() => {
    const loadResume = () => {
      const found =
        dummyResumeData.find((resume) => resume._id === resumeId) || null;
      setResumeData(found);
      setIsLoading(false);
    };
    loadResume();
  }, [resumeId]);

  if (isLoading) {
    return <Loader />;
  }

  return resumeData ? (
    <main className="bg-slate-100 min-h-screen">
      <motion.section
        className="max-w-3xl mx-auto py-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        aria-label="Resume preview"
      >
        <ResumePreview
          data={resumeData}
          template={
            resumeData.template as
              | "classic"
              | "modern"
              | "minimal"
              | "minimal-image"
          }
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white rounded-lg shadow-md"
        />
      </motion.section>
    </main>
  ) : (
    <main className="flex flex-col items-center justify-center h-screen bg-slate-50">
      <motion.p
        className="text-center text-4xl sm:text-6xl text-slate-400 font-semibold"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Resume not found
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
          to="/"
          className="mt-6 inline-flex items-center px-6 h-10 rounded-full bg-linear-to-br from-purple-200 to-purple-400 
                     hover:from-purple-400 hover:to-purple-300 
                     text-white font-medium ring-1 ring-purple-400 ring-offset-1 
                     transition-colors"
        >
          <ArrowLeftIcon className="mr-2 size-4" aria-hidden="true" />
          Go to home page
        </Link>
      </motion.div>
    </main>
  );
};

export default Preview;
