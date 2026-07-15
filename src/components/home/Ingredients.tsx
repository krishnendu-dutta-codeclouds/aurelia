"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FlaskConical, Leaf, Heart, Sun, Activity, Zap, LucideIcon } from "lucide-react";

interface Ingredient {
  id: string;
  name: string;
  chemical: string;
  concentration: string;
  benefits: string[];
  description: string;
  icon: LucideIcon;
  color: string;
  illustration: string;
}

export default function Ingredients() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const ingredients: Ingredient[] = [
    {
      id: "vitc",
      name: "Kakadu Vitamin C",
      chemical: "Tetrahexyldecyl Ascorbate",
      concentration: "15% Clinical Grade",
      benefits: ["Brightens Complexion", "Stimulates Collagen Production", "Neutralizes Free Radicals"],
      description: "A highly stable, fat-soluble form of Vitamin C that penetrates deep into cellular layers to brighten skin tone and smooth fine lines.",
      icon: Sun,
      color: "from-peach/20 to-rose-gold/10",
      illustration: "C12H18O6",
    },
    {
      id: "niacin",
      name: "Niacinamide B3",
      chemical: "Pyridine-3-carboxamide",
      concentration: "5% Active Formula",
      benefits: ["Reduces Pore Size", "Regulates Sebum Production", "Fades Hyperpigmentation"],
      description: "Crucial B3 vitamin that restores the skin barrier surface, regulates skin lipid activity, and evens out tone discoloration.",
      icon: Zap,
      color: "from-mint/30 to-sage/10",
      illustration: "C6H6N2O",
    },
    {
      id: "hyaluronic",
      name: "Hyaluronic Acid",
      chemical: "Multi-Weight Hyaluronan",
      concentration: "2.0% Compound",
      benefits: ["Deep Cellular Hydration", "Plumps Fine Lines", "Triggers Elastin Synthesis"],
      description: "Synthesized multi-weight molecules that hold 1000x their weight in water, locking moisture into dermal and epidermal cells.",
      icon: Activity,
      color: "from-champagne/30 to-soft-beige/25",
      illustration: "(C14H21NO11)n",
    },
    {
      id: "ceramide",
      name: "Ceramide NP",
      chemical: "Sphingolipid Matrix",
      concentration: "1.5% Lipids",
      benefits: ["Reinforces Skin Barrier", "Locks in Deep Moisture", "Protects Against Pollutants"],
      description: "Natural lipids that bind skin cells together, forming a robust protective seal that blocks out toxins and retains moisture.",
      icon: Heart,
      color: "from-soft-pink/35 to-peach/20",
      illustration: "C34H67NO3",
    },
    {
      id: "greentea",
      name: "Organic Green Tea",
      chemical: "Camellia Sinensis EGCG",
      concentration: "3% Concentrate",
      benefits: ["Calms Inflammation", "Fights Premature Aging", "Soothes Microbial Stress"],
      description: "Extracted from high-altitude tea leaves, rich in catechins and polyphenols to instantly reduce redness and calm skin inflammation.",
      icon: Leaf,
      color: "from-mint/40 to-sage/15",
      illustration: "C15H14O6",
    },
    {
      id: "centella",
      name: "Centella Asiatica",
      chemical: "Cica Madecassoside",
      concentration: "4% Botanical Infusion",
      benefits: ["Speeds Scar Healing", "Soothes Redness & Eczema", "Boosts Microcirculation"],
      description: "The legendary healer herb 'Cica' repairs cracked epidermal membranes, accelerates collagen synthesis, and calms hypersensitivity.",
      icon: FlaskConical,
      color: "from-soft-beige/30 to-ivory/20",
      illustration: "C48H78O19",
    },
  ];

  return (
    <section id="ingredients" className="py-32 bg-warm-white relative overflow-hidden">
      {/* Editorial Decorative Background */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-mint/20 to-peach/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-cream to-soft-pink/15 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4">Bio-Active Ingredients</p>
          <h2 className="text-4xl md:text-6xl font-serif font-light text-text-title mb-6 leading-tight">
            Scientific Purity. <br />
            <span className="italic font-normal text-sage">Proven Dermatological Efficacy.</span>
          </h2>
          <p className="text-text-body font-light max-w-xl leading-relaxed">
            Every molecule serves a precise cellular function. We formulate with clean, active botanicals at optimized concentrations to guarantee visible restoration.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ingredients.map((ing) => {
            const Icon = ing.icon;
            const isHovered = hoveredId === ing.id;
            
            return (
              <motion.div
                key={ing.id}
                onMouseEnter={() => setHoveredId(ing.id)}
                onMouseLeave={() => setHoveredId(null)}
                layout
                className={`relative rounded-3xl p-8 border transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between min-h-[350px] ${
                  isHovered
                    ? "border-sage/40 shadow-[0_20px_40px_rgba(110,122,82,0.06)] bg-white scale-[1.02]"
                    : "border-cream/80 bg-white/40 backdrop-blur-sm"
                }`}
              >
                {/* Gradient Glow backdrop on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${ing.color} opacity-0 transition-opacity duration-500 pointer-events-none ${
                  isHovered ? "opacity-100" : ""
                }`} />

                {/* Card Top Details */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-sage border border-cream shadow-sm">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest bg-white/70 border border-cream px-3 py-1 rounded-full text-text-meta">
                      {ing.concentration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-light text-text-title mb-2">
                    {ing.name}
                  </h3>
                  <p className="text-xs font-mono text-sage tracking-wider uppercase mb-4">
                    {ing.chemical}
                  </p>
                  
                  <p className="text-sm text-text-body font-light leading-relaxed mb-6">
                    {ing.description}
                  </p>
                </div>

                {/* Scientific Illustration / Formula structures revealed on hover */}
                <div className="relative z-10">
                  <div className="w-full h-px bg-black/5 mb-6" />
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ing.benefits.map((b, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-white border border-cream text-text-body px-3 py-1 rounded-full font-medium"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Scientific formula overlay */}
                  <motion.span
                    initial={{ opacity: 0.1, y: 10 }}
                    animate={{ opacity: isHovered ? 0.35 : 0.1, y: 0 }}
                    className="absolute bottom-[-15px] right-2 font-mono text-[36px] font-semibold text-sage/30 pointer-events-none"
                  >
                    {ing.illustration}
                  </motion.span>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
