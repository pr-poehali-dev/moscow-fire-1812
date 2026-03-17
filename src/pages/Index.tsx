import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/eb514806-0563-41be-b28d-7b0814d8f147/files/e70571c6-1505-486c-a313-6728638b1d19.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const services = [
    {
      icon: "FileText",
      title: "Проектная документация",
      desc: "Разработка и оформление проектно-сметной и исполнительно-технической документации любой сложности",
      color: "from-orange-500/10 to-orange-500/5",
      border: "border-orange-500/20 hover:border-orange-500/50",
      iconColor: "text-brand-orange",
    },
    {
      icon: "TrendingUp",
      title: "Инжиниринг",
      desc: "Сопровождение проектирования, подбор оборудования и материалов, контроль строительства",
      color: "from-green-500/10 to-green-500/5",
      border: "border-green-500/20 hover:border-green-500/50",
      iconColor: "text-brand-green",
    },
    {
      icon: "HardHat",
      title: "Технический заказчик",
      desc: "Функции технического заказчика, строительный контроль, подготовка технических заданий",
      color: "from-orange-500/10 to-green-500/5",
      border: "border-orange-500/20 hover:border-green-500/40",
      iconColor: "text-brand-orange-light",
    },
  ];

  const values = [
    { icon: "ShieldCheck", title: "Ответственность", desc: "Мы отвечаем за каждый этап работы. Доверие клиента — наша главная ценность" },
    { icon: "Gem", title: "Качество", desc: "Тщательная проработка документации и строгий контроль на всех этапах" },
    { icon: "Clock", title: "Пунктуальность", desc: "Соблюдение сроков — обязательное условие нашей работы" },
    { icon: "Handshake", title: "Честность", desc: "Прозрачные условия сотрудничества и открытая коммуникация" },
  ];

  const process = [
    { num: "01", title: "Анализ задачи", desc: "Изучаем техническое задание, уточняем детали и требования" },
    { num: "02", title: "Разработка", desc: "Готовим документацию с учётом всех норм и стандартов" },
    { num: "03", title: "Согласование", desc: "Вносим правки, согласовываем с заинтересованными сторонами" },
    { num: "04", title: "Передача", desc: "Сдаём готовую документацию, поддерживаем при необходимости" },
  ];

  return (
    <div className="min-h-screen bg-brand-dark font-body" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(13,17,23,0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid #21262D" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 group">
            <span
              className="font-display text-xl font-bold px-2 py-0.5 rounded"
              style={{ background: "var(--brand-orange)", color: "#0D1117" }}
            >
              Ю
            </span>
            <span className="font-display text-base font-semibold text-white tracking-wide hidden sm:block">
              ЮграЭкоНефтеПроект
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { id: "about", label: "О компании" },
              { id: "services", label: "Услуги" },
              { id: "values", label: "Ценности" },
              { id: "process", label: "Процесс" },
              { id: "contacts", label: "Контакты" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-orange group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* CTA + burger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{ background: "var(--brand-orange)", color: "#0D1117" }}
            >
              Обсудить проект
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg border border-brand-border text-gray-400 hover:text-white hover:border-gray-600 transition-all"
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden border-t border-brand-border px-6 py-4 flex flex-col gap-4"
            style={{ background: "rgba(13,17,23,0.98)", backdropFilter: "blur(16px)" }}
          >
            {[
              { id: "about", label: "О компании" },
              { id: "services", label: "Услуги" },
              { id: "values", label: "Ценности" },
              { id: "process", label: "Процесс" },
              { id: "contacts", label: "Контакты" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-base text-gray-300 hover:text-white transition-colors py-1"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setModalOpen(true); setMenuOpen(false); }}
              className="mt-2 py-3 rounded-lg font-semibold text-sm"
              style={{ background: "var(--brand-orange)", color: "#0D1117" }}
            >
              Обсудить проект
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* BG Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(13,17,23,0.92) 0%, rgba(13,17,23,0.75) 50%, rgba(13,17,23,0.85) 100%)"
          }}
        />
        {/* Orange glow */}
        <div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,140,0,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Green glow */}
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(46,204,113,0.1) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(255,140,0,0.15)", border: "1px solid rgba(255,140,0,0.3)", color: "var(--brand-orange)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            Нижневартовск, ХМАО-Югра
          </div>

          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 leading-tight"
            style={{ animation: "fade-in 0.8s ease forwards" }}
          >
            Югра<span style={{ color: "var(--brand-orange)" }}>Эко</span>Нефте<span style={{ color: "var(--brand-green)" }}>Проект</span>
          </h1>

          <p className="text-sm font-display tracking-[0.25em] text-gray-400 mb-8 uppercase">
            Проектная документация&nbsp;•&nbsp;Инжиниринг&nbsp;•&nbsp;Строительный контроль
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {["Точность расчетов", "Профессиональный подход", "Гарантия результата"].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-200"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Icon name="CheckCircle2" size={15} className="text-brand-green" />
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, var(--brand-orange), var(--brand-orange-light))", color: "#0D1117", boxShadow: "0 0 25px rgba(255,140,0,0.3)" }}
            >
              <Icon name="MessageSquare" size={18} />
              Обсудить проект
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base text-white transition-all duration-200 hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              Узнать больше
              <Icon name="ArrowDown" size={16} />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,140,0,0.06) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-3">
              <span className="number-accent">01</span>
              <div className="h-px flex-1 max-w-12" style={{ background: "var(--brand-orange)", opacity: 0.5 }} />
            </div>
            <h2 className="font-display text-4xl font-bold text-white mb-10">О компании</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={100}>
              <p className="text-gray-300 text-lg leading-relaxed">
                Мы специализируемся на подготовке <span className="text-white font-medium">исполнительно-технической</span> и <span className="text-white font-medium">проектно-сметной документации</span>. Обеспечиваем полное инжиниринговое сопровождение объектов на всех этапах — от формирования технического задания до финального ввода в эксплуатацию.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mt-5">
                Берём на себя функции <span className="text-white font-medium">технического заказчика</span> и строительного контроля. Главные приоритеты — безупречное качество и чёткое соблюдение сроков.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "10+", label: "Лет опыта", color: "var(--brand-orange)" },
                  { num: "150+", label: "Проектов", color: "var(--brand-green)" },
                  { num: "100%", label: "Гарантия качества", color: "var(--brand-orange-light)" },
                  { num: "0", label: "Нарушений сроков", color: "var(--brand-green)" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl"
                    style={{ background: "var(--brand-card)", border: "1px solid var(--brand-border)" }}
                  >
                    <div className="font-display text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.num}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24" style={{ background: "rgba(22,27,34,0.5)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-3">
              <span className="number-accent">02</span>
              <div className="h-px flex-1 max-w-12" style={{ background: "var(--brand-orange)", opacity: 0.5 }} />
            </div>
            <h2 className="font-display text-4xl font-bold text-white mb-12">Наши услуги</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={i} delay={i * 120}>
                <div
                  className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-default group ${s.border}`}
                  style={{ background: "var(--brand-card)" }}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  />
                  <div
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(255,140,0,0.1)", border: "1px solid rgba(255,140,0,0.2)" }}
                  >
                    <Icon name={s.icon as any} size={22} className={s.iconColor} />
                  </div>
                  <h3 className="relative font-display text-xl font-semibold text-white mb-3">{s.title}</h3>
                  <p className="relative text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section id="values" className="py-24 relative overflow-hidden">
        <div
          className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(46,204,113,0.06) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-3">
              <span className="number-accent">03</span>
              <div className="h-px flex-1 max-w-12" style={{ background: "var(--brand-orange)", opacity: 0.5 }} />
            </div>
            <h2 className="font-display text-4xl font-bold text-white mb-12">Наши ценности</h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div
                  className="p-6 rounded-2xl group hover:scale-105 transition-all duration-300"
                  style={{ background: "var(--brand-card)", border: "1px solid var(--brand-border)" }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)" }}
                  >
                    <Icon name={v.icon as any} size={20} className="text-brand-green" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">{v.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24" style={{ background: "rgba(22,27,34,0.5)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-3">
              <span className="number-accent">04</span>
              <div className="h-px flex-1 max-w-12" style={{ background: "var(--brand-orange)", opacity: 0.5 }} />
            </div>
            <h2 className="font-display text-4xl font-bold text-white mb-12">Как мы работаем</h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <AnimatedSection key={i} delay={i * 110}>
                <div className="relative">
                  {i < process.length - 1 && (
                    <div
                      className="absolute top-7 left-full w-full h-px hidden lg:block pointer-events-none"
                      style={{ background: "linear-gradient(90deg, rgba(255,140,0,0.3), transparent)", zIndex: 0 }}
                    />
                  )}
                  <div
                    className="relative p-6 rounded-2xl"
                    style={{ background: "var(--brand-card)", border: "1px solid var(--brand-border)" }}
                  >
                    <div
                      className="font-display text-4xl font-bold mb-4"
                      style={{ color: "var(--brand-orange)", opacity: 0.4 }}
                    >
                      {p.num}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white mb-2">{p.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS / FOOTER */}
      <footer id="contacts" className="py-24 relative overflow-hidden">
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--brand-orange), var(--brand-green), transparent)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,140,0,0.06) 0%, transparent 60%)" }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <h2 className="font-display text-4xl font-bold text-white mb-2">Свяжитесь с нами</h2>
            <p className="text-gray-400 mb-12">Расскажите о вашем проекте — мы ответим в течение рабочего дня</p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contacts info */}
            <AnimatedSection delay={100}>
              <div className="space-y-6">
                <div>
                  <div
                    className="font-display text-2xl font-bold mb-6"
                    style={{ color: "var(--brand-orange)" }}
                  >
                    ЮграЭкоНефтеПроект
                  </div>
                </div>

                {[
                  { icon: "MapPin", text: "Нижневартовск, Кузоваткина 1, строение 1" },
                  { icon: "Phone", text: "+7 (982) 509-46-13", href: "tel:+79825094613" },
                  { icon: "Mail", text: "info@yuenp.ru", href: "mailto:info@yuenp.ru" },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(255,140,0,0.1)", border: "1px solid rgba(255,140,0,0.2)" }}
                    >
                      <Icon name={c.icon as any} size={18} className="text-brand-orange" />
                    </div>
                    {c.href ? (
                      <a href={c.href} className="text-gray-300 hover:text-white transition-colors text-base mt-2">
                        {c.text}
                      </a>
                    ) : (
                      <span className="text-gray-300 text-base mt-2">{c.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Contact form */}
            <AnimatedSection delay={200}>
              <div
                className="p-8 rounded-2xl"
                style={{ background: "var(--brand-card)", border: "1px solid var(--brand-border)" }}
              >
                <h3 className="font-display text-xl font-semibold text-white mb-6">Оставьте заявку</h3>
                <form
                  action="https://formspree.io/f/xdawdvgw"
                  method="POST"
                  className="space-y-4"
                >
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Ваше имя"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 outline-none transition-all duration-200 focus:ring-1"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid var(--brand-border)",
                        fontFamily: "'Golos Text', sans-serif",
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "var(--brand-orange)"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "var(--brand-border)"}
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Ваш телефон"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid var(--brand-border)",
                        fontFamily: "'Golos Text', sans-serif",
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "var(--brand-orange)"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "var(--brand-border)"}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
                    style={{ background: "linear-gradient(135deg, var(--brand-orange), var(--brand-orange-light))", color: "#0D1117", boxShadow: "0 0 20px rgba(255,140,0,0.25)" }}
                  >
                    Отправить заявку
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>

          {/* Footer bottom */}
          <div
            className="mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500 text-sm"
            style={{ borderTop: "1px solid var(--brand-border)" }}
          >
            <span>© 2026 ЮграЭкоНефтеПроект. Все права защищены.</span>
            <span className="flex items-center gap-1">
              Нижневартовск, ХМАО-Югра
            </span>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div
            className="w-full max-w-md rounded-2xl p-8 relative animate-scale-in"
            style={{ background: "var(--brand-card)", border: "1px solid var(--brand-border)" }}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <Icon name="X" size={16} />
            </button>
            <h3 className="font-display text-2xl font-bold text-white mb-2">Обсудить проект</h3>
            <p className="text-gray-400 text-sm mb-6">Оставьте контакты — перезвоним в течение рабочего дня</p>
            <form
              action="https://formspree.io/f/xdawdvgw"
              method="POST"
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                required
                className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--brand-border)",
                  fontFamily: "'Golos Text', sans-serif",
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "var(--brand-orange)"}
                onBlur={(e) => e.currentTarget.style.borderColor = "var(--brand-border)"}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Ваш телефон"
                required
                className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--brand-border)",
                  fontFamily: "'Golos Text', sans-serif",
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "var(--brand-orange)"}
                onBlur={(e) => e.currentTarget.style.borderColor = "var(--brand-border)"}
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, var(--brand-orange), var(--brand-orange-light))", color: "#0D1117", boxShadow: "0 0 20px rgba(255,140,0,0.25)" }}
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
