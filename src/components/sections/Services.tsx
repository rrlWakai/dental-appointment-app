import Card from "../ui/Card";
import { motion } from "framer-motion";
import {
  BeakerIcon,
  SparklesIcon,
  CalendarIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

const services = [
  {
    title: "Teeth Cleaning",
    description:
      "Professional cleaning for a bright and healthy smile with gentle care.",
    icon: BeakerIcon,
  },
  {
    title: "Tooth Extraction",
    description:
      "Safe and comfortable procedures performed by experienced dentists.",
    icon: SparklesIcon,
  },
  {
    title: "Braces & Alignment",
    description: "Modern orthodontics for aligned teeth and confident smiles.",
    icon: CalendarIcon,
  },
  {
    title: "Cosmetic Dentistry",
    description:
      "Whitening, veneers, and smile makeovers to enhance your appearance.",
    icon: HeartIcon,
  },
];

export default function Services({ onBook }: { onBook: () => void }) {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 bg-slate-50 py-24 overflow-hidden"
    >
      {/* soft glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-72 w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/2 h-72 w-[900px] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold text-slate-700 shadow-sm">
            Services
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
            Our Dental Services
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Comprehensive dental care tailored to your needs using modern
            equipment and advanced techniques.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="h-full"
              >
                <Card className="group h-full p-8 rounded-3xl transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-md ring-1 ring-white/40">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>

                  <button
                    type="button"
                    onClick={onBook}
                    className="mt-5 inline-flex text-sm font-semibold text-blue-700 opacity-0 transition group-hover:opacity-100"
                  >
                    Book this service →
                  </button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Panel */}
        <div className="mt-14">
          <div className="rounded-3xl border border-slate-200 bg-white/70 backdrop-blur-xl p-8 shadow-sm flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Not sure what you need?
              </h3>
              <p className="mt-1 text-slate-600">
                Book a consultation and we’ll recommend the best treatment for
                you.
              </p>
            </div>

            <button
              onClick={onBook}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm
                hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
