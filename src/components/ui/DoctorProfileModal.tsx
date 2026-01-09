// src/components/ui/DoctorProfileModal.tsx
import Modal from "./Modal";
import Button from "./Button";
import {
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

export type DoctorProfile = {
  name: string;
  role: string;
  image: string;
  rating: number;
  location: string;
  schedule: string;
  bio: string;
  specialties: string[];
  services: string[];
};

interface DoctorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: DoctorProfile | null;
  onBook?: () => void;
}

export default function DoctorProfileModal({
  isOpen,
  onClose,
  doctor,
  onBook,
}: DoctorProfileModalProps) {
  if (!doctor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Doctor Profile">
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        {/* Left */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/30 backdrop-blur-xl shadow-sm">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-56 w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/35 backdrop-blur-xl p-4 shadow-sm">
            <p className="text-base font-extrabold text-slate-900">
              {doctor.name}
            </p>
            <p className="mt-1 text-sm font-semibold text-blue-700">
              {doctor.role}
            </p>

            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <p className="inline-flex items-center gap-2">
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">
                  {doctor.rating.toFixed(1)}
                </span>
                <span className="text-slate-500">rating</span>
              </p>

              <p className="inline-flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-slate-600" />
                <span>{doctor.location}</span>
              </p>

              <p className="inline-flex items-center gap-2">
                <CalendarDaysIcon className="h-4 w-4 text-slate-600" />
                <span>{doctor.schedule}</span>
              </p>
            </div>

            {onBook && (
              <Button
                className="mt-4 w-full rounded-full"
                onClick={() => {
                  onClose();
                  onBook();
                }}
              >
                Book with this doctor
              </Button>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Bio */}
          <div className="rounded-2xl border border-white/20 bg-white/35 backdrop-blur-xl p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-900">Bio</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {doctor.bio}
            </p>
          </div>

          {/* Specialties */}
          <div className="rounded-2xl border border-white/20 bg-white/35 backdrop-blur-xl p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-900">Specialties</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {doctor.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-800"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="rounded-2xl border border-white/20 bg-white/35 backdrop-blur-xl p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-900">Services</p>
            <ul className="mt-3 space-y-2">
              {doctor.services.map((svc) => (
                <li
                  key={svc}
                  className="flex items-start gap-2 text-sm text-slate-700"
                >
                  <ClipboardDocumentCheckIcon className="mt-0.5 h-4 w-4 text-blue-700" />
                  <span>{svc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer actions (only Close now) */}
          <div className="flex justify-end">
            <Button
              variant="secondary"
              onClick={onClose}
              className="rounded-full"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
