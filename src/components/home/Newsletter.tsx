"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";

interface FormInputs {
  email: string;
}

export default function Newsletter() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();

  const onSubmit = async () => {
    setStatus("loading");
    // Simulate API registration delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
    reset();
  };

  return (
    <section id="newsletter" className="relative py-24 md:py-32 bg-cream/60 overflow-hidden border-t border-soft-beige">
      {/* Background glowing gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[45%] h-[45%] rounded-full bg-gradient-to-tr from-peach/15 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-gradient-to-br from-mint/20 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-stretch">
          {/* Left: editorial oversized heading */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-6">
              <SectionLabel index="09 / Journal" code={"// AUR-NEWS-26"} />
            </div>
            <h2 className="section-title">
              Letters
              <br />
              <span className="italic text-sage">from the lab.</span>
            </h2>
            <p className="section-copy mt-6 max-w-md">
              Quarterly dispatches: bio-active formulation reveals, clinical study breakdowns, and seasonal ritual guides. No noise, ever.
            </p>
          </div>

          {/* Right: form card */}
          <div className="lg:col-span-5">
            <div className="relative h-full p-7 md:p-9 rounded-[28px] bg-white/80 backdrop-blur-md border border-cream shadow-[0_30px_60px_-30px_rgba(80,60,40,0.18)] grain overflow-hidden">
              {/* Number stamp */}
              <div className="absolute top-5 right-6 text-[10px] font-bold uppercase tracking-[0.3em] text-text-meta/70">
                NL · 004
              </div>
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center min-h-[280px] text-center">
                  <CheckCircle2 className="w-12 h-12 text-sage mb-4 stroke-[1.5]" />
                  <h3 className="font-serif text-2xl font-medium text-text-title mb-2">Welcome to the Club</h3>
                  <p className="text-xs text-text-meta leading-relaxed font-light max-w-xs">
                    You are officially subscribed to our journal list. An introduction guide has been dispatched to your email.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-[10px] font-semibold uppercase tracking-wider text-sage mt-6 border-b border-sage hover:border-transparent transition-all"
                  >
                    Subscribe another address
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4 relative pt-2"
                >
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-meta">
                    Your email
                  </label>
                  <div className="relative w-full">
                    <input
                      type="email"
                      placeholder="hello@aurelia.com"
                      {...register("email", {
                        required: "Email address is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address style",
                        },
                      })}
                      className={`w-full px-5 py-4 rounded-full border bg-white text-sm text-text-title placeholder:text-text-meta/60 focus:outline-none transition-all duration-300 ${
                        errors.email
                          ? "border-muted-coral focus:border-muted-coral shadow-sm"
                          : "border-cream/80 focus:border-sage/40 focus:bg-white"
                      }`}
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-sage hover:bg-olive text-white flex items-center justify-center transition-all duration-300 disabled:bg-sage/50"
                      aria-label="Subscribe"
                    >
                      {status === "loading" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.email && (
                    <span className="text-xs text-muted-coral font-medium text-left px-2">
                      {errors.email.message}
                    </span>
                  )}
                  <p className="text-[10px] text-text-meta/70 font-light mt-2 leading-relaxed">
                    By subscribing, you agree to our privacy conditions. Zero spam, withdraw consent at any instant.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* What you'll get — full-width marquee strip aligned with the floating header pill */}
        <div className="mt-14 md:mt-20">
          <div className="mx-auto w-[94%] max-w-[1600px] bg-white/85 backdrop-blur-md border border-cream rounded-4xl overflow-hidden">
            <div className="overflow-hidden">
              <div className="animate-marquee flex items-center gap-12 whitespace-nowrap py-3">
                {Array.from({ length: 2 }).map((_, groupIdx) => (
                  <div key={groupIdx} className="flex items-center gap-12">
                    {[
                      "✦ Formulation previews",
                      "✦ Clinical study drops",
                      "✦ Seasonal ritual guides",
                      "✦ Founder letters",
                      "✦ Member-only releases",
                      "✦ Botanical deep-dives",
                    ].map((item, i) => (
                      <span
                        key={`${groupIdx}-${i}`}
                        className="text-[11px] md:text-xs font-bold uppercase tracking-[0.3em] text-text-title/80 whitespace-nowrap shrink-0"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
