"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Leaf, Heart, Sun, Activity, Zap, ChevronDown } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";

const ingredients = [
  {
    id: "vitc",
    name: "Kakadu Vitamin C",
    chemical: "Tetrahexyldecyl Ascorbate",
    concentration: "15% Clinical Grade",
    purity: "99.8% Purity Index",
    benefits: ["Brightens Skin", "Boosts Collagen", "Neutralizes Free Radicals"],
    description: "A highly stable, fat-soluble Vitamin C that penetrates deep into cellular layers to stimulate collagen synthesis and reverse photo-damage. Sourced from the Kakadu plum — the world's richest natural Vitamin C source.",
    icon: Sun,
    color: "border-[#fcdfd7] bg-[#fbf5f2]/60",
    accent: "text-[#c9603f]",
    badge: "bg-[#fcdfd7]/50 text-[#c9603f]",
    productsIn: ["Aura Radiance Serum", "Kakadu Plum Booster"],
    filterTags: ["brightening", "antioxidant"],
  },
  {
    id: "ceramides",
    name: "Triple Ceramide Complex",
    chemical: "Ceramide NP, AP & EOP",
    concentration: "3:1:1 Ratio",
    purity: "Pharmaceutical Grade",
    benefits: ["Barrier Repair", "24hr Hydration", "Reduces TEWL"],
    description: "Three ceramide subclasses in clinically validated ratios that mirror healthy skin's natural lipid matrix. Directly replenishes depleted barrier structures and measurably reduces transepidermal water loss within 14 days.",
    icon: Activity,
    color: "border-[#d8e8d0] bg-[#f0f7ec]/60",
    accent: "text-[#5a7a4a]",
    badge: "bg-[#d8e8d0]/50 text-[#5a7a4a]",
    productsIn: ["Luna Radiance Repair Cream"],
    filterTags: ["hydration", "barrier"],
  },
  {
    id: "bakuchiol",
    name: "Bakuchiol",
    chemical: "Psoralea corylifolia Extract",
    concentration: "1% Active",
    purity: "99.2% Purity",
    benefits: ["Stimulates Collagen", "Reduces Fine Lines", "Pregnancy-Safe"],
    description: "The clinically validated natural alternative to retinol. Triggers the same downstream gene expression pathways as retinoic acid without binding to nuclear RAR receptors — delivering equivalent anti-ageing results with zero irritation.",
    icon: Leaf,
    color: "border-[#e2deb5] bg-[#faf7ec]/60",
    accent: "text-[#7a6e2a]",
    badge: "bg-[#e2deb5]/50 text-[#7a6e2a]",
    productsIn: ["Luna Radiance Repair Cream"],
    filterTags: ["anti-aging", "retinol-alternative"],
  },
  {
    id: "niacinamide",
    name: "Niacinamide",
    chemical: "Nicotinamide (Vitamin B3)",
    concentration: "3% Targeted",
    purity: "Cosmetic Grade",
    benefits: ["Minimises Pores", "Brightens", "Strengthens Barrier"],
    description: "Multi-tasking Vitamin B3 that simultaneously minimises pore appearance, inhibits melanin transfer, and reinforces the ceramide network. Stable across a wide pH range, making it highly compatible with Vitamin C formulations.",
    icon: Zap,
    color: "border-[#c5d4e8] bg-[#f0f4fb]/60",
    accent: "text-[#3a5a8a]",
    badge: "bg-[#c5d4e8]/50 text-[#3a5a8a]",
    productsIn: ["Aura Radiance Serum", "Botanical Harmony Toner"],
    filterTags: ["brightening", "pores", "barrier"],
  },
  {
    id: "aloe",
    name: "Organic Aloe Vera",
    chemical: "Aloe barbadensis Miller",
    concentration: "98% Pure Leaf Gel",
    purity: "Certified Organic",
    benefits: ["Soothes Redness", "Deep Hydration", "Anti-inflammatory"],
    description: "Cold-pressed from organic certified farms. Provides immediate soothing relief for sensitised skin while delivering a cascade of polysaccharides and phytosterols that reinforce the skin's natural defence mechanisms.",
    icon: Leaf,
    color: "border-[#b8e0ce] bg-[#edf8f4]/60",
    accent: "text-[#2a7a58]",
    badge: "bg-[#b8e0ce]/50 text-[#2a7a58]",
    productsIn: ["Botanical Harmony Toner"],
    filterTags: ["soothing", "hydration"],
  },
  {
    id: "rosehip",
    name: "Cold-Pressed Rosehip Oil",
    chemical: "Rosa canina / rubiginosa Seed Oil",
    concentration: "Whole Oil — Unrefined",
    purity: "Cold-Pressed, Unrefined",
    benefits: ["Essential Fatty Acids", "Cellular Repair", "Brightens Scars"],
    description: "Unrefined rosehip seed oil retains the full complement of essential fatty acids (Omega 3, 6, 9) and trans-retinoic acid — the natural precursor to retinoic acid. Clinically shown to accelerate healing of scars and hyperpigmentation.",
    icon: Heart,
    color: "border-[#f5ccd0] bg-[#fef4f5]/60",
    accent: "text-[#a04858]",
    badge: "bg-[#f5ccd0]/50 text-[#a04858]",
    productsIn: ["Aura Radiance Serum"],
    filterTags: ["anti-aging", "brightening", "repair"],
  },
  {
    id: "tripeptide",
    name: "Tri-Peptide Lifting Complex",
    chemical: "Palmitoyl Tripeptide-1 & 7",
    concentration: "0.01% Active",
    purity: "Synthetic Bio-Identical",
    benefits: ["Firms & Lifts", "Collagen Synthesis", "Anti-wrinkle"],
    description: "A precisely engineered peptide sequence that mimics the body's own collagen stimulation signals. Clinical studies demonstrate a 33% improvement in skin firmness and a 28% reduction in wrinkle depth within 56 days.",
    icon: FlaskConical,
    color: "border-[#d4c8e8] bg-[#f5f0fb]/60",
    accent: "text-[#6844a0]",
    badge: "bg-[#d4c8e8]/50 text-[#6844a0]",
    productsIn: ["Lumière Eye Renewal Cream"],
    filterTags: ["anti-aging", "firming"],
  },
  {
    id: "willow",
    name: "Willow Bark Extract",
    chemical: "Salix alba Bark Extract",
    concentration: "2% Standardised",
    purity: "Standardised Extract",
    benefits: ["Natural BHA", "Unclogs Pores", "Anti-inflammatory"],
    description: "The original source of salicylic acid — extracted from white willow bark and standardised to 2% active content. Provides gentle but effective beta-hydroxy acid exfoliation, clearing follicular congestion without the harshness of synthetic salicylic acid.",
    icon: Leaf,
    color: "border-[#cce0d0] bg-[#eef8f0]/60",
    accent: "text-[#3a6a48]",
    badge: "bg-[#cce0d0]/50 text-[#3a6a48]",
    productsIn: ["Botanical Harmony Toner"],
    filterTags: ["pores", "exfoliation"],
  },
];

