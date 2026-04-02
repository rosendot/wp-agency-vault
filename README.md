# WP Agency Vault

A personal knowledge base, reusable toolkit, and internal dashboard for building WordPress client sites. Browse templates, kits, and palettes visually, mix and match, and ship faster.

## What's Inside

| Folder | Purpose |
|--------|---------|
| `app/` | Next.js dashboard UI — browse templates, kits, and palettes with live previews and variable customization |
| `kits/` | Self-contained feature kits — each has all files (JS, CSS, PHP), a README, kit.json, and preview.html |
| `palettes/` | Color systems + typography — mix and match with any template |
| `templates/` | Full page layouts with placeholder content — compose kits, pick a palette, swap placeholders, deploy |
| `plugins/` | Structured plugin registry — individual JSON files with costs, licensing, install conditions |
| `guides/` | Step-by-step reference docs — Bedrock setup, LocalWP config, design process, agency flow |

## Dashboard

```bash
npm install
npm run dev
# Open http://localhost:3000
```

Three tabs: **Templates**, **Kits**, and **Palettes**.

- **Templates** — Browse page layouts with live previews, view source code, swap palettes to see different color schemes, edit content variables
- **Kits** — Browse individual components with live previews, view code, see tags/variants/dependencies
- **Palettes** — Browse color systems with swatches, font previews, and CSS custom property output

## Kits

| Kit | Category | What It Does |
|-----|----------|-------------|
| `infinite-carousel/` | Interactive | Infinite-loop carousel with arrows, dots, and touch swipe |
| `hero-section/` | Section | Full-width hero with dark overlay, text, and CTA buttons |
| `google-map-embed/` | Section | Google Maps iframe embed with contact info grid |
| `faq-accordion/` | Interactive | Expandable Q&A accordion with smooth animations |
| `mega-menu/` | Navigation | Full-width hover dropdown with multi-column panels |

## Palettes

| Palette | Description |
|---------|-------------|
| `warm-restaurant/` | Rich reds, warm golds, dark backgrounds, cream accents, serif headings |

## Templates

| Template | Category | Description |
|----------|----------|-------------|
| `restaurant-classic/` | Restaurant | Hero overlay, fan favorites carousel, Google Maps, photo gallery, menu page (CPT), about page |

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

- **New kit** — `/new-kit <name>` or create a folder in `kits/` with source files, README.md, kit.json, and preview.html
- **New palette** — `/new-palette <name>` or create a folder in `palettes/` with palette.json
- **New template** — `/new-template <name>` or create a folder in `templates/` with PHP templates, template.json, preview.html, and README.md. Reference kits via `kits_used` and a palette via `default_palette`
- **New plugin** — `/new-plugin <name>` or add a JSON file to the appropriate `plugins/` subdirectory
- **New guide** — Add a markdown file to `guides/`
