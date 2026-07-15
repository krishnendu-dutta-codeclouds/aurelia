"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import ThreeBottleWrapper from "../ThreeBottleWrapper";
import { Leaf, FlaskConical, ShieldAlert, Sparkles } from "lucide-react";
import Image from "next/image";

export default function ScrollStory() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollableHeight, setScrollableHeight] = useState(1600);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const latestScrollRef = useRef(0);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const top = rect.top;
    const height = rect.height - window.innerHeight;

    let val: number;
    if (top < 0 && Math.abs(top) <= height) {
      val = Math.abs(top);
    } else if (top >= 0) {
      val = 0;
    } else {
      val = height;
    }
    latestScrollRef.current = val;

    // Batch updates with RAF — avoids excessive React re-renders
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setScrollY(latestScrollRef.current);
    });
  }, []);

  useEffect(() => {
    // Bug fix: added { passive: true } — was missing before
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const updateHeight = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setScrollableHeight(rect.height - window.innerHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeight);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  // Compute scroll progress p (0 to 1)
  const p = scrollableHeight > 0 ? scrollY / scrollableHeight : 0;

  // Map progress to clip-path values across the 5 scroll states (min-h-[500vh])
  const craftedClip = p < 0.5 ? 100 : Math.max(0, 100 - ((p - 0.5) / 0.25) * 100);
  const editorialClip = p < 0.75 ? 100 : Math.max(0, 100 - ((p - 0.75) / 0.25) * 100);

  return (
    <section id="story" ref={containerRef} className="relative min-h-[500vh] bg-cream/15">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">

        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cream via-peach/10 to-mint/30 pointer-events-none" />

        {/* Main Grid */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 h-full items-center relative z-10">

          {/* Left Column: Scroll Content */}
          <div
            className="h-full flex flex-col pr-0 md:pr-12 pointer-events-none will-change-transform"
            style={{ transform: `translateY(-${scrollY}px)` }}
          >
            {/* Story Step 1 */}
            <div className="h-full shrink-0 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-start"
              >
                <div className="flex items-center gap-3 text-sage mb-4">
                  <Leaf className="w-5 h-5" />
                  <span className="text-[11px] font-semibold uppercase tracking-widest">Stage 01</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-text-title mb-6 leading-tight">
                  Harvested with <br />
                  <span className="italic font-normal text-sage">Botanical Integrity</span>
                </h2>
                <p className="text-text-body font-light leading-relaxed max-w-md">
                  Every Orvélia botanical compound is cold-extracted to protect the structural integrity of natural cells, capturing organic nutrients at their peak efficacy.
                </p>
              </motion.div>
            </div>

            {/* Story Step 2 */}
            <div className="h-full shrink-0 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-start"
              >
                <div className="flex items-center gap-3 text-sage mb-4">
                  <FlaskConical className="w-5 h-5" />
                  <span className="text-[11px] font-semibold uppercase tracking-widest">Stage 02</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-text-title mb-6 leading-tight">
                  Molecular <br />
                  <span className="italic font-normal text-sage">Bio-Synthesis</span>
                </h2>
                <p className="text-text-body font-light leading-relaxed max-w-md">
                  We synthesize botanicals with active peptides and ceramides, stabilizing compounds so they bypass superficial skin barrier thresholds safely.
                </p>
              </motion.div>
            </div>

            {/* Story Step 3 */}
            <div className="h-full shrink-0 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-start"
              >
                <div className="flex items-center gap-3 text-sage mb-4">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-[11px] font-semibold uppercase tracking-widest">Stage 03</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-text-title mb-6 leading-tight">
                  Couture <br />
                  <span className="italic font-normal text-sage">Dermal Radiance</span>
                </h2>
                <p className="text-text-body font-light leading-relaxed max-w-md">
                  The final emulsion melts on skin contact, targeting depleted cell pathways to release a luxury glow that feels as rare as it looks.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column: 3D Bottle reacting to scroll */}
          <div className="hidden md:block h-screen relative">
            <div className="absolute inset-0 w-full h-[85%] my-auto">
              <ThreeBottleWrapper scrollY={scrollY} />
            </div>
          </div>
        </div>

        {/* Crafted Elegance Reveal — clips in from below as you scroll */}
        <div
          className="absolute inset-0 bg-white flex flex-col items-center justify-center z-20 will-change-[clip-path]"
          style={{ clipPath: `inset(${Math.max(0, craftedClip - 15)}% 0 0 0)` }}
        >
          <div className="max-w-4xl text-center px-6 py-20">
            <span className="text-[10px] font-mono text-sage tracking-widest uppercase mb-4 block">
              Orvélia Standards
            </span>
            <h2 className="text-5xl md:text-8xl font-serif font-bold text-text-title uppercase tracking-wider mb-6">
              CRAFTED <span className="italic font-light text-sage">elegance</span>
            </h2>
            <div className="w-12 h-px bg-black/15 mx-auto mb-6" />
            <p className="text-sm text-text-body font-light max-w-md mx-auto leading-relaxed">
              Delivering scientific cell-targeted cosmetics that reverse UV damage, shrink pore sizes, and rebuild skin lipid matrices.
            </p>
          </div>
        </div>

        {/* Editorial Beauty Section — clips in deeper */}
        {/* Bug fix: was z-35 (not a valid Tailwind class) → changed to z-[35] */}
        <div
          className="absolute min-h-[90vh] inset-0 bg-[#F6F6F6] z-[35] flex items-center justify-center will-change-[clip-path]"
          style={{ clipPath: `inset(${editorialClip}% 0 0 0)` }}
        >
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-[90%] my-auto">

            {/* Clinical badge card */}
            <div className="flex flex-col items-start text-left max-w-md">
              <div className="bg-white rounded-3xl p-8 border border-cream shadow-[0_15px_30px_rgba(0,0,0,0.02)] flex gap-4 items-start relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.75 bg-sage" />
                <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center text-sage border border-sage/10 shrink-0">
                  <ShieldAlert className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-text-title mb-2">
                    Clean, Beyond Reproach
                  </h3>
                  <p className="text-xs text-text-body leading-relaxed font-light">
                    Truly clean with only verified ingredients; free from over 1,800 questionable compounds. Because what you put on your skin matters.
                  </p>
                </div>
              </div>
            </div>

            {/* Beauty model image */}
            <div className="relative w-full h-[65vh] rounded-4xl overflow-hidden border border-cream/50 shadow-md">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/skin_glowing.png`}
                alt="Smiling model showcasing moisturised glowing skin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <span className="absolute bottom-6 right-6 z-20 text-[10px] font-bold uppercase tracking-widest bg-white/75 text-text-title backdrop-blur-md px-5 py-2 rounded-full border border-cream">
                Clean Beauty Assurance
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
