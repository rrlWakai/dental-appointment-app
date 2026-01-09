import { useEffect } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

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
    const prev = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Escape to close (optional but nice UX)
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (stronger + EXTREMELY high z-index) */}
          <motion.div
            className="fixed inset-0 z-[99999] bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Wrapper (centered; always above everything) */}
          <motion.div
            className="fixed inset-0 z-[100000] flex items-center justify-center px-4 py-6 sm:py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal panel */}
            <motion.div
              className="relative w-full max-w-2xl rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl
                         bg-gradient-to-br from-blue-600/25 via-blue-500/15 to-white/10"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* extra base layer for readability (keeps your glass look but prevents noisy bleed) */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white/35" />

              {/* Header */}
              {title && (
                <div className="relative flex items-center justify-between px-6 py-3 border-b border-white/20">
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

              {/* Scrollable body */}
              <div className="relative p-6 max-h-[70vh] overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
