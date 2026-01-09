import { useMemo, useState } from "react";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import { motion } from "framer-motion";
import {
  BeakerIcon,
  SparklesIcon,
  CalendarIcon,
  HeartIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

type Service = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
};

const services: Service[] = [
  {
    title: "Teeth Cleaning",
    description:
      "Professional cleaning for a bright and healthy smile with gentle care.",
    icon: BeakerIcon,
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Tooth Extraction",
    description:
      "Safe and painless procedures performed by experienced dentists.",
    icon: SparklesIcon,
    color: "from-red-400 to-red-600",
  },
  {
    title: "Braces & Alignment",
    description:
      "Modern orthodontics for perfectly aligned teeth and confident smiles.",
    icon: CalendarIcon,
    color: "from-green-400 to-green-600",
  },
  {
    title: "Cosmetic Dentistry",
    description:
      "Whitening, veneers, and smile makeovers to enhance your appearance.",
    icon: HeartIcon,
    color: "from-pink-400 to-pink-600",
  },
];

function getProcessSteps(serviceTitle: string) {
  switch (serviceTitle) {
    case "Teeth Cleaning":
      return [
        "Quick oral check & gum assessment",
        "Gentle scaling to remove plaque/tartar",
        "Polishing for a smoother, brighter finish",
        "After-care tips and hygiene recommendations",
      ];
    case "Tooth Extraction":
      return [
        "Examination & X-ray assessment",
        "Anesthesia for comfort",
        "Safe tooth removal procedure",
        "Post-op instructions and follow-up if needed",
      ];
    case "Braces & Alignment":
      return [
        "Consultation & bite assessment",
        "Treatment plan options (braces/aligners)",
        "Installation/fitting",
        "Regular adjustments and progress checks",
      ];
    case "Cosmetic Dentistry":
      return [
        "Smile goals discussion",
        "Shade & shape evaluation",
        "Procedure (whitening/veneers/etc.)",
        "Results review + after-care plan",
      ];
    default:
      return [
        "Assessment & consultation",
        "Procedure planning",
        "Treatment session",
        "After-care guidance",
      ];
  }
}

export default function Services() {
  const [open, setOpen] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);

  const steps = useMemo(() => {
    if (!activeService) return [];
    return getProcessSteps(activeService.title);
  }, [activeService]);

  return (
    <section id="services" className="relative bg-slate-50 py-24">
      <div className="pointer-events-none absolute top-0 left-0 h-10 w-full bg-gradient-to-b from-blue-200/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Dental Services
          </h2>
          <p className="text-slate-600 mt-4 text-lg">
            Comprehensive dental care tailored to your needs using modern
            equipment and advanced techniques.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Card className="group p-7 rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-md hover:shadow-xl transition">
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white mb-5 shadow-sm`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveService(service);
                      setOpen(true);
                    }}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    <InformationCircleIcon className="h-4 w-4" />
                    Learn More
                  </button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title={
            activeService
              ? `${activeService.title} — What to Expect`
              : "What to Expect"
          }
        >
          {activeService && (
            <div className="space-y-5">
              <p className="text-slate-700">
                Here’s the typical process for <b>{activeService.title}</b>.
                This helps you understand the steps before booking.
              </p>

              <ol className="space-y-3">
                {steps.map((s) => (
                  <li
                    key={s}
                    className="flex gap-3 rounded-2xl border border-white/40 bg-white/70 p-4 shadow-sm"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600/80" />
                    <span className="text-slate-700">{s}</span>
                  </li>
                ))}
              </ol>

              <div className="rounded-2xl border border-blue-200/60 bg-blue-50/60 p-4">
                <p className="text-sm text-slate-700">
                  Want to know what’s best for your condition? Use the{" "}
                  <b>Consultation</b> button in the navbar to get a
                  recommendation.
                </p>
              </div>
            </div>
          )}
        </Modal>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-blue-200/40 to-transparent" />
    </section>
  );
}
