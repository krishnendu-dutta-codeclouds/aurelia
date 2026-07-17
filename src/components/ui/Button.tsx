"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "sage";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed rounded-full";
    const variants = {
      primary: "bg-text-title text-white hover:bg-sage shadow-md hover:shadow-lg",
      sage: "bg-sage text-white hover:bg-olive shadow-md hover:shadow-lg",
      ghost: "bg-transparent text-text-title hover:text-sage",
      outline: "border border-black/15 bg-white text-text-title hover:border-sage hover:text-sage",
    };
    const sizes = {
      sm: "text-[9px] px-4 py-2",
      md: "text-[10px] px-6 py-3",
      lg: "text-[11px] px-8 py-4",
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
