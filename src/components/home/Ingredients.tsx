"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Leaf, Heart, Sun, Activity, Zap, LucideIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Ingredient {
  id: string;
  name: string;
  chemical: string;
  concentration: string;
  purity: string;
  activity: string;
  benefits: string[];
  description: string;
  icon: LucideIcon;
  color: string;
  glowColor: string;
  chemicalFormula: string;
  svgIllustration: React.ReactNode;
}

export default function Ingredients() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);

  const ingredients: Ingredient[] = [
    {
      id: "vitc",
      name: "Kakadu Vitamin C",
      chemical: "Tetrahexyldecyl Ascorbate",
      concentration: "15% Clinical Grade",
      purity: "99.8% Purity Index",
      activity: "High Cellular Affinity",
      benefits: ["Brightens Skin", "Boosts Collagen", "Neutralizes Free Radicals"],
      description: "A highly stable, fat-soluble Vitamin C that penetrates deep into cellular layers to stimulate collagen synthesis and reverse photo-damage.",
      icon: Sun,
      color: "border-[#fcdfd7] bg-[#fbf5f2]/40 text-[#c9603f]",
      glowColor: "from-[#fbcab7]/30 to-[#f5dcd3]/10",
      chemicalFormula: "C12H18O6",
      svgIllustration: (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#c9603f]/15 group-hover:text-[#c9603f]/25 transition-colors duration-500">
          <circle cx="50" cy="40" r="14" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 50 26 L 50 12 M 64 40 L 78 40 M 50 54 L 50 68 M 36 40 L 22 40" stroke="currentColor" strokeWidth="1.2" />
          <line x1="39" y1="29" x2="29" y2="19" stroke="currentColor" strokeWidth="1.2" />
          <line x1="61" y1="29" x2="71" y2="19" stroke="currentColor" strokeWidth="1.2" />
          <line x1="39" y1="51" x2="29" y2="61" stroke="currentColor" strokeWidth="1.2" />
          <line x1="61" y1="51" x2="71" y2="61" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      id: "niacin",
      name: "Niacinamide B3",
      chemical: "Pyridine-3-carboxamide",
      concentration: "5% Active Formula",
      purity: "99.4% Dermal Affinity",
      activity: "Barrier Reconstruction",
      benefits: ["Reduces Pore Size", "Regulates Sebum", "Fades Pigmentation"],
      description: "Crucial B3 complex that restores the skin barrier surface, regulates lipid production, and blocks melanin transfer to erase spots.",
      icon: Zap,
      color: "border-[#e0efe7] bg-[#f2faf5]/40 text-[#548a6a]",
      glowColor: "from-[#cee8db]/30 to-[#dcece4]/10",
      chemicalFormula: "C6H6N2O",
      svgIllustration: (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#548a6a]/15 group-hover:text-[#548a6a]/25 transition-colors duration-500">
          <polygon points="50,22 75,36 75,64 50,78 25,64 25,36" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <line x1="75" y1="36" x2="90" y2="28" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="90" cy="28" r="3" fill="currentColor" />
          <path d="M 50 22 L 50 10 M 25 36 L 14 30" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      id: "hyaluronic",
      name: "Hyaluronic Acid",
      chemical: "Multi-Weight Hyalurnan",
      concentration: "2.0% Compound",
      purity: "99.9% Hydration Rate",
      activity: "Epidermal Resurfacing",
      benefits: ["Cellular Hydration", "Plumps Fine Lines", "Locks Deep Moisture"],
      description: "Synthesized multi-weight molecules that hold 1000x their weight in water, locking moisture into dermal cells to plump skin.",
      icon: Activity,
      color: "border-[#f7efde] bg-[#f9f7f2]/40 text-[#9b8359]",
      glowColor: "from-[#f4e6c9]/35 to-[#f6efe0]/10",
      chemicalFormula: "(C14H21NO11)n",
      svgIllustration: (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#9b8359]/15 group-hover:text-[#9b8359]/25 transition-colors duration-500">
          <polygon points="35,30 55,20 75,30 75,50 55,60 35,50" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <polygon points="15,60 35,50 55,60 55,80 35,90 15,80" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
          <line x1="55" y1="20" x2="55" y2="8" stroke="currentColor" strokeWidth="1.2" />
          <line x1="75" y1="30" x2="87" y2="24" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      id: "ceramide",
      name: "Ceramide NP",
      chemical: "Sphingolipid Matrix",
      concentration: "1.5% Lipids",
      purity: "99.1% Purity Index",
      activity: "Lipid Matrix Repair",
      benefits: ["Reinforces Barrier", "Locks in Moisture", "Blocks Pollutants"],
      description: "Natural lipids that bind skin cells together, forming a robust protective seal that blocks out daily toxins and pollution.",
      icon: Heart,
      color: "border-[#fbdfe5] bg-[#fbf3f5]/40 text-[#bf6074]",
      glowColor: "from-[#facbda]/35 to-[#f7dbe3]/10",
      chemicalFormula: "C34H67NO3",
      svgIllustration: (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#bf6074]/15 group-hover:text-[#bf6074]/25 transition-colors duration-500">
          <path d="M 20 40 Q 35 25 50 40 T 80 40 Q 80 60 50 80 Q 20 60 20 40 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <line x1="50" y1="40" x2="50" y2="80" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2,2" />
        </svg>
      ),
    },
    {
      id: "greentea",
      name: "Organic Green Tea",
      chemical: "Camellia Sinensis EGCG",
      concentration: "3% Concentrate",
      purity: "98.7% Polyphenols",
      activity: "Microbial Stress Defense",
      benefits: ["Calms Redness", "Soothes Microbial Stress", "Fights Premature Aging"],
      description: "Extracted from high-altitude tea leaves, rich in catechins and antioxidants to instantly soothe skin stress and inflammation.",
      icon: Leaf,
      color: "border-[#dfecd5] bg-[#f5faf0]/40 text-[#4c8038]",
      glowColor: "from-[#cee1bd]/40 to-[#dbead1]/10",
      chemicalFormula: "C15H14O6",
      svgIllustration: (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#4c8038]/15 group-hover:text-[#4c8038]/25 transition-colors duration-500">
          <path d="M 50 75 Q 30 50 30 30 Q 50 40 50 75 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 50 75 Q 70 50 70 30 Q 50 40 50 75 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <line x1="50" y1="75" x2="50" y2="20" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      id: "centella",
      name: "Centella Asiatica",
      chemical: "Cica Madecassoside",
      concentration: "4% Botanical Infusion",
      purity: "99.5% Active Extract",
      activity: "Accelerated Healing",
      benefits: ["Speeds Recovery", "Soothes Eczema", "Boosts Circulation"],
      description: "The legendary healer herb repairs cracked epidermal membranes, accelerates collagen synthesis, and calms redness.",
      icon: FlaskConical,
      color: "border-[#f7ede2] bg-[#faf6f2]/40 text-[#b57a42]",
      glowColor: "from-[#f4dec8]/35 to-[#f6eadd]/10",
      chemicalFormula: "C48H78O19",
      svgIllustration: (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#b57a42]/15 group-hover:text-[#b57a42]/25 transition-colors duration-500">
          <polygon points="50,15 70,30 70,55 50,70 30,55 30,30" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <line x1="50" y1="15" x2="50" y2="70" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="50" cy="42" r="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
    },
  ];

  const scrollToCard = (index: number) => {
    const trigger = ScrollTrigger.getById("ingredients-trigger");
    if (!trigger) return;

    const cardCount = ingredients.length;
    const targetProgress = index / (cardCount - 1);
    const targetScroll = trigger.start + targetProgress * (trigger.end - trigger.start);

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const trackContainer = trackContainerRef.current;
      if (!track || !trackContainer) return;

      const getScrollWidth = () => {
        return track.scrollWidth - trackContainer.offsetWidth;
      };

      const scrollWidth = getScrollWidth();

      gsap.to(track, {
        x: () => -getScrollWidth(),
        ease: "none",
        scrollTrigger: {
          id: "ingredients-trigger",
          trigger: trackContainerRef.current,
          pin: sectionRef.current,
          scrub: 1.2,
          start: "top 30%",
          end: () => `+=${scrollWidth}`, // release pin immediately when the last card is fully visible
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const cardCount = ingredients.length;
            // Map progress to active card index
            const index = Math.min(
              Math.floor(progress * cardCount),
              cardCount - 1
            );
            setActiveCardIndex(index >= 0 ? index : 0);
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ingredients"
      ref={sectionRef}
      className="h-auto py-24 md:py-32 bg-[#fbfafa] relative flex flex-col justify-center"
    >
      {/* Decorative backgrounds – clipped independently so section content doesn't get cut off */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Premium background radial highlights */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#edf3ef] to-[#FAF8F5]/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#f8f5f0] to-[#fbf7f8]/10 blur-[130px]" />

        {/* Grid overlay for medical/scientific tech aesthetic */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: "radial-gradient(#6e7a52 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col gap-8 md:gap-12">

        {/* Top Header Panel */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl text-left">
            {/* Scientific Clinical Tag */}
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#6e7a52] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6e7a52] bg-[#f2faf5] border border-[#6e7a52]/10 px-3 py-1.5 rounded-full">
                Formulation Biology
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#1b2219] leading-[1.12]">
              Scientific <span className="font-semibold text-[#6e7a52]">Purity.</span> <span className="italic font-light text-[#8e9a72]">Proven Efficacy.</span>
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#4a5548] font-light max-w-md leading-relaxed md:mb-2 text-left">
            Every molecule serves a precise cellular function. We formulate with clean, active botanicals at optimized concentrations to guarantee visible restoration.
          </p>
        </div>

        {/* Bottom Content Panel (Slide Navigation & Cards Container Side-by-Side) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 w-full">

          {/* Slide Navigation (Left Column) */}
          <div className="w-full md:w-[22%] shrink-0 text-left flex flex-col justify-center relative">
            {/* Stepper progress timeline shown only on desktop */}
            <div className="hidden md:flex flex-col gap-5 relative pl-6 border-l border-[#e4e2de]">

              {/* Sliding progress marker */}
              <div
                className="absolute left-[-1px] w-[3px] bg-[#6e7a52] rounded-full transition-all duration-300"
                style={{
                  top: `${(activeCardIndex / (ingredients.length - 1)) * 82}%`,
                  height: "18%"
                }}
              />

              {ingredients.map((ing, idx) => (
                <button
                  key={ing.id}
                  onClick={() => scrollToCard(idx)}
                  className={`flex items-center gap-4 text-left transition-all duration-300 ${activeCardIndex === idx
                    ? "text-[#6e7a52] translate-x-1.5"
                    : "text-[#4a5548]/45 hover:text-[#4a5548]"
                    }`}
                >
                  <span className={`font-mono text-xs font-semibold ${activeCardIndex === idx ? "text-[#6e7a52]" : "text-text-meta"}`}>
                    0{idx + 1}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest font-sans">
                    {ing.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Cards Container (Right Column - slides horizontally on scroll) */}
          <div
            ref={trackContainerRef}
            className="w-full md:w-[75%] overflow-x-auto md:overflow-x-hidden overflow-y-visible relative flex items-center py-4 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Desktop horizontal track / Mobile natural vertical scroll wrapper */}
            <div
              ref={trackRef}
              className="flex flex-row gap-6 md:gap-8 w-max pb-6 md:pb-0 pr-6 md:pr-8"
            >
              {ingredients.map((ing, idx) => {
                const Icon = ing.icon;
                const isHovered = hoveredId === ing.id;

                return (
                  <div
                    key={ing.id}
                    onMouseEnter={() => setHoveredId(ing.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`group relative rounded-[32px] p-8 md:p-9 border transition-all duration-500 ease-out overflow-hidden cursor-pointer flex flex-col justify-between h-[450px] w-[300px] md:w-[380px] shrink-0 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.015)] ${isHovered
                      ? "border-[#6e7a52]/40"
                      : "border-[#eae6df]"
                      } ${activeCardIndex === idx ? "md:border-[#6e7a52]/30" : ""}`}
                  >

                    {/* Glowing background blob on card hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${ing.glowColor} opacity-0 transition-opacity duration-500 pointer-events-none ${isHovered ? "opacity-100" : ""
                        }`}
                    />

                    {/* SVG Molecular background sketch */}
                    <div className="absolute right-4 top-20 w-32 h-32 pointer-events-none z-0 select-none">
                      {ing.svgIllustration}
                    </div>

                    {/* Card Top Details */}
                    <div className="relative z-10">

                      {/* Header bar */}
                      <div className="flex items-center justify-between mb-6 md:mb-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-500 group-hover:scale-110 ${ing.color}`}>
                          <Icon className="w-5.5 h-5.5 stroke-[1.5]" />
                        </div>

                        {/* Active level rating pill */}
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-white border border-[#eae6df] px-3.5 py-1.5 rounded-full text-[#4a5548] shadow-sm">
                          {ing.concentration}
                        </span>
                      </div>

                      {/* Ingredient Title & Chemical identifier */}
                      <h3 className="text-2xl md:text-3xl font-serif font-light text-[#1b2219] mb-1.5 transition-colors duration-300 group-hover:text-[#6e7a52]">
                        {ing.name}
                      </h3>
                      <p className="text-[10px] font-mono text-[#8a9284] tracking-widest uppercase mb-4 md:mb-3">
                        {ing.chemical}
                      </p>

                      {/* Body description */}
                      <p className="text-sm text-[#5a6458] font-light leading-normal mb-4 md:mb-3 pr-6">
                        {ing.description}
                      </p>
                    </div>

                    {/* Card Bottom: Scientific Stats & Benefits */}
                    <div className="relative z-10 pt-5 border-t border-[#f0ece5]">

                      {/* Bio-efficiency metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-4 md:mb-3">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#8a9284] block mb-0.5">Clinical Grade</span>
                          <span className="text-xs font-mono font-bold text-[#1b2219] leading-tight block">{ing.purity}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#8a9284] block mb-0.5">Cell Activity</span>
                          <span className="text-xs font-mono font-bold text-[#1b2219] leading-tight block">{ing.activity}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-0">
                        {ing.benefits.map((b, bIdx) => (
                          <span
                            key={bIdx}
                            className="text-[9px] bg-white border border-[#f0ece5] text-[#4a5548] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-sm"
                          >
                            {b}
                          </span>
                        ))}
                      </div>

                      {/* Formula text overlay */}
                      <span className="absolute bottom-[-10px] right-0 font-mono text-[32px] font-bold text-[#6e7a52]/5 select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-20">
                        {ing.chemicalFormula}
                      </span>
                    </div>
                  </div>
                );
              })}


            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
