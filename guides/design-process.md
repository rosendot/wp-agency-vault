# AI Design to WordPress Theme Pipeline

This guide covers the full workflow from finding design inspiration to shipping a finished kit or theme into the vault. Follow this process for every new theme or major kit addition.

---

## Overview

```
Reference Site → Screenshots → Figma Make (AI generation) → Review & Fix → Export HTML/CSS → Claude Code → PHP/CSS Theme → Vault
```

The goal at every stage is to produce a **consistent, reusable artifact** that lives in the vault and never needs to be rebuilt from scratch.

---

## Stage 1 — Find a Reference Design

Before touching any AI tool, find a real website that has the aesthetic you want to replicate. This is the single most important input — garbage in, garbage out.

### What to look for
- A local business site in the same industry (restaurant, salon, retail, etc.)
- Clean layout with clear section hierarchy
- Color palette and typography that fits the client's brand direction
- A site with at least a homepage and one interior page

### Where to find references
- Look up competitors in the client's city or niche
- Dribbble, Awwwards, Land-book for inspiration
- Ask the client "find 3 websites you like" — always more useful than describing preferences in words

### What to capture
- **Homepage** — full page scroll screenshot
- **One interior page** — menu, about, services, etc.
- **Contact page** if it exists — forms and maps vary enough to be worth capturing

Do not screenshot every page. Two to three screenshots is enough to extract the full design language.

---

## Stage 2 — Write the Figma Prompt

A vague prompt produces a vague design. The prompt needs to describe:

1. **Business type and name** — what kind of site, placeholder name
2. **Design system** — exact color values you observed, typography style, decorative elements
3. **Every page to build** — listed explicitly with section-by-section descriptions
4. **Shared elements** — header, footer, interior page hero pattern

### Prompt structure template

```
Replicate this [business type] website for a business called [NAME].
Use the attached screenshots as reference.

**Design system:**
- Primary color: [hex or description]
- Secondary color: [hex or description]
- Background: [color]
- Typography: [serif/sans/slab for headlines, sans for body]
- Decorative elements: [wave dividers, border patterns, icons, etc.]

**Build the following pages:**

**Page 1 — [Name]:** [Section by section, top to bottom]
**Page 2 — [Name]:** [Section by section, top to bottom]
[...continue for all pages]

**Reuse on every page:** [Header nav description, footer description]
```

### Section description tips
- Describe layout structure first (full-width, two-column, three-column grid)
- Call out background colors for each section explicitly
- Name interactive elements (carousels, dropdowns, forms, tabs)
- Describe the footer columns and what goes in each
- Mention wave/divider/decorative elements between sections

### What NOT to do
- Do not say "make it look nice" — be specific
- Do not describe emotions — describe layout and color
- Do not skip interior pages — Figma will invent them inconsistently if you do not specify

---

## Stage 3 — Generate in Figma Make

### Setup
- Use Figma free tier for the design file itself (no AI credits needed for viewing/editing)
- Use Figma Make (AI generation) with attached screenshots + the written prompt
- Select the best available model — Claude-based models produce more structured output

### Generation tips
- Attach all screenshots before submitting the prompt
- If it only generates 1–2 pages, follow up with: "Now build [page name] using the exact same header, footer, color system, and typography from the pages you already built."
- Use follow-up prompts for corrections rather than full regeneration — regeneration burns credits and can drift from previous pages
- Ask for specific fixes: "Change the hero CTA button color to match the footer background (#E8A020)" not "fix the button"

### Credit conservation
- Batch all pages into one prompt if possible — one generation costs the same whether you ask for 2 pages or 6
- Use follow-up prompts (cheaper) for tweaks, not full regeneration
- Save the Figma file after every generation — credits do not refund if the browser crashes

---

## Stage 4 — Review the Figma Output

Before touching any code, review the generated design against the screenshots.

### Check these things

**Consistency across pages**
- [ ] Same header on every page
- [ ] Same footer on every page
- [ ] Interior pages use the same hero banner pattern
- [ ] Font choices are consistent
- [ ] Button styles are consistent

**Color accuracy**
- [ ] Primary/secondary colors match the reference
- [ ] Accent colors on links, labels, prices match
- [ ] Section background colors match (cream, teal, dark, golden, etc.)

**Layout structure**
- [ ] Section order matches the reference
- [ ] Column layouts are correct (2-col, 3-col, full-width)
- [ ] Decorative elements present (wave dividers, border patterns)

**Missing elements**
- [ ] All pages requested were generated
- [ ] Forms have correct fields
- [ ] Navigation has correct links

### Fix in Figma Make (not Claude Code)
Fix design-level problems in Figma Make before exporting. Design fixes are cheap prompts. Fixing design problems in PHP/CSS is expensive.

Examples of things to fix in Figma first:
- Wrong color on a section background
- Missing page
- Wrong column layout
- Missing decorative elements
- Inconsistent header

---

## Stage 5 — Export from Figma

Once the design is reviewed and approved:

### Export options (use in this priority order)

