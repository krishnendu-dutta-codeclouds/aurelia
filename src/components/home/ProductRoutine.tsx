"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowRight, ShieldCheck, RefreshCw, Zap, LucideIcon } from "lucide-react";
import Image from "next/image";

interface RoutineStep {
  step: string;
  action: string;
  product: string;
  description: string;
  image: string;
  activeIngredient: string;
  icon: LucideIcon;
}

export default function ProductRoutine() {
  const [routine, setRoutine] = useState<"morning" | "night">("morning");

  const morningRoutine: RoutineStep[] = [
    {
      step: "Step 01",
      action: "PREPARE",
      product: "Botanical Harmony Toner",
      description: "Splash cold water, then press toner into skin to rebalance pH layers and lock in initial botanical moisture.",
      image: "/images/toner.png",
      activeIngredient: "Mint & Aloe Vera extract",
      icon: RefreshCw,
    },
    {
      step: "Step 02",
      action: "TARGET",
      product: "Aura Radiance Serum",
      description: "Apply 3-4 drops of Vitamin C serum. Press gently into face and neck to trigger brightening and UV barrier defenses.",
      image: "/images/serum.png",
      activeIngredient: "15% Vitamin C & Kakadu Plum",
      icon: Zap,
    },
    {
      step: "Step 03",
      action: "SHIELD",
      product: "Luna Radiance Repair Cream",
      description: "Massage a dime-sized amount of day cream to seal active serums, lock skin hydration, and shield against environmental dust.",
      image: "/images/cream.png",
      activeIngredient: "Ceramides & Multi-weight Lipids",
      icon: ShieldCheck,
    },
  ];

  const nightRoutine: RoutineStep[] = [
    {
      step: "Step 01",
      action: "PURIFY",
      product: "Botanical Harmony Toner",
      description: "Sweep over face with a organic pad to wash away daily makeup, dirt particles, and clarify clogged pore nodes.",
      image: "/images/toner.png",
      activeIngredient: "Centella Asiatica (Cica) healer",
      icon: RefreshCw,
    },
    {
      step: "Step 02",
      action: "RESTORE",
      product: "Aura Radiance Serum",
      description: "Massage serum into relaxed cells. Night cell mitosis speeds up absorption, healing damage and evening out tone.",
      image: "/images/serum.png",
      activeIngredient: "5% Niacinamide B3 active complex",
      icon: Zap,
    },
    {
      step: "Step 03",
      action: "REGENERATE",
      product: "Luna Radiance Repair Cream",
      description: "Apply generously as a overnight mask. The lipids merge with cell membranes to rebuild skin barrier strength by sunrise.",
      image: "/images/cream.png",
      activeIngredient: "EGCG Green Tea & Peptides",
      icon: ShieldCheck,
    },
  ];

  const activeSteps = routine === "morning" ? morningRoutine : nightRoutine;

  return (
    <section id="routine" className="py-32 bg-white relative overflow-hidden">
      
      {/* Background radial gradients */}
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-mint/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-peach/15 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Toggle & Header Layout */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4">Skincare Rituals</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-text-title">
              Crafting Your <br />
              <span className="italic font-normal text-sage">Cellular Routine</span>
            </h2>
          </div>

          {/* Routine Switcher Button Group */}
          <div className="flex bg-cream/50 p-1.5 rounded-full border border-cream shadow-sm relative shrink-0">
            <button
              onClick={() => setRoutine("morning")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 relative z-10 ${
                routine === "morning" ? "text-white" : "text-text-meta hover:text-text-title"
              }`}
            >
              <Sun className="w-4 h-4" />
              Morning Reset
              {routine === "morning" && (
                <motion.div
                  layoutId="activeRoutineBg"
                  className="absolute inset-0 bg-sage rounded-full -z-10 shadow-[0_4px_12px_rgba(110,122,82,0.15)]"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
            <button
              onClick={() => setRoutine("night")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 relative z-10 ${
                routine === "night" ? "text-white" : "text-text-meta hover:text-text-title"
              }`}
            >
              <Moon className="w-4 h-4" />
              Night Repair
              {routine === "night" && (
                <motion.div
                  layoutId="activeRoutineBg"
                  className="absolute inset-0 bg-[#353C2D] rounded-full -z-10 shadow-[0_4px_12px_rgba(53,60,45,0.15)]"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Timeline Sequence */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          
          {/* Connecting line for timeline */}
          <div className="hidden lg:block absolute top-[130px] left-[15%] right-[15%] h-px bg-black/5 -z-10" />

          <AnimatePresence mode="wait">
            {activeSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={`${routine}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Image */}
                  <div className="relative w-full h-[260px] bg-warm-white rounded-[32px] overflow-hidden mb-8 border border-cream/50 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${step.image}`}
                      alt={step.product}
                      fill
                      className="object-cover p-0"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    
                    {/* Circle badge floating */}
                    <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center text-sage border border-cream shadow-sm">
                      <StepIcon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                  </div>

                  {/* Step Details */}
                  <span className="text-[10px] font-semibold tracking-widest text-sage bg-mint border border-sage/10 px-3 py-1 rounded-full mb-4">
                    {step.step} · {step.action}
                  </span>

                  <h3 className="font-serif text-2xl font-light text-text-title mb-3 group-hover:text-sage transition-colors duration-300">
                    {step.product}
                  </h3>

                  <p className="text-[11px] font-mono text-sage tracking-wider uppercase mb-4">
                    {step.activeIngredient}
                  </p>

                  <p className="text-sm text-text-body font-light leading-relaxed max-w-xs">
                    {step.description}
                  </p>

                  {/* Transition arrow link between steps */}
                  {index < 2 && (
                    <div className="lg:hidden mt-8 text-sage">
                      <ArrowRight className="w-5 h-5 rotate-90" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
