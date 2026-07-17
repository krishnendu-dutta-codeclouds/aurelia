"use client";

/**
 * Standardized small section label used in the top-left of every major
 * section header. Renders the section index (e.g. "04 / Initiatives") on
 * one line, the monospace project tag (e.g. "// AUR-EARTH-26") on the next.
 *
 * Matches the layout used in the Circular Eco-System and Catalog sections.
 */
export interface SectionLabelProps {
  index: string; // e.g. "01 / Hero", "04 / Initiatives"
  code: string; // e.g. "// AUR-EARTH-26"
  variant?: "default" | "light"; // "light" for use on dark backgrounds
}

export default function SectionLabel({
  index,
  code,
  variant = "default",
}: SectionLabelProps) {
  const tone = variant === "light" ? "text-sage/80" : "text-sage";
  const muted = variant === "light" ? "text-white/40" : "text-text-meta";

  return (
    <div className="flex flex-col gap-3">
      <p
        className={`text-xs font-semibold uppercase tracking-[0.35em] ${tone}`}
      >
        <span
          className={`inline-block w-8 h-px align-middle mr-3 ${
            variant === "light" ? "bg-sage/60" : "bg-sage"
          }`}
        />
        {index}
      </p>
      <p
        className={`font-mono text-[10px] uppercase tracking-[0.25em] ${muted}`}
      >
        {code}
      </p>
    </div>
  );
}
