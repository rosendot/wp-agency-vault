# Menu Cards Section

Large editorial/magazine-style card layout for featuring dishes. Single-column stacked cards with full-width photos, gradient overlays, and overlay text.

## HTML Structure

```html
<section class="menu-cards" id="featured-dishes">
  <div class="menu-cards__header">
    <h2 class="menu-cards__title">...</h2>
    <p class="menu-cards__subtitle">...</p>
  </div>

  <article class="menu-cards__item">
    <div class="menu-cards__photo">
      <img class="menu-cards__photo-img" ... />
      <span class="menu-cards__name">Dish Name</span>
    </div>
    <div class="menu-cards__body">
      <p class="menu-cards__description">...</p>
      <div class="menu-cards__meta">
        <span class="menu-cards__price">$24.00</span>
        <a href="#" class="menu-cards__cta">Order</a>
      </div>
    </div>
  </article>

  <!-- Even cards get the modifier class -->
  <article class="menu-cards__item menu-cards__item--alt">
    ...
  </article>
</section>
```

## Enqueue

```php
wp_enqueue_style(
    'menu-cards',
    get_template_directory_uri() . '/sections/menu-cards/section.css',
    array(),
    '1.0.0'
);
```

Include the template partial where needed:

```php
get_template_part( 'sections/menu-cards/section' );
```

## Required Post Meta

The section queries `menu_item` posts with `_menu_item_featured` set to `1`.

| Meta Key                    | Description              |
|-----------------------------|--------------------------|
| `_menu_item_price`          | Numeric price            |
| `_menu_item_description`    | Short description text   |
| `_menu_item_featured`       | `1` to include in cards  |
| `_menu_item_order_url`      | URL for the Order button |

## Customizer Variables

| Variable           | Default                              |
|--------------------|--------------------------------------|
| `section_title`    | Featured Dishes                      |
| `section_subtitle` | Chef's favorites, crafted with care  |

Override via `get_theme_mod()`:

```php
$title = get_theme_mod( 'menu_cards_title', 'Featured Dishes' );
```

## Alternating Card Style

Odd cards (1st, 3rd, ...) use a bottom-up gradient overlay with the dish name at the bottom of the photo. Even cards (`menu-cards__item--alt`) flip to a top-down gradient with the name at the top. This creates a magazine-style rhythm without repeating the same visual pattern.

## CSS Custom Properties

All colors and fonts are driven by CSS custom properties so the section adapts to any palette:

- `--color-primary`, `--color-secondary`, `--color-dark`, `--color-cream`
- `--color-text`, `--color-text-light`, `--color-border`
- `--font-heading`, `--font-body`

## Responsive Behavior

- **768px and below** — Reduced font sizes and card spacing.
- **480px and below** — Full-bleed cards (no border-radius, no side borders), 4:3 photo aspect ratio, stacked price/CTA.
