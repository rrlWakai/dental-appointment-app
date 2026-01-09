// src/App.tsx
import { useState } from "react";

import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import AppointmentModal from "./components/ui/AppointmentModal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar onBook={() => setIsModalOpen(true)} />
      <Home onBook={() => setIsModalOpen(true)} />
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
