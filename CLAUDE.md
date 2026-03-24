# WP Agency Vault

Personal knowledge base, reusable toolkit, and internal kit browser for building WordPress client sites using Bedrock + LocalWP.

## Repo Structure

```
wp-agency-vault/
├── dashboard/               # Next.js kit browser UI (TypeScript + Tailwind)
│   ├── app/
│   │   ├── components/      # KitBrowser, KitDetail
│   │   ├── page.tsx         # Reads kit.json files from ../kits/
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Dark theme variables
│   └── package.json
├── kits/                    # Ready-to-ship feature kits (grab and go)
│   ├── infinite-carousel/   # Carousel with infinite loop, arrows, swipe
│   ├── mobile-nav/          # Responsive hamburger menu
│   ├── hero-section/        # Full-width hero with overlay
│   ├── google-map-embed/    # Maps iframe + contact info grid
│   └── custom-post-type/    # CPT + taxonomy + meta box
├── themes/                  # Complete ready-to-ship themes (placeholder content)
│   └── restaurant-classic/   # Warm traditional restaurant theme
├── guides/                  # Step-by-step reference docs
└── plugins/                 # Notes on vetted plugins
    └── recommended.md
```

## Kit Browser UI

Run with `cd dashboard && npm run dev` → http://localhost:3000

The UI reads `kit.json` from each kit folder at build time. It displays kits as filterable cards with category sidebar, search, code viewer with file tabs, and editable variable inputs.

## Kit Structure

Every kit must contain:
- Source files (JS, CSS, PHP)
- `README.md` — integration instructions and HTML structure
- `kit.json` — metadata powering the kit browser UI

`kit.json` schema:
- `name`, `slug`, `description` — identity
- `category` — one of: section, interactive, navigation, data
- `tags` — searchable keywords
- `files` — grouped by language (`js`, `css`, `php`)
- `variables` — customizable values with label, type (string, number, color), and default
- `variants` — alternative configurations with CSS class names
- `dependencies` — other kits this one requires

## Conventions

- All guides assume **Bedrock** (Roots) project structure with **LocalWP** for local dev
- WordPress core and plugins are managed via **Composer** — never edit them directly
- Only the custom theme is version-controlled in client projects
- `.env` files contain secrets and are never committed
- Each kit is self-contained: all files for one feature in one folder with a README and kit.json
- Kit READMEs explain integration, HTML structure, and customization options
- PHP follows WordPress coding standards (tabs for indentation, snake_case functions)

## Stack

- **Next.js + TypeScript + Tailwind** — Kit browser UI
- **PHP** — WordPress language
- **Composer** — PHP dependency management
- **Bedrock** — Modern WordPress boilerplate (Roots)
- **LocalWP** — Local development server
- **Git** — Version control (theme + config only)
