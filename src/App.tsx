import { useState } from "react";
import Home from "./pages/Home";
import AppointmentModal from "./components/ui/AppointmentModal";
import ConsultationModal from "./components/ui/ConsultationModal";
import type { ConsultationRecommendation } from "./components/ui/ConsultationModal";

export default function App() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  const [prefillDoctor, setPrefillDoctor] = useState<string | undefined>(
    undefined
  );

  // ✅ Hero booking: no prefill
  const openBookNoPrefill = () => {
    setPrefillDoctor(undefined);
    setAppointmentOpen(true);
  };

  // ✅ Doctors booking: prefill doctor
  const openBookWithDoctor = (doctorName: string) => {
    setPrefillDoctor(doctorName);
    setAppointmentOpen(true);
  };

  const openConsultation = () => setConsultationOpen(true);

  return (
    <>
      <Home
        onBook={openBookNoPrefill}
        onConsultation={openConsultation}
        onPickDoctor={openBookWithDoctor}
      />

      <AppointmentModal
        isOpen={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
        prefillDoctor={prefillDoctor}
      />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        onComplete={(rec: ConsultationRecommendation) => {
          console.log("Consultation result:", rec);

          // keep it simple: open booking with no prefill (as you wanted)
          setConsultationOpen(false);
          setPrefillDoctor(undefined);
          setAppointmentOpen(true);
        }}
      />
    </>
  );
}
