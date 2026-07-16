"use client";

import { ArrowUp } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      href: "#",
      label: "Instagram",
    },
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
      href: "#",
      label: "Twitter",
    },
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      href: "#",
      label: "Facebook",
    },
  ];

  const columns = [
    {
      title: "RITUALS",
      links: [
        { label: "Morning Collection", href: "#collection" },
        { label: "Night Restore Routine", href: "#routine" },
        { label: "Botanical Cleansers", href: "#collection" },
        { label: "Limited Serums", href: "#collection" },
      ],
    },
    {
      title: "BIO-SCIENCE",
      links: [
        { label: "Ingredients Archive", href: "#ingredients" },
        { label: "Safety Thresholds", href: "#ingredients" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { label: "Brand Origin Story", href: "#story" },
        { label: "Sustainability Index", href: "#sustainability" },
        { label: "Eco-Packaging Hub", href: "#sustainability" },
        { label: "Press & Awards", href: "#" },
      ],
    },
    {
      title: "SUPPORT",
      links: [
        { label: "Bespoke Consultations", href: "#" },
        { label: "Shipping & Return Policy", href: "#" },
        { label: "Safety Data Sheets", href: "#" },
        { label: "Contact Skincare Experts", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-cream/45 border-t border-soft-beige pt-12 md:pt-24 pb-8 md:pb-12 relative overflow-hidden">
      
      {/* Background soft gradients */}
      <div className="absolute bottom-0 right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-mint/15 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-peach/10 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-20">
          
          {/* Logo & Brand Details Column */}
          <div className="col-span-1 sm:col-span-2 flex flex-col items-start pr-0 md:pr-12">
            <a href="#" className="mb-6 hover:opacity-85 transition-opacity block">
              <Image
                src="/logo.png"
                alt="Aurelia Logo"
                width={167}
                height={30}
                className="h-8 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-text-body font-light leading-relaxed mb-8 max-w-sm">
              Formulated with bio-active botanical compounds. Restoring dermal radiance through clinical precision.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-10 h-10 rounded-full border border-black/10 hover:border-sage hover:text-sage flex items-center justify-center bg-white shadow-sm transition-all hover:scale-105 active:scale-95"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 stroke-[1.5]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-[10px] font-semibold tracking-widest text-text-meta uppercase mb-6">
                {col.title}
              </h3>
              <div className="flex flex-col gap-3.5">
                {col.links.map((link, linkIdx) => (
                  <a
                    key={linkIdx}
                    href={link.href}
                    className="text-sm text-text-body font-light hover:text-sage transition-colors duration-300 relative group w-fit"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-[11px] text-text-meta font-light">
            <span>© 2026 AURELIA Beauty. All rights protected.</span>
            <a href="#" className="hover:text-sage transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sage transition-colors">Terms of Rituals</a>
            <a href="#" className="hover:text-sage transition-colors">Accessibility Standards</a>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={handleScrollToTop}
            className="w-11 h-11 rounded-full border border-black/10 hover:border-sage hover:text-white hover:bg-sage flex items-center justify-center bg-white shadow-sm transition-all active:scale-95 group shrink-0"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 stroke-[1.5] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
