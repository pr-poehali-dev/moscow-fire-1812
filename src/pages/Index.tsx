import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE =
  "https://cdn.poehali.dev/projects/eb514806-0563-41be-b28d-7b0814d8f147/files/e70571c6-1505-486c-a313-6728638b1d19.jpg";

/* ─── Intersection observer hook ─── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Animated section wrapper ─── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Counter animation ─── */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 40);
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(id); } else setVal(start);
    }, 30);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Canvas particles ─── */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,140,0,${p.alpha})`;
        ctx.fill();
      });
      // draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,140,0,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const cleanup = draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); cleanup?.(); };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

/* ─── Section heading ─── */
function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <FadeUp className="mb-14">
      <div className="flex items-center gap-3 mb-2">
        <span
          className="font-display text-xs font-bold tracking-[0.2em] uppercase"
          style={{ color: "var(--brand-orange)" }}
        >
          {num}
        </span>
        <div
          className="h-px w-10"
          style={{ background: "linear-gradient(90deg,var(--brand-orange),transparent)" }}
        />
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
        {title}
      </h2>
    </FadeUp>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"gallery" | null>(null);

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

  const NAV = [
    { id: "about", label: "О компании" },
    { id: "services", label: "Услуги" },
    { id: "values", label: "Ценности" },
    { id: "process", label: "Процесс" },
    { id: "gallery", label: "Галерея" },
    { id: "contacts", label: "Контакты" },
  ];

  const services = [
    {
      icon: "FileText",
      title: "Проектная документация",
      desc: "Разработка проектно-сметной и исполнительно-технической документации любой сложности",
      accent: "var(--brand-orange)",
      bg: "rgba(255,140,0,0.08)",
    },
    {
      icon: "TrendingUp",
      title: "Инжиниринг",
      desc: "Сопровождение проектирования, подбор оборудования и материалов, контроль строительства",
      accent: "var(--brand-green)",
      bg: "rgba(46,204,113,0.08)",
    },
    {
      icon: "HardHat",
      title: "Технический заказчик",
      desc: "Функции технического заказчика, строительный контроль, подготовка технических заданий",
      accent: "#FFB347",
      bg: "rgba(255,179,71,0.08)",
    },
  ];

  const values = [
    { icon: "ShieldCheck", title: "Ответственность", desc: "Мы отвечаем за каждый этап. Доверие клиента — главная ценность" },
    { icon: "Gem", title: "Качество", desc: "Тщательная проработка и строгий контроль на всех этапах" },
    { icon: "Clock4", title: "Пунктуальность", desc: "Соблюдение сроков — обязательное условие нашей работы" },
    { icon: "Handshake", title: "Честность", desc: "Прозрачные условия сотрудничества и открытая коммуникация" },
  ];

  const steps = [
    { num: "01", title: "Анализ задачи", desc: "Изучаем ТЗ, уточняем детали и требования", icon: "Search" },
    { num: "02", title: "Разработка", desc: "Готовим документацию с учётом всех норм и стандартов", icon: "PenTool" },
    { num: "03", title: "Согласование", desc: "Вносим правки, согласовываем со всеми сторонами", icon: "CheckSquare" },
    { num: "04", title: "Передача", desc: "Сдаём документацию, поддерживаем при необходимости", icon: "PackageCheck" },
  ];

  const stats = [
    { to: 10, suffix: "+", label: "Лет опыта", color: "var(--brand-orange)" },
    { to: 150, suffix: "+", label: "Проектов", color: "var(--brand-green)" },
    { to: 100, suffix: "%", label: "Гарантия", color: "#FFB347" },
    { to: 0, suffix: "", label: "Нарушений сроков", color: "var(--brand-green)" },
  ];

  return (
    <div className="min-h-screen bg-brand-dark" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* ── HEADER ── */}
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
              onClick={() => setModalOpen(true)}
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
              onClick={() => { setModalOpen(true); setMenuOpen(false); }}
              className="mt-2 py-3.5 rounded-xl font-bold text-sm"
              style={{ background: "linear-gradient(135deg, var(--brand-orange), #FFB347)", color: "#0D1117" }}
            >
              Обсудить проект
            </button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            transform: "scale(1.05)",
          }}
        />
        {/* Dark overlays */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(10,13,18,0.93) 0%,rgba(10,13,18,0.7) 60%,rgba(10,13,18,0.88) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 20% 50%,rgba(255,140,0,0.1) 0%,transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 80% 70%,rgba(46,204,113,0.07) 0%,transparent 50%)" }} />

        {/* Particles */}
        <Particles />

        {/* Floating decorative orbs */}
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
          {/* Badge */}
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

          {/* Title */}
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

          {/* Subtitle */}
          <p
            className="font-display text-sm tracking-[0.22em] uppercase mb-10 text-gray-400"
            style={{ animation: "fadeSlideUp 0.9s ease forwards 0.25s", opacity: 0 }}
          >
            Проектная документация&nbsp;•&nbsp;Инжиниринг&nbsp;•&nbsp;Строительный контроль
          </p>

          {/* Feature pills */}
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

          {/* CTA buttons */}
          <div
            className="flex flex-wrap gap-4"
            style={{ animation: "fadeSlideUp 0.9s ease forwards 0.55s", opacity: 0 }}
          >
            <button
              onClick={() => setModalOpen(true)}
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
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
              }}
            >
              О компании
              <Icon name="ChevronDown" size={16} />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
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
            {stats.map((s, i) => (
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
                onClick={() => setModalOpen(true)}
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
              {stats.map((s, i) => (
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
      <section
        id="services"
        className="py-28 relative overflow-hidden"
        style={{ background: "rgba(16,20,26,0.8)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(255,140,0,0.04) 0%,transparent 60%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading num="02" title="Наши услуги" />
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
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
                  {/* Gradient top line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg,transparent,${s.accent},transparent)`, opacity: 0.4 }}
                  />
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ background: s.bg, border: `1px solid ${s.accent}30` }}
                  >
                    <Icon name={s.icon} size={24} style={{ color: s.accent }} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>

                  {/* Bottom CTA hint */}
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
            {values.map((v, i) => (
              <FadeUp key={i} delay={i * 100}>
                <div
                  className="p-6 rounded-2xl h-full group hover:-translate-y-1 transition-all duration-300"
                  style={{
                    background: "var(--brand-card)",
                    border: "1px solid var(--brand-border)",
                  }}
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
            {steps.map((p, i) => (
              <FadeUp key={i} delay={i * 120}>
                <div className="relative">
                  {i < steps.length - 1 && (
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
              style={{
                background: "var(--brand-card)",
                border: "1px solid var(--brand-border)",
                minHeight: 320,
              }}
            >
              {/* Empty gallery placeholder */}
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
                  style={{
                    background: "rgba(255,140,0,0.08)",
                    border: "1px solid rgba(255,140,0,0.2)",
                    color: "var(--brand-orange)",
                  }}
                >
                  <Icon name="Clock" size={14} />
                  В разработке
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <footer
        id="contacts"
        className="py-28 relative overflow-hidden"
        style={{ background: "rgba(10,13,18,0.95)" }}
      >
        {/* Top gradient line */}
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
            {/* Info */}
            <FadeUp delay={100}>
              <div
                className="font-display text-2xl font-bold mb-8"
                style={{ color: "var(--brand-orange)" }}
              >
                ЮграЭкоНефтеПроект
              </div>
              <div className="space-y-5">
                {[
                  { icon: "MapPin", text: "ул. Кузоваткина 1, строение 1, Нижневартовск" },
                  { icon: "MapPin", text: "ул. Заводская, д. 26, кв. 75, Нижневартовск, 628621" },
                  { icon: "Phone", text: "+7 (982) 509-46-13", href: "tel:+79825094613" },
                  { icon: "Mail", text: "info@yuenp.ru", href: "mailto:info@yuenp.ru" },
                ].map((c, i) => (
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

              {/* Decorative quote */}
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
                <form action="https://formspree.io/f/xdawdvgw" method="POST" className="space-y-4">
                  {[
                    { name: "name", placeholder: "Ваше имя", type: "text" },
                    { name: "phone", placeholder: "Ваш телефон", type: "tel" },
                  ].map((field) => (
                    <input
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      required
                      className="w-full px-4 py-3.5 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid var(--brand-border)",
                        fontFamily: "'Golos Text', sans-serif",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,140,0,0.5)"; e.currentTarget.style.background = "rgba(255,140,0,0.04)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--brand-border)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                    />
                  ))}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                    style={{
                      background: "linear-gradient(135deg,var(--brand-orange),#FFB347)",
                      color: "#0D1117",
                      boxShadow: "0 0 25px rgba(255,140,0,0.3)",
                    }}
                  >
                    Отправить заявку
                  </button>
                </form>
              </div>
            </FadeUp>
          </div>

          {/* Footer bottom */}
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
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
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
                onClick={() => setModalOpen(false)}
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
              <form action="https://formspree.io/f/xdawdvgw" method="POST" className="space-y-4">
                {[
                  { name: "name", placeholder: "Ваше имя", type: "text" },
                  { name: "phone", placeholder: "Ваш телефон", type: "tel" },
                ].map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required
                    className="w-full px-4 py-3.5 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--brand-border)",
                      fontFamily: "'Golos Text', sans-serif",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,140,0,0.5)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "var(--brand-border)"; }}
                  />
                ))}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(135deg,var(--brand-orange),#FFB347)",
                    color: "#0D1117",
                    boxShadow: "0 0 25px rgba(255,140,0,0.3)",
                  }}
                >
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── GLOBAL KEYFRAMES ── */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.5; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* suppress unused activeTab warning */}
      {activeTab && null}
    </div>
  );
}