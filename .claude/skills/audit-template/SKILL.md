# Audit Template

Validates a template folder for completeness, correctness, and dashboard compatibility.

## Usage
`/audit-template <template-slug>`
`/audit-template` — audits all templates

## Steps

1. If $ARGUMENTS is provided, audit `templates/$ARGUMENTS/`. Otherwise, audit every directory in `templates/`.

2. For each template, check:

### Required files exist
- [ ] `template.json` exists
- [ ] `preview.html` exists
- [ ] `README.md` exists
- [ ] `index.php` exists
- [ ] `header.php` exists
- [ ] `footer.php` exists
- [ ] `functions.php` exists
- [ ] `style.css` exists
- [ ] `front-page.php` exists

### template.json is valid
- [ ] Has all required fields: `name`, `slug`, `description`, `category`, `tags`, `style`, `layout`, `version`, `pages`, `default_palette`, `kits_used`, `files`, `kit_files`, `variables`
- [ ] `slug` matches the folder name
- [ ] `tags` is a non-empty array
- [ ] `pages` is an array
- [ ] `version` follows semver format (e.g., `1.0.0`)
- [ ] `files` groups are valid (`php`, `css`, `js`)
- [ ] `default_palette` field exists and references a valid palette in `palettes/`

### Files match template.json
- [ ] Every file listed in `template.json` `files` actually exists on disk
- [ ] No PHP/CSS/JS files on disk are missing from `template.json` `files` (excluding `preview.html` and `README.md`)
- [ ] Every page listed in `pages` has a corresponding template file (`front-page.php` for "home", `page-<name>.php` for others)

### Kit references are valid
- [ ] Every kit in `kits_used` exists as a directory in `kits/`
- [ ] Every kit in `kits_used` has a valid `kit.json`
- [ ] Every file in `kit_files.css` exists at the referenced path relative to repo root
- [ ] Every file in `kit_files.js` exists at the referenced path relative to repo root
- [ ] No kit files referenced that aren't from a kit in `kits_used`

### Palette reference is valid
- [ ] `default_palette` references a palette slug that exists as a directory in `palettes/`
- [ ] The referenced palette has a valid `palette.json`
- [ ] No color variables are defined in `template.json` `variables` (colors belong in palettes)

### Variables are well-formed
- [ ] Each variable has `label`, `type`, and `default`
- [ ] `type` is one of: `string`, `number`
- [ ] Business-critical variables are present: at minimum `business_name` (or equivalent)

### preview.html works
- [ ] References the template's own CSS
- [ ] References kit CSS/JS files used by the template
- [ ] Contains enough content to show the full homepage layout
- [ ] Does not reference external CDNs for core template functionality

### README.md is useful
- [ ] Describes what the template is designed for
- [ ] Lists which kits are used
- [ ] Lists which palette is used by default
- [ ] Includes customization/setup instructions

3. Report results per template:
   - **Pass** — everything checks out
   - **Warnings** — non-critical issues (e.g., missing optional variables, sparse README)
   - **Errors** — broken kit references, missing required files or fields, file mismatches, invalid palette reference

## Rules
- Read files, never modify them — this is a read-only audit
- Report all issues found, don't stop at the first error
- If auditing all templates, show a summary table at the end
- Cross-reference with actual `kits/` directory — don't just trust `template.json`
- Cross-reference with actual `palettes/` directory — verify `default_palette` points to a real palette
