# Arcwise Studios website

Static site, no framework. English at `/`, Indonesian at `/id/`.

- **Edit text, prices, portfolio:** `src/content.mjs`
- **Styles / behaviour:** `src/styles.css`, `src/app.js`, template in `src/page.mjs`
- **Build:** `npm run build` → `dist/` · **Check:** `npm run check` (build + HTML validation)
- **Hosting:** Cloudflare Pages, build command `npm run build`, output `dist`. Security headers in `public/_headers`.
- **Brand files:** `brand/` (outlined SVG logos, avatar, favicon). Colours: ink #0F1115, paper #F4F1EA, orange #FF6A2B. Fonts: Space Grotesk + Manrope (self-hosted in `public/fonts`).
