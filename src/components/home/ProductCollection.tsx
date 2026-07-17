"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check, Star, ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { useCartStore } from "@/lib/store";

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
  oldPrice?: string;
  rating: number;
  reviews: number;
  badge?: string;
  benefits: string;
  images: ProductImage[];
  /** Layout role — drives the asymmetric bento composition */
  variant: "hero" | "tall" | "wide";
  /** Accent color theme */
  theme: "rose" | "sage" | "cream";
}

const products: Product[] = [
  {
    id: "lipstick",
    name: "Velvet Matte Lip Colour",
    category: "Lipstick & Pigments",
    price: "$45.00",
    oldPrice: "$58.00",
    rating: 4.9,
    reviews: 210,
    badge: "Trending Now",
    benefits: "Organic, pure botanical lip color",
    images: [
      { src: "/images/lip_red.png", alt: "Crimson Red shade", shadeName: "Crimson Red", hex: "#B31C24" },
      { src: "/images/lip_peach.png", alt: "Peach Nude shade", shadeName: "Peach Nude", hex: "#D68E71" },
      { src: "/images/lip_rose.png", alt: "Dusty Rose shade", shadeName: "Dusty Rose", hex: "#C77D86" },
    ],
    variant: "hero",
    theme: "rose",
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
    variant: "tall",
    theme: "sage",
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
    variant: "wide",
    theme: "cream",
  },
];

/* ─── Theme tokens per card variant ───────────────────────────────── */
const themeStyles: Record<Product["theme"], {
  bg: string;
  border: string;
  accent: string;
  accentSoft: string;
  pill: string;
  number: string;
  ribbon: string;
}> = {
  rose: {
    bg: "from-[#FFF0EA] via-[#FFF5F1] to-white",
    border: "border-rose-gold/15",
    accent: "text-rose-gold",
    accentSoft: "bg-rose-gold/10 border-rose-gold/25 text-rose-gold",
    pill: "bg-rose-gold/10 border-rose-gold/25 text-rose-gold",
    number: "text-rose-gold/30",
    ribbon: "bg-rose-gold text-white",
  },
  sage: {
    bg: "from-[#EFF4EC] via-[#F2F8EE] to-white",
    border: "border-sage/15",
    accent: "text-sage",
    accentSoft: "bg-sage/10 border-sage/25 text-sage",
    pill: "bg-sage/10 border-sage/25 text-sage",
    number: "text-sage/30",
    ribbon: "bg-sage text-white",
  },
  cream: {
    bg: "from-[#FBF6EB] via-[#FCF9F2] to-white",
    border: "border-champagne/30",
    accent: "text-olive",
    accentSoft: "bg-soft-beige border-olive/20 text-olive",
    pill: "bg-soft-beige border-olive/20 text-olive",
    number: "text-olive/25",
    ribbon: "bg-text-title text-white",
  },
};

