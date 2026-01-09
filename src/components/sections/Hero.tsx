import { UserGroupIcon } from "@heroicons/react/24/solid";
import BookAppointmentButton from "../ui/BookAppointmentButton";

interface HeroProps {
  onBook: () => void;
}

export default function Hero({ onBook }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background */}
      <img
        src="/clinic-building.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/65 to-blue-950/70" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_25%_40%,rgba(0,0,0,0.35),transparent_65%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-16 sm:pt-12 sm:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div className="text-white text-center lg:text-left">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Professional Dental <br className="hidden sm:block" />
              Care{" "}
              <span className="block">
                <span className="bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent drop-shadow">
                  You Can Trust
                </span>
              </span>
            </h1>

            <p className="mt-5 mx-auto max-w-xl text-base text-white/85 sm:text-lg lg:mx-0">
              SmileCare Dental Clinic offers modern, gentle, and affordable
              dental treatments delivered by experienced professionals.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <BookAppointmentButton onClick={onBook} />
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
              >
                View Services
              </a>
            </div>

            {/* Stats (clean separators) */}
            <div className="mt-8 mx-auto max-w-xl rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-xl lg:mx-0">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { value: "4.9★", label: "Patient Rating" },
                  { value: "10+", label: "Years Experience" },
                  { value: "5k+", label: "Happy Patients" },
                ].map((s, idx) => (
                  <div
                    key={s.label}
                    className={`px-2 ${
                      idx !== 0 ? "border-l border-white/10" : ""
                    }`}
                  >
                    <p className="text-2xl font-bold text-white">{s.value}</p>
                    <p className="mt-0.5 text-xs text-white/70 sm:text-sm">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/15">
              <img
                src="/doctor.jpg"
                alt="Dental doctor at work"
                className="h-[420px] w-full object-cover sm:h-[520px]"
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
            </div>

            {/* Trust Card */}
            <div className="absolute -bottom-7 left-1/2 w-[92%] -translate-x-1/2 rounded-2xl border border-white/20 bg-white/12 p-5 backdrop-blur-2xl shadow-xl sm:w-[82%] lg:left-10 lg:translate-x-0">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/15">
                  <UserGroupIcon className="h-6 w-6 text-yellow-200" />
                </span>
                <div>
                  <p className="font-semibold text-white">
                    Trusted Dental Professionals
                  </p>
                  <p className="mt-1 text-sm text-white/75">
                    Advanced equipment & patient-centered care
                  </p>
                </div>
              </div>
            </div>

            {/* Spacer so card never clips */}
            <div className="h-16" />
          </div>
        </div>
      </div>
    </section>
  );
}
