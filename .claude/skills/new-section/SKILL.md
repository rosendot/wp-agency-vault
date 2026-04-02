# Create New Section

Scaffolds a section folder — a full page-level composition that wires multiple kits together into a complete page view.

A section is NOT a single component (that's a kit). A section is how an entire page tab is laid out. Example: a "Menu Classic" section composes hero-section + menu-list + a CTA into one complete menu page.

## Usage
`/new-section <section-name>`

## Steps

1. Create directory `sections/$ARGUMENTS/`
2. Ask the user for:
   - Description (what this page view does and how it's laid out)
   - Category (menu, about, contact, gallery, services, etc.)
   - Layout style (classic, modern, editorial, split, etc.)
   - Which kits to compose together (browse available from `kits/`)
   - Content variables (NOT colors — those come from palettes)
   - Default palette (browse available from `palettes/`)
3. Create the following files:

### section.json
```json
{
  "name": "<Section Name>",
  "slug": "$ARGUMENTS",
  "description": "<description>",
  "category": "<category>",
  "tags": [],
  "layout": "<layout>",
  "default_palette": "<palette-slug>",
  "kits_used": ["<kit-slug>", "<kit-slug>"],
  "files": {
    "php": ["section.php"],
    "css": ["section.css"]
  },
  "variables": {}
}
```
- `kits_used` should list every kit this section composes together
- Variables should be content/layout only (titles, subtitles). Never put color variables here.

### section.php
WordPress template that composes kits together:
- Includes kit partials via `get_template_part()`
- Defines the page-level layout (what order kits appear, spacing between them)
- Proper escaping (esc_html, esc_attr, esc_url)
- WordPress coding standards (tabs, snake_case)

### section.css
Page-level layout styles only:
- Spacing between kit sections
- Page structure and flow
- Use CSS custom properties for colors/fonts — palettes provide them
- Individual kit styling stays in the kit's own CSS
- Responsive breakpoints at 768px and 480px

### preview.html
Self-contained HTML preview showing the full composed page:
- Inline `:root` CSS setting palette defaults
- Link to section.css AND all kit CSS files used
- Shows all kits composed together as they'd appear on the real page

### README.md
Integration guide: what kits are composed, what order, how to enqueue, variables.

## Rules
- A section MUST compose multiple kits — if it's just one component, it should be a kit instead
- Colors and fonts MUST come from CSS custom properties — never hardcode them
- Content variables only in section.json — no color variables
- Individual kit styling stays in kit CSS files — section.css handles layout/spacing between kits
- Every section must reference a default_palette and list its kits_used
