"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate a minimum perceived loading time while tracking real load progress
    let raf: number;
    let startTime = performance.now();
    const minDuration = 2200; // minimum ms to show loader (for UX)

    // Animate progress bar smoothly
    const animateProgress = (now: number) => {
      const elapsed = now - startTime;
      // Progress grows quickly to ~85% then waits for real load
      const auto = Math.min(85, (elapsed / minDuration) * 85);
      setProgress(Math.floor(auto));
      if (auto < 85) {
        raf = requestAnimationFrame(animateProgress);
      }
    };
    raf = requestAnimationFrame(animateProgress);

    const finish = () => {
      cancelAnimationFrame(raf);
      // Jump to 100%
      setProgress(100);
      // Wait a beat then fade out
      setTimeout(() => {
        setFadeOut(true);
        // After fade transition, remove from DOM
        setTimeout(() => setVisible(false), 700);
      }, 350);
    };

    const elapsed = performance.now() - startTime;
    const remainingMin = Math.max(0, minDuration - elapsed);

    if (document.readyState === "complete") {
      setTimeout(finish, remainingMin);
    } else {
      const onLoad = () => setTimeout(finish, remainingMin);
      window.addEventListener("load", onLoad, { once: true });
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("load", onLoad);
      };
    }

    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#faf8f5] transition-opacity duration-700"
      style={{ opacity: fadeOut ? 0 : 1, pointerEvents: fadeOut ? "none" : "all" }}
    >
      {/* Soft ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-gradient-to-tr from-[#FFF5F3] to-[#F1EAFF] blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-[#E2F0D9] to-[#FAF8FF] blur-[120px] opacity-50 pointer-events-none" />

      {/* Logo */}
      <div className="relative mb-10 select-none">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.png`}
          alt="Aurelia"
          width={160}
          height={60}
          className="object-contain opacity-90"
          priority
        />
      </div>

      {/* Pulsing ring animation */}
      <div className="relative flex items-center justify-center mb-10">
        {/* Outer ripple rings */}
        <span className="absolute w-24 h-24 rounded-full border border-sage/20 animate-ping [animation-duration:2400ms]" />
        <span className="absolute w-16 h-16 rounded-full border border-sage/30 animate-ping [animation-duration:1800ms] [animation-delay:300ms]" />
        {/* Center dot */}
        <span className="w-4 h-4 rounded-full bg-sage/70 animate-pulse [animation-duration:1600ms]" />
      </div>

      {/* Progress bar */}
      <div className="w-48 md:w-64 h-px bg-black/8 rounded-full overflow-hidden relative">
        <div
          className="absolute left-0 top-0 h-full bg-sage/60 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading label */}
      <p className="mt-5 text-[10px] font-mono text-black/30 tracking-[0.35em] uppercase select-none">
        {progress < 100 ? "Preparing your ritual…" : "Ready"}
      </p>
    </div>
  );
}
