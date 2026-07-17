"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowRight, BookOpen } from "lucide-react";
import { products } from "@/lib/products";
import { articles } from "@/lib/articles";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden"; // disable body scroll
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Filter products & articles in real-time
  const cleanQuery = query.toLowerCase().trim();
  const matchingProducts = cleanQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.category.toLowerCase().includes(cleanQuery) ||
          p.tags.some((t) => t.toLowerCase().includes(cleanQuery))
      )
    : [];

  const matchingArticles = cleanQuery
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(cleanQuery) ||
          a.category.toLowerCase().includes(cleanQuery) ||
          a.excerpt.toLowerCase().includes(cleanQuery) ||
          a.body.toLowerCase().includes(cleanQuery)
      )
    : [];

  const hasResults = matchingProducts.length > 0 || matchingArticles.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] md:pt-[15vh]">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
      />

      {/* Floating Panel */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl w-[92%] bg-white rounded-[32px] p-6 md:p-8 border border-cream shadow-2xl z-10 overflow-hidden flex flex-col max-h-[75vh]"
      >
        {/* Header/Search Input */}
        <div className="flex items-center gap-4 border-b border-black/5 pb-4 mb-6 relative">
          <Search className="w-6 h-6 text-text-meta stroke-[1.5] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search botanical formulations or editorials..."
            className="flex-1 bg-transparent border-none text-text-title text-base md:text-lg focus:outline-none placeholder:text-text-meta/60 font-light"
          />
          <button
            onClick={onClose}
            className="p-2 text-text-meta hover:text-text-title hover:scale-105 transition-all rounded-full bg-cream/45 hover:bg-cream/80"
            aria-label="Close search"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Results Panel */}
        <div className="flex-1 overflow-y-auto pr-1 -mr-1 max-h-[50vh] no-scrollbar">
          {!query ? (
            // Initial Helper / Suggestions State
            <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
              <Search className="w-10 h-10 text-sage/30 stroke-[1.2]" />
              <h3 className="font-serif text-xl italic text-text-title">What are you looking for?</h3>
              <p className="text-xs text-text-meta font-light max-w-xs leading-relaxed">
                Type above to search our clinical skincare collections, botanical ingredients, or editorial journal posts.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                <span className="text-[10px] text-text-meta font-semibold uppercase tracking-[0.15em]">Try:</span>
                {["Serum", "Lipstick", "Ceramides", "Ritual"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 rounded-full bg-cream/45 hover:bg-sage/10 hover:text-sage text-[10px] font-bold uppercase tracking-wider transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : !hasResults ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
              <p className="text-base text-text-title font-light">No formulations or articles match &ldquo;<span className="font-semibold">{query}</span>&rdquo;</p>
              <p className="text-xs text-text-meta font-light max-w-xs">Please verify your spelling or try another keyword.</p>
            </div>
          ) : (
            // Search Results Grid
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-2">
              {/* Products Column */}
              <div className="flex flex-col">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-meta mb-4 pb-1 border-b border-black/5">
                  FORMULATIONS ({matchingProducts.length})
                </h4>
                <div className="flex flex-col gap-4">
                  {matchingProducts.length === 0 ? (
                    <p className="text-xs text-text-meta font-light italic">No matching products found.</p>
                  ) : (
                    matchingProducts.map((product) => {
                      const themeBg =
                        product.theme === "rose"
                          ? "from-[#FFF0EA] via-[#FFF5F1] to-white"
                          : product.theme === "sage"
                          ? "from-[#EFF4EC] via-[#F2F8EE] to-white"
                          : "from-[#FBF6EB] via-[#FCF9F2] to-white";
                      return (
                        <Link
                          key={product.id}
                          href={`/shop/${product.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-4 group p-2 -m-2 rounded-2xl hover:bg-cream/35 transition-colors"
                        >
                          <div className={`relative w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br ${themeBg} border border-black/5 shrink-0`}>
                            <Image
                              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${product.images[0].src}`}
                              alt={product.name}
                              fill
                              className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-text-meta block mb-0.5">
                              {product.category}
                            </span>
                            <h5 className="font-serif text-sm font-light text-text-title leading-tight truncate group-hover:text-sage transition-colors">
                              {product.name}
                            </h5>
                          </div>
                          <span className="text-xs font-medium text-sage shrink-0 pr-1">
                            ${product.price.toFixed(2)}
                          </span>
                        </Link>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Articles Column */}
              <div className="flex flex-col">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-meta mb-4 pb-1 border-b border-black/5">
                  EDITORIALS & JOURNAL ({matchingArticles.length})
                </h4>
                <div className="flex flex-col gap-4">
                  {matchingArticles.length === 0 ? (
                    <p className="text-xs text-text-meta font-light italic">No matching articles found.</p>
                  ) : (
                    matchingArticles.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/journal/${article.slug}`}
                        onClick={onClose}
                        className="flex flex-col gap-1 group p-3 -m-3 rounded-2xl hover:bg-cream/35 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-sage">
                            {article.category}
                          </span>
                          <span className="text-[8px] font-light text-text-meta">
                            {article.date}
                          </span>
                        </div>
                        <h5 className="font-serif text-sm font-light text-text-title leading-tight group-hover:text-sage transition-colors flex items-center justify-between gap-2">
                          <span className="truncate">{article.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-text-meta opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
                        </h5>
                        <p className="text-[11px] text-text-meta font-light leading-relaxed truncate">
                          {article.excerpt}
                        </p>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
