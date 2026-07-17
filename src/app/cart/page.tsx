"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowRight, ShoppingBag, Tag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import QuantitySelector from "@/components/ui/QuantitySelector";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const sub = subtotal();
  const shipping = sub >= 80 ? 0 : 8.95;
  const discount = promoApplied ? sub * 0.1 : 0;
  const total = sub - discount + shipping;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === "AURELIA10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try AURELIA10.");
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-warm-white pt-28 pb-20 flex flex-col items-center justify-center gap-6">
        <ShoppingBag className="w-14 h-14 text-text-meta stroke-[1]" />
        <h1 className="font-serif text-4xl text-text-title italic">Your bag is empty</h1>
        <p className="text-sm text-text-meta font-light">Discover our clinical botanical formulations.</p>
        <Link href="/shop" className="px-8 py-3 rounded-full bg-text-title text-white text-[10px] font-bold uppercase tracking-widest hover:bg-sage transition-colors">
          Explore Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-warm-white pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: "Your Bag" }]} />
        <h1 className="font-serif text-5xl md:text-6xl text-text-title tracking-[-0.04em] leading-none mt-6 mb-12">
          Your <span className="italic text-sage">Bag</span>
          <span className="font-sans text-base text-text-meta font-light ml-4 tracking-normal">{items.reduce((s, i) => s + i.quantity, 0)} items</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Line items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <AnimatePresence>
              {items.map((item) => {
                const themeAccent = item.product.theme === "rose" ? "text-rose-gold" : item.product.theme === "sage" ? "text-sage" : "text-olive";
                const themeBg = item.product.theme === "rose" ? "from-[#FFF0EA] to-white" : item.product.theme === "sage" ? "from-[#EFF4EC] to-white" : "from-[#FBF6EB] to-white";
                return (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-5 p-5 rounded-[24px] bg-white border border-black/5 shadow-sm"
                  >
                    <div className={`relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br ${themeBg}`}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${(item.selectedImage ?? item.product.images[0]).src}`}
                        alt={item.product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-text-meta">{item.product.category}</p>
                          <Link href={`/shop/${item.product.slug}`}>
                            <h3 className="font-serif text-lg text-text-title hover:text-sage transition-colors leading-tight">{item.product.name}</h3>
                          </Link>
                          {item.selectedImage?.shadeName && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: item.selectedImage.hex }} />
                              <span className="text-[10px] text-text-meta">{item.selectedImage.shadeName}</span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 text-text-meta hover:text-muted-coral transition-colors shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.5]" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <QuantitySelector value={item.quantity} onChange={(q) => updateQuantity(item.product.id, q)} />
                        <span className={`font-serif text-xl ${themeAccent}`}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Continue shopping */}
            <Link href="/shop" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-meta hover:text-sage transition-colors mt-2">
              <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-7 rounded-[28px] bg-white border border-black/5 shadow-sm">
              <h2 className="font-serif text-2xl text-text-title tracking-[-0.02em] mb-6">Order Summary</h2>

              {/* Promo */}
              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-meta" />
                  <input
                    value={promoCode}
                    onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                    placeholder="Promo code"
                    className="w-full pl-8 pr-3 py-2.5 rounded-full border border-black/10 text-xs focus:outline-none focus:border-sage transition-colors"
                  />
                </div>
                <button
                  onClick={handlePromo}
                  disabled={promoApplied}
                  className="px-4 py-2.5 rounded-full bg-text-title text-white text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-sage transition-colors disabled:bg-sage"
                >
                  {promoApplied ? "Applied" : "Apply"}
                </button>
              </div>
              {promoError && <p className="text-[10px] text-muted-coral mb-4 -mt-4">{promoError}</p>}

              {/* Line totals */}
              <div className="flex flex-col gap-3 text-sm text-text-body font-light mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-text-title">${sub.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sage">
                    <span>Promo (AURELIA10)</span>
                    <span>−${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-sage font-semibold" : "font-semibold text-text-title"}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-text-meta">Add ${(80 - sub).toFixed(2)} more for free shipping.</p>
                )}
              </div>

              <div className="border-t border-black/5 pt-4 mb-6 flex justify-between items-baseline">
                <span className="font-serif text-xl text-text-title">Total</span>
                <span className="font-serif text-3xl text-sage">${total.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="w-full block text-center py-4 rounded-full bg-text-title text-white text-[11px] font-bold uppercase tracking-widest hover:bg-sage transition-colors shadow-md hover:shadow-lg"
              >
                Proceed to Checkout
              </Link>

              <p className="text-[10px] text-text-meta text-center mt-4 font-light">Secure checkout · SSL encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
