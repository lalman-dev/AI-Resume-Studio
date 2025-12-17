import { motion } from "framer-motion";

const ProgressBar: React.FC<{ activeIndex: number; total: number }> = ({
  activeIndex,
  total,
}) => (
  <div className="absolute top-0 left-0 right-0">
    <motion.div className="h-1 bg-gray-200" />
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${(activeIndex * 100) / (total - 1)}%` }}
      transition={{ duration: 0.5 }}
      className="h-1 bg-linear-to-r from-cyan-300 via-purple-400 to-blue-600"
      role="progressbar"
      aria-valuenow={activeIndex}
      aria-valuemin={0}
      aria-valuemax={total - 1}
    />
  </div>
);

export default ProgressBar;
