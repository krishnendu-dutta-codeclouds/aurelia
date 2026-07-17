"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Recycle, Globe, Sparkles, CheckCircle2, ArrowUpRight, Leaf } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";

interface StatItem {
  percentage: number;
  label: string;
  desc: string;
  hue: string;
}

interface Step {
  index: string;
  title: string;
  description: string;
  badge: string;
  impact: string;
  meta: string;
  icon: typeof Recycle;
  swatch: string;
}

export default function Sustainability() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15% 0px" });

  // Parallax the floating leaf elements as the user scrolls past the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const leaf1Y = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const leaf1Rotate = useTransform(scrollYProgress, [0, 1], [-10, 30]);
  const leaf2Y = useTransform(scrollYProgress, [0, 1], [40, -120]);

  // Determine which step is in focus based on scroll position of the timeline
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    const onScroll = () => {
      const containerMid = el.getBoundingClientRect().top + el.offsetHeight / 2;
      let closest = 0;
      let closestDist = Infinity;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const dist = Math.abs(mid - containerMid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveStep(closest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const steps: Step[] = [
    {
      index: "01",
      title: "Frosted Glass Vessels",
      description:
        "Every Aurelia bottle is hand-blown from premium, infinitely recyclable cullet glass. We have eliminated single-use plastic from our entire product chain.",
      badge: "100% Recyclable",
      meta: "Material · Borosilicate cullet",
      impact: "Saves 12.4 tonnes of plastic waste annually",
      icon: Recycle,
      swatch: "from-[#E2F0D9] via-[#F2F8EC] to-[#FCF9F2]",
    },
    {
      index: "02",
      title: "Biodegradable Boxes",
      description:
        "Outer packaging uses raw, unbleached FSC paperboard printed with natural soy ink. The boxes fully decompose within 45 days, leaving zero toxic runoff.",
      badge: "FSC Certified",
      meta: "Material · Soy-ink, unbleached pulp",
      impact: "Zero toxic runoff during decomposition",
      icon: Globe,
      swatch: "from-[#FFF0E5] via-[#FFF6EE] to-[#FCF9F2]",
    },
    {
      index: "03",
      title: "Ethical Wild Sourcing",
      description:
        "Kakadu Plum, Centella and Green Tea are wild-harvested with indigenous cooperatives under Fair-Trade protocols, preserving biodiversity and local economies.",
      badge: "Fair Trade",
      meta: "Source · 3 regenerative farms",
      impact: "Carbon-neutral shipping networks",
      icon: Sparkles,
      swatch: "from-[#FBE9E4] via-[#FFF3EF] to-[#FCF9F2]",
    },
  ];

  const stats: StatItem[] = [
    { percentage: 100, label: "Cruelty Free", desc: "Leaping Bunny certified formulas", hue: "text-sage" },
    { percentage: 95, label: "Post-Consumer Glass", desc: "Made with recycled cullet glass", hue: "text-olive" },
    { percentage: 100, label: "Net Plastic Waste", desc: "100% plastic-free outer packages", hue: "text-rose-gold" },
  ];

  return (
    <section
      id="sustainability"
      ref={sectionRef}
      className="relative py-24 md:py-32 aurora-bg grain overflow-hidden"
    >
      {/* Floating botanical decorations — parallax with scroll */}
      <motion.div
        style={{ y: leaf1Y, rotate: leaf1Rotate }}
        className="hidden md:block absolute top-32 right-[6%] z-10 pointer-events-none opacity-40"
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path
            d="M60 110 C 30 80, 20 50, 35 20 C 50 50, 55 80, 60 110 Z"
            fill="#8F9779"
            fillOpacity="0.35"
          />
          <path
            d="M60 110 C 90 80, 100 50, 85 20 C 70 50, 65 80, 60 110 Z"
            fill="#6C7A52"
            fillOpacity="0.45"
          />
          <line x1="60" y1="20" x2="60" y2="110" stroke="#6C7A52" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
      </motion.div>
      <motion.div
        style={{ y: leaf2Y }}
        className="hidden md:block absolute bottom-24 left-[4%] z-10 pointer-events-none opacity-30"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="36" stroke="#6C7A52" strokeWidth="0.6" strokeDasharray="2 3" />
          <circle cx="40" cy="40" r="22" stroke="#8F9779" strokeWidth="0.6" />
          <circle cx="40" cy="40" r="2.5" fill="#6C7A52" />
        </svg>
      </motion.div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-20">
        {/* Editorial header — asymmetric 12-col */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 md:mb-24">
          <div className="lg:col-span-2">
            <SectionLabel index="07 / Initiatives" code={"// AUR-EARTH-26"} />
          </div>
          <div className="lg:col-span-7">
            <h2 className="section-title">
              Nourishing skin. <br />
              <span className="italic text-sage">Restoring the planet.</span>
            </h2>
          </div>
          <p className="section-copy lg:col-span-3 lg:pt-3">
            Aurelia operates on a fully circular supply loop. Three commitments, audited annually, and a single promise — luxury that leaves the earth richer than it found it.
          </p>
        </div>

        {/* Stats row — 3 large circular ring progress meters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-20 md:mb-28">
          {stats.map((s, i) => (
            <RingStat key={i} stat={s} index={i} active={inView} />
          ))}
        </div>

        {/* Horizontal scroll timeline (desktop) / stacked (mobile) */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-9 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-sage/30 to-transparent z-0" />

          <div
            ref={timelineRef}
            className="no-scrollbar relative z-10 flex md:grid md:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2"
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  data-step={idx}
                  onMouseEnter={() => setActiveStep(idx)}
                  onFocus={() => setActiveStep(idx)}
                  className={`text-left group relative shrink-0 w-[80vw] md:w-auto snap-center rounded-[28px] border p-6 md:p-8 transition-all duration-700 overflow-hidden bento-card bg-white/80 backdrop-blur-sm ${
                    isActive
                      ? "border-sage/40 shadow-[0_30px_60px_-25px_rgba(80,100,60,0.25)]"
                      : "border-black/[0.06] hover:border-sage/25"
                  }`}
                >
                  {/* Background gradient swatch */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.swatch} opacity-50 transition-opacity duration-700 ${
                      isActive ? "opacity-100" : "opacity-40"
                    }`}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Number + icon row */}
                    <div className="flex items-center justify-between mb-8">
                      <span
                        className={`font-mono text-[11px] font-bold tracking-[0.2em] transition-colors duration-500 ${
                          isActive ? "text-sage" : "text-text-meta/70"
                        }`}
                      >
                        STEP / {step.index}
                      </span>
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 ${
                          isActive
                            ? "bg-white border-sage/40 text-sage shadow-md"
                            : "bg-white/70 border-black/10 text-text-title"
                        }`}
                      >
                        <Icon className="w-5 h-5 stroke-[1.5]" />
                      </div>
                    </div>

                    {/* Title + meta */}
                    <h3 className="font-serif text-2xl md:text-[28px] text-text-title leading-tight tracking-[-0.02em] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-meta mb-5">
                      {step.meta}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-text-body font-light leading-relaxed mb-6">
                      {step.description}
                    </p>

                    <div className="flex-1" />

                    {/* Footer: badge + impact */}
                    <div className="pt-5 border-t border-black/[0.07] flex flex-col gap-3">
                      <span className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-white/80 border border-sage/25 text-sage text-[10px] font-bold uppercase tracking-[0.2em]">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                        {step.badge}
                      </span>
                      <div className="flex items-start gap-2 text-xs text-text-body font-light">
                        <CheckCircle2 className="w-4 h-4 text-sage mt-0.5 shrink-0 stroke-[1.8]" />
                        <span>{step.impact}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile step indicator dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === activeStep ? "w-8 bg-sage" : "w-2 bg-text-meta/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom: Return-program callout strip */}
        <div className="mt-20 md:mt-28 relative overflow-hidden rounded-[32px] border border-black/[0.06] bg-text-title text-white">
          {/* Subtle gradient sheen */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-sage/40 via-transparent to-transparent" />
            <div className="absolute -bottom-1/2 -right-1/4 w-1/2 h-full rounded-full bg-gradient-to-tr from-rose-gold/30 to-transparent blur-3xl" />
          </div>

          <div className="relative z-10 p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-sage/80 mb-4 flex items-center gap-2">
                <Leaf className="w-3.5 h-3.5" />
                The Return Program
              </p>
              <h3 className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.03em] mb-4">
                Send your vessel back.{" "}
                <span className="italic text-sage">We refill, you save.</span>
              </h3>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed max-w-xl">
                Return any empty Aurelia glass vessel to a partner boutique and receive a 15% credit on your next formulation. Every bottle re-enters the loop — never the landfill.
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col items-start md:items-end gap-5">
              <div className="flex items-center gap-6">
                <div>
                  <div className="font-serif text-4xl md:text-5xl text-sage leading-none tracking-[-0.04em]">15%</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 mt-1">
                    Refill credit
                  </div>
                </div>
                <div className="w-px h-12 bg-white/15" />
                <div>
                  <div className="font-serif text-4xl md:text-5xl text-sage leading-none tracking-[-0.04em]">2.4K</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 mt-1">
                    Vessels re-loop / mo
                  </div>
                </div>
              </div>

              <a
                href="#"
                onMouseMove={(e) => {
                  const t = e.currentTarget as HTMLAnchorElement;
                  const r = t.getBoundingClientRect();
                  t.style.setProperty("--mx", `${e.clientX - r.left - r.width / 2}px`);
                  t.style.setProperty("--my", `${e.clientY - r.top - r.height / 2}px`);
                }}
                onMouseLeave={(e) => {
                  const t = e.currentTarget as HTMLAnchorElement;
                  t.style.setProperty("--mx", "0px");
                  t.style.setProperty("--my", "0px");
                }}
                style={{ transform: "translate(var(--mx,0), var(--my,0))" }}
                className="magnetic group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-sage text-white hover:bg-white hover:text-text-title border border-white/20 shadow-lg transition-colors shine-on-hover"
              >
                <span>Find a return boutique</span>
                <ArrowUpRight className="w-4 h-4 stroke-[1.8] group-hover:rotate-45 transition-transform duration-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Circular ring stat (animated SVG progress) ───────────────────── */
function RingStat({ stat, index, active }: { stat: StatItem; index: number; active: boolean }) {
  const [val, setVal] = useState(0);
  const size = 140;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (val / 100) * c;

  useEffect(() => {
    if (!active) return;
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(stat.percentage * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, stat.percentage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="bento-card relative p-6 md:p-8 rounded-3xl border border-black/[0.06] bg-white/80 backdrop-blur-sm hover:border-sage/30 flex items-center gap-6"
    >
      <div className="relative shrink-0">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#F2ECE1"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8F9779" />
              <stop offset="100%" stopColor="#6C7A52" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-serif text-2xl md:text-3xl ${stat.hue} tracking-[-0.04em]`}>
            {Math.round(val)}%
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-meta mb-1">
          Metric 0{index + 1}
        </span>
        <span className="font-serif text-lg md:text-xl text-text-title leading-tight mb-1">
          {stat.label}
        </span>
        <span className="text-xs text-text-body font-light leading-relaxed">
          {stat.desc}
        </span>
      </div>
    </motion.div>
  );
}
