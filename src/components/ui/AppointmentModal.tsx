import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal";
import Button from "./Button";

type Step = 1 | 2 | 3 | 4;

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
];

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillService?: string;
  prefillDoctor?: string;
  autoStep2?: boolean;
}

function nextStep(s: Step): Step {
  return Math.min(4, s + 1) as Step;
}
function prevStep(s: Step): Step {
  return Math.max(1, s - 1) as Step;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  prefillService,
  prefillDoctor,
  autoStep2,
}: AppointmentModalProps) {
  const initialStep: Step = autoStep2 ? 2 : 1;

  const [step, setStep] = useState<Step>(initialStep);

  // Step 1
  const [service, setService] = useState(prefillService ?? "");
  const [doctor, setDoctor] = useState(prefillDoctor ?? "");

  // Step 2
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [time, setTime] = useState("");

  // Step 3
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Step 4
  const [payment, setPayment] = useState<"clinic" | "online" | "">("");

  // ✅ Prefill sync when opening modal (fixes “Book with this doctor” always)
  useEffect(() => {
    if (!isOpen) return;

    setStep(initialStep);
    setService(prefillService ?? "");
    setDoctor(prefillDoctor ?? "");

    setDate("");
    setTime("");
    setTimeSlots([]);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setPayment("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, prefillService, prefillDoctor, autoStep2]);

  const isNextDisabled = useMemo(() => {
    if (step === 1) return !service || !doctor;
    if (step === 2) return !date || !time;
    if (step === 3) return !firstName || !lastName || !email || !phone;
    return false;
  }, [step, service, doctor, date, time, firstName, lastName, email, phone]);

  const closeAndReset = () => {
    setStep(initialStep);
    setService(prefillService ?? "");
    setDoctor(prefillDoctor ?? "");
    setDate("");
    setTime("");
    setTimeSlots([]);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setPayment("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      service,
      doctor,
      date,
      time,
      firstName,
      lastName,
      email,
      phone,
      notes,
      payment,
    });

    alert("Appointment booked successfully!");
    closeAndReset();
  };

  const stepLabels = ["Service", "Date & Time", "Details", "Payment"];

  const inputClasses =
    "w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none placeholder-slate-400 bg-white/80";

  const sectionClasses =
    "rounded-2xl bg-white/55 backdrop-blur-xl border border-white/30 shadow-sm p-6";

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAndReset}
      title="Book Your Appointment"
    >
      <form onSubmit={handleSubmit} className="space-y-8 max-w-xl mx-auto">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-8 relative">
          {stepLabels.map((label, i) => {
            const idx = (i + 1) as Step;
            const isActive = step === idx;
            const isCompleted = step > idx;

            return (
              <div
                key={label}
                className="flex-1 relative flex flex-col items-center"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold z-10 transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {i + 1}
                </div>

                <span
                  className={`mt-2 text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? "text-blue-700"
                      : isCompleted
                      ? "text-emerald-700"
                      : "text-slate-500"
                  }`}
                >
                  {label}
                </span>

                {i !== stepLabels.length - 1 && (
                  <div
                    className={`absolute top-5 right-0 h-1 w-full transform translate-x-1/2 -z-10 ${
                      step > idx ? "bg-emerald-300" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2 }}
              className={`${sectionClasses} space-y-6`}
            >
              <div>
                <p className="text-slate-700 font-semibold mb-3">
                  Select Service *
                </p>
                <div className="flex flex-wrap gap-3">
                  {services.map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={`px-5 py-3 rounded-xl font-semibold border transition-all ${
                        service === s
                          ? "bg-blue-600 text-white shadow-sm border-blue-600"
                          : "bg-white/80 text-slate-800 border-slate-200 hover:bg-white"
                      }`}
                      onClick={() => setService(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-slate-700 font-semibold mb-3">
                  Preferred Doctor *
                </p>
                <div className="flex flex-wrap gap-3">
                  {doctors.map((d) => (
                    <button
                      type="button"
                      key={d}
                      className={`px-5 py-3 rounded-xl font-semibold border transition-all ${
                        doctor === d
                          ? "bg-blue-600 text-white shadow-sm border-blue-600"
                          : "bg-white/80 text-slate-800 border-slate-200 hover:bg-white"
                      }`}
                      onClick={() => setDoctor(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2 }}
              className={`${sectionClasses} space-y-6`}
            >
              <div>
                <label
                  className="block text-slate-700 font-semibold mb-3"
                  htmlFor="date"
                >
                  Select Date *
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setTimeSlots(defaultTimeSlots);
                    setTime("");
                  }}
                  className={inputClasses}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {date && (
                <div>
                  <p className="text-slate-700 font-semibold mb-3">
                    Select Time *
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={`px-4 py-3 rounded-xl font-semibold border transition-all ${
                          time === t
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-white/80 text-slate-800 border-slate-200 hover:bg-white"
                        }`}
                        onClick={() => setTime(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2 }}
              className={`${sectionClasses} space-y-4`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name *"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClasses}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name *"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>

              <input
                type="email"
                placeholder="Email Address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
                required
              />

              <input
                type="tel"
                placeholder="Phone Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClasses}
                required
              />

              <textarea
                placeholder="Additional Notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={inputClasses}
                rows={3}
              />

              <div className="rounded-2xl border border-blue-200/60 bg-blue-50/60 p-4 text-slate-800">
                <h4 className="font-bold mb-2">Appointment Summary</h4>
                <p>Service: {service || "-"}</p>
                <p>Doctor: {doctor || "-"}</p>
                <p>Date: {date || "-"}</p>
                <p>Time: {time || "-"}</p>
              </div>
            </motion.div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2 }}
              className={`${sectionClasses} space-y-4`}
            >
              <p className="text-slate-700 font-semibold mb-2">
                Payment Method *
              </p>
              <div className="flex gap-4 flex-wrap">
                <button
                  type="button"
                  onClick={() => setPayment("clinic")}
                  className={`flex-1 px-5 py-3 rounded-xl font-semibold border transition-all ${
                    payment === "clinic"
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white/80 text-slate-800 border-slate-200 hover:bg-white"
                  }`}
                >
                  Pay at Clinic
                </button>

                <button
                  type="button"
                  onClick={() => setPayment("online")}
                  className={`flex-1 px-5 py-3 rounded-xl font-semibold border transition-all ${
                    payment === "online"
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white/80 text-slate-800 border-slate-200 hover:bg-white"
                  }`}
                >
                  Online Payment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-6 pb-1">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setStep((s) => prevStep(s))}
            disabled={step === 1}
          >
            Back
          </Button>

          {step < 4 ? (
            <Button
              type="button"
              onClick={() => setStep((s) => nextStep(s))}
              disabled={isNextDisabled}
            >
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={!payment}>
              Confirm Appointment
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}
