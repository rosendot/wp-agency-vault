# Audit Palette

Validates palette JSON files for completeness and correctness.

## Usage
`/audit-palette <palette-slug>`
`/audit-palette` — audits all palettes

## Steps

1. If $ARGUMENTS is provided, audit `palettes/$ARGUMENTS/`. Otherwise, audit every directory in `palettes/`.

2. For each palette, check:

### Required file exists
- [ ] `palette.json` exists

### palette.json is valid
- [ ] Has all required fields: `name`, `slug`, `description`, `tags`
- [ ] `slug` matches the folder name
- [ ] `tags` is a non-empty array

### Colors complete
- [ ] `colors` object exists with all 9 required keys: `primary`, `primary_dark`, `secondary`, `dark`, `cream`, `text`, `text_light`, `border`, `white`
- [ ] Each color has `label` and `value` fields
- [ ] Each `value` is a valid hex color (starts with #, 4 or 7 characters)

### Fonts complete
- [ ] `fonts` object exists with both required keys: `heading`, `body`
- [ ] Each font has `label` and `value` fields
- [ ] Each `value` is a non-empty string

3. Report results:
   - **Pass** — everything checks out
   - **Warnings** — non-critical issues (e.g., sparse description)
   - **Errors** — missing required fields, invalid hex values, missing color/font keys

## Rules
- Read files, never modify them — this is a read-only audit
- Report all issues found, don't stop at the first error
- If auditing all palettes, show a summary table at the end
