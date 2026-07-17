"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, X, Star, Plus, Check, ArrowUpRight, Search } from "lucide-react";
import { products, categories } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import Breadcrumb from "@/components/ui/Breadcrumb";
import type { Product } from "@/lib/types";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = activeCategory === "all" ? products : products.filter((p) => p.categorySlug === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    switch (sort) {
      case "price-asc": return [...list].sort((a, b) => a.price - b.price);
      case "price-desc": return [...list].sort((a, b) => b.price - a.price);
      case "rating": return [...list].sort((a, b) => b.rating - a.rating);
      default: return list;
    }
  }, [activeCategory, sort, search]);

  return (
    <main className="min-h-screen bg-warm-white pt-28 pb-20">
      {/* Page Header */}
      <section className="relative bg-cream/60 border-b border-soft-beige overflow-hidden grain">
        <div className="absolute top-[-20%] right-[-10%] w-[45%] h-[200%] rounded-full bg-gradient-to-br from-rose-gold/10 to-transparent blur-[120px] pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20 relative z-10">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-text-title leading-[0.95] tracking-[-0.04em] mt-6">
            Our <span className="italic text-sage">Collection</span>
          </h1>
          <p className="text-sm text-text-body font-light mt-4 max-w-md leading-relaxed">
            Six clinical formulations. Each one obsessively crafted with bio-active botanical compounds.
          </p>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mt-10">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] border transition-all duration-300 ${
                  activeCategory === cat.slug
                    ? "bg-text-title text-white border-text-title"
                    : "bg-white border-black/10 text-text-meta hover:border-sage hover:text-sage"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-meta" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search formulas..."
                className="pl-8 pr-4 py-2 rounded-full border border-black/10 text-xs bg-white text-text-title placeholder:text-text-meta focus:outline-none focus:border-sage transition-colors w-48"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 rounded-full border border-black/10 text-[10px] font-bold uppercase tracking-[0.2em] bg-white text-text-title focus:outline-none focus:border-sage cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-text-meta mb-8">
          {filtered.length} {filtered.length === 1 ? "formula" : "formulas"} found
        </p>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((product, idx) => (
              <ShopCard key={product.id} product={product} index={idx} />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="col-span-3 py-24 text-center">
              <p className="font-serif italic text-2xl text-text-meta">No formulas match your search.</p>
              <button onClick={() => { setSearch(""); setActiveCategory("all"); }} className="mt-4 text-xs font-bold uppercase tracking-widest text-sage hover:text-olive transition-colors">
                Clear filters
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}

function ShopCard({ product, index }: { product: Product; index: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const themeAccent = product.theme === "rose" ? "text-rose-gold" : product.theme === "sage" ? "text-sage" : "text-olive";
  const themeBg = product.theme === "rose" ? "from-[#FFF0EA] to-white" : product.theme === "sage" ? "from-[#EFF4EC] to-white" : "from-[#FBF6EB] to-white";

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (added) return;
    addItem(product, product.images[activeImg]);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/shop/${product.slug}`} className="block group">
        <div className={`relative rounded-[28px] border border-black/5 overflow-hidden bg-gradient-to-br ${themeBg} hover:shadow-[0_30px_60px_-20px_rgba(80,60,40,0.15)] transition-all duration-500`}>
          {/* Badge */}
          {product.badge && (
            <span className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] bg-white border border-black/5 ${themeAccent}`}>
              {product.badge}
            </span>
          )}

          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden mx-4 mt-4 rounded-2xl bg-white/60">
            {product.images.map((img, i) => (
              <Image
                key={i}
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${img.src}`}
                alt={img.alt}
                fill
                className={`object-contain p-6 drop-shadow-[0_20px_35px_rgba(80,60,40,0.2)] transition-opacity duration-500 ${i === activeImg ? "opacity-100" : "opacity-0 absolute inset-0"}`}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ))}
            {/* Shade dots */}
            {product.images.some((img) => img.hex) && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.preventDefault(); setActiveImg(i); }}
                    className={`w-4 h-4 rounded-full border-2 transition-transform ${i === activeImg ? "border-text-title scale-110" : "border-transparent hover:scale-105"}`}
                    style={{ backgroundColor: img.hex }}
                    title={img.shadeName}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="px-5 pt-4 pb-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-text-meta mb-1">{product.category}</p>
            <h3 className={`font-serif text-xl text-text-title leading-tight tracking-[-0.02em] group-hover:${themeAccent} transition-colors duration-300 mb-1`}>
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mb-3">
              <div className={`flex ${themeAccent}`}>
                {[...Array(5)].map((_, i) => <Star key={i} className={`w-2.5 h-2.5 ${i < Math.round(product.rating) ? "fill-current" : "fill-transparent stroke-current opacity-30"}`} />)}
              </div>
              <span className="text-[10px] font-semibold text-text-title">{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-text-meta">({product.reviews.length})</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-black/5">
              <div className="flex items-baseline gap-1.5">
                <span className={`font-serif text-xl ${themeAccent}`}>${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-xs text-text-meta line-through">${product.oldPrice.toFixed(2)}</span>
                )}
              </div>
              <button
                onClick={handleAdd}
                className={`h-8 px-3 rounded-full flex items-center gap-1.5 border text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  added ? "bg-sage border-sage text-white" : "bg-white border-black/10 text-text-title hover:border-sage hover:text-sage"
                }`}
              >
                {added ? <><Check className="w-3 h-3 stroke-[2.5]" /> Added</> : <><Plus className="w-3 h-3" /> Add</>}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
