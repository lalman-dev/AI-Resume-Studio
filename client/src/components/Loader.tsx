import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      role="status"
      aria-live="polite"
    >
      {/* spinning ring */}
      <div className="size-14 border-4 border-transparent border-t-purple-500 border-r-indigo-400 rounded-full animate-spin"></div>

      {/* loading text */}
      <p className="text-sm text-gray-600 animate-pulse">Loading resume…</p>
    </motion.div>
  );
};

export default Loader;
