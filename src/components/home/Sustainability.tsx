"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Recycle, Globe, Sparkles, CheckCircle2 } from "lucide-react";

interface StatItem {
  percentage: number;
  label: string;
  desc: string;
}

export default function Sustainability() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const steps = [
    {
      title: "Frosted Glass Vessels",
      description: "Our cosmetic bottles are constructed from premium, highly durable sand-glass that can be recycled infinitely, eliminating all single-use plastic layers from our product chain.",
      badge: "100% Recyclable",
      impact: "Saves 12.4 tonnes of plastic waste annually",
      icon: Recycle,
    },
    {
      title: "Biodegradable Boxes",
      description: "We wrap our bottles in raw, unbleached FSC paperboard sourced from local sustainable forests. Printed with natural organic soy inks, the boxes degrade within 45 days.",
      badge: "FSC Certified",
      impact: "Zero toxic runoff during soil decomposition",
      icon: Globe,
    },
    {
      title: "Ethical Wild Sourcing",
      description: "We source our Kakadu Plum and Centella from certified regenerative farms that support local farming communities, preserving forest biodiversity thresholds.",
      badge: "Fair Trade",
      impact: "Ensures carbon-neutral shipping networks",
      icon: Sparkles,
    },
  ];

  const stats: StatItem[] = [
    { percentage: 100, label: "Cruelty Free", desc: "Leaping Bunny certified formulas" },
    { percentage: 95, label: "Post-Consumer Glass", desc: "Made with recycled cullet glass" },
    { percentage: 0, label: "Net Plastic Waste", desc: "100% plastic-free outer packages" },
  ];

  return (
    <section id="sustainability" className="py-32 bg-warm-white relative overflow-hidden">
      
      {/* Background soft blob */}
      <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-mint/25 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-soft-beige/35 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Copy & Infographic Tabs (7/12) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4">Circular Eco-System</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-text-title mb-8 leading-tight">
            Nourishing Skin. <br />
            <span className="italic font-normal text-sage">Preserving the Planet.</span>
          </h2>
          
          <p className="text-text-body font-light mb-12 leading-relaxed max-w-xl">
            Aurelia believes that true luxury should leave no trace. Our packaging circularity design prioritizes pure organic decomposition and natural container reusability.
          </p>

          {/* Vertical Infographic list */}
          <div className="space-y-6 w-full">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = activeTab === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-white border-sage/35 shadow-[0_15px_30px_rgba(110,122,82,0.04)]"
                      : "bg-white/40 border-cream/50 hover:bg-white/70"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                      isActive ? "bg-mint text-sage border-sage/20" : "bg-white text-text-meta border-cream"
                    }`}>
                      <StepIcon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-serif text-lg font-medium text-text-title">
                          {step.title}
                        </h3>
                        <span className={`text-[9px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                          isActive ? "bg-mint border-sage/20 text-sage" : "bg-[#FAFAF8] border-cream text-text-meta"
                        }`}>
                          {step.badge}
                        </span>
                      </div>
                      
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-2"
                        >
                          <p className="text-sm text-text-body font-light leading-relaxed mb-4">
                            {step.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs font-semibold text-sage">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{step.impact}</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Statistics / Organic Texture Infographic (5/12) */}
        <div className="lg:col-span-5 bg-white/70 backdrop-blur-md rounded-4xl p-8 md:p-12 border border-cream shadow-sm flex flex-col gap-8 relative overflow-hidden">
          <div className="absolute top-4 right-4 font-mono text-[9px] text-sage/40 uppercase tracking-widest">
            Aurelia Earth Index
          </div>

          <h3 className="font-serif text-2xl font-light text-text-title mb-4">
            Circularity Commitments
          </h3>

          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold text-text-title">{stat.label}</span>
                <span className="font-serif text-2xl font-light text-sage">
                  {stat.percentage === 0 ? "0%" : `${stat.percentage}%`}
                </span>
              </div>
              
              {/* Progress bar container */}
              <div className="w-full h-1.5 bg-cream rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stat.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`h-full ${stat.percentage === 0 ? "bg-cream" : "bg-sage"}`}
                />
              </div>
              
              <span className="text-[10px] text-text-meta mt-1 font-light">
                {stat.desc}
              </span>
            </div>
          ))}

          <div className="pt-6 border-t border-black/5 mt-4">
            <p className="text-[10px] leading-relaxed text-text-meta font-light">
              Every glass vessel returned to our retail boutiques qualifies for a 15% discount on your next formulation. Supporting circular cosmetic supply networks since day one.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
