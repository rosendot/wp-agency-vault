# Atlas Studio Vault

Internal knowledge base, reusable toolkit, and dashboard for Atlas Studio. Browse kits, palettes, fonts, and guides, and track every website the studio mocks up, builds, or hosts — all in one place.

> **You run the business. We hold up your site.**

This is the `atlas-studio-internal` repo — the private vault behind every Atlas Studio client site.

## What Atlas Studio sells

A custom website for local businesses where **the client controls the day-to-day content and we handle everything else.** One flat **$399/mo**, no setup fee. See [CLAUDE.md](./CLAUDE.md) for what this vault specifically powers, and [`../atlas-studio-frontend/CLAUDE.md`](../atlas-studio-frontend/CLAUDE.md) for the full positioning rules.

## What's Inside

| Folder | Purpose |
|--------|---------|
| `app/` | Next.js dashboard UI — file-based routing with live previews and variable customization |
| `websites/` | Mocks, in-progress builds, and live client sites — one folder per site, loose structure |
| `kits/` | Self-contained feature kits — each has all files (JS, CSS, PHP), a README, kit.json, and preview.html |
| `palettes/` | Color systems + typography — 31 palettes with 9 colors and 2 fonts each |
| `fonts/` | Font registry — curated Google Fonts with pairing info, vibe tags, and weight details |
| `plugins/` | Structured plugin registry — individual JSON files with costs, licensing, install conditions |
| `guides/` | Step-by-step reference docs — Bedrock setup, LocalWP config, design process, agency flow, client contracts/onboarding/offboarding, billing, accessibility and performance audits, image licensing, uptime monitoring |

## Dashboard

```bash
npm install
npm run dev
# Open http://localhost:3000
```

Five tabs: **Websites**, **Kits**, **Palettes**, **Fonts**, and **Guides**.

Each tab and detail view has its own URL (e.g., `/kits/hero-split`). Refreshing the page stays on the current view. Browser back/forward works natively.

- **Websites** (`/websites`) — Every site Atlas Studio has mocked, built, or hosts — filter by status (`mock`, `in-progress`, `live`, `archived`)
- **Kits** (`/kits`) — Browse individual components with live previews, view code, see tags/variants/dependencies
- **Palettes** (`/palettes`) — Browse color systems with swatches, font previews, and CSS custom property output
- **Fonts** (`/fonts`) — Browse fonts by type, preview at adjustable sizes, see pairings and palette usage
- **Guides** (`/guides`) — Browse and read the step-by-step reference docs in `guides/` with rendered markdown

## Kits

| Kit | Category | What It Does |
|-----|----------|-------------|
| `hero-section/` | Section | Full-width hero with dark overlay, text, and CTA buttons |
| `hero-split/` | Section | 50/50 split hero — text on one side, image on the other (left/right variants) |
| `hero-video/` | Section | Looping video background hero with overlay and centered text |
| `hero-slideshow/` | Section | Auto-rotating background images with crossfade transitions and dot indicators |
| `infinite-carousel/` | Interactive | Infinite-loop carousel with arrows, dots, and touch swipe |
| `faq-accordion/` | Interactive | Expandable Q&A accordion with smooth animations |
| `faq-two-column/` | Interactive | Two-column FAQ — questions left, answer panel right |
| `faq-cards/` | Section | Q&A card grid with icon badges |
| `faq-tabbed/` | Interactive | Tabbed FAQ with category tabs and accordion |
| `mega-menu/` | Navigation | Full-width hover dropdown with multi-column panels |
| `menu-list/` | Section | Vertical menu list with dotted leaders, grouped by category |
| `menu-grid/` | Section | Responsive menu card grid with category filter tabs |
| `menu-cards/` | Section | Large editorial menu cards with photo overlays |
| `google-map-embed/` | Section | Google Maps iframe embed with contact info grid |
| `grid-gallery/` | Section | Configurable photo grid with hover zoom overlay |
| `masonry-gallery/` | Section | Pinterest-style masonry layout with varying image heights |
| `lightbox-gallery/` | Interactive | Thumbnail grid with full-screen modal viewer and keyboard nav |
| `before-after-slider/` | Interactive | Draggable divider comparing two overlaid images |
| `image-comparison/` | Section | Side-by-side image pairs with labels and captions |
| `header-classic/` | Navigation | Standard header with logo, nav, CTA, mobile hamburger |
| `header-transparent/` | Navigation | Overlay header that goes solid on scroll |
| `mobile-nav-drawer/` | Navigation | Off-canvas slide-in mobile navigation with backdrop |
| `testimonial-cards/` | Section | Grid of client quote cards with photos and star ratings |
| `testimonial-slider/` | Interactive | Single-testimonial carousel with crossfade and dots |
| `logo-wall/` | Section | Client logo grid, grayscale with color on hover |
| `stats-counter/` | Section | Animated number counters that count up on scroll |
| `breadcrumbs/` | Navigation | Hierarchical nav trail with schema.org SEO markup |
| `feature-grid/` | Section | Icon + title + blurb cards — the three-pillar / six-up value-prop grid |
| `feature-alternating/` | Section | Alternating text + visual rows for feature deep-dives (zig-zag pattern) |
| `cta-banner/` | Section | Final-call conversion banner with headline, subhead, and 1–2 buttons |
| `service-cards/` | Section | Service offering cards with icon/image, description, price, and learn-more link |
| `process-steps/` | Section | Numbered "How it works" steps with connector line, 3–5 stages |
| `footer-classic/` | Section | Multi-column footer with logo, contact, links, and hours |
| `footer-minimal/` | Section | Clean single-line footer with logo, copyright, and social icons |
| `footer-mega/` | Section | Large footer with about, services, links, newsletter, and contact row |
| `footer-cta/` | Section | CTA banner above a standard multi-column footer |

