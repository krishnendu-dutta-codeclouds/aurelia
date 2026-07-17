"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  caption: string;
}

const stats: Stat[] = [
  { value: 97, suffix: "%", label: "Clinical efficacy", caption: "Visible dermal results in 14 days, verified by independent dermatologists." },
  { value: 100, suffix: "%", label: "Bio-active formulas", caption: "Every serum is formulated with clinically dosed botanical actives." },
  { value: 42, suffix: "K+", label: "Radiant subscribers", caption: "A global community glowing in 38 countries, and counting." },
  { value: 0, suffix: "", label: "Net plastic waste", caption: "Refillable glass vessels and fully compostable outer packaging." },
];

function Counter({ to, active }: { to: number; active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to]);
  return <>{n.toLocaleString()}</>;
}

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden aurora-bg grain"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 md:mb-24">
          <div className="md:col-span-2">
            <SectionLabel index="03 / Manifesto" code={"// AUR-MAN-26"} />
          </div>
          <div className="md:col-span-5">
            <h2 className="section-title leading-[1.02] tracking-[-0.03em]">
              Beauty, <span className="italic text-sage">measured</span>.
              <br />
              Not marketed.
            </h2>
          </div>
          <p className="section-copy md:col-span-5 md:pb-3">
            Four numbers that define every drop we ship. From clinical potency to planetary footprint, our standards are open, audited, and uncompromising.
          </p>
        </div>

        {/* Stat grid — asymmetric bento */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bento-card relative group p-6 md:p-8 rounded-3xl border border-black/[0.06] bg-white/70 backdrop-blur-sm hover:border-sage/30"
            >
              <div className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-[0.25em] text-text-meta/70">
                0{i + 1}
              </div>
              <div className="text-5xl md:text-6xl lg:text-7xl font-serif text-text-title leading-none tracking-[-0.04em] mb-3">
                <Counter to={s.value} active={inView} />
                <span className="text-sage">{s.suffix}</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-text-title mb-2">
                {s.label}
              </div>
              <div className="text-xs text-text-body font-light leading-relaxed">
                {s.caption}
              </div>
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-sage/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </motion.div>
          ))}
        </div>

        {/* Editorial closing line */}
        <div className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="font-serif italic text-2xl md:text-3xl text-text-title/80 leading-snug max-w-2xl">
            “A formula is only as honest as the data behind it.”
          </p>
          <a
            href="#ingredients"
            className="magnetic group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-text-title text-white text-[11px] font-bold uppercase tracking-widest hover:bg-sage transition-colors shine-on-hover"
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
          >
            <span>Read the clinical data</span>
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
