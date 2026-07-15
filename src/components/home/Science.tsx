"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Heart } from "lucide-react";

export default function Science() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Bug fix: scale canvas to device pixel ratio for crisp rendering on retina
    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      return { width: w, height: h };
    };

    let { width, height } = setSize();

    const handleResize = () => {
      const size = setSize();
      width = size.width;
      height = size.height;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Non-null alias — TypeScript cannot narrow captured vars through class method bodies
    const c: CanvasRenderingContext2D = ctx;

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 2 + 1.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "rgba(110, 122, 82, 0.25)";
        c.fill();
      }
    }

    // Reduced particle count for better performance
    const particlesCount = 36;
    const particles: Particle[] = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push(new Particle());
    }

    // Only connect nearby particles; early-exit with squared distance
    const maxDistSq = 120 * 120;
    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / 120) * 0.18;
            ctx.strokeStyle = `rgba(110, 122, 82, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.update();
        p.draw();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const stats = [
    {
      label: "Hydration Capacity",
      value: "+142%",
      desc: "Increases moisture absorption within 15 minutes of initial dermal application.",
    },
    {
      label: "Elasticity Index",
      value: "+88%",
      desc: "Enhances cellular membrane rebound tension within 4 weeks of regular use.",
    },
    {
      label: "Barrier Shield",
      value: "98%",
      desc: "Protects skin surface layers against environmental particulate pollution.",
    },
    {
      label: "Sebum Balance",
      value: "-35%",
      desc: "Reduces hyperactive sebaceous oily secretion without drying dermal layers.",
    },
  ];

  return (
    <section id="science" className="relative py-32 bg-cream/20 overflow-hidden">
      {/* Connected Molecular Network canvas – positioned absolutely behind content */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
        style={{ display: "block" }}
      />

      <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-mint/20 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-peach/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4">
            Laboratory Precision
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-light text-text-title mb-8 leading-tight">
            Scientific Efficacy. <br />
            <span className="italic font-normal text-sage">Bio-Tech Delivery.</span>
          </h2>

          <div className="space-y-8">
            {[
              {
                icon: Target,
                title: "Multi-Depth Cellular Delivery",
                body: "Our bio-synthesized molecules mimic the lipid structure of natural skin layers, allowing deep nutrient penetration to targeted cells without irritation.",
              },
              {
                icon: ShieldCheck,
                title: "Zero Toxicity Threshold",
                body: "We verify every compound under strict clinical safety margins, ensuring all botanical serums are clean, hypo-allergenic, and safe for skin sensitivity.",
              },
              {
                icon: Heart,
                title: "Epidermal Matrix Stabilization",
                body: "Through active peptides and multi-weight amino acid linkages, the formulation strengthens the intercellular brick-and-mortar skin matrix directly.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-sage border border-cream shadow-sm shrink-0">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-text-title mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-text-body font-light leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Stat Grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white/70 backdrop-blur-md rounded-4xl p-8 md:p-12 border border-cream shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-8 relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 font-mono text-[9px] text-sage/40 uppercase tracking-widest">
            Aurelia Lab R&D v26.4
          </div>

          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-text-meta mb-2">
                {stat.label}
              </span>
              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-serif text-5xl font-light text-text-title mb-2"
              >
                {stat.value}
              </motion.h4>
              <p className="text-xs text-text-body leading-relaxed font-light">
                {stat.desc}
              </p>
            </div>
          ))}

          <div className="col-span-1 sm:col-span-2 pt-6 border-t border-black/5 text-center sm:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-sage flex items-center justify-center sm:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
              Third-party dermatologically tested &amp; clinical trial approved
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
