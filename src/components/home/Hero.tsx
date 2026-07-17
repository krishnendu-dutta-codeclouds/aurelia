"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgBlobRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Custom canvas sequence refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin on client
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameCount = 160;
    const images: HTMLImageElement[] = [];

    // Preload all frames
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = `${basePath}/video-frames/frame_${String(i).padStart(3, "0")}.jpg`;
      images.push(img);
    }

    const drawFrame = (img: HTMLImageElement) => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const width = rect?.width || window.innerWidth;
      const height = rect?.height || window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      const imgWidth = img.naturalWidth || 1280;
      const imgHeight = img.naturalHeight || 720;
      
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = width / height;
      
      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;
      
      if (canvasRatio > imgRatio) {
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      }
      
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Draw first frame immediately when it's loaded to avoid blank canvas on first paint
    const firstImg = images[0];
    if (firstImg) {
      if (firstImg.complete) {
        drawFrame(firstImg);
      } else {
        firstImg.onload = () => drawFrame(firstImg);
      }
    }

    let hasScrolledToNext = false;

    // GSAP ScrollTrigger Timeline
    const scrubObject = { frame: 0 };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 3}`, // Spans exactly 3 viewport heights
        scrub: 1.0,    // Responsive scrub
        pin: true,     // Pin the hero section
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: () => {
          const currentImg = images[Math.round(scrubObject.frame)];
          if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
            drawFrame(currentImg);
          }
        },
        onLeave: () => {
          const nextSec = document.getElementById("story");
          if (nextSec) {
            // @ts-ignore
            if (window.lenis && typeof window.lenis.scrollTo === "function") {
              // @ts-ignore
              window.lenis.scrollTo(nextSec, { duration: 1.2 });
            } else {
              nextSec.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      }
    });

    // 1. Scrub frame parameter from 0 to 239
    tl.to(scrubObject, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => {
        const currentFrame = Math.round(scrubObject.frame);
        const currentImg = images[currentFrame];
        if (currentImg) {
          if (currentImg.complete && currentImg.naturalWidth > 0) {
            drawFrame(currentImg);
          } else {
            currentImg.onload = () => drawFrame(currentImg);
          }
        }

        // If we reached the last frame while scrolling down, transition immediately
        if (currentFrame === frameCount - 1) {
          const isScrollingDown = tl.scrollTrigger && tl.scrollTrigger.direction === 1;
          if (isScrollingDown && !hasScrolledToNext) {
            hasScrolledToNext = true;
            const nextSec = document.getElementById("story");
            if (nextSec) {
              // @ts-ignore
              if (window.lenis && typeof window.lenis.scrollTo === "function") {
                // @ts-ignore
                window.lenis.scrollTo(nextSec, { duration: 1.2 });
              } else {
                nextSec.scrollIntoView({ behavior: "smooth" });
              }
            }
          }
        } else {
          hasScrolledToNext = false;
        }
      }
    }, 0);

    // 2. Coordinated animations: fade out starting text columns & background styling early (0% to 25%)
    if (leftColRef.current) {
      tl.to(leftColRef.current, { opacity: 0, x: -60, pointerEvents: "none", ease: "power2.out" }, 0);
    }
    if (rightColRef.current) {
      tl.to(rightColRef.current, { opacity: 0, x: 60, pointerEvents: "none", ease: "power2.out" }, 0);
    }
    if (bgBlobRef.current) {
      tl.to(bgBlobRef.current, { opacity: 0.15, scale: 1.1, ease: "power2.out" }, 0);
    }
    if (scrollIndicatorRef.current) {
      tl.to(scrollIndicatorRef.current, { opacity: 0, y: 30, ease: "power2.out" }, 0);
    }



    // 4. Fade out background canvas quickly starting at 75% of scrub progress
    // if (canvasRef.current) {
    //   tl.to(canvasRef.current, { opacity: 0, ease: "power3.in", duration: 0.2 }, 0.75);
    // }

    // Re-draw on window resize
    const handleResize = () => {
      const currentImg = images[Math.round(scrubObject.frame)];
      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        drawFrame(currentImg);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-cream overflow-hidden py-24 md:py-32"
    >
      {/* Background Canvas (Image Sequence) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Grain overlay (2026 tactility) */}
      <div className="absolute inset-0 z-[5] pointer-events-none grain" />

      {/* Background Parallax Blob Glows */}
      <div
        ref={bgBlobRef}
        className="absolute inset-0 pointer-events-none z-10 will-change-transform"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-gradient-to-tr from-[#FFF5F3] to-[#F1EAFF] blur-[120px] opacity-40 animate-drift" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-[#E2F0D9] to-[#FAF8FF] blur-[120px] opacity-35 animate-drift" />
      </div>


      {/* Main Grid Content */}
      <div
        ref={contentRef}
        className="w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center relative z-20 h-full min-h-[80vh] will-change-transform"
      >
        {/* Left Column */}
        <div
          ref={leftColRef}
          className="md:col-span-3 flex flex-col items-center md:items-start gap-6 md:gap-12 text-left z-20"
        >
          {/* Pill Badges */}
          <div className="flex flex-row md:flex-col gap-2 md:gap-3 flex-wrap justify-center md:justify-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-[#FBC4BA]/80 text-[#7A2D22] text-[10px] md:text-[11px] font-bold uppercase tracking-widest shadow-sm hover:scale-105 transition-transform"
            >
              <span>Care Your Skin</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-[#FADBB4]/80 text-[#824F1A] text-[10px] md:text-[11px] font-bold uppercase tracking-widest shadow-sm hover:scale-105 transition-transform"
            >
              <span>Natural Growth</span>
            </motion.div>
          </div>

          {/* Rotating Explore SVG stamp — hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="hidden md:flex relative w-28 h-28 items-center justify-center cursor-pointer group"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full animate-spin [animation-duration:12000ms] pointer-events-none"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                />
              </defs>
              <text
                fill="rgba(255,255,255,0.85)"
                className="text-[7.5px] font-bold tracking-[2.5px] uppercase"
              >
                <textPath href="#circlePath">
                  EXPLORE ALL PRODUCT · EXPLORE ALL PRODUCT ·{" "}
                </textPath>
              </text>
            </svg>

            <div className="absolute w-12 h-12 rounded-full bg-white border border-cream/50 flex items-center justify-center text-text-title group-hover:scale-110 group-hover:text-sage transition-all duration-300 shadow-md shadow-black/5">
              <ArrowUpRight className="w-5 h-5 stroke-[1.5]" />
            </div>
          </motion.div>
        </div>

        {/* Center Column: Spacer — hidden on mobile, shown on md+ */}
        <div className="hidden md:block md:col-span-6 w-full h-[55vh] md:h-[75vh] pointer-events-none relative z-10" />

        {/* Right Column: Brand narrative (editorial 2026 redesign) */}
        <div
          ref={rightColRef}
          className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-7 z-20 md:pl-6 pb-8 md:pb-0"
        >
          {/* Oversized editorial headline */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="text-white text-[44px] md:text-[68px] lg:text-[84px] leading-[0.92] tracking-[-0.04em] font-serif italic drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]"
          >
            <span className="text-mask in"><span className="font-serif">Glow</span></span>
            <br />
            <span className="text-mask in" style={{ transitionDelay: "120ms" }}><span className="font-serif">Beyond</span></span>
            <br />
            <span className="text-mask in" style={{ transitionDelay: "240ms" }}><span className="font-serif">Skin.</span></span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-white/85 font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]"
          >
            <span className="text-mask in"><span>Bio-Active Couture · 2026</span></span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs md:text-sm text-white/90 font-light leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)] max-w-xs md:max-w-none"
          >
            Cutting-edge bio-science, crafted with couture elegance — Aurelia
            delivers a glow as rare as it looks.
          </motion.p>

          {/* Magnetic CTA */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
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
            className="magnetic group relative mt-3 inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-text-title text-[11px] font-bold uppercase tracking-widest shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition-shadow shine-on-hover"
            style={{ transform: "translate(var(--mx,0), var(--my,0))" }}
          >
            <span>Discover Formulas</span>
            <ArrowUpRight className="w-4 h-4 stroke-[1.8] group-hover:rotate-45 transition-transform duration-500" />
          </motion.a>

          {/* Tiny confidence line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/70 font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
          >
            <span className="w-6 h-px bg-white/50" />
            <span>Clinically tested · Vegan</span>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator — modernized */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-30"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)] font-bold">
          Scroll
        </span>
        <div className="relative w-px h-14 bg-white/20 overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/80 animate-bounce rounded-full" />
        </div>
      </div>
    </section>
  );
}
