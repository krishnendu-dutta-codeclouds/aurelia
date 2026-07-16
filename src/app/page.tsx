"use client";

import Hero from "@/components/home/Hero";
import ScrollStory from "@/components/home/ScrollStory";
import Ingredients from "@/components/home/Ingredients";
import ProductCollection from "@/components/home/ProductCollection";
import CustomerResults from "@/components/home/CustomerResults";
import ProductRoutine from "@/components/home/ProductRoutine";
import Sustainability from "@/components/home/Sustainability";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/home/Footer";

export default function Home() {
  // Bug fix: scrollY was tracked here and passed to Hero, causing ALL 11 sections
  // to re-render on every scroll event. Hero now manages its own scroll internally.
  return (
    <main className="flex-1 w-full relative">
      {/* 4.1 Hero Section */}
      <Hero />

      {/* 4.2 Scroll Story Section */}
      <ScrollStory />

      {/* 4.3 Bio-Active Ingredients Section */}
      <Ingredients />

      {/* 4.4 Product Collection Section */}
      <ProductCollection />



      {/* 4.6 Customer Results Before/After Slider */}
      <CustomerResults />

      {/* 4.7 Morning & Night Product Routine Timeline */}
      <ProductRoutine />

      {/* 4.8 Eco-Sustainability Section */}
      <Sustainability />

      {/* 4.9 Horizontal Featured Products Showcase */}
      <FeaturedProducts />

      {/* 4.10 Journal Newsletter Form */}
      <Newsletter />

      {/* 4.11 Luxury Minimal Footer */}
      <Footer />
    </main>
  );
}
