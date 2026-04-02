# Create New Palette

Scaffolds a palette.json file with color and font definitions.

## Usage
`/new-palette <palette-name>`

## Steps

1. Create directory `palettes/$ARGUMENTS/`
2. Ask the user for:
   - Description (one sentence)
   - Tags (searchable keywords like warm, modern, serif, dark)
   - Colors: primary, primary_dark, secondary, dark, cream, text, text_light, border, white (label + hex value for each)
   - Fonts: heading and body (font-family strings)
3. Create `palettes/$ARGUMENTS/palette.json`:

```json
{
  "name": "<Palette Name>",
  "slug": "$ARGUMENTS",
  "description": "<description>",
  "tags": [],
  "colors": {
    "primary": { "label": "Primary", "value": "#hex" },
    "primary_dark": { "label": "Primary Dark", "value": "#hex" },
    "secondary": { "label": "Secondary / Accent", "value": "#hex" },
    "dark": { "label": "Dark Background", "value": "#hex" },
    "cream": { "label": "Light Background", "value": "#hex" },
    "text": { "label": "Body Text", "value": "#hex" },
    "text_light": { "label": "Muted Text", "value": "#hex" },
    "border": { "label": "Border", "value": "#hex" },
    "white": { "label": "White", "value": "#hex" }
  },
  "fonts": {
    "heading": { "label": "Heading Font", "value": "<font-family>" },
    "body": { "label": "Body Font", "value": "<font-family>" }
  }
}
```

## Rules
- Every palette must have all 9 color keys and 2 font keys — templates depend on them
- Color values must be valid hex codes
- Font values must be valid CSS font-family strings
- Tags should describe the aesthetic (warm, cool, modern, traditional, bold, minimal, etc.)
