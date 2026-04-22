---
globs: "app/**/*.{tsx,ts,css}"
---

# Dashboard Code Rules

Next.js + TypeScript + Tailwind conventions for the vault dashboard UI.

## Routing Architecture
- The dashboard uses **Next.js App Router file-based routing** — each tab is its own route
- Route structure: `app/<entity>/page.tsx` for list views, `app/<entity>/[slug]/page.tsx` for detail views
- Root `/` redirects to `/websites`
- The shared `NavHeader` component lives in `layout.tsx` and persists across all routes
- Tab highlighting uses `usePathname()` to detect the active route
- Navigation between pages uses Next.js `<Link>` — never `onClick` + `setState` for page transitions

## Component Patterns
- All interactive components must have `"use client"` directive at the top
- Route `page.tsx` files are server components that fetch data and pass it as props
- Type interfaces and data-fetching functions live in `app/lib/data.ts`
- Components go in `app/components/` — one component per file, named export matching filename
- Browser/Detail pattern: `<Entity>Browser` handles list + search + filter, `<Entity>Detail` handles single item view
- Browser components receive data as props from route pages — no internal data fetching
- Detail components receive a single entity as props from `[slug]/page.tsx` route pages
- Back navigation in Detail components uses `<Link href="/<entity>">` — not `onBack` callbacks

## Styling
- Use Tailwind utility classes for layout and spacing
- Use CSS custom properties from `globals.css` for theme colors: `var(--background)`, `var(--foreground)`, `var(--card-bg)`, `var(--card-border)`, `var(--accent)`, `var(--accent-hover)`, `var(--gold)`, `var(--muted)`
- Reference CSS variables in Tailwind via bracket syntax: `bg-[var(--card-bg)]`, `text-[var(--muted)]`
- No inline `style` attributes — use Tailwind or CSS variables
- Dark theme only — do not add light theme support

## API Routes
- Kit file serving goes through API routes in `app/api/`
- Pattern: `app/api/<entity>-preview/` serves preview.html, `app/api/<entity>-file/` serves static assets
- API routes must validate query params and return appropriate error responses
- File paths must be sanitized — never allow directory traversal (no `..` in paths)

## TypeScript
- Strict types for all kit/palette/website data — use the interfaces from `app/lib/data.ts`
- No `any` types — use `Record<string, T>` or proper interfaces
- Props must be typed inline or with a named interface

## Data Flow
- `app/lib/data.ts` contains all data-fetching functions and TypeScript interfaces
- Each route `page.tsx` calls only the fetchers it needs (e.g., `/kits/page.tsx` calls `getKits()` only)
- Detail route pages (`[slug]/page.tsx`) use single-entity fetchers (e.g., `getKit(slug)`) and call `notFound()` if the entity doesn't exist
- `layout.tsx` calls `getCounts()` for tab badge numbers — this is a lightweight count-only function
- File contents are read server-side and passed as `fileContents` prop — no client-side file reads
- Search and filtering happen client-side in Browser components

## Guides (markdown rendering)
- Guide source files are raw markdown in `guides/` — one `.md` per guide; slug = filename without `.md`
- `getGuides()` / `getGuide(slug)` in `app/lib/data.ts` read files directly; `getGuide` rejects slugs containing `/`, `\`, or `..` to block directory traversal
- Markdown → HTML conversion lives in `app/lib/markdown.ts` (no external dep). All input is escaped before formatting, so the output is safe to set via `dangerouslySetInnerHTML`
- If a guide uses a feature the renderer doesn't support, extend `markdown.ts` — do not add a markdown library without discussing first
- `GuideDetail` is a **server component** (no `"use client"`) — it renders HTML at request time
- Prose styling lives in `.guide-prose` in `globals.css` — scope any new prose rules to that class

## Kit Preview Components
- Kit previews live in `app/components/kit-previews/` — one TSX file per kit
- Design tokens defined in `app/components/kit-previews/shared.ts` — single source of truth for all visual values
- `KitDetail.tsx` sets tokens as CSS custom properties on the preview wrapper via `designTokens` import
- Kit components use `var(--token-name)` for ALL visual values — no hardcoded colors, fonts, sizes, spacing, or radii
- Kit component props are content/behavior only — no palette/style props
- Every kit must follow the standard header pattern: same h2 style, same subtitle style, same padding
- Register new kit previews in the `KIT_PREVIEWS` registry in `KitDetail.tsx`
- Preview components must use `<span>` not `<a>` for decorative buttons/links to avoid nested `<a>` hydration errors (cards are wrapped in `<Link>`)

## Adding New Entities
When adding a new browsable entity type:
1. Add the TypeScript interface and data-fetching functions in `app/lib/data.ts`
2. Create `app/<entity>/page.tsx` (server component that fetches list data)
3. Create `app/<entity>/[slug]/page.tsx` (server component that fetches single entity, calls `notFound()` if missing)
4. Create `<Entity>Browser.tsx` and `<Entity>Detail.tsx` in `app/components/`
5. Add the tab to `NavHeader.tsx` (TABS array) and add its count key to `getCounts()` in `data.ts`
6. Add API routes for preview and file serving if the entity has previews

## Adding New Route Pages
When adding a new route page for an existing entity:
1. Create the `page.tsx` as a server component (async function, no `"use client"`)
2. Import fetchers from `../../lib/data` (or `../lib/data` for top-level routes)
3. Pass fetched data as props to the existing Browser or Detail component
4. For `[slug]` pages: destructure `params`, call the single-entity fetcher, call `notFound()` on null
