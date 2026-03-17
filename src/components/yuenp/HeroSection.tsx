import Icon from "@/components/ui/icon";
import { HERO_IMAGE, Particles, FadeUp, CountUp, STATS, SERVICES, VALUES, STEPS, SectionHeading } from "./shared";

interface HeroSectionProps {
  onOpenModal: () => void;
  scrollTo: (id: string) => void;
}

export default function HeroSection({ onOpenModal, scrollTo }: HeroSectionProps) {
  return (
    <>
      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${HERO_IMAGE})`, transform: "scale(1.05)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(10,13,18,0.93) 0%,rgba(10,13,18,0.7) 60%,rgba(10,13,18,0.88) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 20% 50%,rgba(255,140,0,0.1) 0%,transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 80% 70%,rgba(46,204,113,0.07) 0%,transparent 50%)" }} />

        <Particles />

        <div
          className="absolute top-1/4 right-16 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle,rgba(255,140,0,0.12) 0%,transparent 70%)",
            filter: "blur(30px)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/3 left-12 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle,rgba(46,204,113,0.1) 0%,transparent 70%)",
            filter: "blur(25px)",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
            style={{
              background: "rgba(255,140,0,0.12)",
              border: "1px solid rgba(255,140,0,0.3)",
              color: "var(--brand-orange)",
              backdropFilter: "blur(10px)",
              animation: "fadeSlideDown 0.8s ease forwards",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--brand-orange)" }} />
            Нижневартовск, ХМАО-Югра
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--brand-green)" }} />
          </div>

          <h1
            className="font-display font-bold leading-[1.05] mb-6"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              animation: "fadeSlideUp 0.9s ease forwards 0.1s",
              opacity: 0,
            }}
          >
            <span className="text-white">Югра</span>
            <span style={{ color: "var(--brand-orange)" }}>Эко</span>
            <span className="text-white">Нефте</span>
            <span
              style={{
                background: "linear-gradient(135deg,var(--brand-green),#27AE60)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Проект
            </span>
          </h1>

          <p
            className="font-display text-sm tracking-[0.22em] uppercase mb-10 text-gray-400"
            style={{ animation: "fadeSlideUp 0.9s ease forwards 0.25s", opacity: 0 }}
          >
            Проектная документация&nbsp;•&nbsp;Инжиниринг&nbsp;•&nbsp;Строительный контроль
          </p>

          <div
            className="flex flex-wrap gap-3 mb-12"
            style={{ animation: "fadeSlideUp 0.9s ease forwards 0.4s", opacity: 0 }}
          >
            {["Точность расчётов", "Профессиональный подход", "Гарантия результата"].map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Icon name="CheckCircle2" size={14} className="text-brand-green flex-shrink-0" />
                {t}
              </div>
            ))}
          </div>

          <div
            className="flex flex-wrap gap-4"
            style={{ animation: "fadeSlideUp 0.9s ease forwards 0.55s", opacity: 0 }}
          >
            <button
              onClick={onOpenModal}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg,var(--brand-orange),#FFB347)",
                color: "#0D1117",
                boxShadow: "0 0 35px rgba(255,140,0,0.4), 0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <Icon name="MessageSquare" size={18} />
              Обсудить проект
              <Icon name="ArrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white transition-all duration-300 hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
            >
              О компании
              <Icon name="ChevronDown" size={16} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <div
            className="w-6 h-10 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <div
              className="w-1 h-2.5 rounded-full"
              style={{ background: "var(--brand-orange)", animation: "scrollBounce 1.8s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <div
        className="relative py-12 overflow-hidden"
        style={{
          background: "linear-gradient(90deg,rgba(255,140,0,0.08),rgba(46,204,113,0.06),rgba(255,140,0,0.08))",
          borderTop: "1px solid rgba(255,140,0,0.15)",
          borderBottom: "1px solid rgba(46,204,113,0.1)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <FadeUp key={i} delay={i * 80} className="text-center">
                <div className="font-display text-4xl font-bold mb-1" style={{ color: s.color }}>
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(255,140,0,0.05) 0%,transparent 65%)", filter: "blur(40px)" }}
        />
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading num="01" title="О компании" />
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <FadeUp delay={100} className="lg:col-span-3">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Мы специализируемся на подготовке{" "}
                <span className="text-white font-semibold">исполнительно-технической</span> и{" "}
                <span className="text-white font-semibold">проектно-сметной документации</span>.
                Обеспечиваем полное инжиниринговое сопровождение объектов на всех этапах — от
                формирования технического задания до финального ввода в эксплуатацию.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-10">
                Берём на себя функции{" "}
                <span className="text-white font-semibold">технического заказчика</span> и
                строительного контроля. Главные приоритеты — безупречное качество и чёткое
                соблюдение сроков.
              </p>
              <button
                onClick={onOpenModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(255,140,0,0.12)",
                  border: "1px solid rgba(255,140,0,0.3)",
                  color: "var(--brand-orange)",
                }}
              >
                <Icon name="Phone" size={16} />
                Связаться с нами
              </button>
            </FadeUp>

            <FadeUp delay={200} className="lg:col-span-2 grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl relative overflow-hidden group hover:scale-105 transition-all duration-300"
                  style={{
                    background: "var(--brand-card)",
                    border: `1px solid rgba(${s.color === "var(--brand-orange)" ? "255,140,0" : s.color === "var(--brand-green)" ? "46,204,113" : "255,179,71"},0.15)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 100%,${s.color === "var(--brand-orange)" ? "rgba(255,140,0,0.06)" : "rgba(46,204,113,0.06)"},transparent)` }}
                  />
                  <div className="font-display text-3xl font-bold mb-1" style={{ color: s.color }}>
                    <CountUp to={s.to} suffix={s.suffix} />
                  </div>
                  <div className="text-gray-400 text-xs">{s.label}</div>
                </div>
              ))}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 relative overflow-hidden" style={{ background: "rgba(16,20,26,0.8)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(255,140,0,0.04) 0%,transparent 60%)" }}
        />
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading num="02" title="Наши услуги" />
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <FadeUp key={i} delay={i * 130}>
                <div
                  className="relative p-7 rounded-2xl h-full group cursor-default overflow-hidden transition-all duration-400 hover:-translate-y-2"
                  style={{
                    background: "var(--brand-card)",
                    border: `1px solid rgba(${s.accent === "var(--brand-orange)" ? "255,140,0" : s.accent === "var(--brand-green)" ? "46,204,113" : "255,179,71"},0.12)`,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = s.accent === "var(--brand-orange)" ? "rgba(255,140,0,0.5)" : s.accent === "var(--brand-green)" ? "rgba(46,204,113,0.5)" : "rgba(255,179,71,0.5)";
                    e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.3), 0 0 30px ${s.accent === "var(--brand-orange)" ? "rgba(255,140,0,0.1)" : "rgba(46,204,113,0.08)"}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = s.accent === "var(--brand-orange)" ? "rgba(255,140,0,0.12)" : s.accent === "var(--brand-green)" ? "rgba(46,204,113,0.12)" : "rgba(255,179,71,0.12)";
                    e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.2)";
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg,transparent,${s.accent},transparent)`, opacity: 0.4 }}
                  />
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ background: s.bg, border: `1px solid ${s.accent}30` }}
                  >
                    <Icon name={s.icon} size={24} style={{ color: s.accent }} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                  <div
                    className="flex items-center gap-2 mt-6 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                    style={{ color: s.accent }}
                  >
                    Узнать подробнее
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section id="values" className="py-28 relative overflow-hidden">
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(46,204,113,0.05) 0%,transparent 65%)", filter: "blur(50px)" }}
        />
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading num="03" title="Наши ценности" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <FadeUp key={i} delay={i * 100}>
                <div
                  className="p-6 rounded-2xl h-full group hover:-translate-y-1 transition-all duration-300"
                  style={{ background: "var(--brand-card)", border: "1px solid var(--brand-border)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(46,204,113,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--brand-border)"; }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)" }}
                  >
                    <Icon name={v.icon} size={20} style={{ color: "var(--brand-green)" }} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-28 relative" style={{ background: "rgba(16,20,26,0.8)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading num="04" title="Как мы работаем" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((p, i) => (
              <FadeUp key={i} delay={i * 120}>
                <div className="relative">
                  {i < STEPS.length - 1 && (
                    <div
                      className="absolute top-8 left-[calc(100%+0px)] w-full h-px hidden lg:block pointer-events-none"
                      style={{ background: "linear-gradient(90deg,rgba(255,140,0,0.25),transparent)", zIndex: 0 }}
                    />
                  )}
                  <div
                    className="relative p-6 rounded-2xl h-full group hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    style={{ background: "var(--brand-card)", border: "1px solid var(--brand-border)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,140,0,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--brand-border)"; }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(90deg,var(--brand-orange),#FFB347)" }}
                    />
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(255,140,0,0.1)", border: "1px solid rgba(255,140,0,0.2)" }}
                      >
                        <Icon name={p.icon} size={20} style={{ color: "var(--brand-orange)" }} />
                      </div>
                      <span
                        className="font-display text-3xl font-bold"
                        style={{ color: "var(--brand-orange)", opacity: 0.25 }}
                      >
                        {p.num}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-28 relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(255,140,0,0.04) 0%,transparent 65%)", filter: "blur(40px)" }}
        />
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading num="05" title="Галерея" />
          <FadeUp>
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{ background: "var(--brand-card)", border: "1px solid var(--brand-border)", minHeight: 320 }}
            >
              <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "rgba(255,140,0,0.08)", border: "1px solid rgba(255,140,0,0.15)" }}
                >
                  <Icon name="Images" size={36} style={{ color: "var(--brand-orange)", opacity: 0.5 }} />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">Скоро здесь появятся фото</h3>
                <p className="text-gray-500 text-base max-w-sm">
                  Галерея проектов в разработке. Здесь будут фотографии выполненных объектов.
                </p>
                <div
                  className="mt-8 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(255,140,0,0.08)", border: "1px solid rgba(255,140,0,0.2)", color: "var(--brand-orange)" }}
                >
                  <Icon name="Clock" size={14} />
                  В разработке
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
