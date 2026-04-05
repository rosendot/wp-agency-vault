# Masonry Gallery Kit

Pinterest-style masonry layout with varying image heights across columns. Hover overlay with zoom effect. Pure CSS — no JavaScript required.

## Files
| File | Purpose |
|------|---------|
| `masonry-gallery.css` | CSS columns layout, hover effects, responsive breakpoints |
| `masonry-gallery.php` | WordPress template partial using attached images |

## Integration

1. Copy CSS from `masonry-gallery.css` into your theme's `style.css`
2. Copy `masonry-gallery.php` into your theme root
3. In any template, include with:
```php
<?php get_template_part( 'masonry-gallery' ); ?>
```
4. Attach images to the page or modify the query to use ACF gallery fields

## Customization
- **Columns**: Set via `columns` property on `.masonry-gallery__grid`
- **Gap**: Set via `column-gap` on the grid and `margin-bottom` on items
- **Border radius**: Adjust `border-radius` on `.masonry-gallery__item`
- **Overlay color**: Change `rgba` in `.masonry-gallery__overlay` hover state

## Responsive Behavior
- **1024px** — 3 columns
- **768px** — 2 columns
- **480px** — 1 column

## Notes
- Uses CSS `columns` property (not CSS Grid) to achieve true masonry flow
- Images with different aspect ratios will naturally create the staggered look
- No JavaScript needed — layout is handled entirely by CSS
