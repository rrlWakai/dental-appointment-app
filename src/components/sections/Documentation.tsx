import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

type DocItem = { src: string; alt: string };

const docs: DocItem[] = [
  { src: "/clinic-building.png", alt: "Clinic Building" },
  { src: "/doctor.jpg", alt: "Dental Doctor" },
  { src: "/equipment1.jpg", alt: "Dental Equipment" },
  { src: "/equipment2.jpg", alt: "Operating Room" },
];

export default function Documentation() {
  const [selected, setSelected] = useState<number | null>(null);

  const hasSelection = selected !== null;

  const current = useMemo(() => {
    if (selected === null) return null;
    return docs[selected];
  }, [selected]);

  const close = () => setSelected(null);

  const goPrev = () => {
    if (selected === null) return;
    setSelected((prev) => {
      if (prev === null) return null;
      return (prev - 1 + docs.length) % docs.length;
    });
  };

  const goNext = () => {
    if (selected === null) return;
    setSelected((prev) => {
      if (prev === null) return null;
      return (prev + 1) % docs.length;
    });
  };

  // ESC + Arrow keys
  useEffect(() => {
    if (!hasSelection) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSelection, selected]);

  return (
    <section id="documentation" className="relative py-24 bg-slate-50">
      {/* separators */}
      <div className="pointer-events-none absolute top-0 left-0 h-10 w-full bg-gradient-to-b from-blue-200/40 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-blue-200/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Clinic Gallery
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A closer look at our facilities, equipment, and team in action.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {docs.map((doc, i) => (
            <motion.button
              key={doc.alt}
              type="button"
              layoutId={`doc-${i}`}
              onClick={() => setSelected(i)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-md hover:shadow-xl ring-1 ring-slate-200/60 focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
              aria-label={`Open image: ${doc.alt}`}
            >
              <img
                src={doc.src}
                alt={doc.alt}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />

              {/* subtle caption gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/55 via-black/10 to-transparent">
                <p className="text-sm font-semibold text-white drop-shadow">
                  {doc.alt}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selected !== null && current && (
            <motion.div
              className="fixed inset-0 z-[999] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <motion.button
                type="button"
                aria-label="Close gallery"
                className="absolute inset-0 bg-black/55 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
              />

              {/* Panel */}
              <motion.div
                className="relative z-10 w-full max-w-5xl"
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Close */}
                <button
                  type="button"
                  onClick={close}
                  className="absolute -top-3 -right-3 rounded-full bg-white/90 backdrop-blur-xl p-2 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
                  aria-label="Close"
                >
                  <XMarkIcon className="h-5 w-5 text-slate-800" />
                </button>

                {/* Prev/Next */}
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-xl p-2 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon className="h-6 w-6 text-slate-800" />
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-xl p-2 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
                  aria-label="Next image"
                >
                  <ChevronRightIcon className="h-6 w-6 text-slate-800" />
                </button>

                {/* Image */}
                <motion.img
                  src={current.src}
                  alt={current.alt}
                  layoutId={`doc-${selected}`}
                  className="w-full max-h-[80vh] object-contain rounded-3xl shadow-2xl ring-1 ring-white/15 bg-black/10"
                  draggable={false}
                />

                {/* Caption */}
                <div className="mt-4 text-center">
                  <p className="text-sm font-semibold text-white/90">
                    {current.alt}
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    Use ← → arrow keys to navigate • ESC to close
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
