"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Leaf, FlaskConical, Heart, Globe } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";

const values = [
  {
    icon: FlaskConical,
    title: "Clinical Precision",
    body: "Every formulation is validated through independent clinical trials. We publish our efficacy data — unredacted.",
    color: "text-sage bg-sage/10 border-sage/20",
  },
  {
    icon: Leaf,
    title: "Botanical Integrity",
    body: "We source active botanicals from certified ethical suppliers. Fair compensation, traceable supply chains, no exceptions.",
    color: "text-rose-gold bg-rose-gold/10 border-rose-gold/20",
  },
  {
    icon: Heart,
    title: "Skin Inclusivity",
    body: "All formulations are clinically tested across Fitzpatrick skin types I–VI. Luxury has no skin type exclusions.",
    color: "text-olive bg-olive/10 border-olive/20",
  },
  {
    icon: Globe,
    title: "Planetary Responsibility",
    body: "87% recyclable packaging today. Zero-waste primary packaging target by 2028. We publish our progress annually.",
    color: "text-sage bg-mint border-sage/15",
  },
];

const team = [
  { name: "Dr. Camille Rousseau", role: "Founder & Head of Formulation", initials: "CR" },
  { name: "Marcus Webb", role: "Chief Sustainability Officer", initials: "MW" },
  { name: "Léa Fontaine", role: "Lead Clinical Aesthetician", initials: "LF" },
  { name: "Anya Petrov", role: "Director of Customer Rituals", initials: "AP" },
];

const timeline = [
  { year: "2022", event: "Founder Dr. Camille Rousseau leaves a decade at L'Oréal Research to begin independent formulation work." },
  { year: "2023", event: "18 months of R&D. First clinical trials conducted with 62 volunteers across 3 cities." },
  { year: "2024", event: "Aurelia launches with 3 formulations. Sells out within 72 hours of launch." },
  { year: "2025", event: "Expands to 6 formulations. Partners with Aboriginal-owned Kakadu plum cooperative." },
  { year: "2026", event: "International distribution. 14,000 active customers. 4 industry awards." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-warm-white pb-20">
      {/* Hero */}
      <section className="relative min-h-[70vh] bg-cream/60 border-b border-soft-beige flex items-end overflow-hidden grain pt-32 pb-20">
        <div className="absolute top-[-10%] right-[-8%] w-[50%] h-[120%] rounded-full bg-gradient-to-bl from-rose-gold/10 to-transparent blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-8%] w-[40%] h-[80%] rounded-full bg-gradient-to-tr from-mint/20 to-transparent blur-[120px] pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 w-full">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8 items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-meta mb-5">Our Philosophy</p>
              <h1 className="font-serif text-6xl md:text-8xl text-text-title leading-[0.9] tracking-[-0.04em]">
                Science is
                <br />
                <span className="italic text-sage">the ritual.</span>
              </h1>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-base text-text-body font-light leading-relaxed">
                Aurelia was founded on a single conviction: that luxury skincare does not have to choose between clinical efficacy and ethical sourcing. Both are non-negotiable. Both are achievable.
              </p>
              <p className="text-base text-text-body font-light leading-relaxed">
                We are a team of scientists, aestheticians, and sustainability specialists who believe the beauty industry owes its customers transparency — not mythology.
              </p>
              <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-title hover:text-sage transition-colors group">
                <span className="link-underline">Explore Our Formulations</span>
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Values */}
        <section className="py-20 md:py-28">
          <div className="flex items-center gap-4 mb-14">
            <div className="w-8 h-px bg-sage" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-meta">Our Values</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-7 rounded-[28px] bg-white border border-black/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-5 ${v.color}`}>
                  <v.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-text-title mb-3 tracking-[-0.02em]">{v.title}</h3>
                <p className="text-sm text-text-body font-light leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Origin Story */}
        <section className="py-10 md:py-20 border-t border-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-sage" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-meta">Our Story</span>
              </div>
              <h2 className="font-serif text-5xl md:text-6xl text-text-title leading-[0.95] tracking-[-0.04em] mb-8">
                A lab bench,
                <br />
                <span className="italic text-sage">a conviction,</span>
                <br />
                and 4 years.
              </h2>
              <p className="text-base text-text-body font-light leading-relaxed mb-6">
                Dr. Camille Rousseau spent a decade as a principal formulation chemist at one of the world's largest cosmetics conglomerates. She was good at her job — excellent, in fact. But she was troubled by a persistent tension: the ingredients that genuinely worked were consistently deprioritised in favour of ingredients that photographed well in marketing campaigns.
              </p>
              <p className="text-base text-text-body font-light leading-relaxed mb-6">
                In 2022, she walked away. With her own savings and a rented laboratory bench, she began building formulations she could defend to a clinical panel — not a marketing committee.
              </p>
              <p className="text-base text-text-body font-light leading-relaxed">
                Aurelia is the result. A brand built backward from science: start with what works. Then make it beautiful.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-sage via-sage/40 to-transparent" />
              <div className="flex flex-col gap-8 pl-12">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-[2.75rem] top-0.5 w-3 h-3 rounded-full bg-sage border-2 border-white shadow-sm" />
                    <span className="font-serif italic text-sage text-lg">{item.year}</span>
                    <p className="text-sm text-text-body font-light leading-relaxed mt-1">{item.event}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 border-t border-black/5">
          <div className="flex items-center gap-4 mb-14">
            <div className="w-8 h-px bg-sage" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-meta">The Team</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-[24px] bg-white border border-black/5 shadow-sm text-center"
              >
                <div className="w-16 h-16 rounded-full bg-sage/15 border border-sage/25 flex items-center justify-center font-serif text-2xl text-sage mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-serif text-base text-text-title tracking-[-0.02em] leading-tight mb-1">{member.name}</h3>
                <p className="text-[10px] text-text-meta font-light">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 rounded-[32px] bg-cream/50 border border-soft-beige text-center mb-8 grain overflow-hidden relative">
          <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[60%] h-[160%] rounded-full bg-gradient-to-b from-mint/20 to-transparent blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-serif text-5xl text-text-title tracking-[-0.04em] mb-4">Ready to meet <span className="italic text-sage">your ritual?</span></h2>
            <p className="text-sm text-text-body font-light mb-8 max-w-sm mx-auto">Six clinical formulations. Backed by science. Built for you.</p>
            <Link href="/shop" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-text-title text-white text-[11px] font-bold uppercase tracking-widest hover:bg-sage transition-colors shadow-lg">
              Shop All Formulations <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
