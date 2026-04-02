# Menu Grid Section

Responsive card grid with photo, item name, description, and price. Category tabs at the top let visitors filter by menu category.

## Files

| File | Purpose |
|------|---------|
| `section.json` | Metadata for the dashboard UI |
| `section.php` | WordPress template partial |
| `section.css` | All styles (BEM, CSS custom properties) |
| `preview.html` | Standalone HTML preview |

## Requirements

- **Custom post type:** `menu_item`
- **Taxonomy:** `menu_category`
- **Post meta fields:** `menu_item_price` (numeric), `menu_item_description` (text)
- **Post thumbnails** enabled for the `menu_item` post type

## Enqueue

In your theme's `functions.php`:

```php
function enqueue_menu_grid_styles() {
	wp_enqueue_style(
		'menu-grid',
		get_template_directory_uri() . '/sections/menu-grid/section.css',
		array(),
		'1.0.0'
	);
}
add_action( 'wp_enqueue_scripts', 'enqueue_menu_grid_styles' );
```

## Usage

Include the section in any template:

```php
get_template_part( 'sections/menu-grid/section', null, array(
	'section_title'    => 'Our Menu',
	'section_subtitle' => 'Tap a category to filter',
	'columns'          => 3,
) );
```

## Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `section_title` | string | `Our Menu` | Main heading |
| `section_subtitle` | string | `Tap a category to filter` | Subheading below title |
| `columns` | number | `3` | Desktop column count (CSS custom property) |

## Customization

**Colors and fonts** are controlled entirely by CSS custom properties. Set them in your palette or `:root`:

```css
:root {
	--color-primary: #b42318;
	--color-secondary: #d4a017;
	--color-dark: #1a1208;
	--color-cream: #faf6f0;
	--color-text: #2c2416;
	--color-text-light: #6b5e4f;
	--color-border: #e0d6c8;
	--font-heading: Georgia, 'Times New Roman', serif;
	--font-body: 'Inter', -apple-system, sans-serif;
}
```

**Grid columns** can be overridden via the `--menu-grid-columns` custom property or by passing a different `columns` value to the template partial.

**Tab filtering** works via inline JS that toggles card visibility based on `data-categories` attributes. No external dependencies required.
