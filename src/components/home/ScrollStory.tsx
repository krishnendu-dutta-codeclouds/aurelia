"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, FlaskConical, Sparkles, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const stages = [
  {
    number: "01",
    label: "Stage 01",
    Icon: Leaf,
    headline: "Harvested with",
    accent: "Botanical Integrity",
    body: "Every Aurelia botanical compound is cold-extracted to protect the structural integrity of natural cells, capturing organic nutrients at their peak efficacy.",
    image: "/images/toner.png",
    tag: "Cold-Extracted Botanicals",
    glowFrom: "from-mint/60",
    glowTo: "to-sage/20",
  },
  {
    number: "02",
    label: "Stage 02",
    Icon: FlaskConical,
    headline: "Molecular",
    accent: "Bio-Synthesis",
    body: "We synthesize botanicals with active peptides and ceramides, stabilizing compounds so they bypass superficial skin barrier thresholds safely.",
    image: "/images/serum.png",
    tag: "Active Peptide Complex",
    glowFrom: "from-peach/50",
    glowTo: "to-champagne-gold/20",
  },
  {
    number: "03",
    label: "Stage 03",
    Icon: Sparkles,
    headline: "Couture",
    accent: "Dermal Radiance",
    body: "The final emulsion melts on skin contact, targeting depleted cell pathways to release a luxury glow that feels as rare as it looks.",
    image: "/images/cream.png",
    tag: "Luxury Emulsion",
    glowFrom: "from-cream",
    glowTo: "to-peach/30",
  },
];

