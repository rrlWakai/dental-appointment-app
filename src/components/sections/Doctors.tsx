import { useMemo, useState } from "react";
import Card from "../ui/Card";
import { motion } from "framer-motion";
import {
  CalendarDaysIcon,
  CheckBadgeIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import DoctorProfileModal, {
  type DoctorProfile,
} from "../ui/DoctorProfileModal";

type Doctor = {
  name: string;
  role: string;
  experienceYears: number;
  image: string;
  schedule: string;
  rating: number;
  location: string;
  specialties: string[];
  bio: string;
  services: string[];
};

const doctors: Doctor[] = [
  {
    name: "Dr. Angela Cruz",
    role: "General Dentist",
    experienceYears: 12,
    image: "/doctors/doctor-1.jpg",
    schedule: "Mon–Sat • 9:00 AM – 5:00 PM",
    rating: 4.9,
    location: "SmileCare Clinic • San Pablo",
    specialties: ["Cleaning", "Extraction", "Family Care"],
    bio: "Dr. Cruz is known for gentle chairside care and clear patient education. She focuses on preventative dentistry and comfort-first treatment for all ages.",
    services: [
      "Teeth cleaning & polishing",
      "Tooth extraction (simple)",
      "Dental checkup & consultation",
      "Preventive care planning",
    ],
  },
  {
    name: "Dr. Miguel Santos",
    role: "Orthodontist",
    experienceYears: 10,
    image: "/doctors/doctor-2.jpg",
    schedule: "Mon–Fri • 10:00 AM – 6:00 PM",
    rating: 4.8,
    location: "SmileCare Clinic • San Pablo",
    specialties: ["Braces", "Alignment", "Clear Options"],
    bio: "Dr. Santos specializes in bite correction and modern orthodontics. He’s experienced in braces and clear aligner planning with a precision-first approach.",
    services: [
      "Braces assessment & planning",
      "Alignment and bite correction",
      "Clear aligner consultation",
      "Retainers & follow-up care",
    ],
  },
  {
    name: "Dr. Patricia Reyes",
    role: "Cosmetic Dentist",
    experienceYears: 8,
    image: "/doctors/doctor-3.jpg",
    schedule: "Tue–Sat • 9:00 AM – 4:00 PM",
    rating: 4.9,
    location: "SmileCare Clinic • San Pablo",
    specialties: ["Whitening", "Veneers", "Smile Makeover"],
    bio: "Dr. Reyes designs natural-looking cosmetic results with an eye for facial harmony and smile aesthetics. She prioritizes conservative, patient-approved enhancements.",
    services: [
      "Professional teeth whitening",
      "Veneers consultation",
      "Smile makeover planning",
      "Cosmetic evaluation & polishing",
    ],
  },
];

interface DoctorsProps {
  onBook: () => void;
  onPickDoctor?: (doctorName: string) => void;
}

export default function Doctors({ onBook, onPickDoctor }: DoctorsProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeDoctorName, setActiveDoctorName] = useState<string | null>(null);

  const activeDoctor: DoctorProfile | null = useMemo(() => {
    if (!activeDoctorName) return null;
    const d = doctors.find((x) => x.name === activeDoctorName);
    if (!d) return null;
    return {
      name: d.name,
      role: d.role,
      image: d.image,
      rating: d.rating,
      location: d.location,
      schedule: d.schedule,
      bio: d.bio,
      specialties: d.specialties,
      services: d.services,
    };
  }, [activeDoctorName]);

  const openProfile = (doctorName: string) => {
    setActiveDoctorName(doctorName);
    setProfileOpen(true);
  };

  const closeProfile = () => {
    setProfileOpen(false);
    setActiveDoctorName(null);
  };

  return (
    <section id="doctors" className="relative py-24 bg-slate-50">
      {/* separators */}
      <div className="pointer-events-none absolute top-0 left-0 h-10 w-full bg-gradient-to-b from-blue-200/40 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-blue-200/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Meet Our Dental Experts
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Trusted professionals focused on gentle care, modern methods, and
            patient comfort.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="h-full"
            >
              <Card className="group h-full overflow-hidden rounded-3xl border border-white/40 bg-white/75 backdrop-blur-xl shadow-md hover:shadow-xl transition">
                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* soft gradient for readability */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                  {/* rating pill */}
                  <div className="absolute right-4 top-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur">
                      <StarIcon className="h-4 w-4 text-yellow-500" />
                      {d.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Bottom badge strip */}
                  <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur">
                      <CheckBadgeIcon className="h-4 w-4 text-blue-700" />
                      {d.role}
                    </div>

                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/95 drop-shadow">
                      <ClockIcon className="h-4 w-4 text-white/90" />
                      {d.experienceYears}+ yrs
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="mt-5 flex h-full flex-col px-1 pb-6">
                  {/* Name + location */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {d.name}
                    </h3>
                    <p className="inline-flex items-center gap-2 text-sm text-slate-600">
                      <MapPinIcon className="h-4 w-4 text-slate-500" />
                      {d.location}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="mt-4 grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/60 px-4 py-3">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <UserIcon className="h-4 w-4 text-blue-700" />
                        Experience
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {d.experienceYears}+ years
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white/60 px-4 py-3">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 shrink-0">
                        <CalendarDaysIcon className="h-4 w-4 text-blue-700" />
                        Availability
                      </span>
                      <span className="text-sm font-semibold text-slate-800 text-right">
                        {d.schedule}
                      </span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Specialties
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {d.specialties.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA: single action (clean + non-overwhelming) */}
                  <div className="mt-8 pt-6 border-t border-slate-200/70 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => openProfile(d.name)}
                      className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
                    >
                      View profile
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Profile modal (booking happens here) */}
      <DoctorProfileModal
        isOpen={profileOpen}
        onClose={closeProfile}
        doctor={activeDoctor}
        onBook={() => {
          if (activeDoctor) onPickDoctor?.(activeDoctor.name);
          onBook();
        }}
      />
    </section>
  );
}
