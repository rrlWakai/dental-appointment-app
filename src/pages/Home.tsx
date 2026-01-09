// src/pages/Home.tsx
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Documentation from "../components/sections/Documentation";
import Doctors from "../components/sections/Doctors";
import Contact from "../components/sections/Contact";
import Footer from "../components/layout/Footer";
interface HomeProps {
  onBook: () => void;
}

export default function Home({ onBook }: HomeProps) {
  return (
    <>
      <Hero onBook={onBook} />
      <Services />
      <Documentation />
      <Doctors />
      <Contact />
      <Footer />
    </>
  );
}
