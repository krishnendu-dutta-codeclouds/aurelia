"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Eye, ShoppingBag } from "lucide-react";
import Image from "next/image";

interface Featured {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  rating: string;
}

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const items: Featured[] = [
    {
      id: "serum",
      name: "Aura Radiance Serum",
      category: "TREATING SERUM",
      price: "$82.00",
      image: "/images/serum.png",
      description: "Hydrates cellular pathways and reverses light/UV dullness.",
      rating: "4.9 · 142 reviews",
    },
    {
      id: "cream",
      name: "Luna Radiance Repair Cream",
      category: "CELLULAR MOISTURIZER",
      price: "$95.00",
      image: "/images/cream.png",
      description: "Rebuilds depleted lipid cells and shields against pollution.",
      rating: "5.0 · 88 reviews",
    },
    {
      id: "toner",
      name: "Botanical Harmony Toner",
      category: "BALANCING TONER",
      price: "$64.00",
      image: "/images/toner.png",
      description: "Cleanses, shrinks pores, and balances pH levels.",
      rating: "4.8 · 115 reviews",
    },
    {
      id: "serum-2",
      name: "Kakadu Plum Treatment",
      category: "CONCENTRATED BOOSTER",
      price: "$88.00",
      image: "/images/serum.png",
      description: "Ultra-concentrated Vitamin C shot for hyperpigmented spots.",
      rating: "4.9 · 52 reviews",
    },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 360;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      
      {/* Dynamic Background accents */}
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-mint/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#FAF5EF]/40 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header with Navigation Chevrons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 mb-20">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4">Limited Edition</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-text-title">
              Featured <br />
              <span className="italic font-normal text-sage">Skincare Formulations</span>
            </h2>
          </div>

          <div className="flex gap-4 shrink-0">
            <button
              onClick={() => handleScroll("left")}
              className="w-12 h-12 rounded-full border border-black/10 hover:border-sage hover:text-sage flex items-center justify-center bg-white shadow-sm transition-all active:scale-95"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-12 h-12 rounded-full border border-black/10 hover:border-sage hover:text-sage flex items-center justify-center bg-white shadow-sm transition-all active:scale-95"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Wrapper */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-12 scrollbar-none snap-x snap-mandatory touch-pan-x px-4"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((item, idx) => (
            <motion.div
              key={`${item.id}-${idx}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-warm-white rounded-[28px] p-5 border border-cream/50 overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              {/* Product Image Panel */}
              <div>
                <div className="relative w-full aspect-[4/5] bg-white rounded-2xl overflow-hidden mb-6 flex items-center justify-center border border-cream/20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover p-2 transition-transform duration-700 group-hover:scale-105"
                    sizes="300px"
                  />
                  
                  {/* Floating eye & bag icons on image hover */}
                  <div className="absolute inset-0 bg-sage/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-white text-text-title hover:text-sage flex items-center justify-center shadow-md border border-cream active:scale-90 transition-transform">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-sage text-white hover:bg-olive flex items-center justify-center shadow-md active:scale-90 transition-transform">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <span className="text-[9px] font-mono text-sage tracking-widest uppercase">
                  {item.category}
                </span>

                <h3 className="font-serif text-xl font-light text-text-title mt-2 mb-2 group-hover:text-sage transition-colors duration-300">
                  {item.name}
                </h3>

                <p className="text-xs text-text-meta font-light leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Price & Rating Bar */}
              <div className="flex items-center justify-between border-t border-black/5 pt-4 mt-auto">
                <span className="text-base font-semibold text-text-title">{item.price}</span>
                <span className="text-[10px] text-text-meta">{item.rating}</span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
