# Award-Winning Skincare Website — Completed Implementation Plan (2026)

## 1. Project Brief

Build a premium, interactive storytelling website for a skincare brand — the kind of experience that could win Awwwards, FWA, or CSS Design Awards.

**This is not a template ecommerce site.** It is a motion-first digital experience inspired by Apple, Aesop, Rhode Skin, and Dior Beauty, built to feel:

Luxurious · Clean · Bright · Organic · Human · Premium · Minimal · Editorial · Motion-first

**Hard constraint:** Light mode only. No dark backgrounds, anywhere, at any breakpoint.

**North star:** The site should feel like walking into a luxury skincare boutique — spacious, cinematic scrolling, each section flowing into the next, telling a coherent story from first impression to purchase.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS (v4), Vanilla CSS |
| Scroll & Motion | GSAP + ScrollTrigger, Lenis (smooth scroll), Framer Motion |
| 3D | React Three Fiber, Drei, Three.js |
| State | Zustand |
| Forms | React Hook Form |
| Icons | Lucide React |

---

## 3. Design System

### 3.1 Color Palette

| Role | Colors |
|---|---|
| Primary | White, Cream (`#FAF5EF`), Warm Ivory (`#FCF9F2`) |
| Secondary | Sage Green (`#8F9779`), Soft Olive (`#6C7A52`), Natural Beige |
| Accent | Rose Gold (`#B76E79`), Champagne Gold (`#D4AF37`), Soft Peach (`#FFF0E5`) |
| Text | `#111111` (headings/titles), `#444444` (body), `#666666` (secondary/meta) |

**Background tones:** Pure White, Warm White (`#FAFAF8`), Cream, Ivory, Champagne, Very Soft Beige.

**Explicitly avoid:** neon, cyberpunk aesthetics, glassmorphism overload, dark backgrounds of any kind.

### 3.2 Typography

| Use | Font Family | Candidate Fonts |
|---|---|---|
| Headings | Serif | Cormorant Garamond, Georgia, Recoleta |
| Body | Sans-Serif | Inter, Helvetica Neue, Arial |

Guidelines: large editorial type scale, generous letter/line spacing, magazine-style layout grids.

---

## 4. Homepage Flow & Implementation Detail

Each section transitions smoothly into the next via scroll-driven animation.

### 4.1 Hero
- Fullscreen, cream background, soft radial sunlight lighting.
- **Centerpiece 3D skincare bottle**: 
  - Glass physical material with custom transmission and thickness.
  - Realistic interior dip tube.
  - Dynamically drawn canvas label texture featuring gold borders, serif branding (`AURELIA`), and active ingredient details.
  - Curved cylinder geometry wrapping the label smoothly around the bottle.
  - Slow float rotation that tilts dynamically based on mouse/pointer coordinate interaction.
- Floating botanical leaves, subtle dust particles.
- CTAs: "Discover Formulas", "Explore Ingredients".

### 4.2 Scroll Story
- Bottle transforms and rotates progressively as the user scrolls.
- **5 Scroll States (mapped dynamically across `min-h-[500vh]`):**
  - **Stage 01**: Harvested with Botanical Integrity.
  - **Stage 02**: Molecular Bio-Synthesis.
  - **Stage 03**: Couture Dermal Radiance.
  - **Crafted Elegance reveal**: Slides up from below (`p = 0.50` to `p = 0.75`).
  - **Editorial Beauty reveal**: Slides up to cover the viewport (`p = 0.75` to `p = 1.00`).
- **Layout Constraints**: The steps (Stage 01 to 03) are styled with `h-full shrink-0 flex flex-col justify-center` inside a height-defined parent column, ensuring they fill exactly `100%` of the viewport screen and center their content vertically without collapsing.

### 4.3 Bio-Active Ingredients Section
- Interactive ingredient cards: Vitamin C, Niacinamide, Hyaluronic Acid.
- On hover: details expand with scientific illustrations and benefits.

### 4.4 Product Collection Section
- Cards float upward into view.
- Real-time shade selectors (Crimson Red, Peach Nude, Dusty Rose) updating product images dynamically.
- Quick-add cart check animations with light hover shine overlays.

### 4.5 Science Section
- Large laboratory aesthetic layout.
- High-performance 2D canvas particle animation rendering a connected molecular network, optimized and scaled to match Retina device pixel ratios.

### 4.6 Customer Results
- Before/after slider container with drag/touch gesture support.
- Trust badge infinite looping marquee.

### 4.company-rituals (Other Sections)
- Routing routines, sustainability infographics, and a luxury minimal footer.

---

## 5. Motion System

- **Lenis Smooth Scroll**: Configured at layout root for unified scrolling behavior.
- **GSAP / Framer Motion**: Smooth transitions and fade-in states on screen enter.
- **Transforms**: GPU-accelerated translate operations for parallax blobs and background texts.

---

## 6. Three.js / WebGL Stability & R3F Requirements

- **Context-Lost Prevention**:
  - Removed `powerPreference: "high-performance"` option. This prevents macOS dual-GPU systems from initiating hardware-switching context termination during pointer drags or touches.
  - Embedded a custom `WebGLContextHandler` inside the Canvas context to capture `webglcontextlost` events, invoke `preventDefault()`, and request automatic canvas recovery.
  - Disposes of `labelTexture` dynamically on component unmounts to prevent GPU memory leaks.
- **Optimized Lights**: cap maps size at 512, automatic device pixel capping at `2`.

---

## 7. UI Components

- Minimal navigation header with scroll-progress tracking indicators.
- Native system cursor utilized for high input responsiveness and standard accessibility compliance (custom lag-cursors fully removed).
- Luxury product routines toggled dynamically.

---

## 8. Delivery & UX Targets

- High performance, smooth interactions, responsive flex/grid layouts.
- Zero layout shifting (CLS) and clean viewport scaling across mobile, tablet, and desktop viewports.
- Clean typography and premium layout lines.