## Websites

Every site the studio touches lives under `websites/<slug>/`. Each folder has a `website.json` with status (`mock`, `in-progress`, `live`, `archived`), category, client, live URL (once deployed), and a pointer to a local `preview.html` mock if one exists. The folder structure itself is intentionally loose — a website can be a handwritten HTML mock, a full Bedrock theme, or just metadata pointing at a live URL.

Browse them all in the dashboard at `/websites`, filter by status, and add new entries as clients come in.

## Palettes

31 palettes available — each with a full color system (9 colors) and typography (heading + body fonts). Browse them all in the dashboard at `/palettes`.

| Palette | Style |
|---------|-------|
| `ember-hearth/` | Rich reds, warm golds, serif headings |
| `modern-navy/` | Deep navy, clean whites, sans-serif |
| `coastal-breeze/` | Ocean blues, sandy neutrals |
| `rustic-brick/` | Earthy reds, warm browns |
| `nordic-frost/` | Cool grays, icy blues |
| + 26 more | Browse at `/palettes` for full list |

## Fonts

Curated font registry with Google Fonts. Each font has type classification, weight options, pairing suggestions, vibe description, and which palettes use it. Browse at `/fonts`.

## Plugins

Organized by `plugins/core/`, `plugins/restaurant/`, `plugins/service/`. Each plugin has a JSON file with metadata.

**Day-1 plugins** (buy before first client): Rank Math, Wordfence, UpdraftPlus, WooCommerce, Square for WooCommerce, Site Kit, Redirection

**Buy later** (when you have enough clients): MainWP Pro, Complianz, Smash Balloon, Fluent Forms, LatePoint, Zaytech

## How to Use

1. **Browse** — Run the dashboard to explore kits, palettes, and websites
2. **New client project?** Add a folder in `websites/<client-slug>/` with a `website.json` (status: `in-progress`), then build whatever the site needs inside it
3. **Looking for a pattern?** Check the kit catalog for reusable components (heroes, features, CTAs, footers)
4. **Picking colors?** Browse `/palettes` — every palette provides 9 colors + 2 fonts and can drive any site's CSS custom properties
5. **Setup help?** Check `guides/` for step-by-step instructions
6. **Choosing plugins?** Check `plugins/` for vetted options with costs and install conditions

## Adding to the Vault

- **New kit** — `/new-kit <name>` or create a folder in `kits/` with source files, README.md, kit.json, preview.html, and a TSX preview component in `app/components/kit-previews/`
- **New palette** — `/new-palette <name>` or create a folder in `palettes/` with palette.json
- **New website** — Create a folder in `websites/<slug>/` with a `website.json` (status, category, description, url, preview). Add whatever files the site needs alongside it — no rigid schema
- **New plugin** — `/new-plugin <name>` or add a JSON file to the appropriate `plugins/` subdirectory
- **New guide** — Add a markdown file to `guides/`