const filterOptions = [
  { value: "all", label: "All Ingredients" },
  { value: "brightening", label: "Brightening" },
  { value: "hydration", label: "Hydration" },
  { value: "anti-aging", label: "Anti-Ageing" },
  { value: "barrier", label: "Barrier Repair" },
  { value: "pores", label: "Pores" },
  { value: "soothing", label: "Soothing" },
];

export default function IngredientsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = activeFilter === "all" ? ingredients : ingredients.filter((i) => i.filterTags.includes(activeFilter));

  return (
    <main className="min-h-screen bg-warm-white pt-28 pb-20">
      {/* Header */}
      <section className="relative bg-cream/60 border-b border-soft-beige overflow-hidden grain">
        <div className="absolute top-[-20%] right-[-8%] w-[45%] h-[200%] rounded-full bg-gradient-to-bl from-mint/25 to-transparent blur-[120px] pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20 relative z-10">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Ingredients Archive" }]} />
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-text-title leading-[0.95] tracking-[-0.04em] mt-6">
            Ingredient <span className="italic text-sage">Archive</span>
          </h1>
          <p className="text-sm text-text-body font-light mt-4 max-w-md leading-relaxed">
            Every active we use. Every concentration. Every clinical rationale. Transparency is non-negotiable.
          </p>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mt-10">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filterOptions.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] border transition-all duration-300 ${
                activeFilter === f.value
                  ? "bg-text-title text-white border-text-title"
                  : "bg-white border-black/10 text-text-meta hover:border-sage hover:text-sage"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { num: "8", label: "Active Compounds" },
            { num: "100%", label: "Transparency Pledge" },
            { num: "0", label: "Hidden Fillers" },
          ].map((stat) => (
            <div key={stat.label} className="p-5 rounded-2xl bg-white border border-black/5 text-center">
              <p className="font-serif text-3xl md:text-4xl text-sage italic leading-none mb-1">{stat.num}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-meta">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Ingredient accordion cards */}
        <AnimatePresence>
          <div className="flex flex-col gap-3">
            {filtered.map((ing, i) => (
              <motion.div
                key={ing.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-[24px] border ${ing.color} overflow-hidden`}
              >
                {/* Header row */}
                <button
                  onClick={() => setExpanded(expanded === ing.id ? null : ing.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${ing.color} ${ing.accent}`}>
                      <ing.icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className={`font-serif text-xl text-text-title tracking-[-0.02em]`}>{ing.name}</h3>
                      <p className="text-[10px] font-mono text-text-meta font-light">{ing.chemical}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`hidden sm:block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] ${ing.badge}`}>
                      {ing.concentration}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-text-meta transition-transform duration-300 ${expanded === ing.id ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {expanded === ing.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-black/5 pt-5">
                        <div className="md:col-span-2">
                          <p className="text-sm text-text-body font-light leading-relaxed mb-4">{ing.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {ing.benefits.map((b) => (
                              <span key={b} className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border ${ing.badge} border-current/20`}>{b}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-text-meta mb-1">Purity</p>
                            <p className="text-sm font-semibold text-text-title">{ing.purity}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-text-meta mb-1.5">Found In</p>
                            <div className="flex flex-col gap-1">
                              {ing.productsIn.map((p) => (
                                <span key={p} className="text-xs text-text-body font-light">· {p}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </main>
  );
}
