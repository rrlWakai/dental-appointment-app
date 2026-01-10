// src/App.tsx
import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Doctors from "./components/sections/Doctors";
import Contact from "./components/sections/Contact";

import AppointmentModal from "./components/ui/AppointmentModal";
import ConsultationModal from "./components/ui/ConsultationModal";
import type { ConsultationRecommendation } from "./components/ui/ConsultationModal";

const ANY_DOCTOR = "Any available doctor";

function mapRecommendationToService(rec: ConsultationRecommendation) {
  const t = rec.serviceTitle.toLowerCase();

  // Must match AppointmentModal services exactly:
  if (t.includes("cosmetic")) return "Cosmetic Dentistry";
  if (t.includes("braces") || t.includes("alignment"))
    return "Braces & Alignment";
  if (t.includes("clean") || t.includes("gum")) return "Teeth Cleaning";
  if (t.includes("extraction") || t.includes("emergency"))
    return "Tooth Extraction";
  if (t.includes("checkup") || t.includes("assessment"))
    return "Teeth Cleaning";

  return "Teeth Cleaning";
}

function mapServiceToDoctor(service: string) {
  // Simple deterministic mapping (works well for your current set)
  if (service === "Braces & Alignment") return "Dr. Miguel Santos";
  if (service === "Cosmetic Dentistry") return "Dr. Patricia Reyes";
  if (service === "Tooth Extraction") return "Dr. Angela Cruz";
  if (service === "Teeth Cleaning") return "Dr. Angela Cruz";
  return ANY_DOCTOR;
}

export default function App() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  const [prefillService, setPrefillService] = useState<string | undefined>();
  const [prefillDoctor, setPrefillDoctor] = useState<string | undefined>();
  const [autoStep2, setAutoStep2] = useState(false);

  const openAppointment = () => setIsAppointmentOpen(true);
  const closeAppointment = () => setIsAppointmentOpen(false);

  const openConsult = () => setIsConsultOpen(true);
  const closeConsult = () => setIsConsultOpen(false);

  return (
    <>
      {/* Navbar "Consultation" */}
      <Navbar onBook={openConsult} />

      <Hero
        onBook={() => {
          // Hero book = no prefill
          setPrefillService(undefined);
          setPrefillDoctor(undefined);
          setAutoStep2(false);
          openAppointment();
        }}
      />

      <Services />

      <Doctors
        onPickDoctor={(name) => {
          setPrefillDoctor(name);
        }}
        onBook={() => {
          // Doctor flow: doctor prefilled, but still start at step 1
          setAutoStep2(false);
          openAppointment();
        }}
      />

      <Contact />

      {/* Consultation → auto prefill + jump to Step 2 */}
      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={closeConsult}
        onComplete={(rec) => {
          const service = mapRecommendationToService(rec);
          const doctor = mapServiceToDoctor(service) ?? ANY_DOCTOR;

          setPrefillService(service);
          setPrefillDoctor(doctor);

          // ✅ this makes it feel automatic
          setAutoStep2(true);

          setIsConsultOpen(false);
          setIsAppointmentOpen(true);
        }}
      />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => {
          // reset for next time
          setAutoStep2(false);
          closeAppointment();
        }}
        prefillService={prefillService}
        prefillDoctor={prefillDoctor}
        autoStep2={autoStep2}
      />
    </>
  );
}
