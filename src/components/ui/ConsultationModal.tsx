// src/components/ui/ConsultationModal.tsx
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal";
import Button from "./Button";
import {
  FaceSmileIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

/* ================= TYPES ================= */

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

/* ================= HELPERS ================= */

function nextStep(s: Step): Step {
  return Math.min(4, s + 1) as Step;
}

function prevStep(s: Step): Step {
  return Math.max(1, s - 1) as Step;
}

/* ================= STATIC COMPONENT ================= */

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
            {(["yes", "no"] as Answer[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold border transition ${
                  value === opt
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white/70 text-slate-800 border-slate-200 hover:bg-white"
                }`}
              >
                {opt === "yes" ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */

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
          "You reported pain with swelling or bleeding. We recommend an urgent check to rule out infection.",
      };
    }

    if (pain === "yes") {
      return {
        serviceTitle: "General Checkup & Assessment",
        urgency: "soon",
        summary:
          "Pain may indicate cavities or sensitivity. A checkup will help identify the cause.",
      };
    }

    if (bleeding === "yes") {
      return {
        serviceTitle: "Teeth Cleaning & Gum Assessment",
        urgency: "soon",
        summary:
          "Bleeding gums may signal inflammation. Cleaning helps prevent progression.",
      };
    }

    if (cosmetic === "yes") {
      return {
        serviceTitle: "Cosmetic Dentistry",
        urgency: "routine",
        summary:
          "You’re interested in cosmetic improvements like whitening or veneers.",
      };
    }

    return {
      serviceTitle: "Routine Dental Checkup",
      urgency: "routine",
      summary: "No urgent symptoms detected. Routine care is recommended.",
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
    onComplete?.(recommendation);
    resetAndClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title="Quick Consultation">
      <div className="mx-auto max-w-xl space-y-6">
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <QuestionCard
                icon={<ExclamationTriangleIcon className="h-5 w-5" />}
                title="Do you currently feel tooth pain?"
                desc="Pain may indicate cavities or infection."
                value={pain}
                onChange={setPain}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <QuestionCard
                icon={<HeartIcon className="h-5 w-5" />}
                title="Do your gums bleed when brushing?"
                desc="Bleeding can signal gum disease."
                value={bleeding}
                onChange={setBleeding}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <QuestionCard
                icon={<ShieldCheckIcon className="h-5 w-5" />}
                title="Do you notice swelling in your gums or face?"
                desc="Swelling may indicate infection."
                value={swelling}
                onChange={setSwelling}
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <QuestionCard
                icon={<FaceSmileIcon className="h-5 w-5" />}
                title="Are you mainly looking for cosmetic improvement?"
                desc="Whitening, veneers, or smile makeover."
                value={cosmetic}
                onChange={setCosmetic}
              />

              <div className="rounded-2xl border border-white/25 bg-white/55 p-5 mt-4">
                <p className="font-semibold">Recommendation</p>
                <p className="font-bold">{recommendation.serviceTitle}</p>
                <p className="text-sm mt-2">{recommendation.summary}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between pt-2">
          <Button
            variant="secondary"
            disabled={step === 1}
            onClick={() => setStep((s) => prevStep(s))}
          >
            Back
          </Button>

          {step < 4 ? (
            <Button
              disabled={!canNext}
              onClick={() => setStep((s) => nextStep(s))}
            >
              Next
            </Button>
          ) : (
            <Button onClick={finish}>Continue</Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
