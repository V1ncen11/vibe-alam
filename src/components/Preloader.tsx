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
              className="flex items-center gap-2 text-3xl md:text-4xl font-medium tracking-tight text-slate-900"
            >
              <svg width="42" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900">
                <path d="M 14 2 L 14 18 C 14 24 22 24 22 18 C 22 12 14 12 14 12" />
                <path d="M 10 12 C 2 12 2 18 10 18 L 14 18" />
              </svg>
              <motion.span 
                initial={{ color: "#0f172a" }}
                animate={{ color: "#64748b" }}
                transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
              >
                cuba
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
