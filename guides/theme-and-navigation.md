# Building a Custom Theme & Setting Up Navigation

## Summary

After Bedrock is set up and LocalWP is running, this guide covers:
1. Building a multi-page custom theme (Home, Menu, About)
2. Adding a custom post type with categories (Menu Items)
3. Creating page templates
4. Setting up WordPress navigation menus

---

## Theme File Structure

```
web/app/themes/my-theme/
├── style.css              # Theme metadata + all CSS styles
├── functions.php          # Theme setup, asset loading, post types, meta boxes
├── header.php             # Navbar, <head>, opening <body>
├── footer.php             # Footer content, closing </body>
├── index.php              # Required fallback template
├── front-page.php         # Homepage (auto-used by WordPress)
├── page-menu.php          # Menu page (custom template)
├── page-about.php         # About page (custom template)
└── assets/
    └── js/main.js         # Mobile nav toggle + any JS
```

---

## What Each File Does

### style.css
- First block is a comment with theme metadata (name, author, version) — WordPress reads this to identify the theme
- Rest of the file is your CSS
- Use CSS custom properties (`:root { --color-primary: #b42318; }`) for consistent colors/fonts

### functions.php
Everything the theme "registers" with WordPress:
- **Theme support** — `add_theme_support('title-tag')`, `add_theme_support('post-thumbnails')`
- **Navigation menus** — `register_nav_menus()` tells WordPress your theme has menu locations
- **Asset loading** — `wp_enqueue_style()` and `wp_enqueue_script()` (never hardcode `<link>` or `<script>` tags)
- **Custom post types** — `register_post_type()` creates new content types (e.g., Menu Items)
- **Taxonomies** — `register_taxonomy()` creates categories for custom post types
- **Meta boxes** — `add_meta_box()` adds custom fields to the editor (e.g., Price, Description)
- **Save handlers** — functions that sanitize and save custom field data

### header.php & footer.php
- `header.php` contains everything from `<!DOCTYPE html>` through the navbar
- `footer.php` contains the footer through `</html>`
- Every page template calls `get_header()` at the top and `get_footer()` at the bottom
- This keeps the layout consistent across all pages without duplicating code

### front-page.php
- WordPress automatically uses this for the homepage — no configuration needed
- You don't need to create a "Home" page in the admin for this to work

### page-menu.php and page-about.php
These are **custom page templates**. The key is the comment at the top:
```php
<?php
/**
 * Template Name: Menu Page
 */
```
This tells WordPress to offer "Menu Page" as a template option when editing a page.

---

## Custom Post Types & Taxonomies

### What is a Custom Post Type?
WordPress has Posts and Pages by default. A custom post type is a new content type you define. For a restaurant, we created `menu_item` — it shows up in the admin sidebar with its own editor.

### What is a Taxonomy?
A taxonomy is a way to categorize post types. WordPress has Categories and Tags for Posts. We created `menu_category` to group menu items (Tacos, Burritos, Drinks, etc.).

### Registering in functions.php

```php
// Custom post type
register_post_type('menu_item', [
    'labels' => [
        'name'          => 'Menu Items',
        'singular_name' => 'Menu Item',
    ],
    'public'       => true,
    'has_archive'  => false,
    'show_in_rest' => true,       // Required for Gutenberg editor
    'supports'     => ['title', 'thumbnail'],
    'menu_icon'    => 'dashicons-food'
]);

// Taxonomy (categories for the post type)
register_taxonomy('menu_category', 'menu_item', [
    'labels' => [
        'name'          => 'Menu Categories',
        'singular_name' => 'Menu Category',
    ],
    'public'       => true,
    'hierarchical' => true,       // true = categories, false = tags
    'show_in_rest' => true,
]);
```

### Adding Custom Fields (Meta Boxes)
Meta boxes add extra input fields to the editor. For menu items we added Price and Description.

Three parts required:
1. **Register the meta box** — `add_meta_box()` in an `add_meta_boxes` hook
2. **Render the fields** — a callback function that outputs the HTML inputs
3. **Save the data** — a `save_post_{post_type}` hook that sanitizes and saves

Always include:
- `wp_nonce_field()` in the render function (security)
- `wp_verify_nonce()` in the save function (security)
- `DOING_AUTOSAVE` check (prevents saving during auto-save)
- `sanitize_text_field()` or `sanitize_textarea_field()` (sanitization)

