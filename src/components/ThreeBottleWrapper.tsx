"use client";

import dynamic from "next/dynamic";

const ThreeBottleScene = dynamic(() => import("./ThreeBottleScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      {/* Premium minimal spinner */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-cream/80" />
        <div className="absolute inset-0 rounded-full border-t border-sage animate-spin duration-1000" />
        <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-text-meta">Aurelia</span>
      </div>
    </div>
  ),
});

export default ThreeBottleScene;
