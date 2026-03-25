# WP Agency Vault

A personal knowledge base, reusable toolkit, and internal dashboard for building WordPress client sites. Browse kits and themes visually, grab what you need, and ship faster.

## What's Inside

| Folder | Purpose |
|--------|---------|
| `dashboard/` | Next.js dashboard — browse kits and themes visually with live previews, code viewer, and variable customization |
| `kits/` | Self-contained feature kits — each has all files (JS, CSS, PHP), a README, kit.json, and preview.html |
| `themes/` | Complete themes with placeholder content — copy into a project, swap placeholders, deploy |
| `plugins/` | Structured plugin registry — individual JSON files with costs, licensing, install conditions |
| `guides/` | Step-by-step reference docs — Bedrock setup, LocalWP config, theme development, navigation |

## Dashboard

```bash
cd dashboard
npm install
npm run dev
# Open http://localhost:3000
```

Two tabs: **Themes** and **Kits**.

- **Themes** — Browse complete themes with live iframe previews, view source code, customize variables (colors, business name, etc.)
- **Kits** — Browse individual components with live previews, view code, see tags/variants/dependencies

## Kits

| Kit | Category | What It Does |
|-----|----------|-------------|
| `infinite-carousel/` | Interactive | Infinite-loop carousel with arrows, dots, and touch swipe |
| `mobile-nav/` | Navigation | Responsive hamburger menu toggle |
| `hero-section/` | Section | Full-width hero with dark overlay, text, and CTA buttons |
| `google-map-embed/` | Section | Google Maps iframe embed with contact info grid |
| `custom-post-type/` | Data | CPT registration + taxonomy + meta box with nonces |

## Themes

| Theme | Style | Description |
|-------|-------|-------------|
| `restaurant-classic/` | Warm | Hero overlay, fan favorites carousel, Google Maps, photo gallery, menu page (CPT), about page |

## Plugins

Organized by `plugins/core/`, `plugins/restaurant/`, `plugins/service/`. Each plugin has a JSON file with metadata.

**Day-1 plugins** (buy before first client): Rank Math, Wordfence, UpdraftPlus, WooCommerce, Square for WooCommerce, Site Kit, Redirection

**Buy later** (when you have enough clients): MainWP Pro, Complianz, Smash Balloon, Fluent Forms, LatePoint, Zaytech

## How to Use

1. **Browse** — Run the dashboard to visually explore kits and themes
2. **New client project?** Pick a theme, copy it into your Bedrock project's `web/app/themes/`, swap placeholders
3. **Need a feature?** Grab the kit folder, read its README, integrate
4. **Setup help?** Check `guides/` for step-by-step instructions
5. **Choosing plugins?** Check `plugins/` for vetted options with costs and install conditions

## Adding to the Vault

- **New kit** — Create a folder in `kits/` with source files, README.md, kit.json, and preview.html
- **New theme** — Create a folder in `themes/` with templates, theme.json, preview.html, and README.md. Reference kits via `kits_used`, don't duplicate code
- **New plugin** — Add a JSON file to the appropriate `plugins/` subdirectory
- **New guide** — Add a markdown file to `guides/`
