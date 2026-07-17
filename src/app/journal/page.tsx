"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { articles } from "@/lib/articles";
import Breadcrumb from "@/components/ui/Breadcrumb";

const allCategories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? articles : articles.filter((a) => a.category === activeCategory);
  const [hero, ...rest] = filtered;

  return (
    <main className="min-h-screen bg-warm-white pt-28 pb-20">
      {/* Page header */}
      <section className="relative bg-cream/60 border-b border-soft-beige overflow-hidden grain">
        <div className="absolute bottom-[-20%] left-[-8%] w-[40%] h-[200%] rounded-full bg-gradient-to-tr from-mint/20 to-transparent blur-[120px] pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20 relative z-10">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]} />
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-text-title leading-[0.95] tracking-[-0.04em] mt-6">
            The <span className="italic text-sage">Journal</span>
          </h1>
          <p className="text-sm text-text-body font-light mt-4 max-w-md leading-relaxed">
            Bio-science dispatches, formulation revelations, and seasonal ritual guides. No noise, ever.
          </p>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mt-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-text-title text-white border-text-title"
                  : "bg-white border-black/10 text-text-meta hover:border-sage hover:text-sage"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hero article */}
        {hero && (
          <Link href={`/journal/${hero.slug}`} className="group block mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[32px] overflow-hidden border border-black/5 bg-white shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              <div className="relative aspect-[4/3] md:aspect-auto bg-cream/60">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${hero.image}`}
                  alt={hero.title}
                  fill
                  className="object-contain p-10 drop-shadow-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] bg-sage/10 text-sage border border-sage/20">
                    {hero.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-text-meta font-light">
                    <Clock className="w-3 h-3" /> {hero.readingTime} min read
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-text-title leading-[1.1] tracking-[-0.03em] mb-4 group-hover:text-sage transition-colors duration-300">{hero.title}</h2>
                <p className="text-sm text-text-body font-light leading-relaxed mb-6">{hero.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-text-title">{hero.author.name}</p>
                    <p className="text-[10px] text-text-meta font-light">{hero.author.role}</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-sage group-hover:gap-2.5 transition-all">
                    Read More <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        )}

        {/* Article grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article, idx) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/journal/${article.slug}`} className="group block h-full">
                <div className="h-full rounded-[24px] border border-black/5 bg-white overflow-hidden hover:shadow-lg transition-shadow duration-500 flex flex-col">
                  <div className="relative aspect-[4/3] bg-cream/60">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${article.image}`}
                      alt={article.title}
                      fill
                      className="object-contain p-8 drop-shadow-lg"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] bg-sage/10 text-sage border border-sage/15">{article.category}</span>
                      <span className="flex items-center gap-1 text-[10px] text-text-meta font-light"><Clock className="w-2.5 h-2.5" /> {article.readingTime} min</span>
                    </div>
                    <h3 className="font-serif text-xl text-text-title leading-tight tracking-[-0.02em] mb-2 group-hover:text-sage transition-colors duration-300 flex-1">{article.title}</h3>
                    <p className="text-xs text-text-meta font-light leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-black/5">
                      <p className="text-[10px] font-semibold text-text-title">{article.author.name}</p>
                      <span className="text-[10px] text-text-meta">{article.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