---

## Setting Up Navigation in WordPress Admin

### Step 1 — Create your pages first
1. Go to **Pages → Add New**
2. Create a page called **"Menu"**
   - In the right sidebar, under **Page Attributes → Template**, select **"Menu Page"**
   - Click **Publish**
3. Create a page called **"About"**
   - Template: **"About Page"**
   - Click **Publish**

### Step 2 — Create the navigation menu
1. Go to **Appearance → Menus**
2. Enter a menu name (e.g., "Main Navigation")
3. Click **Create Menu**
4. On the left side under **Pages**, check the pages you want in the nav (Home, Menu, About)
5. Click **Add to Menu**
6. Drag to reorder if needed
7. Under **Menu Settings** at the bottom, check **"Primary Navigation"** (this is the location registered in `functions.php`)
8. Click **Save Menu**

### Common mistake
If you create a menu but don't add any pages to it before saving, nothing will show up in the navbar. You must:
1. Create the menu
2. Add pages to it
3. Assign it to a theme location
4. Save

All in one go.

### How it connects to the theme
In `header.php`:
```php
<?php wp_nav_menu([
    'theme_location' => 'primary',    // matches register_nav_menus() key
    'container'      => false,
    'items_wrap'     => '%3$s',       // outputs just <li> items, no wrapper
]); ?>
```

In `functions.php`:
```php
register_nav_menus([
    'primary' => 'Primary Navigation',  // 'primary' is the key used in wp_nav_menu()
    'footer'  => 'Footer Navigation',
]);
```

The `theme_location` in `wp_nav_menu()` must match a key from `register_nav_menus()`.

---

## Querying Custom Post Types in Templates

### Show all items (used on the Menu page)
```php
$items = get_posts([
    'post_type'      => 'menu_item',
    'posts_per_page' => -1,            // all items
    'orderby'        => 'title',
    'order'          => 'ASC'
]);
```

### Show items filtered by category
```php
$items = get_posts([
    'post_type'      => 'menu_item',
    'posts_per_page' => -1,
    'tax_query'      => [
        [
            'taxonomy' => 'menu_category',
            'field'    => 'term_id',
            'terms'    => $category->term_id,
        ]
    ]
]);
```

### Show limited items (for homepage "featured" section)
```php
$items = get_posts([
    'post_type'      => 'menu_item',
    'posts_per_page' => 6,             // only 6 items
    'orderby'        => 'date',
    'order'          => 'DESC'
]);
```

### Getting custom field values
```php
$price       = get_post_meta($item->ID, 'price', true);
$description = get_post_meta($item->ID, 'description', true);
```

### Getting the featured image
```php
if (has_post_thumbnail($item->ID)) {
    $image_url = get_the_post_thumbnail_url($item->ID, 'medium');
}
```

---

## Adding Content in WordPress Admin

After the theme is built and activated, you populate the site with content through the WordPress admin dashboard. Here's the full walkthrough.

### Step 1 — Change the Site Name

1. Go to `your-site.local/wp/wp-admin`
2. In the left sidebar, go to **Settings → General**
3. Change **Site Title** from the default (e.g., "practice-wp-site-1") to your restaurant name (e.g., "La Mesa")
4. Optionally add a **Tagline** (e.g., "Authentic Mexican Cuisine")
5. Scroll down and click **Save Changes**

This updates the name that appears in the navbar, footer, browser tab, and anywhere `bloginfo('name')` is called in the theme.

### Step 2 — Create Menu Categories

Before adding menu items, set up the categories they'll be organized into. These are what group items on the Menu page (Tacos, Burritos, Drinks, etc.).

1. In the left sidebar, find **Menu Items** (has a food/utensil icon)
2. Click **Menu Categories** underneath it
3. You'll see a form on the left to add new categories:
   - **Name**: The display name (e.g., "Tacos")
   - **Slug**: Auto-generated from the name (e.g., "tacos") — leave this alone
   - **Description**: Optional — not displayed on the site by default
4. Click **Add New Menu Category**
5. Repeat for each category. For a Mexican restaurant, you might create:
   - Tacos
   - Burritos
   - Quesadillas
   - Flautas
   - Sides
   - Drinks
   - Desserts

