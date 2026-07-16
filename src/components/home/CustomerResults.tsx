"use client";

import { useState, useRef, useCallback, MouseEvent, TouchEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  age: string;
  skinType: string;
  rating: number;
  title: string;
  quote: string;
  duration: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophia Martinez",
    age: "29",
    skinType: "Dry, Sensitive",
    rating: 5,
    title: "Saved my compromised barrier!",
    quote:
      "After over-exfoliating, my skin was red, flaky, and painful. This serum felt like a cooling glass of water. In less than a week, my barrier was completely calm and glowing again.",
    duration: "Verified · 2 weeks",
  },
  {
    id: 2,
    name: "Olivia Chen",
    age: "34",
    skinType: "Combination, Acne-Prone",
    rating: 5,
    title: "Timeless radiance without the oil",
    quote:
      "Most luxury oils break out my skin, but this lightweight micro-emulsion absorbs in seconds. My pores look much tighter and my skin texture is unbelievably soft and radiant.",
    duration: "Verified · 1 month",
  },
  {
    id: 3,
    name: "Emma Watson",
    age: "42",
    skinType: "Mature, Normal",
    rating: 5,
    title: "My fine lines are visibly plumped",
    quote:
      "The deep hydration from the multi-weight Hyaluronic and Ceramides is instant. It leaves a beautiful dewy sheen under makeup and has noticeably smoothed out my laugh lines.",
    duration: "Verified · 3 weeks",
  },
];

const trustBadges = [
  "DERMATOLOGICALLY TESTED",
  "100% ORGANIC & VEGAN",
  "CRUELTY FREE",
  "CLINICALLY PROVEN RESULTS",
  "PARABEN & TOXIN FREE",
  "ECO-CERTIFIED PACKAGING",
  "AWWWARDS DECORATED FORMULA",
];

export default function CustomerResults() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(position);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  return (
    <>
      <section className="py-32 bg-warm-white relative overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-peach/10 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-mint/20 to-transparent blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="max-w-3xl mb-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4">
              Clinical Outcomes
            </p>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-text-title mb-6 leading-tight">
              Proven Results. <br />
              <span className="italic font-normal text-sage">Loved by Glowing Skin.</span>
            </h2>
            <p className="text-text-body font-light max-w-xl leading-relaxed">
              Real skin, real restoration. Drag the slider to witness the cellular
              radiance difference after 14 days of the complete Aurelia ritual.
            </p>
          </div>

          {/* Before/After Slider + Testimonials */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
            {/* Slider Column */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onTouchEnd={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                className="relative w-full aspect-4/5 max-h-[560px] rounded-4xl overflow-hidden cursor-ew-resize select-none border border-cream/50 shadow-md"
              >
                {/* BEFORE – desaturated/dimmed with CSS filter */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/skin_glowing.png`}
                    alt="Skin Before Aurelia Treatment"
                    fill
                    className="object-cover object-center pointer-events-none"
                    style={{
                      filter: "saturate(0.45) contrast(0.85) brightness(0.82) sepia(0.12)",
                    }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <span className="absolute bottom-6 left-6 z-20 text-[10px] font-semibold uppercase tracking-widest bg-black/45 text-white/90 backdrop-blur-md px-4 py-1.5 rounded-full">
                    Before Routine
                  </span>
                </div>

                {/* AFTER – full-colour clipped overlay */}
                <div
                  className="absolute inset-0 w-full h-full z-10"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/skin_glowing.png`}
                    alt="Skin After 14 Days Aurelia Treatment"
                    fill
                    className="object-cover object-center pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <span className="absolute bottom-6 right-6 z-20 text-[10px] font-semibold uppercase tracking-widest bg-sage text-white backdrop-blur-md px-4 py-1.5 rounded-full">
                    After 14 Days
                  </span>
                </div>

                {/* Slider Divider + Handle */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white z-20 pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-sage flex items-center justify-center shadow-lg border border-cream pointer-events-none">
                    <div className="flex gap-0.5">
                      <span className="h-3 w-px bg-sage rounded-full" />
                      <span className="h-3 w-px bg-sage rounded-full" />
                      <span className="h-3 w-px bg-sage rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-text-meta uppercase tracking-widest mt-4">
                Drag slider to compare skin barrier health
              </p>
            </div>

            {/* Testimonials Column */}
            <div className="lg:col-span-5 space-y-6">
              {testimonials.map((test) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.6, delay: test.id * 0.08 }}
                  className="bg-white rounded-3xl p-6 border border-cream/50 shadow-sm relative overflow-hidden"
                >
                  <Quote className="absolute top-4 right-4 w-12 h-12 text-cream opacity-40 stroke-1" />

                  <div className="flex text-champagne-gold mb-3 relative z-10">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <h3 className="font-serif text-base font-medium text-text-title mb-2 relative z-10">
                    {test.title}
                  </h3>

                  <p className="text-xs text-text-body font-light leading-relaxed mb-4 relative z-10 italic">
                    &ldquo;{test.quote}&rdquo;
                  </p>

                  <div className="flex items-center justify-between border-t border-black/5 pt-3 relative z-10">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-text-title flex items-center gap-1.5">
                        {test.name}
                        <Check className="w-3.5 h-3.5 text-sage stroke-3" />
                      </span>
                      <span className="text-[9px] text-text-meta">
                        {test.skinType} Skin · Age {test.age}
                      </span>
                    </div>
                    <span className="text-[9px] text-sage font-medium uppercase tracking-wider bg-mint px-2 py-0.5 rounded-full">
                      {test.duration}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bug fix: Infinite Marquee — proper looping structure */}
        {/* Both copies must be siblings inside ONE flex container to loop seamlessly */}

      </section>
      <div className="w-full bg-cream py-6 border-y border-soft-beige relative overflow-hidden">
        <div className="animate-marquee flex items-center gap-16 whitespace-nowrap w-max">
          {/* First copy */}
          {trustBadges.map((badge, idx) => (
            <span
              key={`a-${idx}`}
              className="text-[10px] font-semibold text-text-body uppercase tracking-widest flex items-center gap-3 shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
              {badge}
            </span>
          ))}
          {/* Duplicate copy — must be same container for seamless loop */}
          {trustBadges.map((badge, idx) => (
            <span
              key={`b-${idx}`}
              aria-hidden="true"
              className="text-[10px] font-semibold text-text-body uppercase tracking-widest flex items-center gap-3 shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
