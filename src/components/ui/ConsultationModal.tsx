import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal";
import Button from "./Button";
import {
  FaceSmileIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ClockIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

export type ConsultationUrgency = "routine" | "soon" | "urgent";

export type ConsultationRecommendation = {
  serviceTitle: string;
  urgency: ConsultationUrgency;
  summary: string;
};

export interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (rec: ConsultationRecommendation) => void;
}

type Answer = "yes" | "no";
type Step = 1 | 2 | 3 | 4;

function nextStep(s: Step): Step {
  return Math.min(4, s + 1) as Step;
}
function prevStep(s: Step): Step {
  return Math.max(1, s - 1) as Step;
}

function urgencyChip(u: ConsultationUrgency) {
  if (u === "urgent") return "bg-red-600/10 text-red-700 border-red-600/20";
  if (u === "soon") return "bg-amber-600/10 text-amber-700 border-amber-600/20";
  return "bg-emerald-600/10 text-emerald-700 border-emerald-600/20";
}

/** ✅ Must be outside render (you already did it correctly) */
function QuestionCard({
  icon,
  title,
  desc,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  value: Answer | null;
  onChange: (v: Answer) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/25 bg-white/55 backdrop-blur-xl p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-700">
          {icon}
        </div>

        <div className="flex-1">
          <p className="font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-600">{desc}</p>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => onChange("yes")}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold border transition ${
                value === "yes"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white/70 text-slate-800 border-slate-200 hover:bg-white"
              }`}
            >
              Yes
            </button>

            <button
              type="button"
              onClick={() => onChange("no")}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold border transition ${
                value === "no"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white/70 text-slate-800 border-slate-200 hover:bg-white"
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConsultationModal({
  isOpen,
  onClose,
  onComplete,
}: ConsultationModalProps) {
  const [step, setStep] = useState<Step>(1);

  const [pain, setPain] = useState<Answer | null>(null);
  const [bleeding, setBleeding] = useState<Answer | null>(null);
  const [swelling, setSwelling] = useState<Answer | null>(null);
  const [cosmetic, setCosmetic] = useState<Answer | null>(null);

  const canNext = useMemo(() => {
    if (step === 1) return pain !== null;
    if (step === 2) return bleeding !== null;
    if (step === 3) return swelling !== null;
    if (step === 4) return cosmetic !== null;
    return false;
  }, [step, pain, bleeding, swelling, cosmetic]);

  const recommendation = useMemo<ConsultationRecommendation>(() => {
    const urgentSignals =
      pain === "yes" && (swelling === "yes" || bleeding === "yes");

    if (urgentSignals) {
      return {
        serviceTitle: "Emergency Consultation",
        urgency: "urgent",
        summary:
          "You reported pain with swelling/bleeding. We recommend an urgent check to rule out infection or complications.",
      };
    }

    if (pain === "yes") {
      return {
        serviceTitle: "General Checkup & Assessment",
        urgency: "soon",
        summary:
          "Pain can be caused by cavities, sensitivity, or gum issues. A checkup will help identify the cause quickly.",
      };
    }

    if (bleeding === "yes") {
      return {
        serviceTitle: "Teeth Cleaning & Gum Assessment",
        urgency: "soon",
        summary:
          "Bleeding can indicate gum inflammation. Cleaning and assessment can help prevent worsening.",
      };
    }

    if (cosmetic === "yes") {
      return {
        serviceTitle: "Cosmetic Dentistry",
        urgency: "routine",
        summary:
          "You’re interested in improving smile appearance. We’ll recommend whitening/veneers based on your goals.",
      };
    }

    return {
      serviceTitle: "Routine Dental Checkup",
      urgency: "routine",
      summary:
        "No urgent symptoms detected. A routine checkup is great for prevention and peace of mind.",
    };
  }, [pain, bleeding, swelling, cosmetic]);

  const resetAndClose = () => {
    setStep(1);
    setPain(null);
    setBleeding(null);
    setSwelling(null);
    setCosmetic(null);
    onClose();
  };

  const finish = () => {
    // ✅ keep this so App can show recommendation / prefill service if you want
    onComplete?.(recommendation);
    resetAndClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title="Quick Consultation">
      <div className="mx-auto max-w-xl space-y-6">
        {/* progress */}
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span className="font-semibold">Step {step} of 4</span>
          <span className="rounded-full border border-white/25 bg-white/50 px-3 py-1">
            Answer a few questions
          </span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              <QuestionCard
                icon={<ExclamationTriangleIcon className="h-5 w-5" />}
                title="Do you currently feel tooth pain?"
                desc="Pain can suggest cavities, infection, or sensitivity."
                value={pain}
                onChange={setPain}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              <QuestionCard
                icon={<HeartIcon className="h-5 w-5" />}
                title="Do your gums bleed when brushing?"
                desc="Bleeding can be a sign of gum inflammation."
                value={bleeding}
                onChange={setBleeding}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              <QuestionCard
                icon={<ShieldCheckIcon className="h-5 w-5" />}
                title="Do you notice swelling in your gums/face?"
                desc="Swelling may indicate infection or irritation."
                value={swelling}
                onChange={setSwelling}
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <QuestionCard
                icon={<FaceSmileIcon className="h-5 w-5" />}
                title="Are you mainly looking for cosmetic improvement?"
                desc="Whitening/veneers/smile makeover goals."
                value={cosmetic}
                onChange={setCosmetic}
              />

              {/* result */}
              <div className="rounded-2xl border border-white/25 bg-white/55 backdrop-blur-xl p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Recommendation
                    </p>
                    <p className="mt-1 text-lg font-extrabold text-slate-900">
                      {recommendation.serviceTitle}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${urgencyChip(
                      recommendation.urgency
                    )}`}
                  >
                    <ClockIcon className="h-4 w-4" />
                    {recommendation.urgency.toUpperCase()}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-700">
                  {recommendation.summary}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* nav */}
        <div className="flex items-center justify-between pt-2">
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
              disabled={!canNext}
            >
              Next
            </Button>
          ) : (
            // ✅ changed: no booking CTA here (less overwhelming)
            <Button type="button" onClick={finish} disabled={!canNext}>
              Close
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
