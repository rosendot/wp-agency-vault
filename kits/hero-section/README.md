# Hero Section Kit

Full-width hero with dark overlay, centered text, and CTA buttons. Works with background images or as a solid-color fallback.

## Files
| File | Purpose |
|------|---------|
| `hero.css` | Hero layout, overlay, text sizing, responsive scaling |
| `hero.php` | WordPress template partial (use with `get_template_part`) |

## Integration

1. Copy CSS from `hero.css` into your theme's `style.css`
2. Copy `hero.php` into your theme root
3. In any template, include with:
```php
<?php get_template_part( 'hero' ); ?>
```
4. Set a background image inline or via a custom field — the overlay handles readability

## Customization
- **Height**: Change `min-height: 90vh` on `.hero`
- **Overlay darkness**: Adjust `rgba(26, 18, 8, 0.6)` in `.hero::before`
- **Text width**: Modify `max-width` on `.hero__content`
- **Button styles**: Swap `.btn--primary` / `.btn--outline` classes