export default function ScrollStory() {
  const [activeStage, setActiveStage] = useState(0);
  const stagesSectionRef = useRef<HTMLDivElement>(null);
  const leftColumnWrapperRef = useRef<HTMLDivElement>(null);
  const editorialBgRef = useRef<HTMLDivElement>(null);

  // GSAP: pin stagesSectionRef and translate the leftColumnWrapperRef as user scrolls
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stagesSectionRef.current,
          pin: true,
          start: "top top",
          end: "+=400vh", // scroll distance of 4 viewports (doubles the scroll distance to slow it down)
          scrub: 1.5, // smooth scroll transition
          snap: {
            snapTo: [0, 0.5, 1], // snaps perfectly to each stage
            duration: { min: 0.25, max: 0.45 },
            delay: 0.05,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const p = self.progress;
            let idx = 0;
            if (p >= 0.75) idx = 2;
            else if (p >= 0.25) idx = 1;
            setActiveStage(idx);
          },
        },
      });

      // Translate the left column wrapper containing the 3 h-screen stages
      tl.to(leftColumnWrapperRef.current, {
        y: "-66.67%",
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  // JS-driven parallax for clean_bg
  useEffect(() => {
    let raf: number;
    const handleScroll = () => {
      if (!editorialBgRef.current) return;
      editorialBgRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    };
    const onScroll = () => { raf = requestAnimationFrame(handleScroll); };
    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="story" className="relative bg-white">

      {/* ─── DESKTOP: GSAP Pinned Layout with scrolling stages ─── */}
      <div ref={stagesSectionRef} className="relative hidden md:block h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cream/60 via-white to-mint/20 pointer-events-none" />

        <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 gap-16 h-full">

            {/* LEFT COLUMN: Wrapper containing the 3 stage slides translated by GSAP */}
            <div className="h-full overflow-hidden relative">
              <div
                ref={leftColumnWrapperRef}
                className="flex flex-col will-change-transform h-[300%]"
              >
                {stages.map((stage, i) => {
                  const { Icon } = stage;
                  return (
                    <div
                      key={i}
                      className="h-screen flex flex-col justify-center relative"
                    >
                      {/* Section header inside stage 1 */}
                      {i === 0 && (
                        <div className="absolute top-16 left-0">
                          <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-2">
                            The Science Process
                          </p>
                          <h2 className="text-4xl md:text-5xl font-serif font-light text-text-title leading-tight">
                            From Nature to{" "}
                            <span className="italic font-normal text-sage">Your Skin</span>
                          </h2>
                        </div>
                      )}

                      {/* Content */}
                      <div className={i === 0 ? "pt-24" : ""}>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-9 h-9 rounded-xl bg-mint border border-sage/15 flex items-center justify-center text-sage">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-sage">
                            {stage.label}
                          </span>
                        </div>

                        {/* Watermark + headline */}
                        <div className="relative mb-7">
                          <span className="absolute -top-6 -left-2 text-[9rem] font-serif font-bold text-black/[0.04] leading-none select-none pointer-events-none">
                            {stage.number}
                          </span>
                          <h2 className="relative text-5xl xl:text-6xl font-serif font-light text-text-title leading-tight">
                            {stage.headline} <br />
                            <span className="italic font-normal text-sage">{stage.accent}</span>
                          </h2>
                        </div>

                        {/* Body */}
                        <p className="text-lg text-text-body font-light leading-relaxed max-w-sm mb-8">
                          {stage.body}
                        </p>

                        {/* Tag pill */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint border border-sage/15 text-[10px] font-bold uppercase tracking-[0.2em] text-sage">
                          <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                          {stage.tag}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: Stays pinned naturally because the parent h-screen container is pinned by GSAP */}
            <div className="h-full flex items-center justify-center">
              <div className="relative w-full max-w-sm">

                {/* Glow blob behind image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`glow-${activeStage}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className={`absolute inset-0 rounded-full blur-[90px] bg-gradient-to-br ${stages[activeStage].glowFrom} ${stages[activeStage].glowTo}`}
                  />
                </AnimatePresence>

                {/* Watermark stage number */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`num-${activeStage}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-10 left-0 text-[9rem] font-serif font-bold text-black/[0.05] leading-none select-none pointer-events-none"
                  >
                    {stages[activeStage].number}
                  </motion.span>
                </AnimatePresence>

                {/* Product image container with overlapping crossfade */}
                <div className="relative aspect-[3/4] w-full">
                  <AnimatePresence>
                    <motion.div
                      key={`img-${activeStage}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={`${basePath}${stages[activeStage].image}`}
                        alt={stages[activeStage].accent}
                        fill
                        className="object-contain drop-shadow-2xl"
                        sizes="(max-width: 1280px) 40vw, 360px"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress indicators beneath image */}
                <div className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-sage/60">
                    {stages[activeStage].label} · {stages[activeStage].accent}
                  </span>
                </div>

                {/* Vertical progress bar */}
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 items-center">
                  {stages.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: activeStage === i ? 28 : 6,
                        opacity: activeStage === i ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.25 }}
                      className={`w-[3px] rounded-full ${activeStage === i ? "bg-sage" : "bg-sage/40"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─── MOBILE: natural scroll, all stages stacked ─── */}
      <div className="block md:hidden bg-gradient-to-br from-cream/60 via-white to-mint/20">
        <div className="px-6 pt-20 pb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-2">
            The Science Process
          </p>
          <h2 className="text-4xl font-serif font-light text-text-title">
            From Nature to{" "}
            <span className="italic font-normal text-sage">Your Skin</span>
          </h2>
        </div>
        {stages.map((s, i) => {
          const SIcon = s.Icon;
          return (
            <div key={i} className="px-6 py-16 border-b border-black/5 last:border-none">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-mint border border-sage/15 flex items-center justify-center text-sage">
                  <SIcon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-sage">
                  {s.label}
                </span>
              </div>
              <h2 className="text-4xl font-serif font-light text-text-title leading-tight mb-5">
                {s.headline} <br />
                <span className="italic font-normal text-sage">{s.accent}</span>
              </h2>
              <p className="text-base text-text-body font-light leading-relaxed mb-6">{s.body}</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint border border-sage/15 text-[10px] font-bold uppercase tracking-[0.2em] text-sage mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                {s.tag}
              </div>
              <div className="relative w-48 h-64 mx-auto">
                <div className={`absolute inset-0 rounded-full blur-[60px] opacity-50 bg-gradient-to-br ${s.glowFrom} ${s.glowTo}`} />
                <Image
                  src={`${basePath}${s.image}`}
                  alt={s.accent}
                  fill
                  className="object-contain drop-shadow-xl"
                  sizes="192px"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── CRAFTED ELEGANCE ─── */}
      <div className="relative bg-[#0e0d0b] py-36 md:py-48 flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-[#c9a96e]/10 blur-[120px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center px-8 max-w-5xl mx-auto"
        >
          <p className="text-[10px] font-mono text-[#c9a96e]/60 tracking-[0.5em] uppercase mb-7">
            Aurelia Standards
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-[9vw] font-serif font-bold text-white uppercase tracking-wider leading-none mb-8">
            CRAFTED{" "}
            <span className="italic font-light text-[#c9a96e]">elegance</span>
          </h2>
          <div className="w-16 h-px bg-[#c9a96e]/30 mx-auto mb-8" />
          <p className="text-base md:text-lg text-white/45 font-light max-w-lg mx-auto leading-relaxed">
            Delivering scientific cell-targeted cosmetics that reverse UV damage,
            shrink pore sizes, and rebuild skin lipid matrices.
          </p>
        </motion.div>
      </div>

      {/* ─── CLEAN, BEYOND REPROACH ─── */}
      <div className="relative overflow-hidden min-h-[100vh] flex items-center justify-center">
        <div
          ref={editorialBgRef}
          className="absolute top-[-100%] w-[100%] h-[100%] will-change-transform"
          style={{
            backgroundImage: `url('${basePath}/clean_bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-white/45 backdrop-blur-[3px]" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center py-28"
        >
          <div className="bg-white/75 backdrop-blur-2xl rounded-3xl p-10 md:p-14 border border-white/60 shadow-[0_24px_64px_rgba(0,0,0,0.09)] flex flex-col items-center gap-6 relative overflow-hidden w-full max-w-2xl">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-sage via-mint to-sage/50" />
            <div className="w-14 h-14 rounded-2xl bg-mint flex items-center justify-center text-sage border border-sage/10">
              <ShieldAlert className="w-7 h-7 stroke-[1.5]" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-2xl md:text-4xl font-medium text-text-title mb-5">
                Clean, Beyond Reproach
              </h3>
              <p className="text-sm md:text-base text-text-body leading-relaxed font-light max-w-md mx-auto">
                Truly clean with only verified ingredients; free from over 1,800
                questionable compounds. Because what you put on your skin matters.
              </p>
            </div>
            <div className="w-full grid grid-cols-3 gap-4 pt-6 border-t border-black/5">
              {[
                { value: "1,800+", label: "Banned substances" },
                { value: "100%", label: "Verified ingredients" },
                { value: "0", label: "Harmful compounds" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center text-center">
                  <span className="text-xl md:text-2xl font-serif font-semibold text-sage">
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-text-meta font-medium mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
