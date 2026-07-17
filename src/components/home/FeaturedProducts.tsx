"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Eye, Star, Plus } from "lucide-react";
import Image from "next/image";
import ShoppingBagIcon from "@/components/icons/ShoppingBagIcon";
import SectionLabel from "@/components/SectionLabel";

interface Featured {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  rating: string;
  badge?: string;
  isHero?: boolean;
}

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Live scroll progress for the track (0 → 1) used to drive the progress bar
  const [progress, setProgress] = useState(0);
  // Mouse-down drag state for the track
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  // Parallax the oversized background wordmark as the section moves through viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const wordmarkX = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const items: Featured[] = [
    {
      id: "serum",
      name: "Aura Radiance Serum",
      category: "Treating Serum",
      price: "$82.00",
      image: "/images/serum.png",
      description: "Hydrates cellular pathways and reverses UV-induced dullness with 15% Kakadu Vitamin C.",
      rating: "4.9 · 142",
      badge: "Bestseller",
      isHero: true,
    },
    {
      id: "cream",
      name: "Luna Repair Cream",
      category: "Cellular Moisturizer",
      price: "$95.00",
      image: "/images/cream.png",
      description: "Rebuilds depleted lipid cells and shields against pollution overnight.",
      rating: "5.0 · 88",
    },
    {
      id: "toner",
      name: "Botanical Harmony Toner",
      category: "Balancing Toner",
      price: "$64.00",
      image: "/images/toner.png",
      description: "Cleanses, shrinks pores, and balances pH levels with mint and aloe.",
      rating: "4.8 · 115",
    },
    {
      id: "serum-2",
      name: "Kakadu Plum Booster",
      category: "Concentrated Booster",
      price: "$88.00",
      image: "/images/serum.png",
      description: "Ultra-concentrated Vitamin C shot for hyperpigmented spots.",
      rating: "4.9 · 52",
      badge: "New",
    },
    {
      id: "eye",
      name: "Aurora Eye Concentrate",
      category: "Eye Treatment",
      price: "$72.00",
      image: "/images/cream.png",
      description: "Reduces dark circles and lifts the under-eye contour with caffeine and peptides.",
      rating: "4.7 · 64",
    },
  ];

  // Track scroll progress in pixels → 0..1
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(1, Math.max(0, el.scrollLeft / max)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Drag-to-scroll (mouse + touch). Uses native scrollBy for buttery momentum.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onDown = (clientX: number) => {
      setIsDragging(true);
      dragStart.current = { x: clientX, scrollLeft: el.scrollLeft };
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
    };
    const onMove = (clientX: number) => {
      if (!isDragging) return;
      const dx = clientX - dragStart.current.x;
      el.scrollLeft = dragStart.current.scrollLeft - dx;
    };
    const onUp = () => {
      setIsDragging(false);
      el.style.cursor = "grab";
      el.style.userSelect = "";
    };

    const handleMouseDown = (e: MouseEvent) => onDown(e.clientX);
    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX);
    const handleTouchStart = (e: TouchEvent) => e.touches[0] && onDown(e.touches[0].clientX);
    const handleTouchMove = (e: TouchEvent) => e.touches[0] && onMove(e.touches[0].clientX);

    el.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("touchend", onUp);
    el.addEventListener("touchcancel", onUp);

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", onUp);
      el.removeEventListener("touchcancel", onUp);
    };
  }, [isDragging]);

  const scrollBy = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? 320;
    const gap = 24;
    const amount = (cardWidth + gap) * (window.innerWidth < 768 ? 1 : 2);
    trackRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-warm-white overflow-hidden grain"
    >
      {/* Aurora blobs */}
      <div className="absolute top-[5%] right-[-10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-mint/25 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-gradient-to-tr from-peach/25 to-transparent blur-[140px] pointer-events-none" />

      {/* Parallax editorial wordmark behind everything */}
      <motion.div
        style={{ x: wordmarkX, opacity: wordmarkOpacity }}
        className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none select-none z-0"
        aria-hidden
      >
        <span className="font-serif italic text-[18vw] leading-none text-text-title/[0.04] tracking-[-0.05em] whitespace-nowrap">
          formulations
        </span>
      </motion.div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-16">
          <div className="lg:col-span-2">
            <SectionLabel index="08 / Catalog" code={"// AUR-CAT-26"} />
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-text-title leading-[0.98] tracking-[-0.035em]">
              Featured <span className="italic text-sage">skincare</span>
              <br />
              formulations.
            </h2>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-5 lg:items-end lg:pt-3">
            <p className="text-sm text-text-body font-light leading-relaxed max-w-xs lg:text-right">
              Bio-active formulations, each clinically tested. Pick your ritual — we&apos;ll handle the rest.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => scrollBy("left")}
                className="group w-12 h-12 rounded-full border border-black/10 hover:border-sage hover:bg-sage hover:text-white flex items-center justify-center bg-white shadow-sm transition-all active:scale-95"
                aria-label="Scroll left"
              >
                <ArrowLeft className="w-5 h-5 stroke-[1.5] transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={() => scrollBy("right")}
                className="group w-12 h-12 rounded-full border border-black/10 hover:border-sage hover:bg-sage hover:text-white flex items-center justify-center bg-white shadow-sm transition-all active:scale-95"
                aria-label="Scroll right"
              >
                <ArrowRight className="w-5 h-5 stroke-[1.5] transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Drag-to-scroll track — fixed height so all cards share the same vertical space */}
        <div
          ref={trackRef}
          className={`no-scrollbar flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory h-[620px] sm:h-[680px] md:h-[720px] ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {items.map((item, idx) => (
            <ProductCard key={`${item.id}-${idx}`} item={item} index={idx} />
          ))}

          {/* Tail "see all" card */}
          <div className="shrink-0 snap-center w-[260px] sm:w-[300px] h-full flex items-center justify-center">
            <a
              href="#collection"
              onMouseMove={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                const r = t.getBoundingClientRect();
                t.style.setProperty("--mx", `${e.clientX - r.left - r.width / 2}px`);
                t.style.setProperty("--my", `${e.clientY - r.top - r.height / 2}px`);
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                t.style.setProperty("--mx", "0px");
                t.style.setProperty("--my", "0px");
              }}
              style={{ transform: "translate(var(--mx,0), var(--my,0))" }}
              className="magnetic group w-full h-full rounded-[28px] border-2 border-dashed border-black/15 hover:border-sage/60 hover:bg-mint/30 flex flex-col items-center justify-center gap-4 text-text-title transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-full bg-text-title text-white flex items-center justify-center group-hover:bg-sage transition-colors">
                <Plus className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div className="text-center">
                <div className="font-serif text-2xl text-text-title leading-tight">View all</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-meta mt-1">
                  24 formulations
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Progress bar + drag hint + counter */}
        <div className="flex items-center gap-6 mt-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-meta whitespace-nowrap">
            {String(Math.round(progress * (items.length - 1)) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          <div className="relative flex-1 h-px bg-black/10 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-sage origin-left transition-transform duration-150"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          <span className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-text-meta whitespace-nowrap">
            <span className="inline-block w-4 h-px bg-text-meta" />
            Drag to explore
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── Product card with 3D tilt + parallax image ──────────────────── */
function ProductCard({ item, index }: { item: Featured; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({
      rx: (0.5 - py) * 6, // rotateX: tilt forward/back
      ry: (px - 0.5) * 8, // rotateY: tilt left/right
      mx: px * 100,
      my: py * 100,
    });
  };
  const handleLeave = () => setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });

  const isHero = item.isHero;
  const cardWidth = isHero ? "w-[320px] sm:w-[380px] md:w-[420px]" : "w-[260px] sm:w-[280px] md:w-[300px]";

  return (
    <motion.div
      ref={cardRef}
      data-card
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`${cardWidth} h-full shrink-0 snap-center group relative cursor-pointer select-none`}
    >
      {/* Spotlight glow follows cursor */}
      <div
        className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(143,151,121,0.18) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 h-full flex flex-col rounded-[28px] border border-black/[0.06] bg-white overflow-hidden bento-card hover:border-sage/30 hover:shadow-[0_30px_60px_-25px_rgba(80,100,60,0.25)]">
        {/* Image panel — flex-1 absorbs all leftover vertical space so card fills the track height */}
        <div className={`relative flex-1 min-h-0 bg-gradient-to-br from-cream via-warm-white to-ivory overflow-hidden`}>
          {/* Subtle grid pattern (editorial backdrop) */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Top-left badge */}
          {item.badge && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-black/5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  item.badge === "Bestseller" ? "bg-rose-gold" : "bg-sage"
                }`}
              />
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-text-title">
                {item.badge}
              </span>
            </div>
          )}

          {/* Top-right rating pill */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-black/5">
            <Star className="w-3 h-3 fill-champagne-gold text-champagne-gold" />
            <span className="text-[10px] font-bold text-text-title">{item.rating.split(" · ")[0]}</span>
          </div>

          {/* Product image (parallax shifts opposite to tilt) */}
          <div
            ref={imgRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translateX(${-tilt.ry * 1.2}px) translateY(${tilt.rx * 1.2}px) scale(1.04)`,
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${item.image}`}
              alt={item.name}
              fill
              className="object-contain p-6 drop-shadow-[0_20px_30px_rgba(80,60,40,0.18)]"
              sizes="(max-width: 768px) 80vw, 420px"
            />
          </div>

          {/* Hover quick-action overlay */}
          <div className="absolute inset-0 z-20 bg-text-title/0 group-hover:bg-text-title/5 transition-colors duration-500 flex items-end justify-center pb-6 gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
            <button className="w-10 h-10 rounded-full bg-white text-text-title hover:text-sage flex items-center justify-center shadow-lg border border-cream active:scale-90 transition-all shine-on-hover">
              <Eye className="w-4 h-4 stroke-[1.5]" />
            </button>
            <button className="magnetic group/btn h-10 px-5 rounded-full bg-sage text-white hover:bg-olive flex items-center justify-center gap-2 shadow-lg active:scale-90 transition-all shine-on-hover">
              <ShoppingBagIcon className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Add to bag</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 md:p-6">
          {/* Category + number */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-sage">
              {item.category}
            </span>
            <span className="font-mono text-[9px] text-text-meta tracking-[0.2em]">
              №{String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Name */}
          <h3 className="font-serif text-xl md:text-2xl text-text-title leading-tight tracking-[-0.02em] mb-2 group-hover:text-sage transition-colors duration-500">
            {item.name}
          </h3>

          {/* Description (only on hero card or always for compact) */}
          <p className="text-xs text-text-body font-light leading-relaxed mb-5 line-clamp-2">
            {item.description}
          </p>

          {/* Price + rating row */}
          <div className="flex items-end justify-between pt-4 border-t border-black/[0.06]">
            <div>
              <span className="font-serif text-2xl text-text-title leading-none tracking-[-0.03em]">
                {item.price}
              </span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-text-meta mt-1">
                30ml · Full size
              </span>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-text-meta text-[10px] font-light">
                <Star className="w-3 h-3 fill-champagne-gold text-champagne-gold" />
                {item.rating}
              </div>
              <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-sage mt-1">
                In stock
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
