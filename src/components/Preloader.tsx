"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hold logo a bit longer before fade
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-xl"
        >
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="font-display text-2xl md:text-4xl text-slate-900 tracking-[0.2em] flex items-center"
            >
              <span className="font-bold">CU</span>
              <motion.span 
                initial={{ color: "#0f172a" }}
                animate={{ color: "#64748b" }}
                transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
                className="font-light ml-2"
              >
                BA
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
