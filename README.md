# India Gate — Restaurant Website

Marketing site for India Gate, an authentic Indian restaurant on Duckworth Street in St. John's, Newfoundland. Premium one-page home with three SEO landing pages.

## Stack

- **[Astro 5](https://astro.build)** — static site generator, zero JS framework shipped
- **[Tailwind CSS v4](https://tailwindcss.com)** — design tokens in `src/styles/global.css`
- **[GSAP](https://gsap.com)** (ScrollTrigger + SplitText) + **[Lenis](https://lenis.darkroom.engineering)** — preloader, masked text reveals, pinned scroll sections, horizontal gallery, smooth scrolling
- `astro:assets` — responsive WebP image pipeline

## Pages

| Route | Purpose |
|---|---|
| `/` | Premium animated one-pager (hero, menu, story, gallery, reviews, FAQ, reservations) |
| `/menu` | Full menu — targets menu/dish searches |
| `/takeout-delivery` | Takeout & catering landing page |
| `/contact` | NAP, hours, map, directions, reservation form |

## Commands

```bash
npm install
npm run dev      # dev server at localhost:4321
npm run build    # production build to ./dist
npm run preview  # preview the production build
```

## Deploying to Vercel

Import the repo at [vercel.com/new](https://vercel.com/new) — Astro is auto-detected (build `npm run build`, output `dist`). No environment variables needed.

## Before launch

All business data lives in `src/data/site.ts`. Items marked **PLACEHOLDER** must be verified: production domain (also in `astro.config.mjs` and `public/robots.txt`), geo coordinates, opening hours, social links. Review quotes are placeholders — swap in real Google reviews. Photos are stock placeholders in `src/assets/` — replace with real restaurant photography, keeping the SEO-friendly filenames.

## Notes

- Animations are gated on `prefers-reduced-motion` — reduced-motion users get the full site with no motion.
- JSON-LD (Restaurant, WebSite, BreadcrumbList, FAQPage) is emitted by `src/components/Schema.astro`.
- `handoff/` contains the original Claude Design prototype this site was built from; `legacy-static/` is the pre-Astro v1.
