"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ThreeBottleWrapper from "../ThreeBottleWrapper";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgBlobRef = useRef<HTMLDivElement>(null);
  const leafTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    let rafId: number;
    let ticking = false;

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          const y = scrollYRef.current;
          if (bgBlobRef.current)
            bgBlobRef.current.style.transform = `translateY(${y * 0.45}px)`;
          if (leafTextRef.current)
            leafTextRef.current.style.transform = `translateY(${y * 0.25}px)`;
          if (contentRef.current)
            contentRef.current.style.transform = `translateY(${y * 0.08}px)`;
          if (bottleRef.current)
            bottleRef.current.style.transform = `translateY(${y * -0.05}px)`;
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-cream overflow-hidden pt-20"
    >
      {/* Background Parallax Blob Glows */}
      <div
        ref={bgBlobRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-gradient-to-tr from-[#FFF5F3] to-[#F1EAFF] blur-[120px] opacity-70" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-[#E2F0D9] to-[#FAF8FF] blur-[120px] opacity-65" />
      </div>

      {/* SKIN CARE Huge Background Text */}
      <div
        ref={leafTextRef}
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden will-change-transform"
      >
          <h1 className="font-serif text-[15vw] font-black text-text-title/10 tracking-wider uppercase leading-none mt-12">
          Skin Care
        </h1>
      </div>

      {/* Main Grid Content */}
      <div
        ref={contentRef}
        className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 h-full min-h-[80vh] will-change-transform"
      >
        {/* Left Column */}
        <div className="md:col-span-3 flex flex-col items-start gap-12 text-left z-20">
          {/* Pill Badges */}
          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FBC4BA]/80 text-[#7A2D22] text-[11px] font-bold uppercase tracking-widest shadow-sm hover:scale-105 transition-transform"
            >
              <span>Care Your Skin</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FADBB4]/80 text-[#824F1A] text-[11px] font-bold uppercase tracking-widest shadow-sm hover:scale-105 transition-transform"
            >
              <span>Natural Growth</span>
            </motion.div>
          </div>

          {/* Rotating Explore SVG stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative w-28 h-28 flex items-center justify-center cursor-pointer group"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full animate-spin [animation-duration:12000ms] pointer-events-none"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                />
              </defs>
              <text
                fill="#111111"
                className="text-[7.5px] font-bold tracking-[2.5px] uppercase"
              >
                <textPath href="#circlePath">
                  EXPLORE ALL PRODUCT · EXPLORE ALL PRODUCT ·{" "}
                </textPath>
              </text>
            </svg>

            <div className="absolute w-12 h-12 rounded-full bg-white border border-cream/50 flex items-center justify-center text-text-title group-hover:scale-110 group-hover:text-sage transition-all duration-300 shadow-md shadow-black/5">
              <ArrowUpRight className="w-5 h-5 stroke-[1.5]" />
            </div>
          </motion.div>
        </div>

        {/* Center Column: 3D Bottle */}
        <div
          ref={bottleRef}
          className="md:col-span-6 w-full h-[55vh] md:h-[75vh] cursor-grab active:cursor-grabbing relative z-10 will-change-transform"
        >
          <ThreeBottleWrapper scrollY={0} />
        </div>

        {/* Right Column: Brand narrative */}
        <div className="md:col-span-3 flex flex-col items-start text-left gap-8 z-20 md:pl-6">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-widest text-text-title/70 font-bold"
          >
            Brand Philosophy
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-text-body font-light leading-relaxed italic"
          >
            &ldquo;Cutting-edge science, crafted with couture elegance — Orvélia
            delivers a glow that feels as rare as it looks.&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-12 h-px bg-black/25"
          />

          <motion.a
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            href="#collection"
            className="text-[10px] font-bold uppercase tracking-widest text-text-title hover:text-sage border-b border-black/10 hover:border-sage pb-1 transition-colors duration-300"
          >
            Discover Formulas
          </motion.a>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
        <span className="text-[10px] uppercase tracking-widest text-text-meta">
          Scroll to discover
        </span>
        <div className="w-px h-12 bg-black/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-sage animate-bounce" />
        </div>
      </div>
    </section>
  );
}
