# Image Comparison Kit

Side-by-side image pairs with labels. Static layout for comparing options, variations, or before/after results. No JavaScript required.

## Files
| File | Purpose |
|------|---------|
| `image-comparison.css` | Grid layout, pair structure, labels, responsive stacking |
| `image-comparison.php` | WordPress template partial with custom field support |

## Integration

1. Copy CSS from `image-comparison.css` into your theme's `style.css`
2. Copy `image-comparison.php` into your theme root
3. In any template, include with:
```php
<?php get_template_part( 'image-comparison' ); ?>
```
4. Set comparison images via custom fields or ACF repeater

## Customization
- **Pairs per row**: Set `grid-template-columns` on `.img-comparison__grid`
- **Gap**: Set `gap` on `.img-comparison__grid`
- **Image aspect ratio**: Adjust `aspect-ratio` on `.img-comparison__img`
- **Label style**: Customize `.img-comparison__label` background, position
- **Caption**: Add `.img-comparison__caption` inside the pair for descriptive text

## Responsive Behavior
- **1024px** — 1 pair per row
- **480px** — Images stack vertically within each pair

## Use Cases
- Before/after renovations, detailing, landscaping
- Option A vs Option B comparisons
- Standard vs premium tier showcase
- Design mockup comparisons
