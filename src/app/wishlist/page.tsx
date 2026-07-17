"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, Heart, Check, ArrowRight } from "lucide-react";
import { useCartStore, useWishlistStore } from "@/lib/store";
import Breadcrumb from "@/components/ui/Breadcrumb";
import type { Product } from "@/lib/types";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addItemToCart = useCartStore((s) => s.addItem);
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);

  const handleAddToBag = (product: Product) => {
    addItemToCart(product, product.images[0]);
    setAddedItemIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-warm-white pt-28 pb-20 flex flex-col items-center justify-center gap-6 relative overflow-hidden grain">
        {/* Soft background glows */}
        <div className="absolute top-1/4 left-1/4 w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-rose-gold/10 to-transparent blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] rounded-full bg-gradient-to-br from-mint/10 to-transparent blur-[80px] pointer-events-none" />
        
        <Heart className="w-14 h-14 text-rose-gold/40 stroke-[1]" />
        <h1 className="font-serif text-4xl text-text-title italic">Your Wishlist is Empty</h1>
        <p className="text-sm text-text-meta font-light max-w-sm text-center leading-relaxed">
          Curate your personal botanical ritual. Add formulations you love to your wishlist to save them for later.
        </p>
        <Link 
          href="/shop" 
          className="group px-8 py-3.5 rounded-full bg-text-title text-white text-[11px] font-bold uppercase tracking-widest hover:bg-sage shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          Explore Shop
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-warm-white pt-28 pb-20 relative grain">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: "Wishlist" }]} />
        
        <h1 className="font-serif text-5xl md:text-6xl text-text-title tracking-[-0.04em] leading-none mt-6 mb-12">
          Your <span className="italic text-rose-gold">Wishlist</span>
          <span className="font-sans text-base text-text-meta font-light ml-4 tracking-normal">{items.length} {items.length === 1 ? "item" : "items"}</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {items.map((product) => {
              const themeAccent = product.theme === "rose" ? "text-rose-gold" : product.theme === "sage" ? "text-sage" : "text-olive";
              const themeBg = product.theme === "rose" ? "from-[#FFF0EA] via-[#FFF5F1] to-white" : product.theme === "sage" ? "from-[#EFF4EC] via-[#F2F8EE] to-white" : "from-[#FBF6EB] via-[#FCF9F2] to-white";
              const themeBtn = product.theme === "rose" ? "bg-rose-gold text-white hover:bg-[#a05a64]" : product.theme === "sage" ? "bg-sage text-white hover:bg-olive" : "bg-olive text-white hover:bg-[#525f38]";
              const isAdded = addedItemIds.includes(product.id);

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col rounded-[28px] bg-white border border-black/5 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative group overflow-hidden"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(product.id)}
                    className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 text-text-meta hover:text-muted-coral hover:scale-105 transition-all shadow-sm"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4 stroke-[1.5]" />
                  </button>

                  {/* Image container */}
                  <Link href={`/shop/${product.slug}`} className="block relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-white border border-black/5 mb-5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${themeBg} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${product.images[0].src}`}
                      alt={product.images[0].alt}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col items-start">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-meta mb-1.5">{product.category}</span>
                    <Link href={`/shop/${product.slug}`} className="hover:underline">
                      <h3 className="font-serif text-xl text-text-title font-light leading-tight mb-2 group-hover:text-sage transition-colors duration-300">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-baseline gap-2 mb-5">
                      <span className={`font-serif text-lg font-medium ${themeAccent}`}>${product.price.toFixed(2)}</span>
                      {product.oldPrice && (
                        <span className="text-xs text-text-meta line-through font-light">${product.oldPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAddToBag(product)}
                    className={`w-full h-11 rounded-full flex items-center justify-center gap-2.5 font-bold uppercase tracking-[0.2em] text-[10px] shadow-sm transition-all duration-300 ${
                      isAdded ? "bg-sage text-white" : themeBtn
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        Added to Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
                        Add to Bag
                      </>
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
