import { useState, useEffect } from "react";
import { GlobalKeyframes } from "@/components/yuenp/shared";
import HeaderSection from "@/components/yuenp/HeaderSection";
import HeroSection from "@/components/yuenp/HeroSection";
import FooterSection from "@/components/yuenp/FooterSection";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-brand-dark" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      <GlobalKeyframes />

      <HeaderSection
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onOpenModal={() => setModalOpen(true)}
        scrollTo={scrollTo}
      />

      <HeroSection
        onOpenModal={() => setModalOpen(true)}
        scrollTo={scrollTo}
      />

      <FooterSection
        modalOpen={modalOpen}
        onOpenModal={() => setModalOpen(true)}
        onCloseModal={() => setModalOpen(false)}
      />
    </div>
  );
}