export default function ProductCollection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax the giant "Catalog" wordmark as the section moves
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const wordmarkX = useTransform(scrollYProgress, [0, 1], ["10%", "-8%"]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.6, 0.6, 0]);

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-warm-white overflow-hidden grain"
    >
      {/* Aurora blobs */}
      <div className="absolute top-[8%] right-[-8%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-rose-gold/15 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[8%] left-[-8%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-mint/30 to-transparent blur-[140px] pointer-events-none" />

      {/* Parallax editorial wordmark */}
      <motion.div
        style={{ x: wordmarkX, opacity: wordmarkOpacity }}
        className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none select-none z-0"
        aria-hidden
      >
        <span className="font-serif italic text-[18vw] leading-none text-text-title/[0.04] tracking-[-0.05em] whitespace-nowrap">
          catalog
        </span>
      </motion.div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14 md:mb-20">
          <div className="md:col-span-3 flex md:justify-center">
            <SectionLabel index="04 / Collection" code={"// AUR-COL-26"} />
          </div>
          <div className="md:col-span-6">
            <h2 className="section-title">
              Trending <span className="italic text-sage">beauty</span>
              <br />
              marketplace <span className="italic text-sage">essentials</span>.
            </h2>
          </div>
          <p className="section-copy md:col-span-3 md:pt-3">
            Three signatures, hand-picked this season. Hover for shade swapping, click to slip into your ritual.
          </p>
        </div>

        {/* Three product cards side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {products.map((prod, idx) => (
            <ProductCard key={prod.id} prod={prod} index={idx} />
          ))}
        </div>

        {/* Bottom: View all link */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <Link
            href="/shop"
            className="magnetic group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-text-title hover:text-sage transition-colors"
          >
            <span className="link-underline">Browse all 6 formulations</span>
            <ArrowUpRight className="w-4 h-4 stroke-[1.5] group-hover:rotate-45 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Per-card layout driven by variant ───────────────────────────── */
function ProductCard({ prod, index }: { prod: Product; index: number }) {
  const theme = themeStyles[prod.theme];
  const [isAdded, setIsAdded] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  // 3D tilt driven by cursor position
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({
      rx: (0.5 - py) * 4,
      ry: (px - 0.5) * 6,
      mx: px * 100,
      my: py * 100,
    });
  };
  const handleLeave = () => setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });

  const addItem = useCartStore((s) => s.addItem);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdded) return;
    // Map the local product data to add to cart using the products lib
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Variant grid positioning — equal side-by-side
  const gridClasses = {
    hero: "md:col-span-1",
    tall: "md:col-span-1",
    wide: "md:col-span-1",
  }[prod.variant];

  // Variant image aspect — uniform across all three cards
  const imageAspect = {
    hero: "aspect-[4/5]",
    tall: "aspect-[4/5]",
    wide: "aspect-[4/5]",
  }[prod.variant];

  // Variant text scale — uniform across all three cards
  const titleSize = {
    hero: "text-2xl md:text-[26px]",
    tall: "text-2xl md:text-[26px]",
    wide: "text-2xl md:text-[26px]",
  }[prod.variant];

  const currentActiveImage = prod.images[activeImgIdx];
  const discount = prod.oldPrice
    ? Math.round(((parseFloat(prod.oldPrice.replace("$", "")) - parseFloat(prod.price.replace("$", ""))) / parseFloat(prod.oldPrice.replace("$", ""))) * 100)
    : 0;

  return (
    <motion.div
      ref={cardRef}
      data-card
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`${gridClasses} group relative rounded-[32px] border ${theme.border} overflow-hidden cursor-pointer bento-card hover:shadow-[0_40px_80px_-30px_rgba(80,60,40,0.18)] bg-gradient-to-br ${theme.bg}`}
    >
      {/* Cursor-following spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.35) 0%, transparent 50%)`,
        }}
      />

      {/* Top bar: category + badge + discount */}
      <div className="relative z-20 flex items-start justify-between px-5 md:px-6 pt-5 md:pt-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-text-meta">
            {prod.category}
          </span>
          {prod.badge && (
            <span className={`inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border ${theme.pill}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${theme.accent.replace("text-", "bg-")}`} />
              {prod.badge}
            </span>
          )}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          {discount > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] ${theme.ribbon}`}>
              −{discount}%
            </span>
          )}
          <span className={`font-serif italic text-3xl md:text-4xl leading-none ${theme.number}`}>
            0{index + 1}
          </span>
        </div>
      </div>

      {/* Image panel */}
      <div className={`relative z-10 mx-5 md:mx-6 mt-3 ${imageAspect} overflow-hidden rounded-2xl`}>
        {/* Subtle inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 z-10 pointer-events-none rounded-2xl" />

        {/* Image itself with parallax shift opposite to tilt */}
        <motion.div
          className="absolute inset-0"
          animate={{
            x: -tilt.ry * 1.5,
            y: tilt.rx * 1.5,
            scale: 1.04,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {prod.images.map((img, idx) => (
            <Image
              key={idx}
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${img.src}`}
              alt={img.alt}
              fill
              className={`object-contain p-4 md:p-6 drop-shadow-[0_25px_40px_rgba(80,60,40,0.22)] transition-opacity duration-500 ${
                activeImgIdx === idx ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          ))}
        </motion.div>

        {/* Dots indicator */}
        {prod.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
            {prod.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setActiveImgIdx(idx); }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeImgIdx === idx
                    ? `w-5 ${theme.accent.replace("text-", "bg-")}`
                    : "w-1.5 bg-black/20 hover:bg-black/40"
                }`}
                aria-label={`Image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="relative z-20 px-5 md:px-6 pt-4 pb-5 md:pb-6">
        {/* Title */}
        <Link
          href={`/shop/${prod.id}`}
          className={`block font-serif ${titleSize} text-text-title leading-[1.05] tracking-[-0.025em] mb-1.5 group-hover:${theme.accent} transition-colors duration-500 hover:underline`}
        >
          {prod.name}
        </Link>

        {/* Sub-line (shade or benefits) */}
        <p className="text-xs text-text-meta font-light mb-3">
          {currentActiveImage.shadeName
            ? `Shade: ${currentActiveImage.shadeName}`
            : prod.benefits}
        </p>

        {/* Rating row */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className={`flex ${theme.accent}`}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </div>
          <span className="text-xs font-semibold text-text-title">{prod.rating.toFixed(1)}</span>
          <span className="text-xs text-text-meta">({prod.reviews})</span>
        </div>

        {/* Color swatches (lipstick only) */}
        {prod.images.some((img) => img.hex) && (
          <div className="flex gap-2 mb-3">
            {prod.images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setActiveImgIdx(idx); }}
                className={`w-5 h-5 rounded-full border-2 transition-transform duration-300 relative ${
                  activeImgIdx === idx
                    ? "border-text-title scale-110"
                    : "border-transparent hover:scale-105"
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

        {/* Price + quick add bar */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.25em] text-text-meta font-semibold mb-0.5">
              Price
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className={`font-serif text-xl ${theme.accent} leading-none tracking-[-0.03em]`}>
                {prod.price}
              </span>
              {prod.oldPrice && (
                <span className="text-xs text-text-meta line-through font-light">
                  {prod.oldPrice}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => {
              handleQuickAdd(e);
            }}
            className={`group/btn magnetic relative h-9 px-3.5 rounded-full flex items-center gap-1.5 transition-all duration-500 border overflow-hidden ${
              isAdded
                ? "bg-sage border-sage text-white"
                : `bg-white border-black/10 text-text-title hover:${theme.accent.replace("text-", "border-")} hover:${theme.accent}`
            }`}
            style={{ transform: "translate(var(--mx,0), var(--my,0))" }}
            onMouseMove={(e) => {
              const t = e.currentTarget as HTMLButtonElement;
              const r = t.getBoundingClientRect();
              t.style.setProperty("--mx", `${e.clientX - r.left - r.width / 2}px`);
              t.style.setProperty("--my", `${e.clientY - r.top - r.height / 2}px`);
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget as HTMLButtonElement;
              t.style.setProperty("--mx", "0px");
              t.style.setProperty("--my", "0px");
            }}
            aria-label="Add to cart"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.25em]">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[1.5] group-hover/btn:rotate-90 transition-transform duration-500" />
                <span className="text-[9px] font-bold uppercase tracking-[0.25em]">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
