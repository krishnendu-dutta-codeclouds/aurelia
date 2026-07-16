"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Leaf, FlaskConical, ShieldAlert, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftScrollContainerRef = useRef<HTMLDivElement>(null);
  const craftedRevealRef = useRef<HTMLDivElement>(null);
  const editorialRevealRef = useRef<HTMLDivElement>(null);
  const editorialBgRef = useRef<HTMLDivElement>(null);

  // JS-driven parallax for editorial bg — CSS background-attachment:fixed breaks
  // under clip-path and GSAP pin transforms (both create new stacking contexts).
  useEffect(() => {
    let raf: number;
    const handleScroll = () => {
      if (!editorialBgRef.current) return;
      // Shift bg up at 20% of scroll speed — creates smooth depth illusion
      const offset = window.scrollY * 0.2;
      editorialBgRef.current.style.transform = `translateY(${offset}px)`;
    };
    const onScroll = () => {
      raf = requestAnimationFrame(handleScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount to set initial position
    handleScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin on client
    gsap.registerPlugin(ScrollTrigger);

    // Skip pinned scroll animation on mobile — too jarring on small screens
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Create main scroll timeline — 5 viewport heights total gives each phase room to breathe
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 5}`,
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Phase 1 (0.0 → 0.5): slide through all 3 story steps
    tl.fromTo(leftScrollContainerRef.current,
      { y: "0%" },
      { y: "-66.67%", ease: "power2.inOut", duration: 0.5 },
      0
    );

    // Phase 2 (0.55 → 0.72): Crafted Elegance reveals fully from bottom
    tl.fromTo(craftedRevealRef.current,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 0.17 },
      0.55
    );

    // Phase 3 (0.72 → 0.72): Crafted Elegance holds full screen (implicit pause in timeline)
    // No tween needed — the previous tween ends at 0.72 and next starts at 0.82

    // Phase 4 (0.82 → 1.0): Editorial / Clean overlay sweeps in over Crafted Elegance
    tl.fromTo(editorialRevealRef.current,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 0.18 },
      0.82
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section id="story" ref={containerRef} className="relative min-h-screen bg-cream/15">
      {/* Story slides — sticky pinned on desktop, natural scroll on mobile */}
      <div className="md:sticky top-0 md:h-screen w-full flex items-center overflow-hidden">

        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cream via-peach/10 to-mint/30 pointer-events-none" />

        {/* Main Centered Narrative */}
        <div className="w-full max-w-4xl mx-auto px-4 md:px-12 h-full flex flex-col justify-center relative z-10">

          {/* Scroll Content Wrapper — masked on desktop, natural on mobile */}
          <div className="md:h-screen md:overflow-hidden relative flex flex-col justify-start md:pointer-events-none w-full text-center">
            {/* Scrollable Container (contains 3 slides, total 300vh on desktop) */}
            <div
              ref={leftScrollContainerRef}
              className="flex flex-col md:h-[300vh] will-change-transform w-full"
            >
              {/* Story Step 1 */}
              <div className="min-h-[60vh] md:h-screen flex flex-col justify-center items-center text-center py-16 md:py-0">
                <div className="flex flex-col items-center max-w-2xl px-4">
                  <div className="flex items-center gap-3 text-sage mb-4 md:mb-6">
                    <Leaf className="w-5 h-5" />
                    <span className="text-[11px] font-semibold uppercase tracking-widest">Stage 01</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-light text-text-title mb-5 md:mb-8 leading-tight">
                    Harvested with <br />
                    <span className="italic font-normal text-sage">Botanical Integrity</span>
                  </h2>
                  <p className="text-sm md:text-lg text-text-body font-light leading-relaxed max-w-xl mx-auto">
                    Every Aurelia botanical compound is cold-extracted to protect the structural integrity of natural cells, capturing organic nutrients at their peak efficacy.
                  </p>
                </div>
              </div>

              {/* Story Step 2 */}
              <div className="min-h-[60vh] md:h-screen flex flex-col justify-center items-center text-center py-16 md:py-0">
                <div className="flex flex-col items-center max-w-2xl px-4">
                  <div className="flex items-center gap-3 text-sage mb-4 md:mb-6">
                    <FlaskConical className="w-5 h-5" />
                    <span className="text-[11px] font-semibold uppercase tracking-widest">Stage 02</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-light text-text-title mb-5 md:mb-8 leading-tight">
                    Molecular <br />
                    <span className="italic font-normal text-sage">Bio-Synthesis</span>
                  </h2>
                  <p className="text-sm md:text-lg text-text-body font-light leading-relaxed max-w-xl mx-auto">
                    We synthesize botanicals with active peptides and ceramides, stabilizing compounds so they bypass superficial skin barrier thresholds safely.
                  </p>
                </div>
              </div>

              {/* Story Step 3 */}
              <div className="min-h-[60vh] md:h-screen flex flex-col justify-center items-center text-center py-16 md:py-0">
                <div className="flex flex-col items-center max-w-2xl px-4">
                  <div className="flex items-center gap-3 text-sage mb-4 md:mb-6">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-[11px] font-semibold uppercase tracking-widest">Stage 03</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-light text-text-title mb-5 md:mb-8 leading-tight">
                    Couture <br />
                    <span className="italic font-normal text-sage">Dermal Radiance</span>
                  </h2>
                  <p className="text-text-body md:text-lg font-light leading-relaxed max-w-xl mx-auto">
                    The final emulsion melts on skin contact, targeting depleted cell pathways to release a luxury glow that feels as rare as it looks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Crafted Elegance Reveal — clips in from below, fully covers viewport */}
        <div
          ref={craftedRevealRef}
          className="absolute h-full inset-0 bg-[#0e0d0b] flex flex-col items-center justify-center z-20 will-change-[clip-path] overflow-hidden"
          style={{ clipPath: "inset(100% 0 0 0)" }}
        >
          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

          {/* Soft ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#c9a96e]/10 blur-[120px]" />
          </div>

          <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
              <p className="text-[10px] font-mono text-[#c9a96e]/70 tracking-[0.5em] uppercase mb-6 md:mb-8 block">
                Aurelia Standards
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-[9vw] font-serif font-bold text-white uppercase tracking-wider leading-none mb-6 md:mb-8">
                CRAFTED <span className="italic font-light text-[#c9a96e]">elegance</span>
              </h2>
            <div className="w-16 h-px bg-[#c9a96e]/30 mx-auto mb-8" />
            <p className="text-base md:text-lg text-white/50 font-light max-w-lg mx-auto leading-relaxed">
              Delivering scientific cell-targeted cosmetics that reverse UV damage, shrink pore sizes, and rebuild skin lipid matrices.
            </p>
          </div>
        </div>

        {/* Editorial Beauty Section — clips in over Crafted Elegance, parallax botanical bg */}
        <div
          ref={editorialRevealRef}
          className="absolute h-full inset-0 z-[35] flex items-center justify-center will-change-[clip-path] overflow-hidden"
          style={{ clipPath: "inset(100% 0 0 0)" }}
        >
          {/* Parallax background using background-attachment: fixed */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('/clean_bg.png')",
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Soft white overlay to keep card readable */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center my-auto">
            {/* Clinical badge card — frosted glass */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 md:p-12 border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col items-center gap-6 relative overflow-hidden max-w-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-sage" />
              <div className="w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-sage border border-sage/10 shrink-0">
                <ShieldAlert className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-medium text-text-title mb-4">
                  Clean, Beyond Reproach
                </h3>
                <p className="text-sm text-text-body leading-relaxed font-light max-w-md mx-auto">
                  Truly clean with only verified ingredients; free from over 1,800 questionable compounds. Because what you put on your skin matters.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
