"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X, ArrowRight, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ShoppingBagIcon from "@/components/icons/ShoppingBagIcon";
import { useCartStore, useWishlistStore } from "@/lib/store";
import SearchModal from "@/components/SearchModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const itemCount = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(y / totalScroll);
      }
    };
    // Bug fix: added { passive: true } — scroll listener was blocking the main thread
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const makeupItems = [
    { name: "Matte Lipsticks", href: "#collection" },
    { name: "Luminous Foundations", href: "#collection" },
    { name: "Mineral Eyeshadows", href: "#collection" },
    { name: "Glow Primers", href: "#collection" },
  ];

  const skincareItems = [
    { name: "Vitamin C Serums", href: "#collection" },
    { name: "Barrier Repair Creams", href: "#collection" },
    { name: "Mint & Aloe Toners", href: "#collection" },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 w-full h-0.5 bg-sage origin-left z-50 transition-transform duration-100"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Navigation Shell */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseLeave={() => setShopOpen(false)}
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-[1600px] rounded-4xl z-40 transition-all duration-500 border bg-white/95 backdrop-blur-md border-cream px-6 ${scrolled || shopOpen ? "shadow-[0_12px_40px_rgba(0,0,0,0.06)] py-2" : "shadow-[0_4px_24px_rgba(0,0,0,0.04)] py-2"}`}
      >
        <div className="flex items-center justify-between w-full relative z-20">
          {/* Logo (AURELIA logo image) */}
          <Link href="/" className="hover:opacity-85 transition-opacity shrink-0 flex items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.png`}
              alt="Aurelia Logo"
              width={140}
              height={25}
              priority
              className="h-6 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/shop"
              onMouseEnter={() => setShopOpen(true)}
              onClick={() => setShopOpen(false)}
              className="py-3 cursor-pointer block"
            >
              <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 relative py-1 ${shopOpen ? "text-sage" : "text-text-body hover:text-sage"}`}>
                SHOP
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-px bg-sage origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: shopOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </Link>

            <Link href="/about" className="text-xs font-bold uppercase tracking-widest text-text-body hover:text-sage transition-colors py-1">
              PHILOSOPHY
            </Link>

            <Link href="/shop" className="text-xs font-bold uppercase tracking-widest text-text-body hover:text-sage transition-colors py-1">
              GALLERY
            </Link>

            <Link href="/journal" className="text-xs font-bold uppercase tracking-widest text-text-body hover:text-sage transition-colors py-1">
              JOURNAL
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-text-title hover:text-sage transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Favorites Button */}
            <Link href="/wishlist" className="hidden sm:block relative p-2 text-text-title hover:text-sage transition-colors">
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <motion.span
                  key={wishlistCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 bg-rose-gold text-white text-[8px] font-bold rounded-full flex items-center justify-center"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Shopping Bag Button — with live cart count */}
            <Link href="/cart" className="relative p-2 text-text-title hover:text-sage transition-colors">
              <ShoppingBagIcon className="w-5 h-5" strokeWidth={1.5} />
              {itemCount > 0 ? (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 bg-rose-gold text-white text-[8px] font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              ) : (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-gold rounded-full" />
              )}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-text-title hover:text-sage transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
            </button>
          </div>
        </div>

        {/* Desktop Megamenu Container */}
        <AnimatePresence>
          {shopOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block absolute top-[100%] left-0 w-full bg-white border border-[#FAF5EF] rounded-b-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.04)] px-10 py-10 mt-1 z-10 overflow-hidden"
            >
              <div className="grid grid-cols-12 gap-8 max-w-[1600px] mx-auto text-left">
                {/* Categorized links columns */}
                <div className="col-span-8 grid grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <h4 className="text-[10px] font-bold tracking-widest text-text-meta mb-4 pb-1.5 border-b border-black/5">
                      MAKEUP COLLECTIONS
                    </h4>
                    <div className="flex flex-col gap-2.5">
                      {makeupItems.map((item, itemIdx) => (
                        <a
                          key={itemIdx}
                          href={item.href}
                          onClick={() => setShopOpen(false)}
                          className="text-sm text-text-body font-light hover:text-sage transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h4 className="text-[10px] font-bold tracking-widest text-text-meta mb-4 pb-1.5 border-b border-black/5">
                      CLINICAL SKINCARE
                    </h4>
                    <div className="flex flex-col gap-2.5">
                      {skincareItems.map((item, itemIdx) => (
                        <a
                          key={itemIdx}
                          href={item.href}
                          onClick={() => setShopOpen(false)}
                          className="text-sm text-text-body font-light hover:text-sage transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Featured item column */}
                <div className="col-span-4 bg-warm-white rounded-2xl p-5 border border-cream/50 flex gap-4 items-center">
                  <div className="relative w-24 h-24 bg-white rounded-xl overflow-hidden border border-cream shrink-0">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/lip_red.png`}
                      alt="Featured lipstick Release"
                      fill
                      className="object-cover p-1"
                    />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[8px] font-bold uppercase tracking-widest bg-mint px-2 py-0.5 rounded text-sage mb-2">
                      New Release
                    </span>
                    <h5 className="font-serif text-sm font-medium text-text-title mb-1">
                      Velvet Lip Matte
                    </h5>
                    <p className="text-xs text-text-meta font-light mb-3">
                      Crimson Red & Dusty Rose pigments.
                    </p>
                    <a
                      href="#collection"
                      onClick={() => setShopOpen(false)}
                      className="text-xs font-semibold uppercase tracking-wider text-sage flex items-center gap-1 hover:gap-2 transition-all duration-300"
                    >
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="md:hidden w-full overflow-hidden mt-4 bg-white/95 rounded-2xl border border-cream/50 shadow-lg text-left"
            >
              <div className="flex flex-col gap-6 p-6 max-h-[70vh] overflow-y-auto">
                <div className="flex flex-col items-start gap-2 border-b border-black/5 pb-4">
                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-bold uppercase tracking-widest text-sage mb-2 hover:text-olive transition-colors block"
                  >
                    SHOP ALL
                  </Link>
                  <div className="grid grid-cols-2 gap-3 w-full pl-2">
                    {[...makeupItems, ...skincareItems].map((item, itemIdx) => (
                      <a
                        key={itemIdx}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs text-text-body font-light hover:text-sage py-1"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-widest text-text-title hover:text-sage py-1"
                >
                  PHILOSOPHY
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-widest text-text-title hover:text-sage py-1"
                >
                  GALLERY
                </Link>
                <Link
                  href="/journal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-widest text-text-title hover:text-sage py-1"
                >
                  JOURNAL
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-widest text-text-title hover:text-sage py-1 flex items-center gap-2"
                >
                  WISHLIST {wishlistCount > 0 && <span className="px-1.5 py-0.5 rounded-full bg-rose-gold text-white text-[9px] font-bold">{wishlistCount}</span>}
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-widest text-sage hover:text-olive py-1 flex items-center gap-2"
                >
                  BAG {itemCount > 0 && <span className="px-1.5 py-0.5 rounded-full bg-rose-gold text-white text-[9px] font-bold">{itemCount}</span>}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {searchOpen && (
          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
