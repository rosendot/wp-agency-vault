# Atlas Studio Vault

Internal knowledge base, reusable toolkit, and dashboard for Atlas Studio. Browse templates, kits, and palettes visually, mix and match, and ship faster.

> **You run the business. We hold up your site.**

This is the `atlas-studio-internal` repo — the private vault behind every Atlas Studio client site.

## What's Inside

| Folder | Purpose |
|--------|---------|
| `app/` | Next.js dashboard UI — file-based routing with live previews and variable customization |
| `kits/` | Self-contained feature kits — each has all files (JS, CSS, PHP), a README, kit.json, and preview.html |
| `palettes/` | Color systems + typography — mix and match with any section or template |
| `sections/` | Pre-built page sections — different layout structures for the same content type |
| `templates/` | Full page layouts with placeholder content — compose kits, pick a palette, swap placeholders, deploy |
| `fonts/` | Font registry — curated Google Fonts with pairing info, vibe tags, and weight details |
| `plugins/` | Structured plugin registry — individual JSON files with costs, licensing, install conditions |
| `guides/` | Step-by-step reference docs — Bedrock setup, LocalWP config, design process, agency flow, client contracts/onboarding/offboarding, billing, accessibility and performance audits, image licensing, uptime monitoring |

## Dashboard

```bash
npm install
npm run dev
# Open http://localhost:3000
```

Six tabs: **Templates**, **Sections**, **Kits**, **Palettes**, **Fonts**, and **Guides**.

Each tab and detail view has its own URL (e.g., `/kits/hero-split`). Refreshing the page stays on the current view. Browser back/forward works natively.

- **Templates** (`/templates`) — Browse full page layouts with live previews, swap palettes, edit content variables
- **Sections** (`/sections`) — Browse full page compositions that wire kits together with a palette
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

## Sections

Sections are full page-level compositions that wire multiple kits together. None built yet — the infrastructure is ready for when you compose your first full page view (e.g., a complete restaurant menu page that combines hero + menu-list + CTA).

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

## Templates

| Template | Category | Description |
|----------|----------|-------------|
| `restaurant-classic/` | Restaurant | Hero overlay, fan favorites carousel, Google Maps, photo gallery, menu page (CPT), about page |

## Fonts

Curated font registry with Google Fonts. Each font has type classification, weight options, pairing suggestions, vibe description, and which palettes use it. Browse at `/fonts`.

## Plugins

Organized by `plugins/core/`, `plugins/restaurant/`, `plugins/service/`. Each plugin has a JSON file with metadata.

**Day-1 plugins** (buy before first client): Rank Math, Wordfence, UpdraftPlus, WooCommerce, Square for WooCommerce, Site Kit, Redirection

**Buy later** (when you have enough clients): MainWP Pro, Complianz, Smash Balloon, Fluent Forms, LatePoint, Zaytech

## How to Use

1. **Browse** — Run the dashboard to explore templates, kits, and palettes
2. **New client project?** Pick a template + palette, copy into your Bedrock project, swap placeholders
3. **Want a different look?** Switch the palette — same layout, different colors
4. **Need a feature?** Grab the kit folder, read its README, integrate
5. **Setup help?** Check `guides/` for step-by-step instructions
6. **Choosing plugins?** Check `plugins/` for vetted options with costs and install conditions

## Adding to the Vault

- **New kit** — `/new-kit <name>` or create a folder in `kits/` with source files, README.md, kit.json, preview.html, and a TSX preview component in `app/components/kit-previews/`
- **New palette** — `/new-palette <name>` or create a folder in `palettes/` with palette.json
- **New section** — `/new-section <name>` or create a folder in `sections/` with section.json, section.php, section.css, preview.html, README.md
- **New template** — `/new-template <name>` or create a folder in `templates/` with PHP templates, template.json, preview.html, and README.md. Reference kits via `kits_used` and a palette via `default_palette`
- **New plugin** — `/new-plugin <name>` or add a JSON file to the appropriate `plugins/` subdirectory
- **New guide** — Add a markdown file to `guides/`
