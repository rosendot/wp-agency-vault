# Before/After Slider Kit

Two images overlaid with a draggable divider to reveal before and after states. Supports mouse and touch. Perfect for renovations, detailing, landscaping, and any transformation showcase.

## Files
| File | Purpose |
|------|---------|
| `before-after-slider.css` | Container, clip mask, divider handle, labels, responsive |
| `before-after-slider.js` | Drag interaction (mouse + touch), position calculation |
| `before-after-slider.php` | WordPress template partial with custom field support |

## Integration

1. Copy CSS from `before-after-slider.css` into your theme's `style.css`
2. Copy `before-after-slider.php` into your theme root
3. Enqueue JavaScript in `functions.php`:
```php
wp_enqueue_script( 'before-after-slider', get_template_directory_uri() . '/js/before-after-slider.js', array(), '1.0', true );
```
4. In any template, include with:
```php
<?php get_template_part( 'before-after-slider' ); ?>
```
5. Set before/after images via custom fields (`ba_before_image`, `ba_after_image`)

## Customization
- **Start position**: Set `data-start` attribute (0-100) on `.ba-slider__container`
- **Max width**: Adjust `max-width` on `.ba-slider`
- **Handle size**: Modify width/height on `.ba-slider__handle`
- **Label style**: Customize `.ba-slider__label` background, color, position

## Notes
- Both images should have the same aspect ratio for best results
- The "before" image is clipped from the left; the "after" image shows behind
- Touch-friendly — works on mobile with no extra configuration
