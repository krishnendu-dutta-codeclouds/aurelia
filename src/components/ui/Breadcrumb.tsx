"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-text-meta">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3 h-3 opacity-40" />}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-sage transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-text-title">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
