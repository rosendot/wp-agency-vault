# WP Agency Vault

A personal knowledge base, reusable toolkit, and internal kit browser for building WordPress client sites. When starting a new client project, pull kits, guides, and boilerplate from here instead of starting from scratch.

## What's Inside

| Folder | Purpose |
|--------|---------|
| `app/` | Next.js kit browser UI — browse kits visually, view code, and customize variables |
| `kits/` | Ready-to-ship feature kits — each kit is a self-contained folder with all files for one feature (JS, CSS, PHP, README, kit.json) |
| `guides/` | Step-by-step reference docs — Bedrock setup, LocalWP config, theme development, CPTs |
| `boilerplate/` | Starter files to copy into new projects — theme skeleton |
| `plugins/` | Notes on plugins you've vetted and when to use them |

## Kit Browser UI

A Next.js dashboard for browsing and previewing all kits visually.

```bash
cd app
npm install
npm run dev
# Open http://localhost:3000
```

Features:
- Filter kits by category (Sections, Interactive, Navigation, Data & Admin)
- Search by name or tag
- View actual source code for each kit file with tabbed navigation
- See and edit customizable variables (including color pickers)
- View tags, variants, and dependencies

## Kits

Each kit is a grab-and-go folder with a `kit.json` that defines metadata, customizable variables, and variants.

| Kit | Category | What It Does |
|-----|----------|-------------|
| `infinite-carousel/` | Interactive | Infinite-loop carousel with arrows, dots, and touch swipe |
| `mobile-nav/` | Navigation | Responsive hamburger menu toggle |
| `hero-section/` | Section | Full-width hero with overlay, text, and CTA buttons |
| `google-map-embed/` | Section | Google Maps iframe embed with contact info grid |
| `custom-post-type/` | Data | CPT registration + taxonomy + meta box with nonces |

## How to Use

1. **Browse kits** — Run the kit browser (`cd app && npm run dev`) to visually explore what's available
2. **Starting a new client project?** Copy `boilerplate/theme/` into your new repo, then pull in kits as needed
3. **Need a feature?** Grab the kit folder from `kits/`, read its README, and integrate
4. **Need to set something up?** Check `guides/` for step-by-step instructions
5. **Choosing a plugin?** Check `plugins/recommended.md` for vetted options

## Contributing to the Vault

Every time you learn something or solve a problem on a client project, save the reusable version here:

- Built a new component? Create a kit in `kits/` with all files, a README, and a `kit.json`
- Figured out a setup process? Write it up in `guides/`
- Found a great plugin? Add it to `plugins/recommended.md`

Every kit must include a `kit.json` with: name, slug, description, category, tags, files, variables, variants, and dependencies. This powers the kit browser UI.
