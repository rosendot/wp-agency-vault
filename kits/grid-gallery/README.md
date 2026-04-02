# Grid Gallery

Responsive photo grid with configurable rows and columns. Hover overlay with zoom effect and plus icon. Lightbox-ready structure.

## HTML Structure

```html
<section class="grid-gallery">
    <div class="grid-gallery__header">
        <h2 class="grid-gallery__title">Gallery</h2>
    </div>
    <div class="grid-gallery__grid" style="grid-template-columns: repeat(5, 1fr); gap: 4px;">
        <div class="grid-gallery__item">
            <img src="photo.jpg" alt="Description" class="grid-gallery__img">
            <div class="grid-gallery__overlay">
                <span class="grid-gallery__icon" aria-hidden="true">+</span>
            </div>
        </div>
        <!-- Repeat for each image -->
    </div>
</section>
```

## Customizable Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | number | `5` | Number of columns in the grid |
| `rows` | number | `3` | Number of rows (total items = columns × rows) |
| `gap` | string | `4px` | Gap between grid items |
| `sectionTitle` | string | `Gallery` | Heading above the grid |

Set columns and gap via inline style on `.grid-gallery__grid`:
```html
<div class="grid-gallery__grid" style="grid-template-columns: repeat(5, 1fr); gap: 4px;">
```

## WordPress Integration

### Enqueue in functions.php

```php
wp_enqueue_style( 'grid-gallery', get_template_directory_uri() . '/assets/css/grid-gallery.css', [], '1.0.0' );
```

### Use in a template

```php
<?php get_template_part( 'grid-gallery' ); ?>
```

The PHP partial pulls attached images from the current page. To use a custom field or ACF gallery field instead, modify the `$images` query in `grid-gallery.php`.

## Responsive Behavior

- **1024px** — 4 columns
- **768px** — 3 columns
- **480px** — 2 columns

The responsive breakpoints override the inline column count to keep the grid usable on smaller screens.

## Lightbox Integration

The grid is structured for easy lightbox integration. Each `.grid-gallery__item` wraps an image and overlay — add your preferred lightbox library (e.g., GLightbox, Fancybox) by wrapping items in `<a>` tags linking to the full-size image.
