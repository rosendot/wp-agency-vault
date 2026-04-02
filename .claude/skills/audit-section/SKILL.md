# Audit Section

Validates a section folder for completeness and correctness.

## Usage
`/audit-section <section-slug>`
`/audit-section` — audits all sections

## Steps

1. If $ARGUMENTS is provided, audit `sections/$ARGUMENTS/`. Otherwise, audit every directory in `sections/`.

2. For each section, check:

### Required files exist
- [ ] `section.json` exists
- [ ] `section.php` exists
- [ ] `section.css` exists
- [ ] `preview.html` exists
- [ ] `README.md` exists

### section.json is valid
- [ ] Has all required fields: `name`, `slug`, `description`, `category`, `tags`, `layout`, `default_palette`, `kits_used`, `files`, `variables`
- [ ] `slug` matches the folder name
- [ ] `tags` is a non-empty array
- [ ] `default_palette` references a palette that exists in `palettes/`
- [ ] `kits_used` is a non-empty array (sections must compose multiple kits)
- [ ] Every kit in `kits_used` exists in `kits/`

### Files match section.json
- [ ] Every file listed in `files` exists on disk
- [ ] No source files on disk missing from `files`

### No hardcoded colors
- [ ] `section.css` uses CSS custom properties for all colors (no hardcoded hex for brand colors)
- [ ] `section.json` `variables` contains no color-type variables (colors belong in palettes)

### Variables are well-formed
- [ ] Each variable has `label`, `type`, and `default`
- [ ] `type` is one of: `string`, `number`

### preview.html works
- [ ] References section.css
- [ ] Sets CSS custom properties inline for palette defaults
- [ ] Contains enough content to demonstrate the layout

3. Report results:
   - **Pass** — everything checks out
   - **Warnings** — non-critical (sparse README, few tags)
   - **Errors** — missing files, invalid references, hardcoded colors

## Rules
- Read files, never modify them — this is a read-only audit
- Report all issues found, don't stop at the first error
- If auditing all sections, show a summary table at the end
