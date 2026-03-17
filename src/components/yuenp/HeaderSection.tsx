import Icon from "@/components/ui/icon";
import { NAV } from "./shared";

interface HeaderSectionProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  onOpenModal: () => void;
  scrollTo: (id: string) => void;
}

export default function HeaderSection({
  scrolled,
  menuOpen,
  setMenuOpen,
  onOpenModal,
  scrollTo,
}: HeaderSectionProps) {
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,13,18,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,140,0,0.12)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 group">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-lg transition-all duration-300 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, var(--brand-orange), #FFB347)",
              color: "#0D1117",
              boxShadow: "0 0 16px rgba(255,140,0,0.4)",
            }}
          >
            Ю
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-sm font-bold text-white leading-none">ЮграЭкоНефтеПроект</div>
            <div className="text-[10px] text-gray-500 tracking-widest uppercase mt-0.5">ЮЭНП</div>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 relative group"
            >
              {item.label}
              <span
                className="absolute bottom-1 left-3 right-3 h-px opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ background: "var(--brand-orange)" }}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenModal}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, var(--brand-orange), #FFB347)",
              color: "#0D1117",
              boxShadow: "0 0 20px rgba(255,140,0,0.35)",
            }}
          >
            <Icon name="MessageSquare" size={15} />
            Обсудить проект
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-2"
          style={{ background: "rgba(10,13,18,0.98)", borderTop: "1px solid rgba(255,140,0,0.1)" }}
        >
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-left"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { onOpenModal(); setMenuOpen(false); }}
            className="mt-2 py-3.5 rounded-xl font-bold text-sm"
            style={{ background: "linear-gradient(135deg, var(--brand-orange), #FFB347)", color: "#0D1117" }}
          >
            Обсудить проект
          </button>
        </div>
      )}
    </header>
  );
}