1. **HTML + CSS export** via Builder.io Visual Copilot plugin (free) — best for direct PHP translation
2. **Figma MCP via Claude** — connect Figma MCP, give Claude the frame URL, let it read the design directly
3. **Screenshots of each page** — last resort, paste into Claude with translation instructions

### What to export
- One HTML/CSS file per page template
- Note all CSS custom property values (colors, fonts, spacing) — these become your `:root` variables
- Export any SVG decorative elements (wave dividers, border patterns) as separate SVG files

### DESIGN.md (if using Stitch instead)
If you used Stitch to generate the design instead of Figma, download the auto-generated `DESIGN.md` file. This contains the full design system in a format Claude Code can read directly.

---

## Stage 6 — Translate to PHP/CSS with Claude Code

This is where the vault conventions matter. Claude Code needs to know it is writing for this specific project structure.

### What to give Claude Code
1. The exported HTML/CSS (or Figma frame URL via MCP, or DESIGN.md from Stitch)
2. This guide (or the relevant sections)
3. The vault conventions from `CLAUDE.md`
4. The existing `restaurant-classic` theme as a reference for file structure

### Prompt template for Claude Code

```
I have a Figma design for a [business type] WordPress theme.
[Attach HTML/CSS export OR share Figma frame URL via MCP]

Convert this to a custom WordPress theme following these requirements:

**Project structure:**
- Bedrock project structure (web/app/themes/)
- PHP follows WordPress coding standards (tabs, snake_case functions)
- CSS uses custom properties in :root for all colors, fonts, spacing
- No page builders — pure PHP templates

**Vault conventions:**
- Theme folder: themes/[theme-slug]/
- Required files: style.css, functions.php, index.php, front-page.php, page-[slug].php per interior page
- theme.json with name, slug, category, tags, style, layout, kits_used, variables
- preview.html — self-contained static HTML preview (no PHP)
- README.md with setup instructions and placeholder list

**Kit integration:**
- Do NOT duplicate kit code inside the theme
- Reference these existing kits from the vault: [list which kits apply]
- Enqueue kit JS files from assets/js/ in functions.php
- Import kit CSS at the top of style.css with a comment referencing the kit name

**CSS variables to use (extracted from design):**
- --color-primary: [value]
- --color-secondary: [value]
- --color-accent: [value]
- --color-bg: [value]
- --color-footer: [value]
- --font-heading: [value]
- --font-body: [value]
[add all extracted values]

**Pages to build:**
- front-page.php — [describe sections]
- page-menu.php — [describe sections]
- page-about.php — [describe sections]
- page-reviews.php — [describe sections]
- page-contact.php — [describe sections]

Use <!-- PLACEHOLDER: description --> comments everywhere client-specific content goes (business name, address, phone, photos, menu items, etc.).
```

### What Claude Code should produce

For each theme, expect these files:

```
themes/[theme-slug]/
├── style.css              # Theme header + all CSS with :root variables
├── functions.php          # Enqueue scripts/styles, register CPTs if needed
├── index.php              # Fallback template
├── front-page.php         # Homepage
├── page-menu.php          # Menu page (or page-menus.php)
├── page-about.php         # About page
├── page-reviews.php       # Reviews page
├── page-contact.php       # Contact page
├── header.php             # Nav header (utility bar + main nav)
├── footer.php             # Footer (3-column + wave divider)
├── theme.json             # Vault metadata
├── preview.html           # Static self-contained preview
└── README.md              # Setup instructions + placeholder index
```

---

## Stage 7 — Review the PHP/CSS Output

Before adding to the vault, review what Claude Code produced.

### Check these things

**PHP correctness**
- [ ] All template files have `get_header()` and `get_footer()`
- [ ] Functions follow snake_case and WP coding standards
- [ ] No hardcoded client content — everything uses PLACEHOLDER comments
- [ ] CPTs registered correctly if menu items or portfolio items are used
- [ ] Scripts and styles enqueued properly in functions.php

**CSS correctness**
- [ ] All color values use CSS custom properties, not hardcoded hex
- [ ] All font references use CSS custom property, not hardcoded font names
- [ ] No inline styles in PHP templates
- [ ] Kit CSS imported at top with comment reference
- [ ] Responsive breakpoints present for all sections

**Kit integration**
- [ ] Theme references kits via `kits_used` in theme.json
- [ ] No kit CSS or JS duplicated inside theme files
- [ ] Kit enqueue lines present in functions.php

**Preview file**
- [ ] preview.html is self-contained (no PHP, no external dependencies except CDN fonts)
- [ ] All CSS inlined or linked relatively
- [ ] Looks accurate to the Figma design

### Common Claude Code mistakes to fix
- Hardcoded hex colors instead of using `var(--color-primary)` — do a find/replace pass
- Missing `get_header()` / `get_footer()` in a template
- Kit JS enqueued with wrong path
- preview.html referencing PHP functions — replace with static HTML equivalents
- CSS variables defined in a component class instead of `:root`

---

## Stage 8 — Extract Kits from the Theme

