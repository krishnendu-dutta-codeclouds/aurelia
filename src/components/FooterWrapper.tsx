"use client";

import { usePathname } from "next/navigation";
import Footer from "./home/Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // Hide footer on the checkout page
  if (pathname === "/checkout" || pathname?.endsWith("/checkout")) {
    return null;
  }

  return <Footer />;
}
