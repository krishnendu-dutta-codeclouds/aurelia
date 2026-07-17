"use client";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: string;
  showValue?: boolean;
  reviewCount?: number;
}

export default function StarRating({ rating, max = 5, size = "md", color = "text-rose-gold", showValue = false, reviewCount }: StarRatingProps) {
  const sizes = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };
  return (
    <div className="flex items-center gap-1.5">
      <div className={cn("flex items-center", color)}>
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            className={cn(sizes[size], i < Math.round(rating) ? "fill-current" : "fill-transparent stroke-current opacity-30")}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-text-title">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-text-meta">({reviewCount})</span>
      )}
    </div>
  );
}
