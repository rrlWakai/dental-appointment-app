import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Documentation from "../components/sections/Documentation";
import Doctors from "../components/sections/Doctors";
import Contact from "../components/sections/Contact";
import Footer from "../components/layout/Footer";

interface HomeProps {
  onBook: () => void; // hero booking (no prefill)
  onConsultation: () => void; // navbar consultation
  onPickDoctor: (doctorName: string) => void; // doctors prefill booking
}

export default function Home({
  onBook,
  onConsultation,
  onPickDoctor,
}: HomeProps) {
  return (
    <>
      <Navbar onConsultation={onConsultation} />
      <Hero onBook={onBook} />
      <Services />
      <Documentation />
      <Doctors onBook={onBook} onPickDoctor={onPickDoctor} />
      <Contact />
      <Footer />
    </>
  );
}
