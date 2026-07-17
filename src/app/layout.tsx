import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";
import FooterWrapper from "@/components/FooterWrapper";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Aurelia | Luxurious Skincare & Botanical Science",
  description: "Experience premium organic skincare. Clean, minimal, and scientifically proven formulas for healthy, glowing skin.",
  keywords: ["skincare", "luxury", "beauty", "botanical", "organic", "glow", "face cream", "anti-aging"],
  authors: [{ name: "Aurelia Beauty" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-white text-text-title" suppressHydrationWarning>
        {/* Full-page loader — shown until window.load fires */}
        <PageLoader />
        <SmoothScroll>
          <Navbar />
          {children}
          <FooterWrapper />
        </SmoothScroll>
      </body>
    </html>
  );
}
