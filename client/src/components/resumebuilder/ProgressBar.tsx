import { motion } from "framer-motion";

const ProgressBar: React.FC<{ activeIndex: number; total: number }> = ({
  activeIndex,
  total,
}) => {
  const percentage = Math.round((activeIndex * 100) / (total - 1));

  return (
    <div
      className="absolute top-0 left-0 right-0 h-0.5 bg-gray-200"
      aria-hidden="true"
    >
      <motion.div
        role="progressbar"
        aria-label="Resume completion progress"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-full bg-[#1a1a18]"
      />
    </div>
  );
};

export default ProgressBar;
