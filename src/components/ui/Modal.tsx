import { useEffect } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal wrapper */}
          <motion.div
            className="fixed inset-0 z-[1000] flex items-start justify-center px-4 py-6 sm:py-12 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Modal content */}
            <motion.div
              className="relative w-full max-w-2xl bg-gradient-to-br from-blue-600/25 via-blue-500/15 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between px-6 py-3 border-b border-white/20">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-slate-800 hover:text-slate-600 text-2xl leading-none"
                    aria-label="Close modal"
                    title="Close"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Scrollable content */}
              <div
                id="appointment-scroll"
                className="p-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100"
              >
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
