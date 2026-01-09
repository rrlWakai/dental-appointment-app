import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import Button from "./Button";

const services = [
  "Teeth Cleaning",
  "Tooth Extraction",
  "Braces & Alignment",
  "Cosmetic Dentistry",
];

const doctors = ["Dr. Angela Cruz", "Dr. Miguel Santos", "Dr. Patricia Reyes"];

const defaultTimeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
] as const;

type Payment = "clinic" | "online" | "";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = {
  step: 1 | 2 | 3 | 4;
  service: string;
  doctor: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  payment: Payment;
};

const initialForm: FormState = {
  step: 1,
  service: "",
  doctor: "",
  date: "",
  time: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
  payment: "",
};

export default function AppointmentModal({
  isOpen,
  onClose,
}: AppointmentModalProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const stepLabels = useMemo(
    () => ["Service", "Date & Time", "Details", "Payment"],
    []
  );

  const todayISO = useMemo(() => new Date().toISOString().split("T")[0], []);

  // Reset ONLY when opening (prevents cascading setState warnings)
  useEffect(() => {
    if (!isOpen) return;
    setForm(initialForm);
    setTimeSlots([]);
  }, [isOpen]);

  // ESC close
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Auto scroll to top of modal content when changing steps
  useEffect(() => {
    if (!isOpen) return;
    const el = document.querySelector("#appointment-scroll");
    (el as HTMLElement | null)?.scrollTo({ top: 0, behavior: "smooth" });
  }, [form.step, isOpen]);

  const progressWidthClass =
    form.step === 1
      ? "w-0"
      : form.step === 2
      ? "w-1/3"
      : form.step === 3
      ? "w-2/3"
      : "w-full";

  const isNextDisabled = () => {
    if (form.step === 1) return !form.service || !form.doctor;
    if (form.step === 2) return !form.date || !form.time;
    if (form.step === 3)
      return !form.firstName || !form.lastName || !form.email || !form.phone;
    return false;
  };

  const handleNext = () => {
    setForm((prev) => ({
      ...prev,
      step: Math.min(4, prev.step + 1) as FormState["step"],
    }));
  };

  const handleBack = () => {
    setForm((prev) => ({
      ...prev,
      step: Math.max(1, prev.step - 1) as FormState["step"],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      ...form,
      timeSlots,
    });

    alert("Appointment booked successfully!");
    onClose();
  };

  // Styles
  const inputClasses =
    "w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm outline-none backdrop-blur-xl focus:ring-2 focus:ring-blue-500";
  const sectionClasses =
    "rounded-2xl border border-white/20 bg-white/55 backdrop-blur-xl p-6 shadow-sm";

  const optionBase =
    "inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500";
  const optionActive =
    "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/20 ring-2 ring-blue-400/30";
  const optionIdle =
    "border-slate-200 bg-white/70 text-slate-700 hover:bg-white";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Your Appointment">
      <form onSubmit={handleSubmit} className="space-y-7 max-w-xl mx-auto">
        {/* Stepper */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {stepLabels.map((label, i) => {
              const idx = (i + 1) as FormState["step"];
              const isActive = form.step === idx;
              const isCompleted = form.step > idx;

              return (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                        : isCompleted
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {idx}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      isActive
                        ? "text-blue-700"
                        : isCompleted
                        ? "text-emerald-700"
                        : "text-slate-500"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar (no inline styles) */}
          <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
            <div
              className={`h-full rounded-full bg-blue-600/80 transition-all duration-300 ${progressWidthClass}`}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {form.step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }}
              className={`${sectionClasses} space-y-6`}
            >
              <div>
                <p className="text-slate-700 font-semibold mb-3">
                  Select Service <span className="text-rose-500">*</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {services.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          service: s,
                        }))
                      }
                      className={`${optionBase} ${
                        form.service === s ? optionActive : optionIdle
                      }`}
                    >
                      {form.service === s && (
                        <span className="text-white">✓</span>
                      )}
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-slate-700 font-semibold mb-3">
                  Preferred Doctor <span className="text-rose-500">*</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {doctors.map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          doctor: d,
                        }))
                      }
                      className={`${optionBase} ${
                        form.doctor === d ? optionActive : optionIdle
                      }`}
                    >
                      {form.doctor === d && (
                        <span className="text-white">✓</span>
                      )}
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white/60 p-4 text-sm text-slate-600">
                Tip: If you’re unsure, choose any doctor — we’ll confirm
                availability after booking.
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {form.step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }}
              className={`${sectionClasses} space-y-6`}
            >
              <div>
                <label
                  className="block text-slate-700 font-semibold mb-3"
                  htmlFor="date"
                >
                  Select Date <span className="text-rose-500">*</span>
                </label>
                <input
                  id="date"
                  type="date"
                  value={form.date}
                  min={todayISO}
                  onChange={(e) => {
                    const v = e.target.value;
                    setForm((p) => ({ ...p, date: v, time: "" }));
                    setTimeSlots([...defaultTimeSlots]);
                  }}
                  className={inputClasses}
                  required
                />
              </div>

              {form.date && (
                <div>
                  <p className="text-slate-700 font-semibold mb-3">
                    Select Time <span className="text-rose-500">*</span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, time: t }))}
                        className={`${optionBase} ${
                          form.time === t ? optionActive : optionIdle
                        }`}
                      >
                        {form.time === t && (
                          <span className="text-white">✓</span>
                        )}
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 3 */}
          {form.step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }}
              className={`${sectionClasses} space-y-5`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name *"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, firstName: e.target.value }))
                  }
                  className={inputClasses}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name *"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, lastName: e.target.value }))
                  }
                  className={inputClasses}
                  required
                />
              </div>

              <input
                type="email"
                placeholder="Email Address *"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                className={inputClasses}
                required
              />

              <input
                type="tel"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                className={inputClasses}
                required
              />

              <textarea
                placeholder="Additional Notes (optional)"
                value={form.notes}
                onChange={(e) =>
                  setForm((p) => ({ ...p, notes: e.target.value }))
                }
                className={inputClasses}
                rows={3}
              />

              <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-xl p-4 shadow-sm text-slate-700">
                <h4 className="font-bold text-slate-900 mb-2">
                  Appointment Summary
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <p>
                    <span className="font-semibold">Service:</span>{" "}
                    {form.service || "-"}
                  </p>
                  <p>
                    <span className="font-semibold">Doctor:</span>{" "}
                    {form.doctor || "-"}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {form.date || "-"}
                  </p>
                  <p>
                    <span className="font-semibold">Time:</span>{" "}
                    {form.time || "-"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4 */}
          {form.step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }}
              className={`${sectionClasses} space-y-5`}
            >
              <div>
                <p className="text-slate-700 font-semibold mb-2">
                  Payment Method <span className="text-rose-500">*</span>
                </p>
                <p className="text-sm text-slate-600">
                  Choose how you’d like to pay for your appointment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, payment: "clinic" }))}
                  className={`text-left rounded-2xl border p-5 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    form.payment === "clinic"
                      ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20 ring-2 ring-blue-400/30"
                      : "border-slate-200 bg-white/70 text-slate-800 hover:bg-white"
                  }`}
                >
                  <p className="font-bold">Pay at Clinic</p>
                  <p
                    className={`mt-1 text-sm ${
                      form.payment === "clinic"
                        ? "text-white/85"
                        : "text-slate-600"
                    }`}
                  >
                    Pay after consultation. No online fees.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, payment: "online" }))}
                  className={`text-left rounded-2xl border p-5 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    form.payment === "online"
                      ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20 ring-2 ring-blue-400/30"
                      : "border-slate-200 bg-white/70 text-slate-800 hover:bg-white"
                  }`}
                >
                  <p className="font-bold">Online Payment</p>
                  <p
                    className={`mt-1 text-sm ${
                      form.payment === "online"
                        ? "text-white/85"
                        : "text-slate-600"
                    }`}
                  >
                    Secure checkout. Confirmation is faster.
                  </p>
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white/60 p-4 text-sm text-slate-600">
                By confirming, you agree to receive updates via email/SMS
                regarding your appointment.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3">
          {form.step > 1 ? (
            <Button type="button" variant="secondary" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <span />
          )}

          {form.step < 4 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={isNextDisabled()}
            >
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={!form.payment}>
              Confirm Appointment
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}