After the theme is working, identify any sections that are reusable across future themes and extract them as standalone kits.

### What makes a good kit candidate
- A self-contained section with its own JS behavior (carousel, accordion, tabs, modal)
- A layout pattern used across multiple business types (hero section, contact grid, review cards)
- A utility (lightbox gallery, mobile nav, Google Maps embed)

### Kit extraction process

1. Identify the section in the theme PHP/CSS
2. Create a new folder in `kits/[kit-slug]/`
3. Extract the HTML structure into a `[kit-slug].php` partial
4. Extract the CSS into `[kit-slug].css` — replace theme-specific colors with CSS variables
5. Extract the JS into `[kit-slug].js` if applicable
6. Create `kit.json` with the schema:

```json
{
  "name": "Kit Display Name",
  "slug": "kit-slug",
  "description": "What it does in one sentence.",
  "category": "section | interactive | navigation | data",
  "tags": ["relevant", "keywords"],
  "files": {
    "css": ["kit-slug.css"],
    "php": ["kit-slug.php"],
    "js": ["kit-slug.js"]
  },
  "variables": {
    "variableName": {
      "label": "Human readable label",
      "type": "color | string | number",
      "default": "#value or text"
    }
  },
  "variants": {},
  "dependencies": []
}
```

7. Create `preview.html` — self-contained static preview with inline or linked CSS/JS
8. Create `README.md` with integration instructions and the HTML structure snippet
9. Create a TSX preview component in `app/components/kit-previews/[KitName].tsx`:
   - Use design tokens from `shared.ts` via `var(--token-name)` for all visual values
   - Follow the standard section header pattern (h2 + subtitle + padding)
   - Props should be content/behavior only — no color/font/size props
   - Use `<span>` not `<a>` for decorative buttons/links
10. Register the preview in the `KIT_PREVIEWS` registry in `app/components/KitDetail.tsx`
11. Update the theme's `theme.json` to reference the new kit in `kits_used`
12. Remove the duplicated code from the theme and replace with a reference/include

---

## Stage 9 — Add to the Vault

Final checklist before committing.

### Theme checklist
- [ ] All 8 required files present (style.css, functions.php, index.php, page templates, theme.json, preview.html, README.md)
- [ ] theme.json complete and accurate
- [ ] preview.html renders correctly in the dashboard iframe
- [ ] No hardcoded client-specific content anywhere
- [ ] All PLACEHOLDER comments are descriptive and scannable
- [ ] README.md lists every placeholder and which kit dependencies to pull in
- [ ] kits_used in theme.json is accurate

### Kit checklist
- [ ] All required files present (source files, kit.json, preview.html, README.md)
- [ ] kit.json complete and schema-valid
- [ ] preview.html is self-contained and renders in the dashboard iframe
- [ ] TSX preview component created in `app/components/kit-previews/`
- [ ] TSX preview registered in `KIT_PREVIEWS` in `app/components/KitDetail.tsx`
- [ ] TSX preview uses only `var(--token-name)` design tokens — no hardcoded values
- [ ] PHP partial uses CSS variables, not hardcoded values
- [ ] README.md includes the full HTML structure snippet and integration steps
- [ ] No theme-specific logic inside the kit — it must work in any theme

### Commit message format
```
add: restaurant-vibrant theme (Mexican restaurant, warm/colorful)
add: review-cards kit (3-col grid, star rating, avatar)
add: specials-bar kit (full-width colored section, 3 specials, dividers)
```

---

## Quick Reference — Figma Prompt Sections Cheatsheet

Use this when writing prompts for common section types:

| Section | Description template |
|---|---|
| Utility bar | Top bar, [color] background, hours left, social icons right |
| Main nav | White background, logo left, links centered, [buttons] right |
| Full hero | Full-width photo, dark overlay [side], white headline, [color] CTA button, wave SVG bottom |
| Interior hero | Full-width photo banner, page title centered with subtitle, overlay |
| Two-column text+grid | Left: label + headline + paragraph + CTA. Right: [N]x[N] photo grid with captions |
| Full-width feature bar | [Color] background, [texture], [border pattern] top/bottom, [N] columns with vertical dividers |
| Two-column image+text | Left: full-bleed photo. Right: label + headline + paragraph + outlined CTA |
| Review cards | [N] cards per row, white card thin border, circular avatar, review text, star rating, reviewer name |
| Contact info cards | [N] cards, white with thin border, [color] icon centered top, bold title, details below |
| Contact form | Full-width inputs stacked, dropdown, textarea, checkboxes, [color] submit button |
| Three-column photo grid | Equal columns, photo top, caption title + description below |
| Split section | Left half: food photo. Right half: [color] background, centered headline + CTA |
| Footer | [Color] background, wave divider top, [N] columns: [describe each column] |

---

## File Locations in the Vault

```
guides/design-process.md    — this file
kits/                       — extracted reusable kits
themes/                     — complete client-ready themes
```

When starting a new client project, check themes/ first. If a matching theme exists, copy it and swap placeholders. Only run this full process if no existing theme is close enough to adapt.
