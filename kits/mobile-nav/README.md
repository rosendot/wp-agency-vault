# Mobile Nav Kit

Responsive hamburger menu toggle for WordPress themes.

## Files
| File | Purpose |
|------|---------|
| `mobile-nav.js` | Toggle logic with aria-expanded support |
| `mobile-nav.css` | Hamburger icon, slide-down nav, responsive rules |

## HTML Structure

In your `header.php`:
```html
<nav class="navbar">
    <a href="/" class="nav-brand">Site Name</a>

    <button class="nav-toggle" aria-label="Menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
    </button>

    <ul class="nav-links">
        <!-- wp_nav_menu items go here -->
    </ul>
</nav>
```

## Integration

1. Copy `mobile-nav.js` into `assets/js/`
2. Copy CSS from `mobile-nav.css` into your theme's `style.css`
3. Enqueue in `functions.php`:
```php
wp_enqueue_script( 'mobile-nav', get_template_directory_uri() . '/assets/js/mobile-nav.js', array(), '1.0', true );
```

## Customization
- **Breakpoint**: Change `768px` in the CSS media query
- **Animation**: Modify the `.nav-links` transition for slide/fade effects
- **Icon style**: Adjust `.nav-toggle span` dimensions and colors
