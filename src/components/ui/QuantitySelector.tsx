"use client";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({ value, onChange, min = 1, max = 10 }: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center gap-0 border border-black/10 rounded-full overflow-hidden bg-white">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-9 h-9 flex items-center justify-center text-text-title hover:text-sage hover:bg-sage/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-base font-light"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-semibold text-text-title tabular-nums">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-9 h-9 flex items-center justify-center text-text-title hover:text-sage hover:bg-sage/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-base font-light"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
