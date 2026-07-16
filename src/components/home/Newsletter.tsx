"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

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
    <section className="py-16 md:py-32 bg-cream/60 relative overflow-hidden border-t border-soft-beige">
      {/* Background glowing gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[45%] h-[45%] rounded-full bg-gradient-to-tr from-peach/15 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-gradient-to-br from-mint/20 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-3 md:mb-4">Aurelia Journal</p>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-light text-text-title mb-4 md:mb-6 leading-tight">
          Subscribe to <br />
          <span className="italic font-normal text-sage">Botanical Chronicles</span>
        </h2>
        <p className="text-sm text-text-body font-light max-w-xl mx-auto leading-relaxed mb-8 md:mb-12">
          Receive exclusive previews of new bio-active formulations, scientific dermal studies, and seasonal skin routine guidelines.
        </p>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center p-8 bg-white/70 backdrop-blur-md rounded-4xl border border-cream shadow-sm max-w-md mx-auto">
            <CheckCircle2 className="w-12 h-12 text-sage mb-4 stroke-[1.5]" />
            <h3 className="font-serif text-xl font-medium text-text-title mb-2">Welcome to the Club</h3>
            <p className="text-xs text-text-meta leading-relaxed font-light">
              You are officially subscribed to our journal list. An introduction guide has been dispatched to your email address.
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
            className="max-w-md mx-auto flex flex-col gap-4 relative"
          >
            {/* Input field wrapper */}
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Enter your email address"
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address style",
                  },
                })}
                className={`w-full px-6 py-4.5 rounded-full border bg-white/80 backdrop-blur-sm text-sm text-text-title placeholder:text-text-meta/60 focus:outline-none transition-all duration-300 ${
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
              <span className="text-xs text-muted-coral font-medium text-left px-4">
                {errors.email.message}
              </span>
            )}

            <p className="text-[10px] text-text-meta/70 font-light mt-4">
              By subscribing, you agree to our privacy conditions. Zero spam, withdraw consent at any instant.
            </p>
          </form>
        )}

      </div>
    </section>
  );
}
