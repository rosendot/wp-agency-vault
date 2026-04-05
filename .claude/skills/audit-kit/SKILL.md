# Audit Kit

Validates a kit folder for completeness, correctness, and dashboard compatibility.

## Usage
`/audit-kit <kit-slug>`
`/audit-kit` — audits all kits

## Steps

1. If $ARGUMENTS is provided, audit `kits/$ARGUMENTS/`. Otherwise, audit every directory in `kits/`.

2. For each kit, check:

### Required files exist
- [ ] `kit.json` exists
- [ ] `preview.html` exists
- [ ] `README.md` exists

### kit.json is valid
- [ ] Has all required fields: `name`, `slug`, `description`, `category`, `tags`, `files`, `variables`, `variants`, `dependencies`
- [ ] `slug` matches the folder name
- [ ] `category` is one of: `section`, `interactive`, `navigation`, `data`
- [ ] `tags` is a non-empty array
- [ ] `files` groups are valid (`css`, `js`, `php`)

### Files match kit.json
- [ ] Every file listed in `kit.json` `files` actually exists on disk
- [ ] No source files on disk (CSS, JS, PHP) are missing from `kit.json` `files`

### Variables are well-formed
- [ ] Each variable has `label`, `type`, and `default`
- [ ] `type` is one of: `string`, `number`, `color`

### TSX preview component
- [ ] A TSX file exists in `app/components/kit-previews/` for this kit (PascalCase name matching the kit)
- [ ] The component is registered in the `KIT_PREVIEWS` registry in `app/components/KitDetail.tsx`
- [ ] The component uses `var(--token)` design tokens — no hardcoded colors, fonts, sizes, spacing, or radii
- [ ] The component follows the standard section header pattern (h2 + subtitle + padding)
- [ ] Decorative buttons/links use `<span>` not `<a>` (avoids nested anchor hydration errors)

### preview.html works
- [ ] References the kit's own CSS/JS files
- [ ] Does not reference external CDNs for core kit functionality
- [ ] Contains enough content to demonstrate the kit

### README.md is useful
- [ ] Describes what the kit does
- [ ] Includes HTML structure or usage example
- [ ] Mentions WordPress integration (enqueue instructions)

3. Report results per kit:
   - **Pass** — everything checks out
   - **Warnings** — non-critical issues (e.g., empty tags, missing README sections)
   - **Errors** — broken references, missing required files or fields

## Rules
- Read files, never modify them — this is a read-only audit
- Report all issues found, don't stop at the first error
- If auditing all kits, show a summary table at the end
