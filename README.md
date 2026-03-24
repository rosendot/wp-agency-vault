# WP Agency Vault

A personal knowledge base and reusable toolkit for building WordPress client sites. When starting a new client project, pull kits, guides, and boilerplate from here instead of starting from scratch.

## What's Inside

| Folder | Purpose |
|--------|---------|
| `kits/` | Ready-to-ship feature kits — each kit is a self-contained folder with all files for one feature (JS, CSS, PHP, README) |
| `guides/` | Step-by-step reference docs — Bedrock setup, LocalWP config, theme development, CPTs |
| `boilerplate/` | Starter files to copy into new projects — theme skeleton |
| `plugins/` | Notes on plugins you've vetted and when to use them |

## Kits

Each kit is a grab-and-go folder. Copy the whole folder, read the README, integrate.

| Kit | What It Does |
|-----|-------------|
| `infinite-carousel/` | Infinite-loop carousel with arrows, dots, and touch swipe |
| `mobile-nav/` | Responsive hamburger menu toggle |
| `hero-section/` | Full-width hero with overlay, text, and CTA buttons |
| `google-map-embed/` | Google Maps iframe embed with contact info grid |
| `custom-post-type/` | CPT registration + taxonomy + meta box with nonces |

## How to Use

1. **Starting a new client project?** Copy `boilerplate/theme/` into your new repo, then pull in kits as needed
2. **Need a feature?** Grab the kit from `kits/`, read its README, and integrate
3. **Need to set something up?** Check `guides/` for step-by-step instructions
4. **Choosing a plugin?** Check `plugins/recommended.md` for vetted options

## Contributing to the Vault

Every time you learn something or solve a problem on a client project, save the reusable version here:

- Built a new component? Create a kit in `kits/` with all files + a README
- Figured out a setup process? Write it up in `guides/`
- Found a great plugin? Add it to `plugins/recommended.md`

Over time this becomes your agency's competitive advantage — you ship faster because you're not building from zero each time.
