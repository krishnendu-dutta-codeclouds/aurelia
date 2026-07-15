"use client";

import { motion } from "framer-motion";
import { useState, useRef, useCallback, MouseEvent } from "react";
import Image from "next/image";
import { Plus, Check, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImage {
  src: string;
  alt: string;
  shadeName?: string;
  hex?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  badge?: string;
  benefits: string;
  images: ProductImage[];
}

const products: Product[] = [
  {
    id: "lipstick",
    name: "Velvet Matte Lip Colour",
    category: "Lipstick & Pigments",
    price: "$45.00",
    rating: 4.9,
    reviews: 210,
    badge: "Trending Now",
    benefits: "Organic, pure botanical lip color",
    images: [
      { src: "/images/lip_red.png", alt: "Crimson Red shade", shadeName: "Crimson Red", hex: "#B31C24" },
      { src: "/images/lip_peach.png", alt: "Peach Nude shade", shadeName: "Peach Nude", hex: "#D68E71" },
      { src: "/images/lip_rose.png", alt: "Dusty Rose shade", shadeName: "Dusty Rose", hex: "#C77D86" },
    ],
  },
  {
    id: "serum",
    name: "Aura Radiance Serum",
    category: "Serums & Toners",
    price: "$82.00",
    rating: 4.9,
    reviews: 142,
    badge: "Best Seller",
    benefits: "Vitamin C & Rosehip synthesis",
    images: [
      { src: "/images/serum.png", alt: "Aura Serum bottle" },
      { src: "/images/skin_glowing.png", alt: "Skin hydration outcome texture" },
    ],
  },
  {
    id: "cream",
    name: "Luna Radiance Repair Cream",
    category: "Moisturisers",
    price: "$95.00",
    rating: 5.0,
    reviews: 88,
    badge: "Award Winner",
    benefits: "Deep lipid barrier regeneration",
    images: [
      { src: "/images/cream.png", alt: "Luna Repair Cream jar" },
      { src: "/images/skin_glowing.png", alt: "Hydrating cream application" },
    ],
  },
];

// Single product card – isolated so mouse-position state is local to each card
function ProductCard({ prod }: { prod: Product }) {
  const [isAdded, setIsAdded] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  // Mouse pos stored in ref to avoid re-renders – updated via direct DOM manipulation
  const shineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!shineRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    shineRef.current.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(255,255,255,0.45), transparent)`;
  }, []);

  const handleQuickAdd = useCallback(() => {
    if (isAdded) return;
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  }, [isAdded]);

  const slideImage = useCallback((direction: "left" | "right") => {
    setActiveImgIdx((cur) => {
      const total = prod.images.length;
      if (direction === "left") return cur === 0 ? total - 1 : cur - 1;
      return cur === total - 1 ? 0 : cur + 1;
    });
  }, [prod.images.length]);

  const currentActiveImage = prod.images[activeImgIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (shineRef.current) shineRef.current.style.background = "transparent";
      }}
      className="group relative bg-warm-white rounded-4xl p-6 border border-cream/50 overflow-hidden flex flex-col justify-between cursor-pointer transition-shadow hover:shadow-[0_30px_60px_rgba(110,122,82,0.06)]"
    >
      {/* Cursor shine overlay — updated via DOM, no re-renders */}
      <div
        ref={shineRef}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
      />

      <div>
        {/* Category + Badge */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-text-meta">
            {prod.category}
          </span>
          {prod.badge && (
            <span className="text-[9px] font-semibold uppercase tracking-widest bg-mint border border-sage/10 text-sage px-2.5 py-0.5 rounded-full">
              {prod.badge}
            </span>
          )}
        </div>

        {/* Image Slider */}
        <div className="relative w-full aspect-square bg-white rounded-2xl overflow-hidden mb-6 flex items-center justify-center border border-cream/20">
          <div
            className="absolute inset-0 flex transition-transform duration-500 ease-out"
            style={{
              width: `${prod.images.length * 100}%`,
              transform: `translateX(-${(activeImgIdx * 100) / prod.images.length}%)`,
            }}
          >
            {prod.images.map((img, idx) => (
              <div
                key={idx}
                className="relative h-full"
                style={{ width: `${100 / prod.images.length}%` }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${img.src}`}
                  alt={img.alt}
                  fill
                  className="object-cover p-2"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Chevron Navigation */}
          {prod.images.length > 1 && (
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => { e.stopPropagation(); slideImage("left"); }}
                className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-cream flex items-center justify-center text-text-title hover:bg-white active:scale-90 shadow-sm transition-transform"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); slideImage("right"); }}
                className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-cream flex items-center justify-center text-text-title hover:bg-white active:scale-90 shadow-sm transition-transform"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Dot Indicators */}
          {prod.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
              {prod.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setActiveImgIdx(idx); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeImgIdx === idx ? "bg-sage w-3.5" : "w-1.5 bg-black/15 hover:bg-black/35"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex text-champagne-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="text-xs font-semibold text-text-title">{prod.rating.toFixed(1)}</span>
          <span className="text-xs text-text-meta">({prod.reviews} reviews)</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-serif font-light text-text-title mb-2 group-hover:text-sage transition-colors duration-300">
          {prod.name}
        </h3>
        <p className="text-xs text-text-meta font-light mb-4">
          {currentActiveImage.shadeName ? `Shade: ${currentActiveImage.shadeName}` : prod.benefits}
        </p>

        {/* Color Swatches */}
        {prod.images.some((img) => img.hex) && (
          <div className="flex gap-2.5 mb-6">
            {prod.images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setActiveImgIdx(idx); }}
                className={`w-6 h-6 rounded-full border-2 transition-transform duration-300 relative ${
                  activeImgIdx === idx ? "border-sage scale-110" : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: img.hex }}
                title={img.shadeName}
              >
                {activeImgIdx === idx && (
                  <span className="absolute inset-0.5 rounded-full border border-white pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5 relative z-20">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-text-meta">Price</span>
          <span className="text-xl font-medium text-text-title">{prod.price}</span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); handleQuickAdd(); }}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border ${
            isAdded
              ? "bg-sage border-sage text-white"
              : "bg-white border-black/10 text-text-title hover:bg-sage hover:border-sage hover:text-white hover:scale-105"
          }`}
          aria-label="Add to cart"
        >
          {isAdded ? <Check className="w-5 h-5 stroke-[2.5]" /> : <Plus className="w-5 h-5 stroke-[1.5]" />}
        </button>
      </div>
    </motion.div>
  );
}

export default function ProductCollection() {
  return (
    <section id="collection" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-[30%] left-[-5%] w-[45%] h-[45%] rounded-full bg-gradient-to-tr from-[#FAF5EF] to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[45%] h-[45%] rounded-full bg-gradient-to-br from-[#EBF2EE] to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4">
            Trending Vault
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-text-title mb-6">
            Trending Beauty <br />
            <span className="italic font-normal text-sage">Marketplace Essentials</span>
          </h2>
          <p className="text-text-body font-light leading-relaxed">
            Re-designed collection. Hover to slide images, select shades in real-time, and experience fluid quick-checkout operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((prod) => (
            <ProductCard key={prod.id} prod={prod} />
          ))}
        </div>
      </div>
    </section>
  );
}
