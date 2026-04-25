# Atlas Studio Vault (`atlas-studio-internal`)

Atlas Studio's internal knowledge base, reusable toolkit, and dashboard for building WordPress client sites using Bedrock + LocalWP.

Tagline: **You run the business. We hold up your site.**

## What this vault supports

Atlas Studio sells a custom website for local businesses where **the client controls the day-to-day content and we handle everything else.** One flat **$399/mo**, no setup fee.

- **We handle:** custom design, hosting, security, backups, performance, plugin updates, integrations.
- **The client handles:** menu items, prices, hours, photos, retail categories — through the WordPress admin we set up for them, on any device, anytime.

This vault exists to make that delivery model fast and consistent: kits are the design vocabulary, palettes are the color systems, plugins are the vetted toolkit, websites are the deliverables, and guides are the operational playbooks (onboarding, billing, offboarding, audits). The vault is internal — no client ever sees it — so all positioning rules below apply only to *outputs* that ship to clients (themes, copy, kits used in mocks, demo data).

For the canonical positioning, audience, hook, tone rules, and banned words, see [`../atlas-studio-frontend/CLAUDE.md`](../atlas-studio-frontend/CLAUDE.md). Anything that ends up in front of a client (kit demo copy used in a mock, contract language, billing emails, onboarding docs the client reads) must match that voice. POS integration is a feature delivered when it makes sense, never a hook.

**Pricing:** $399/mo retainer. If you see references to $149 anywhere in this repo, they are stale and should be updated.

## Repo Structure

```
atlas-studio-internal/
├── app/                     # Next.js dashboard UI (TypeScript + Tailwind)
│   ├── components/          # NavHeader, Browser, Detail, and kit-preview components
│   │   ├── NavHeader.tsx    # Shared header with tab navigation (uses usePathname)
│   │   └── kit-previews/    # TSX preview components for each kit
│   ├── lib/
│   │   └── data.ts          # Shared types + data-fetching functions
│   ├── websites/
│   │   ├── page.tsx         # Websites list page
│   │   └── [slug]/page.tsx  # Website detail page
│   ├── kits/
│   │   ├── page.tsx         # Kits list page
│   │   └── [slug]/page.tsx  # Kit detail page
│   ├── palettes/
│   │   ├── page.tsx         # Palettes list page
│   │   └── [slug]/page.tsx  # Palette detail page
│   ├── fonts/
│   │   └── page.tsx         # Fonts list page
│   ├── guides/
│   │   ├── page.tsx         # Guides list page
│   │   └── [slug]/page.tsx  # Guide detail page (renders guides/*.md)
│   ├── api/
│   │   ├── kit-preview/     # Serves kit preview.html with correct asset paths
│   │   └── kit-file/        # Serves kit static files (CSS, JS)
│   ├── page.tsx             # Root redirect to /websites
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
│   ├── image-comparison/    # Side-by-side image pairs with labels
│   ├── footer-classic/      # Multi-column footer (logo, links, contact, hours)
│   ├── footer-minimal/      # Single-line footer (logo, copyright, social)
│   ├── footer-mega/         # Large footer (about, services, newsletter, contact)
│   ├── footer-cta/          # CTA banner + standard footer columns
│   ├── header-classic/      # Logo + nav + CTA + mobile hamburger, sticky
│   ├── header-transparent/  # Transparent overlay header, solid on scroll
│   ├── mobile-nav-drawer/   # Off-canvas slide-in mobile nav with backdrop
│   ├── testimonial-cards/   # Grid of quote cards with photos + star ratings
│   ├── testimonial-slider/  # Single-testimonial carousel with crossfade
│   ├── logo-wall/           # Client logo grid, grayscale → color on hover
│   ├── stats-counter/       # Animated number counters on scroll
│   ├── breadcrumbs/         # Hierarchical nav trail with schema.org markup
│   ├── feature-grid/        # Icon + title + blurb cards (three-pillar value-prop grid)
│   ├── feature-alternating/ # Alternating text + visual rows (zig-zag feature deep-dive)
│   ├── cta-banner/          # Final-call conversion banner with 1–2 buttons
│   ├── service-cards/       # Service offering cards with price + learn-more link
│   └── process-steps/       # Numbered "How it works" steps (3–5 stages)
├── palettes/                # Color systems + typography (mix and match with anything)
│   └── ember-hearth/        # Rich reds, warm golds, serif headings
├── websites/                # Mocks, in-progress builds, and live client sites (one folder per site)
│   ├── example-restaurant/  # Mock restaurant landing (placeholder until a real client)
│   └── example-service-business/ # Mock service-business landing (placeholder)
├── plugins/                 # Structured plugin registry (JSON per plugin)
│   ├── core/                # Install on every client site
│   ├── restaurant/          # Restaurant-specific (Clover, Toast)
│   ├── service/             # Service business (appointments)
│   └── tools/               # External tools (UptimeRobot, Stripe, Shutterstock)
└── guides/                  # Step-by-step reference docs
```

## Dashboard UI

Run with `npm run dev` → http://localhost:3000

### Routing
The dashboard uses **Next.js App Router file-based routing**. Each tab is its own route, and each detail view has a dedicated URL with a dynamic `[slug]` segment. Refreshing the page stays on the current view. Browser back/forward works natively.

| Route | Page |
|-------|------|
| `/websites` | Websites list (mocks, in-progress, live) |
| `/websites/[slug]` | Website detail (status, category, client, URL, local preview path) |
| `/kits` | Kit list |
| `/kits/[slug]` | Kit detail (preview, code, variables) |
| `/palettes` | Palette list |
| `/palettes/[slug]` | Palette detail (swatches, typography, CSS output) |
| `/fonts` | Font browser |
| `/guides` | Guides list |
| `/guides/[slug]` | Guide detail (rendered markdown) |
| `/` | Redirects to `/websites` |

