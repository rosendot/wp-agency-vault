# Lightbox Gallery Kit

Thumbnail grid that opens a full-screen lightbox modal with previous/next navigation and keyboard controls.

## Files
| File | Purpose |
|------|---------|
| `lightbox-gallery.css` | Thumbnail grid layout, hover effects, lightbox modal styling |
| `lightbox-gallery.js` | Modal open/close, prev/next navigation, keyboard controls |
| `lightbox-gallery.php` | WordPress template partial with attached images |

## Integration

1. Copy CSS from `lightbox-gallery.css` into your theme's `style.css`
2. Copy `lightbox-gallery.php` into your theme root
3. Enqueue JavaScript in `functions.php`:
```php
wp_enqueue_script( 'lightbox-gallery', get_template_directory_uri() . '/js/lightbox-gallery.js', array(), '1.0', true );
```
4. In any template, include with:
```php
<?php get_template_part( 'lightbox-gallery' ); ?>
```

## Keyboard Controls
- **Escape** — close lightbox
- **Arrow Left** — previous image
- **Arrow Right** — next image

## Customization
- **Columns**: Set `grid-template-columns` on `.lightbox-gallery__grid`
- **Gap**: Set `gap` on `.lightbox-gallery__grid`
- **Overlay color**: Adjust `rgba` in `.lightbox-modal` background
- **Full-size URL**: Set `data-full` attribute on `.lightbox-gallery__thumb` for hi-res version

## Responsive Behavior
- **768px** — 3 columns
- **480px** — 2 columns
