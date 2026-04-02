# WP Agency Vault

Personal knowledge base, reusable toolkit, and internal dashboard for building WordPress client sites using Bedrock + LocalWP.

## Repo Structure

```
wp-agency-vault/
├── app/                     # Next.js dashboard UI (TypeScript + Tailwind)
│   ├── components/          # Dashboard, KitBrowser, KitDetail, ThemeBrowser, ThemeDetail
│   ├── api/
│   │   ├── kit-preview/     # Serves kit preview.html with correct asset paths
│   │   ├── kit-file/        # Serves kit static files (CSS, JS)
│   │   ├── theme-preview/   # Serves theme preview.html
│   │   └── theme-file/      # Serves theme static files
│   ├── page.tsx             # Reads kit.json + theme.json at build time
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Dark theme variables
├── kits/                    # Ready-to-ship feature kits (grab and go)
│   ├── infinite-carousel/   # Carousel with infinite loop, arrows, swipe
│   ├── hero-section/        # Full-width hero with overlay
│   └── google-map-embed/    # Maps iframe + contact info grid
├── themes/                  # Complete ready-to-ship themes (placeholder content)
│   └── restaurant-classic/  # Warm traditional restaurant theme
├── plugins/                 # Structured plugin registry (JSON per plugin)
│   ├── core/                # Install on every client site
│   ├── restaurant/          # Restaurant-specific (Clover, Toast)
│   └── service/             # Service business (appointments)
└── guides/                  # Step-by-step reference docs
```

## Dashboard UI

Run with `npm run dev` → http://localhost:3000

Two tabs: **Themes** and **Kits**.

### Themes tab
- Browse themes as cards with live iframe preview thumbnails
- Search by name or tag
- Click a theme to see: full-page live preview, code viewer with file tabs, customizable variables (colors, text, etc.)

### Kits tab
- Browse kits filtered by category (Sections, Interactive, Navigation, Data)
- Search by name or tag
- Click a kit to see: live preview (iframe), code viewer with file tabs, customizable variables, tags, variants, dependencies

## Kit Structure

Every kit must contain:
- Source files (JS, CSS, PHP)
- `README.md` — integration instructions and HTML structure
- `kit.json` — metadata powering the dashboard UI
- `preview.html` — self-contained HTML preview (references kit's own CSS/JS)

`kit.json` schema:
- `name`, `slug`, `description` — identity
- `category` — one of: section, interactive, navigation, data
- `tags` — searchable keywords
- `files` — grouped by language (`js`, `css`, `php`)
- `variables` — customizable values with label, type (string, number, color), and default
- `variants` — alternative configurations with CSS class names
- `dependencies` — other kits this one requires

## Theme Structure

Every theme must contain:
- PHP templates, CSS, and an `index.php`
- `theme.json` — metadata (name, slug, category, tags, style, layout, kits_used, variables)
- `preview.html` — self-contained HTML preview of the full theme
- `README.md` — setup instructions

Themes reference kits via `kits_used` — they do NOT duplicate kit code.

## Plugin Registry

Plugins are stored as individual JSON files in `plugins/core/`, `plugins/restaurant/`, and `plugins/service/`. Each `plugin.json` has: name, slug, composer name, tier, license, cost, install conditions, tags, and config notes.

Plugins have a `buy_when` field: `day-1` (buy before first client) or `later` (buy when you have enough clients).

## Conventions

- All guides assume **Bedrock** (Roots) project structure with **LocalWP** for local dev
- WordPress core and plugins are managed via **Composer** — never edit them directly
- Only the custom theme is version-controlled in client projects
- `.env` files contain secrets and are never committed
- Each kit is self-contained: all files for one feature in one folder
- Themes reference kits, never duplicate kit code
- PHP follows WordPress coding standards (tabs for indentation, snake_case functions)

## Rules

### Kit integrity
- When creating or modifying a kit, always ensure `kit.json` `files` array matches actual files on disk
- Never create a kit without `kit.json`, `preview.html`, and `README.md`
- Run `/audit-kit <slug>` after any kit changes to validate

### Theme-kit boundary
- Themes must reference kits via `kits_used` in `theme.json` — never copy kit code into a theme folder
- Kit CSS/JS paths in `theme.json` `kit_files` must point to real files in `kits/`

### Security
- Never create, stage, or display `.env` files, API keys, or database credentials
- All PHP output must be escaped: `esc_html()`, `esc_attr()`, `esc_url()`, `wp_kses_post()`
- All form handling must use nonces (`wp_nonce_field` / `wp_verify_nonce`)
- All user input must be sanitized before saving (`sanitize_text_field`, etc.)

### Dashboard consistency
- All new kits and themes must be browsable in the dashboard
- Every kit needs a valid `kit.json` and working `preview.html`
- Every theme needs a valid `theme.json` and working `preview.html`

### Git hygiene
- Never commit `vendor/`, `web/wp/`, `node_modules/`, `web/app/plugins/`, or `web/app/uploads/`
- Never force-push or hard-reset without explicit confirmation
- Stage files by name — never use `git add -A` or `git add .`

## Stack

- **Next.js + TypeScript + Tailwind** — Dashboard UI
- **PHP** — WordPress language
- **Composer** — PHP dependency management
- **Bedrock** — Modern WordPress boilerplate (Roots)
- **LocalWP** — Local development server
- **Git** — Version control (theme + config only)
