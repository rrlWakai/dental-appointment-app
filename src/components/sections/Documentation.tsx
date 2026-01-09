import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const docs = [
  { src: "/clinic-building.png", alt: "Clinic Building" },
  { src: "/doctor.jpg", alt: "Dental Doctor" },
  { src: "/equipment1.jpg", alt: "Dental Equipment" },
  { src: "/equipment2.jpg", alt: "Operating Room" },
];

export default function Documentation() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="relative bg-gray-200 py-24">
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-blue-200/50 to-transparent"></div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Clinic Documentation
          </h2>
          <p className="text-gray-700 mt-4 text-lg">
            Explore our facilities, equipment, and team in action.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {docs.map((doc, i) => (
            <motion.div
              key={i}
              layoutId={`doc-${i}`}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative cursor-pointer rounded-xl overflow-hidden shadow-lg"
              onClick={() => setSelected(i)}
            >
              <img
                src={doc.src}
                alt={doc.alt}
                className="w-full h-64 object-cover transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-semibold">{doc.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.img
                src={docs[selected].src}
                alt={docs[selected].alt}
                className="max-h-full max-w-full rounded-xl shadow-2xl"
                layoutId={`doc-${selected}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-blue-200/50 to-transparent"></div>
    </section>
  );
}
