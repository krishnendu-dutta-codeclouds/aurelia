# Aurelia — Skincare Website

An interactive, motion-first digital experience for a luxury skincare brand built with Next.js, React Three Fiber, Framer Motion, and Lenis.

---

## 🛠️ Getting Started

First, install the dependencies:
```bash
npm install
```

Then, run the local development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🚀 Static Export & GitHub Pages Deployment

This project is configured to export as a static HTML site and deploy directly to GitHub Pages.

### 1. How it is configured
*   **Static Output**: In `next.config.ts`, `output: "export"` is enabled. This packages the entire app into static HTML, CSS, and JS assets in the `out/` directory on build.
*   **Base Path & Asset Prefix**: Since the project is hosted in a repository subdirectory (`/aurelia`), `basePath` is set to `/aurelia` in production so Next.js routes static assets correctly.
*   **Asset Path Prefixing**: Image assets in the `public` folder are dynamically prefixed in the source code using the injected environment variable `process.env.NEXT_PUBLIC_BASE_PATH` (e.g. `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/skin_glowing.png`).
*   **Jekyll Bypass**: The deploy script creates a `.nojekyll` file inside the `out/` folder. This tells GitHub Pages to compile the folder *without* Jekyll, allowing folders starting with underscores (like Next.js's `_next/`) to load.

### 2. How to deploy updates
To rebuild the site and deploy the latest changes to your `gh-pages` branch, simply run:

```bash
npm run deploy
```

This script will run:
1.  **`predeploy`**: Compiles the production bundle via `next build` (creating the `out/` directory) and generates the `.nojekyll` helper file.
2.  **`deploy`**: Pushes the static folder to the remote `gh-pages` branch.

Your live site will be available at:
👉 **https://krishnendu-dutta-codeclouds.github.io/aurelia/**