### Navigation
- The shared `NavHeader` component lives in `layout.tsx` and persists across all routes
- Tab highlighting uses `usePathname()` to match the current route
- Tab counts are fetched server-side via `getCounts()` in the layout
- Browser components use `<Link>` for card navigation (not `onClick` + `setState`)
- Detail components use `<Link>` for back navigation (not `onBack` callbacks)

### Websites tab (`/websites`)
- Browse every site Atlas Studio has built or mocked up, as cards with status badge
- Filter by status in the sidebar: `mock`, `in-progress`, `live`, `archived`
- Search by name, description, category, or client
- Click a website to navigate to `/websites/[slug]`: status, category, client, launch date, live URL, and path to any local `preview.html` mock
- A website entry is intentionally lightweight — just `website.json` — so each site can be whatever it needs to be (a handwritten HTML mock, a full Bedrock theme, or just metadata pointing at a live URL)

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

### Guides tab (`/guides`)
- Browse every markdown file in `guides/` as a card (title + first-paragraph description)
- Search by title, description, or slug
- Click a guide to navigate to `/guides/[slug]`: full markdown rendered with prose styling (headings, lists, code blocks, tables, blockquotes, links)
- Markdown is rendered server-side via `app/lib/markdown.ts` — no external deps

## Architecture

The vault has two kinds of content: **reference material** (kits, palettes, fonts, guides) that supports design work, and **actual work** (websites) that ships. The reference material is strictly standardized and composable. Websites are intentionally loose — each one is whatever it needs to be.

### Kits (reference)
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

### Palettes (reference)
Color system + typography. Every palette must contain:
- `palette.json` — colors and fonts

`palette.json` schema:
- `name`, `slug`, `description` — identity
- `tags` — searchable keywords (warm, modern, serif, dark, etc.)
- `colors` — 9 required keys: `primary`, `primary_dark`, `secondary`, `dark`, `cream`, `text`, `text_light`, `border`, `white` — each with `label` and `value`
- `fonts` — 2 required keys: `heading`, `body` — each with `label` and `value`

### Websites (work)
One folder per site Atlas Studio has touched. Mocks, in-progress builds, and live client sites all live here. The only required file is `website.json`; anything else in the folder is whatever the site needs (a full Bedrock theme, a handwritten HTML mock, etc.).

`website.json` schema (kept deliberately small):
- `name`, `slug` — identity
- `status` — one of: `mock`, `in-progress`, `live`, `archived`
- `category` — free-form (restaurant, service-business, saas, portfolio, etc.)
- `description` — one-line summary
- `url` — live site URL once deployed, otherwise `null`
- `preview` — path to a local mock HTML file (relative to the website folder) or `null`
- `client` — client name once a real client is attached, otherwise `null`
- `launched` — ISO date string (`YYYY-MM-DD`) when the site went live, otherwise `null`

Websites deliberately do NOT follow a rigid composition model. They reference kits informally if they want to; they can also diverge and do whatever a real page needs. Kits are the design vocabulary; websites are the deliverables.

## Plugin Registry

Plugins are stored as individual JSON files in `plugins/core/`, `plugins/restaurant/`, `plugins/service/`, and `plugins/tools/`. Each `plugin.json` has: name, slug, composer name, tier, license, cost, install conditions, tags, and config notes. Entries in `plugins/tools/` represent external services (not WordPress plugins) — their `composer` field is `null` and `install_on` is `["external-tool"]`.

Plugins have a `buy_when` field: `day-1` (buy before first client) or `later` (buy when you have enough clients).

## Conventions

- All guides assume **Bedrock** (Roots) project structure with **LocalWP** for local dev
- WordPress core and plugins are managed via **Composer** — never edit them directly
- Only the custom theme is version-controlled in client projects
- `.env` files contain secrets and are never committed
- Each kit is self-contained: all files for one feature in one folder
- Websites are loose by design — each `websites/<slug>/` folder can be whatever the site needs
- PHP follows WordPress coding standards (tabs for indentation, snake_case functions)

## Rules

### Kit integrity
- When creating or modifying a kit, always ensure `kit.json` `files` array matches actual files on disk
- Never create a kit without `kit.json`, `preview.html`, and `README.md`
- Run `/audit-kit <slug>` after any kit changes to validate

### Websites
- Every entry under `websites/<slug>/` must have a valid `website.json`
- `status` must be one of `mock`, `in-progress`, `live`, `archived`
- Real client sites may contain sensitive data (URLs, unreleased copy, client names) — keep the repo private
- No forced schema beyond `website.json`: feel free to include whatever a site needs (HTML mocks, Bedrock theme code, screenshots, notes)

### Security
- Never create, stage, or display `.env` files, API keys, or database credentials
- All PHP output must be escaped: `esc_html()`, `esc_attr()`, `esc_url()`, `wp_kses_post()`
- All form handling must use nonces (`wp_nonce_field` / `wp_verify_nonce`)
- All user input must be sanitized before saving (`sanitize_text_field`, etc.)

### Dashboard consistency
- All new kits, palettes, websites, fonts, and guides must be browsable in the dashboard
- Every kit needs a valid `kit.json` and working `preview.html`
- Every palette needs a valid `palette.json`
- Every website needs a valid `website.json`

### Documentation freshness
After any structural changes, update ALL affected documentation before committing. Structural changes include:
- Adding, removing, or renaming kits, palettes, fonts, websites, or guides
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
