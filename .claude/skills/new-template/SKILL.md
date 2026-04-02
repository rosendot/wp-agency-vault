# Create New Template

Scaffolds a complete template folder with all required files matching the vault's template structure. Validates referenced kits and runs the template-reviewer agent on the result.

## Usage
`/new-template <template-name>`

## Steps

### Phase 1: Gather requirements
1. Create directory `templates/$ARGUMENTS/`
2. Ask the user for:
   - Description (one sentence)
   - Category (e.g., restaurant, salon, service, retail)
   - Style (e.g., warm, modern, minimal, bold)
   - Layout (e.g., hero-first, grid-first)
   - Pages to include (e.g., home, menu, about, contact, services)
   - Which kits to use from `kits/` (browse available kits if needed)
   - Which palette to use (list available palettes from `palettes/` directory)
   - Variables (business name, contact info, etc.)

### Phase 2: Validate kits before building
3. For each kit the user wants to use:
   - Verify the kit exists in `kits/`
   - Run `/audit-kit <kit-slug>` on each referenced kit
   - If any kit has errors, warn the user before proceeding — the template will inherit those problems
   - Verify the specific CSS/JS files that will go into `kit_files` actually exist

### Phase 3: Scaffold the template
4. Create the following files:

#### template.json
```json
{
  "name": "<Template Name>",
  "slug": "$ARGUMENTS",
  "description": "<description>",
  "category": "<category>",
  "tags": [],
  "style": "<style>",
  "layout": "<layout>",
  "version": "1.0.0",
  "preview": "screenshot.png",
  "default_palette": "<palette-slug>",
  "pages": [],
  "kits_used": [],
  "plugins_required": {},
  "files": {
    "php": [],
    "css": ["style.css"],
    "js": []
  },
  "kit_files": {
    "css": [],
    "js": []
  },
  "variables": {}
}
```

Note: Color variables are NOT stored in `template.json` — colors come from palettes. The `default_palette` field references a palette slug from `palettes/`.

#### Required PHP files
- `index.php` — fallback template
- `header.php` — site header with nav
- `footer.php` — site footer
- `functions.php` — enqueue styles/scripts, register menus, template support
- `front-page.php` — homepage template
- One `page-<name>.php` for each additional page

#### style.css
Main template stylesheet using CSS custom properties for all variable values (fonts, spacing). Color custom properties come from the referenced palette.

#### preview.html
Self-contained HTML preview of the full template. Must:
- Show the complete homepage layout with placeholder content
- Reference template CSS and kit CSS/JS via API routes
- Be viewable standalone in a browser

#### README.md
Setup instructions including:
- Template overview and what it's designed for
- Which kits are used and why
- Which palette is used by default
- How to customize variables
- WordPress setup steps (menus, pages, widgets)

### Phase 4: Validate the template
5. Verify:
   - `template.json` `files` array matches actual files on disk
   - `template.json` `kits_used` only references kits that exist in `kits/`
   - `template.json` `kit_files` paths point to real kit files
   - `template.json` `default_palette` references a palette that exists in `palettes/`
   - `preview.html` exists and renders correctly
   - All PHP templates use `get_header()` and `get_footer()`

6. Run the **template-reviewer agent** on the new template to check code quality and security. Fix any Critical issues it finds before telling the user the template is ready.

### Phase 5: Recommend next steps
7. Tell the user:
   > Template scaffolded and reviewed. When you're ready to customize it for a client, run:
   > - **Template Preflight agent** → `/client-preflight` to replace placeholder content
   > - **SEO Analyzer agent** → `/seo-improve` for SEO fixes
   > - **Accessibility Analyzer agent** → `/a11y-improve` for a11y fixes
   > - **Performance Analyzer agent** → `/perf-improve` for performance fixes

## Rules
- Templates reference kits via `kits_used` — NEVER duplicate kit code into the template folder
- Colors come from palettes — NEVER put color variables in `template.json`. The `default_palette` field must reference a valid palette in `palettes/`.
- All other customizable values must be in `template.json` `variables` with label, type, and default
- PHP follows WordPress coding standards (tabs, snake_case)
- All output must be escaped (esc_html, esc_attr, esc_url)
- Do NOT consider the template complete until the template-reviewer agent finds no Critical issues
- If a referenced kit fails `/audit-kit`, warn the user and let them decide whether to proceed
