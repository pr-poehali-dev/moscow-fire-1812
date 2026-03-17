import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

export const HERO_IMAGE =
  "https://cdn.poehali.dev/projects/eb514806-0563-41be-b28d-7b0814d8f147/files/e70571c6-1505-486c-a313-6728638b1d19.jpg";

/* ─── Intersection observer hook ─── */
export function useInView(threshold = 0.12) {
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
export function FadeUp({
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
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
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
export function Particles() {
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
export function SectionHeading({ num, title }: { num: string; title: string }) {
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

/* ─── Global keyframes style tag ─── */
export function GlobalKeyframes() {
  return (
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
  );
}

/* ─── Shared data ─── */
export const NAV = [
  { id: "about", label: "О компании" },
  { id: "services", label: "Услуги" },
  { id: "values", label: "Ценности" },
  { id: "process", label: "Процесс" },
  { id: "gallery", label: "Галерея" },
  { id: "contacts", label: "Контакты" },
];

export const SERVICES = [
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

export const VALUES = [
  { icon: "ShieldCheck", title: "Ответственность", desc: "Мы отвечаем за каждый этап. Доверие клиента — главная ценность" },
  { icon: "Gem", title: "Качество", desc: "Тщательная проработка и строгий контроль на всех этапах" },
  { icon: "Clock4", title: "Пунктуальность", desc: "Соблюдение сроков — обязательное условие нашей работы" },
  { icon: "Handshake", title: "Честность", desc: "Прозрачные условия сотрудничества и открытая коммуникация" },
];

export const STEPS = [
  { num: "01", title: "Анализ задачи", desc: "Изучаем ТЗ, уточняем детали и требования", icon: "Search" },
  { num: "02", title: "Разработка", desc: "Готовим документацию с учётом всех норм и стандартов", icon: "PenTool" },
  { num: "03", title: "Согласование", desc: "Вносим правки, согласовываем со всеми сторонами", icon: "CheckSquare" },
  { num: "04", title: "Передача", desc: "Сдаём документацию, поддерживаем при необходимости", icon: "PackageCheck" },
];

export const STATS = [
  { to: 10, suffix: "+", label: "Лет опыта", color: "var(--brand-orange)" },
  { to: 150, suffix: "+", label: "Проектов", color: "var(--brand-green)" },
  { to: 100, suffix: "%", label: "Гарантия", color: "#FFB347" },
  { to: 0, suffix: "", label: "Нарушений сроков", color: "var(--brand-green)" },
];

/* ─── ContactForm (reused in Footer and Modal) ─── */
export function ContactForm({ onSubmit }: { onSubmit?: () => void }) {
  return (
    <form action="https://formspree.io/f/xdawdvgw" method="POST" className="space-y-4" onSubmit={onSubmit}>
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
  );
}

// suppress unused Icon import warning — Icon is used in consuming files via re-export
export { Icon };
