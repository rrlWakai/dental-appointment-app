// src/components/layout/Navbar.tsx
import { SparklesIcon } from "@heroicons/react/24/solid";

export interface NavbarProps {
  onBook?: () => void; // ✅ add this
}

export default function Navbar({ onBook }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#55638B]">
      <nav className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <a href="#home" className="flex items-center gap-2 text-white">
            <SparklesIcon className="h-5 w-5 text-yellow-300" />
            <span className="text-lg font-extrabold tracking-tight">
              SmileCare
            </span>
          </a>

          {/* Links */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="text-sm font-semibold text-white/90 hover:text-white"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-sm font-semibold text-white/90 hover:text-white"
            >
              Services
            </a>
            <a
              href="#doctors"
              className="text-sm font-semibold text-white/90 hover:text-white"
            >
              Doctors
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold text-white/90 hover:text-white"
            >
              Contact
            </a>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={onBook} // ✅ will open Consultation modal
            className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-2 text-sm font-extrabold text-slate-900 shadow-sm hover:bg-yellow-300 transition focus:outline-none focus:ring-2 focus:ring-yellow-200"
          >
            Consultation
          </button>
        </div>
      </nav>
    </header>
  );
}
