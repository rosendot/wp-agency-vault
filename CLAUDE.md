# WP Agency Vault

Personal knowledge base, reusable toolkit, and internal dashboard for building WordPress client sites using Bedrock + LocalWP.

## Repo Structure

```
wp-agency-vault/
├── app/                     # Next.js dashboard UI (TypeScript + Tailwind)
│   ├── components/          # NavHeader, Browser, Detail, and kit-preview components
│   │   ├── NavHeader.tsx    # Shared header with tab navigation (uses usePathname)
│   │   ├── kit-previews/    # TSX preview components for each kit
│   │   └── template-previews/ # TSX preview components for each template
│   ├── lib/
│   │   └── data.ts          # Shared types + data-fetching functions
│   ├── templates/
│   │   ├── page.tsx         # Templates list page
│   │   └── [slug]/page.tsx  # Template detail page
│   ├── sections/
│   │   ├── page.tsx         # Sections list page
│   │   └── [slug]/page.tsx  # Section detail page
│   ├── kits/
│   │   ├── page.tsx         # Kits list page
│   │   └── [slug]/page.tsx  # Kit detail page
│   ├── palettes/
│   │   ├── page.tsx         # Palettes list page
│   │   └── [slug]/page.tsx  # Palette detail page
│   ├── fonts/
│   │   └── page.tsx         # Fonts list page
│   ├── api/
│   │   ├── kit-preview/     # Serves kit preview.html with correct asset paths
│   │   ├── kit-file/        # Serves kit static files (CSS, JS)
│   │   ├── template-preview/# Serves template preview.html
│   │   └── template-file/   # Serves template static files
│   ├── page.tsx             # Root redirect to /templates
│   ├── layout.tsx           # Root layout with NavHeader + data counts
│   └── globals.css          # Dark theme variables
├── kits/                    # Individual components — the building blocks
│   ├── infinite-carousel/   # Carousel with infinite loop, arrows, swipe
│   ├── hero-section/        # Full-width hero with overlay
│   ├── hero-split/          # 50/50 split hero (text + image, left/right variants)
│   ├── hero-video/          # Looping video background hero
│   ├── hero-slideshow/      # Auto-rotating background images with crossfade
│   ├── google-map-embed/    # Maps iframe + contact info grid
│   ├── faq-accordion/       # Expandable Q&A with animations
│   ├── faq-two-column/      # Two-column FAQ (questions left, answer right)
│   ├── faq-cards/           # Q&A card grid
│   ├── faq-tabbed/          # Tabbed FAQ with category tabs + accordion
│   ├── mega-menu/           # Full-width hover dropdown navigation
│   ├── menu-list/           # Vertical menu list with dotted leaders
│   ├── menu-grid/           # Responsive menu card grid with filter tabs
│   ├── menu-cards/          # Large editorial menu cards with overlays
│   ├── grid-gallery/        # Configurable photo grid with hover overlay
│   ├── masonry-gallery/     # Pinterest-style varying-height columns
│   ├── lightbox-gallery/    # Thumbnail grid with full-screen modal viewer
│   ├── before-after-slider/ # Draggable divider comparing two images
│   └── image-comparison/    # Side-by-side image pairs with labels
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

### Routing
The dashboard uses **Next.js App Router file-based routing**. Each tab is its own route, and each detail view has a dedicated URL with a dynamic `[slug]` segment. Refreshing the page stays on the current view. Browser back/forward works natively.

| Route | Page |
|-------|------|
| `/templates` | Template list |
| `/templates/[slug]` | Template detail (preview, code, variables, palette picker) |
| `/sections` | Section list |
| `/sections/[slug]` | Section detail (preview, code, variables, palette picker) |
| `/kits` | Kit list |
| `/kits/[slug]` | Kit detail (preview, code, variables) |
| `/palettes` | Palette list |
| `/palettes/[slug]` | Palette detail (swatches, typography, CSS output) |
| `/fonts` | Font browser |
| `/` | Redirects to `/templates` |

### Navigation
- The shared `NavHeader` component lives in `layout.tsx` and persists across all routes
- Tab highlighting uses `usePathname()` to match the current route
- Tab counts are fetched server-side via `getCounts()` in the layout
- Browser components use `<Link>` for card navigation (not `onClick` + `setState`)
- Detail components use `<Link>` for back navigation (not `onBack` callbacks)

### Templates tab (`/templates`)
- Browse templates as cards with live preview thumbnails
- Search by name or tag
- Click a template to navigate to `/templates/[slug]`: full-page live preview, code viewer with file tabs, content variables, palette picker
- Switch palettes to see the same layout with different color schemes

### Sections tab (`/sections`)
- Browse pre-built page sections by category (menu, hero, faq, gallery, etc.)
- Search by name or tag
- Click a section to navigate to `/sections/[slug]`: live preview with palette picker, code viewer, content variables
- Sections focus on layout structure — colors come from the palette

### Kits tab (`/kits`)
- Browse kits filtered by category (Sections, Interactive, Navigation, Data)
- Search by name or tag
- Click a kit to navigate to `/kits/[slug]`: live preview, code viewer with file tabs, customizable variables, tags, variants, dependencies

### Palettes tab (`/palettes`)
- Browse palettes as cards with color swatches and font previews
- Search by name or tag
- Click a palette to navigate to `/palettes/[slug]`: full color swatches, typography preview, CSS custom properties output

### Fonts tab (`/fonts`)
- Browse fonts filtered by type (serif, sans-serif, slab-serif, display)
- Search by name, vibe, or pairing
- Adjustable preview size slider
- Shows font pairings and which palettes use each font

## Four-Layer Architecture

### Kits
Self-contained components. Every kit must contain:
- Source files (JS, CSS, PHP)
- `README.md` — integration instructions and HTML structure
- `kit.json` — metadata powering the dashboard UI
- `preview.html` — self-contained HTML preview (references kit's own CSS/JS)

Every kit also needs a **TSX preview component** in `app/components/kit-previews/`:
- React component that renders the kit for the dashboard
- Must be registered in the `KIT_PREVIEWS` registry in `KitDetail.tsx`
- Uses `var(--token)` CSS custom properties from `shared.ts` for ALL visual values (colors, fonts, sizes, spacing, radii, shadows)
- Must follow the standard section header pattern: same h2 + subtitle styling, same padding
- Kit-specific props only (content/behavior) — no color/font/size props

`kit.json` schema:
- `name`, `slug`, `description` — identity
- `category` — one of: section, interactive, navigation, data
- `tags` — searchable keywords
- `files` — grouped by language (`js`, `css`, `php`)
- `variables` — customizable values with label, type (string, number), and default
- `variants` — alternative configurations with CSS class names
- `dependencies` — other kits this one requires

### Design Token System
All kit preview components share a design token system defined in `app/components/kit-previews/shared.ts`. KitDetail.tsx sets these as CSS custom properties on the preview wrapper. Tokens cover:
- **Colors**: `--color-primary`, `--color-dark`, `--color-cream`, `--color-text`, `--color-text-light`, `--color-border`, `--color-white`, etc.
- **Fonts**: `--font-heading`, `--font-body`
- **Font sizes**: `--text-xs` through `--text-5xl`
- **Spacing**: `--space-1` through `--space-16`
- **Radii**: `--radius-sm` through `--radius-full`
- **Shadows**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- **Max widths**: `--max-w-sm` through `--max-w-2xl`
- **Line heights**: `--leading-tight` through `--leading-loose`
- **Letter spacing**: `--tracking-tight`, `--tracking-normal`, `--tracking-wide`

Kit components must use `var(--token-name)` for every visual value. No hardcoded rem, px, hex, or font strings.

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

### Documentation freshness
After any structural changes, update ALL affected documentation before committing. Structural changes include:
- Adding, removing, or renaming kits, sections, templates, palettes, or fonts
- Changing the routing structure or adding/removing dashboard tabs
- Modifying the data flow (types, fetchers, imports)
- Changing how kits are built or registered (new conventions, new required files)

Documentation files to check and update:
- `README.md` — kit table, palette count, tab descriptions, "Adding to the Vault" instructions
- `CLAUDE.md` — repo structure tree, dashboard routing table, kit inventory, architecture rules
- `.claude/rules/dashboard-code.md` — component patterns, data flow, routing, adding new entities
- `.claude/rules/css-styling.md` — CSS conventions (BEM, responsive breakpoints, custom properties)
- `.claude/rules/wordpress-theme.md` — PHP escaping, enqueuing, security patterns
- `.claude/skills/audit-kit/SKILL.md` — kit validation checklist (TSX preview, file matching)
- `.claude/skills/new-kit/SKILL.md` — kit scaffolding steps and required files
- `guides/design-process.md` — kit extraction steps, kit checklist
- `guides/full-agency-flow.md` — infrastructure layers and vault references
- `plugins/README.md` — plugin registry structure and schema

Do NOT wait to be asked — update docs as part of the same body of work. If creating new kits, add them to the README kit table and CLAUDE.md structure tree in the same commit.

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
