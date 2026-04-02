# Menu List Section

Classic vertical menu list grouped by category. Each item displays a name, dotted leader, and price on one line with an optional description below and an optional photo thumbnail on the left.

## HTML Structure

```html
<section class="menu-list">
  <div class="menu-list__header">
    <h2 class="menu-list__title">Our Menu</h2>
    <p class="menu-list__subtitle">Fresh ingredients, bold flavors</p>
  </div>

  <div class="menu-list__category">
    <h3 class="menu-list__category-heading">
      Category Name
      <span class="menu-list__category-underline"></span>
    </h3>

    <div class="menu-list__item">
      <!-- Optional photo -->
      <div class="menu-list__photo">
        <img class="menu-list__photo-img" src="..." alt="...">
      </div>

      <div class="menu-list__item-content">
        <div class="menu-list__item-row">
          <span class="menu-list__item-name">Dish Name</span>
          <span class="menu-list__item-leader"></span>
          <span class="menu-list__item-price">$12.00</span>
        </div>
        <p class="menu-list__description">A short description of the dish.</p>
      </div>
    </div>
  </div>
</section>
```

## WordPress Integration

### 1. Enqueue the stylesheet

In your theme's `functions.php`:

```php
add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'section-menu-list',
        get_template_directory_uri() . '/sections/menu-list/section.css',
        array(),
        '1.0.0'
    );
} );
```

### 2. Include the template partial

In any page template or template part:

```php
get_template_part( 'sections/menu-list/section' );
```

### 3. Required post type and taxonomy

This section expects:

- A `menu_item` custom post type
- A `menu_category` taxonomy attached to `menu_item`
- Post meta fields: `_menu_item_price` (float) and `_menu_item_description` (string)

## Variables

| Variable           | Label          | Type   | Default                          |
|--------------------|----------------|--------|----------------------------------|
| `section_title`    | Section Title  | string | Our Menu                         |
| `section_subtitle` | Subtitle       | string | Fresh ingredients, bold flavors  |

Variables are read from `get_theme_mod()`. Override them in the Customizer or pass values directly before including the template.

## Customization

- **Colors and fonts**: All visual values use CSS custom properties (`--color-primary`, `--color-secondary`, `--color-dark`, `--color-cream`, `--color-text`, `--color-text-light`, `--color-border`, `--font-heading`, `--font-body`). Set these at `:root` to match your palette.
- **Thumbnails**: The photo column appears only when a menu item has a featured image (`has_post_thumbnail()`). Remove the `.menu-list__photo` block in the template to disable photos entirely.
- **Leader style**: Change the dotted line between name and price by editing the `border-bottom` property on `.menu-list__item-leader`.
- **Responsive**: Below 768px the layout switches to a stacked single-column view with smaller text sizes.
