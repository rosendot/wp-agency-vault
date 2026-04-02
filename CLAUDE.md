# WP Agency Vault

Personal knowledge base, reusable toolkit, and internal dashboard for building WordPress client sites using Bedrock + LocalWP.

## Repo Structure

```
wp-agency-vault/
├── app/                     # Next.js dashboard UI (TypeScript + Tailwind)
│   ├── components/          # Dashboard, TemplateBrowser, SectionBrowser, KitBrowser, PaletteBrowser + Detail views
│   ├── api/
│   │   ├── kit-preview/     # Serves kit preview.html with correct asset paths
│   │   ├── kit-file/        # Serves kit static files (CSS, JS)
│   │   ├── template-preview/# Serves template preview.html
│   │   └── template-file/   # Serves template static files
│   ├── page.tsx             # Reads kit.json, template.json, palette.json at build time
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Dark theme variables
├── kits/                    # Individual components — the building blocks
│   ├── infinite-carousel/   # Carousel with infinite loop, arrows, swipe
│   ├── hero-section/        # Full-width hero with overlay
│   ├── google-map-embed/    # Maps iframe + contact info grid
│   ├── faq-accordion/       # Expandable Q&A with animations
│   ├── mega-menu/           # Full-width hover dropdown navigation
│   ├── menu-list/           # Vertical menu list with dotted leaders
│   ├── menu-grid/           # Responsive menu card grid with filter tabs
│   └── menu-cards/          # Large editorial menu cards with overlays
├── palettes/                # Color systems + typography (mix and match with anything)
│   └── ember-hearth/        # Rich reds, warm golds, serif headings
├── sections/                # Full page-level compositions of kits + palette (e.g., a complete menu page)
├── templates/               # Full page layouts that compose kits + reference a palette
│   └── restaurant-classic/  # Restaurant template with hero, carousel, map, gallery
├── plugins/                 # Structured plugin registry (JSON per plugin)
│   ├── core/                # Install on every client site
│   ├── restaurant/          # Restaurant-specific (Clover, Toast)
│   └── service/             # Service business (appointments)
└── guides/                  # Step-by-step reference docs
```

## Dashboard UI

Run with `npm run dev` → http://localhost:3000

Four tabs: **Templates**, **Sections**, **Kits**, and **Palettes**.

### Templates tab
- Browse templates as cards with live preview thumbnails
- Search by name or tag
- Click a template to see: full-page live preview, code viewer with file tabs, content variables, palette picker
- Switch palettes to see the same layout with different color schemes

### Sections tab
- Browse pre-built page sections by category (menu, hero, faq, gallery, etc.)
- Search by name or tag
- Click a section to see: live preview with palette picker, code viewer, content variables
- Sections focus on layout structure — colors come from the palette

### Kits tab
- Browse kits filtered by category (Sections, Interactive, Navigation, Data)
- Search by name or tag
- Click a kit to see: live preview, code viewer with file tabs, customizable variables, tags, variants, dependencies

### Palettes tab
- Browse palettes as cards with color swatches and font previews
- Search by name or tag
- Click a palette to see: full color swatches, typography preview, CSS custom properties output

## Four-Layer Architecture

### Kits
Self-contained components. Every kit must contain:
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

### Sections
Full page-level compositions that wire multiple kits together into a complete page view. A section is NOT a single component — it's how an entire page tab is laid out.

Example: A "Menu Classic" section composes a hero-section kit at the top, a menu-list kit in the middle, and a CTA at the bottom. A "Menu Modern" section uses the same menu-grid kit but with filter tabs and no hero.

Every section must contain:
- `section.json` — metadata (name, slug, category, layout, default_palette, kits_used, variables)
- `section.php` — WordPress template that composes kits together
- `section.css` — layout-level styles (spacing between kits, page structure)
- `preview.html` — self-contained preview of the full page
- `README.md` — integration instructions

Sections use CSS custom properties for colors so palettes can be swapped. Content variables (titles, subtitles) live in `section.json`. Color variables do NOT — those come from the palette. Individual component styling lives in the kits, not the section.

### Palettes
Color system + typography. Every palette must contain:
- `palette.json` — colors and fonts

`palette.json` schema:
- `name`, `slug`, `description` — identity
- `tags` — searchable keywords (warm, modern, serif, dark, etc.)
- `colors` — 9 required keys: `primary`, `primary_dark`, `secondary`, `dark`, `cream`, `text`, `text_light`, `border`, `white` — each with `label` and `value`
- `fonts` — 2 required keys: `heading`, `body` — each with `label` and `value`

### Templates
Full page layouts that compose kits and reference a palette. Every template must contain:
- PHP templates, CSS, and an `index.php`
- `template.json` — metadata (name, slug, category, layout, default_palette, kits_used, variables)
- `preview.html` — self-contained HTML preview of the full template
- `README.md` — setup instructions

Templates reference kits via `kits_used` and a default palette via `default_palette`. They do NOT duplicate kit code. Color variables live in the palette, not the template — template `variables` contain only content values (business name, phone, hours, etc.).

## Plugin Registry

Plugins are stored as individual JSON files in `plugins/core/`, `plugins/restaurant/`, and `plugins/service/`. Each `plugin.json` has: name, slug, composer name, tier, license, cost, install conditions, tags, and config notes.

Plugins have a `buy_when` field: `day-1` (buy before first client) or `later` (buy when you have enough clients).

## Conventions

- All guides assume **Bedrock** (Roots) project structure with **LocalWP** for local dev
- WordPress core and plugins are managed via **Composer** — never edit them directly
- Only the custom theme is version-controlled in client projects
- `.env` files contain secrets and are never committed
- Each kit is self-contained: all files for one feature in one folder
- Templates reference kits, never duplicate kit code
- Colors and fonts live in palettes, not templates
- PHP follows WordPress coding standards (tabs for indentation, snake_case functions)

## Rules

### Kit integrity
- When creating or modifying a kit, always ensure `kit.json` `files` array matches actual files on disk
- Never create a kit without `kit.json`, `preview.html`, and `README.md`
- Run `/audit-kit <slug>` after any kit changes to validate

### Template-kit-palette boundary
- Templates must reference kits via `kits_used` in `template.json` — never copy kit code into a template folder
- Kit CSS/JS paths in `template.json` `kit_files` must point to real files in `kits/`
- Templates must reference a palette via `default_palette` — never hardcode colors in template variables
- Color variables belong in palettes, content variables belong in templates

### Security
- Never create, stage, or display `.env` files, API keys, or database credentials
- All PHP output must be escaped: `esc_html()`, `esc_attr()`, `esc_url()`, `wp_kses_post()`
- All form handling must use nonces (`wp_nonce_field` / `wp_verify_nonce`)
- All user input must be sanitized before saving (`sanitize_text_field`, etc.)

### Dashboard consistency
- All new kits, sections, templates, and palettes must be browsable in the dashboard
- Every kit needs a valid `kit.json` and working `preview.html`
- Every section needs a valid `section.json`, `section.php`, `section.css`, and working `preview.html`
- Every template needs a valid `template.json` and working `preview.html`
- Every palette needs a valid `palette.json`

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
