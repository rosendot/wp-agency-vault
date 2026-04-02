---
globs: "app/**/*.{tsx,ts,css}"
---

# Dashboard Code Rules

Next.js + TypeScript + Tailwind conventions for the vault dashboard UI.

## Component Patterns
- All interactive components must have `"use client"` directive at the top
- Server components (like `page.tsx`) handle data fetching — pass data down as props
- Type interfaces for kit/template/palette data live in `app/page.tsx` and are imported from there
- Components go in `app/components/` — one component per file, named export matching filename
- Browser/Detail pattern: `<Entity>Browser` handles list + search + filter, `<Entity>Detail` handles single item view

## Styling
- Use Tailwind utility classes for layout and spacing
- Use CSS custom properties from `globals.css` for theme colors: `var(--background)`, `var(--foreground)`, `var(--card-bg)`, `var(--card-border)`, `var(--accent)`, `var(--accent-hover)`, `var(--gold)`, `var(--muted)`
- Reference CSS variables in Tailwind via bracket syntax: `bg-[var(--card-bg)]`, `text-[var(--muted)]`
- No inline `style` attributes — use Tailwind or CSS variables
- Dark theme only — do not add light theme support

## API Routes
- Kit/template file serving goes through API routes in `app/api/`
- Pattern: `app/api/<entity>-preview/` serves preview.html, `app/api/<entity>-file/` serves static assets
- API routes must validate query params and return appropriate error responses
- File paths must be sanitized — never allow directory traversal (no `..` in paths)

## TypeScript
- Strict types for all kit/template/palette data — use the interfaces from `page.tsx`
- No `any` types — use `Record<string, T>` or proper interfaces
- Props must be typed inline or with a named interface

## Data Flow
- `page.tsx` reads `kit.json` / `template.json` / `palette.json` from disk at build time (server component)
- File contents are read and passed as `fileContents` prop — no client-side file reads
- Search and filtering happen client-side in Browser components

## Adding New Entities
When adding a new browsable entity type (beyond kits, templates, and palettes):
1. Add the TypeScript interface in `page.tsx`
2. Add a data-fetching function in `page.tsx` (reads from the relevant directory)
3. Create `<Entity>Browser.tsx` and `<Entity>Detail.tsx` in `app/components/`
4. Add a tab in `Dashboard.tsx`
5. Add API routes for preview and file serving if the entity has previews
