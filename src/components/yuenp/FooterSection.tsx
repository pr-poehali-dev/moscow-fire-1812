import Icon from "@/components/ui/icon";
import { FadeUp, SectionHeading, ContactForm } from "./shared";

interface FooterSectionProps {
  modalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export default function FooterSection({ modalOpen, onOpenModal, onCloseModal }: FooterSectionProps) {
  const contacts = [
    { icon: "MapPin", text: "ул. Кузоваткина 1, строение 1, Нижневартовск" },
    { icon: "MapPin", text: "ул. Заводская, д. 26, кв. 75, Нижневартовск, 628621" },
    { icon: "Phone", text: "+7 (982) 509-46-13", href: "tel:+79825094613" },
    { icon: "Mail", text: "info@yuenp.ru", href: "mailto:info@yuenp.ru" },
  ];

  return (
    <>
      {/* ── CONTACTS / FOOTER ── */}
      <footer
        id="contacts"
        className="py-28 relative overflow-hidden"
        style={{ background: "rgba(10,13,18,0.95)" }}
      >
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,var(--brand-orange),var(--brand-green),transparent)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%,rgba(255,140,0,0.05) 0%,transparent 60%)" }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionHeading num="06" title="Свяжитесь с нами" />

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <FadeUp delay={100}>
              <div className="font-display text-2xl font-bold mb-8" style={{ color: "var(--brand-orange)" }}>
                ЮграЭкоНефтеПроект
              </div>
              <div className="space-y-5">
                {contacts.map((c, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: "rgba(255,140,0,0.1)", border: "1px solid rgba(255,140,0,0.2)" }}
                    >
                      <Icon name={c.icon} size={18} style={{ color: "var(--brand-orange)" }} />
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="text-gray-300 hover:text-white transition-colors text-base mt-2.5 font-medium"
                      >
                        {c.text}
                      </a>
                    ) : (
                      <span className="text-gray-300 text-base mt-2.5">{c.text}</span>
                    )}
                  </div>
                ))}
              </div>

              <div
                className="mt-10 p-6 rounded-2xl relative overflow-hidden"
                style={{ background: "rgba(255,140,0,0.05)", border: "1px solid rgba(255,140,0,0.12)" }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                  style={{ background: "linear-gradient(180deg,var(--brand-orange),var(--brand-green))" }}
                />
                <p className="text-gray-400 text-sm leading-relaxed pl-4 italic">
                  «Главные приоритеты — безупречное качество и чёткое соблюдение сроков»
                </p>
              </div>
            </FadeUp>

            {/* Form */}
            <FadeUp delay={200}>
              <div
                className="p-8 rounded-2xl relative overflow-hidden"
                style={{ background: "var(--brand-card)", border: "1px solid var(--brand-border)" }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: "linear-gradient(90deg,var(--brand-orange),var(--brand-green))" }}
                />
                <h3 className="font-display text-xl font-bold text-white mb-2">Оставьте заявку</h3>
                <p className="text-gray-500 text-sm mb-7">Ответим в течение рабочего дня</p>
                <ContactForm />
              </div>
            </FadeUp>
          </div>

          <div
            className="mt-20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-600 text-sm"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <span>© 2026 ЮграЭкоНефтеПроект. Все права защищены.</span>
            <span>Нижневартовск, ХМАО-Югра</span>
          </div>
        </div>
      </footer>

      {/* ── MODAL ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onCloseModal(); }}
        >
          <div
            className="w-full max-w-md rounded-2xl relative overflow-hidden"
            style={{
              background: "var(--brand-card)",
              border: "1px solid rgba(255,140,0,0.2)",
              animation: "scaleIn 0.3s cubic-bezier(.34,1.56,.64,1) forwards",
              boxShadow: "0 0 60px rgba(255,140,0,0.15), 0 30px 80px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: "linear-gradient(90deg,var(--brand-orange),var(--brand-green))" }}
            />
            <div className="p-8">
              <button
                onClick={onCloseModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Icon name="X" size={16} />
              </button>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(255,140,0,0.1)", border: "1px solid rgba(255,140,0,0.2)" }}
              >
                <Icon name="MessageSquare" size={22} style={{ color: "var(--brand-orange)" }} />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-1">Обсудить проект</h3>
              <p className="text-gray-500 text-sm mb-7">Перезвоним в течение рабочего дня</p>
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
