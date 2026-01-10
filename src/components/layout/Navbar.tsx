import { useEffect, useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";

export interface NavbarProps {
  onBook: () => void;
}

const links = ["Home", "Services", "Doctors", "Contact"] as const;

export default function Navbar({ onBook }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // close menu when switching to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="backdrop-blur-xl bg-blue-900/55 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            <a
              href="#home"
              className="group flex items-center gap-2 rounded-lg px-1 focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
              aria-label="SmileCare Home"
            >
              <SparklesIcon className="h-6 w-6 text-yellow-200 drop-shadow-sm transition group-hover:scale-105" />
              <span className="font-bold text-lg text-white tracking-tight">
                SmileCare
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="group relative rounded-md px-1 transition-colors hover:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
                >
                  {link}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-yellow-200/90 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={onBook}
                className="rounded-full bg-yellow-300 px-6 py-2.5 text-sm font-semibold text-blue-950 shadow-sm shadow-yellow-300/20
                  hover:bg-yellow-200 hover:shadow-yellow-200/30
                  focus:outline-none focus:ring-2 focus:ring-yellow-300/70 transition"
              >
                Consultation
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen((v) => !v)}
                type="button"
                aria-label={
                  isOpen ? "Close navigation menu" : "Open navigation menu"
                }
                className="p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300/70 transition"
              >
                <span
                  className={`block w-6 h-0.5 bg-white mb-1 transform transition duration-300 ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white mb-1 transition-opacity duration-300 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/35 md:hidden"
            />

            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-0 right-0 z-50 md:hidden"
            >
              <div className="mx-auto max-w-7xl px-6">
                <div className="rounded-2xl border border-white/10 bg-blue-950/85 backdrop-blur-2xl shadow-xl overflow-hidden">
                  <ul className="flex flex-col px-4 py-4 gap-3 text-white/90 font-medium">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href={`#${link.toLowerCase()}`}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-xl px-3 py-2 hover:bg-white/10 hover:text-yellow-200 transition focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
                        >
                          {link}
                        </a>
                      </li>
                    ))}

                    <li className="pt-1">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onBook();
                        }}
                        className="w-full rounded-full bg-yellow-300 px-4 py-2.5 text-blue-950 font-semibold
                          hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300/70 transition"
                      >
                        Consultation
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