The categories appear on the right side of the page as you add them. You can edit or delete them from there.

### Step 3 — Add Menu Items

Now add the actual food items that will appear on the site.

1. In the left sidebar, click **Menu Items → Add New**
2. You'll see the editor with these fields:

**Title** (top of the page)
- Enter the name of the dish (e.g., "Carne Asada Taco")

**Menu Item Details** (below the editor — this is the meta box we created in `functions.php`)
- **Price**: Enter just the number (e.g., "3.50"). The dollar sign is added by the template.
- **Description**: A short description of the dish (e.g., "Grilled steak with onions, cilantro, and salsa verde on a corn tortilla")

**Menu Categories** (right sidebar)
- Check the category this item belongs to (e.g., "Tacos")
- An item can belong to multiple categories if needed

**Featured Image** (right sidebar, below Categories)
- Click **Set featured image**
- Upload a photo of the dish or select one from the media library
- Click **Set featured image** to confirm
- This is the image that appears on the menu card

3. Click **Publish** (blue button, top right)
4. Repeat for each menu item

**Example items to add:**

| Title | Category | Price | Description |
|-------|----------|-------|-------------|
| Carne Asada Taco | Tacos | 3.50 | Grilled steak, onions, cilantro, salsa verde |
| Al Pastor Taco | Tacos | 3.50 | Marinated pork, pineapple, onion, cilantro |
| Pollo Burrito | Burritos | 10.99 | Grilled chicken, rice, beans, cheese, sour cream |
| Cheese Quesadilla | Quesadillas | 7.99 | Flour tortilla, melted cheese, served with salsa |
| Chicken Flautas | Flautas | 9.99 | Three crispy rolled tacos, guacamole, crema |
| Horchata | Drinks | 3.00 | Traditional Mexican rice drink |

### Step 4 — Create Pages

You need WordPress pages for the Menu and About sections. The theme has custom templates for each.

**Create the Menu page:**
1. Go to **Pages → Add New**
2. Title: **Menu**
3. In the right sidebar, find **Page Attributes** (you may need to scroll down)
4. Under **Template**, select **"Menu Page"** from the dropdown
5. You don't need to add any content in the editor — the template pulls menu items automatically
6. Click **Publish**

**Create the About page:**
1. Go to **Pages → Add New**
2. Title: **About**
3. Template: **"About Page"**
4. Click **Publish**

**Note:** The URL slug is auto-generated from the title. "Menu" becomes `/menu`, "About" becomes `/about`. The template files `page-menu.php` and `page-about.php` are connected via the `Template Name` comment at the top, NOT the file name.

### Step 5 — Set Up the Navigation Menu

This connects your pages to the navbar in the header.

1. Go to **Appearance → Menus**
2. In the **Menu Name** field, type **"Main Navigation"**
3. Click **Create Menu**
4. On the left side, you'll see a panel called **Pages** with checkboxes
5. Check **Home** (or your front page), **Menu**, and **About**
6. Click **Add to Menu**
7. The pages appear on the right. Drag them to reorder if needed (Home first, Menu second, About third)
8. Scroll down to **Menu Settings**
9. Check the box next to **"Primary Navigation"** — this is the menu location registered in `functions.php`
10. Click **Save Menu**

**Important:** All of these steps (create menu, add pages, assign location, save) must be done before the nav links appear on the site. If you save an empty menu, nothing shows up.

### Step 6 — Set the Homepage

By default WordPress shows your latest blog posts on the homepage. To use your `front-page.php` template instead:

1. Go to **Settings → Reading**
2. Under **Your homepage displays**, select **"A static page"**
3. Set **Homepage** to your front page (or create a blank page called "Home" if needed)
4. Click **Save Changes**

**Note:** If you have a `front-page.php` file in your theme, WordPress will use it automatically for the homepage regardless of this setting. But it's good practice to set it explicitly.

### Verify Everything Works

After completing all steps, visit your site and check:

- **Homepage** — Hero section visible, "Fan Favorites" shows your menu items (up to 6), about teaser and contact info sections visible
- **Menu page** — Items grouped by category (Tacos, Burritos, etc.), each with name, price, and description
- **About page** — Story section, values cards, call-to-action
- **Navbar** — Links to Home, Menu, About visible at the top of every page
- **Footer** — Quick links, contact info, copyright visible at the bottom of every page
