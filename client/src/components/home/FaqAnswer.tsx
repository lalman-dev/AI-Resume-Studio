import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Answer({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed(text.charAt(0));
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="origin-top overflow-hidden transform-gpu"
    >
      <p className="mt-2 text-sm text-slate-700">
        {displayed}
        <span className="animate-pulse">|</span>
      </p>
    </motion.div>
  );
}
