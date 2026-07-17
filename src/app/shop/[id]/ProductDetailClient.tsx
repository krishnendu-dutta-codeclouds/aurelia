"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check, ArrowLeft, Heart } from "lucide-react";
import { getRelatedProducts } from "@/lib/products";
import { useCartStore, useWishlistStore } from "@/lib/store";
import Breadcrumb from "@/components/ui/Breadcrumb";
import QuantitySelector from "@/components/ui/QuantitySelector";
import StarRating from "@/components/ui/StarRating";
import type { Product } from "@/lib/types";

export default function ProductDetailClient({ product }: { product: Product }) {
  const related = getRelatedProducts(product.id, 3);
  const addItem = useCartStore((s) => s.addItem);
  const wishlistItems = useWishlistStore((s) => s.items);
  const addWishlistItem = useWishlistStore((s) => s.addItem);
  const removeWishlistItem = useWishlistStore((s) => s.removeItem);
  const isWishlisted = wishlistItems.some((i) => i.id === product.id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeWishlistItem(product.id);
    } else {
      addWishlistItem(product);
    }
  };

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "ingredients" | "how-to-use" | "reviews">("description");

  const themeAccent = product.theme === "rose" ? "text-rose-gold" : product.theme === "sage" ? "text-sage" : "text-olive";
  const themeBg = product.theme === "rose" ? "from-[#FFF0EA] via-[#FFF5F1] to-white" : product.theme === "sage" ? "from-[#EFF4EC] via-[#F2F8EE] to-white" : "from-[#FBF6EB] via-[#FCF9F2] to-white";
  const themePill = product.theme === "rose" ? "bg-rose-gold/10 text-rose-gold border-rose-gold/20" : product.theme === "sage" ? "bg-sage/10 text-sage border-sage/20" : "bg-soft-beige text-olive border-olive/20";

  const avgRating = product.reviews.reduce((s, r) => s + r.rating, 0) / (product.reviews.length || 1);

  const handleAddToCart = () => {
    if (added) return;
    for (let i = 0; i < qty; i++) addItem(product, product.images[activeImg]);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "ingredients", label: "Key Ingredients" },
    { id: "how-to-use", label: "How to Use" },
    { id: "reviews", label: `Reviews (${product.reviews.length})` },
  ] as const;

  return (
    <main className="min-h-screen bg-warm-white pt-28 pb-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: product.name }]} />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-10">
          {/* Left: Image gallery */}
          <div className="flex flex-col gap-4">
            <div className={`relative aspect-square rounded-[32px] overflow-hidden bg-gradient-to-br ${themeBg} border border-black/5`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${product.images[activeImg].src}`}
                    alt={product.images[activeImg].alt}
                    fill
                    className="object-contain p-10 md:p-16 drop-shadow-[0_30px_50px_rgba(80,60,40,0.2)]"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
              {product.badge && (
                <span className={`absolute top-5 left-5 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border ${themePill}`}>
                  {product.badge}
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-white ${
                      i === activeImg ? "border-text-title scale-105 shadow-md" : "border-black/8 hover:border-black/20"
                    }`}
                  >
                    <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${img.src}`} alt={img.alt} fill className="object-contain p-2" />
                    {img.hex && (
                      <span className="absolute bottom-1.5 right-1.5 w-3 h-3 rounded-full border border-white/80" style={{ backgroundColor: img.hex }} />
                    )}
                  </button>
                ))}
              </div>
            )}
            {product.images.some((img) => img.hex) && (
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-meta">Shade:</span>
                <span className={`text-[10px] font-semibold ${themeAccent}`}>{product.images[activeImg].shadeName}</span>
                <div className="flex gap-2 ml-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-5 h-5 rounded-full border-2 transition-transform ${i === activeImg ? "border-text-title scale-110" : "border-transparent hover:scale-105"}`}
                      style={{ backgroundColor: img.hex }}
                      title={img.shadeName}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Product info */}
          <div className="flex flex-col">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-meta mb-3">{product.category}</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-title leading-[0.95] tracking-[-0.03em] mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={avgRating} showValue reviewCount={product.reviews.length} color={themeAccent} size="md" />
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className={`font-serif text-4xl ${themeAccent} leading-none tracking-[-0.03em]`}>${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-base text-text-meta line-through font-light">${product.oldPrice.toFixed(2)}</span>
              )}
              {product.oldPrice && (
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] bg-sage text-white">
                  Save ${(product.oldPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-sm text-text-body font-light leading-relaxed mb-6 max-w-md">{product.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {product.benefits.map((b, i) => (
                <span key={i} className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border ${themePill}`}>{b}</span>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <QuantitySelector value={qty} onChange={setQty} />
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={`flex-1 h-12 rounded-full flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-500 shadow-md ${
                  added ? "bg-sage text-white" : "bg-text-title text-white hover:bg-sage"
                }`}
              >
                {added ? (
                  <><Check className="w-4 h-4 stroke-[2.5]" /> Added to Bag</>
                ) : (
                  <><ShoppingBag className="w-4 h-4 stroke-[1.5]" /> Add to Bag</>
                )}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={toggleWishlist}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 shadow-sm shrink-0 ${
                  isWishlisted ? "bg-rose-gold border-rose-gold text-white" : "bg-white border-black/8 text-text-title hover:border-black/20"
                }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current stroke-[1.5]" : "stroke-[1.5]"}`} />
              </motion.button>
            </div>

            <div className="flex flex-wrap gap-4 pb-8 mb-8 border-b border-black/5">
              {["Clinically Tested", "Vegan & Cruelty-Free", "Free Shipping Over $80", "30-Day Returns"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-[10px] font-semibold text-text-meta">
                  <Check className="w-3 h-3 text-sage stroke-[2.5]" /> {t}
                </span>
              ))}
            </div>

            {/* Tabs */}
            <div>
              <div className="flex gap-1 border-b border-black/8 mb-6 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] border-b-2 transition-colors ${
                      activeTab === tab.id ? "border-text-title text-text-title" : "border-transparent text-text-meta hover:text-text-title"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "description" && (
                    <p className="text-sm text-text-body font-light leading-relaxed">{product.longDescription}</p>
                  )}
                  {activeTab === "ingredients" && (
                    <div className="flex flex-col gap-3">
                      {product.keyIngredients.map((ing, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white border border-black/5">
                          <span className={`text-2xl font-serif italic ${themeAccent} leading-none mt-0.5`}>{i + 1}</span>
                          <div>
                            <p className="text-sm font-semibold text-text-title">{ing.name}</p>
                            <p className="text-xs text-text-meta font-light mt-0.5">{ing.benefit}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === "how-to-use" && (
                    <ol className="flex flex-col gap-3">
                      {product.howToUse.map((step, i) => (
                        <li key={i} className="flex gap-4 text-sm text-text-body font-light leading-relaxed">
                          <span className={`shrink-0 font-serif italic text-lg ${themeAccent} leading-none mt-0.5`}>0{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                  {activeTab === "reviews" && (
                    <div className="flex flex-col gap-4">
                      {product.reviews.map((r) => (
                        <div key={r.id} className="p-5 rounded-2xl bg-white border border-black/5">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-sm font-semibold text-text-title">{r.author}</p>
                              {r.skin && <p className="text-[10px] text-text-meta font-light">{r.skin} skin</p>}
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <StarRating rating={r.rating} size="sm" color={themeAccent} />
                              <span className="text-[10px] text-text-meta">{r.date}</span>
                            </div>
                          </div>
                          <p className="text-xs font-semibold text-text-title mb-1">{r.title}</p>
                          <p className="text-xs text-text-body font-light leading-relaxed">{r.body}</p>
                          {r.verified && <span className="mt-2 inline-block text-[9px] font-bold uppercase tracking-[0.2em] text-sage">✓ Verified Purchase</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-serif text-4xl text-text-title tracking-[-0.03em] mb-8">You May Also <span className="italic text-sage">Love</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rp) => (
                <RelatedCard key={rp.id} product={rp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function RelatedCard({ product }: { product: Product }) {
  const themeAccent = product.theme === "rose" ? "text-rose-gold" : product.theme === "sage" ? "text-sage" : "text-olive";
  const themeBg = product.theme === "rose" ? "from-[#FFF0EA] to-white" : product.theme === "sage" ? "from-[#EFF4EC] to-white" : "from-[#FBF6EB] to-white";
  return (
    <Link href={`/shop/${product.slug}`} className={`group block rounded-[24px] border border-black/5 overflow-hidden bg-gradient-to-br ${themeBg} hover:shadow-lg transition-all duration-500`}>
      <div className={`relative aspect-square bg-gradient-to-br ${themeBg}`}>
        <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${product.images[0].src}`} alt={product.images[0].alt} fill className="object-contain p-8 drop-shadow-lg" />
      </div>
      <div className="p-5">
        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-text-meta mb-1">{product.category}</p>
        <h3 className={`font-serif text-lg text-text-title group-hover:${themeAccent} transition-colors`}>{product.name}</h3>
        <span className={`font-serif text-lg ${themeAccent} mt-1 block`}>${product.price.toFixed(2)}</span>
      </div>
    </Link>
  );
}
