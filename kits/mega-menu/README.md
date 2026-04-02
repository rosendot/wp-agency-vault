# Mega Menu

Full-width dropdown navigation panel that reveals on hover. Supports multi-column layouts with links, descriptions, and column headings. Accessible with keyboard navigation and ARIA attributes.

## HTML Structure

```html
<nav class="mega-menu" aria-label="Main navigation">
    <div class="mega-menu__bar">
        <a href="/" class="mega-menu__brand">Brand Name</a>

        <ul class="mega-menu__nav">
            <!-- Item WITH dropdown -->
            <li class="mega-menu__item">
                <button class="mega-menu__trigger" aria-expanded="false" aria-haspopup="true">
                    Menu <span class="mega-menu__arrow" aria-hidden="true">▾</span>
                </button>
                <div class="mega-menu__panel" role="menu">
                    <div class="mega-menu__panel-inner">
                        <div>
                            <h3 class="mega-menu__column-title">Column Title</h3>
                            <ul class="mega-menu__links">
                                <li>
                                    <a href="/link" class="mega-menu__link" role="menuitem">
                                        Link Text
                                        <span class="mega-menu__link-desc">Optional description</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <!-- More columns -->
                    </div>
                </div>
            </li>

            <!-- Item WITHOUT dropdown (plain link) -->
            <li class="mega-menu__item">
                <a href="/contact" class="mega-menu__trigger">Contact</a>
            </li>
        </ul>

        <a href="/order" class="mega-menu__cta">Order Online</a>
    </div>
</nav>
```

## Variants

- **Default (full-width)** — Panel stretches the full viewport width.
- **Contained** — Add `mega-menu--contained` class. Panel has a max-width and aligns to the trigger.

```html
<nav class="mega-menu mega-menu--contained">
    ...
</nav>
```

## Behavior

- **Desktop** — Panels open on hover with a 150ms close delay to prevent flicker.
- **Touch devices** — First tap opens the panel, second tap follows the link.
- **Keyboard** — Escape closes the open panel and returns focus to the trigger.
- **Click outside** — Closes any open panel.

## WordPress Integration

### Enqueue in functions.php

```php
wp_enqueue_style( 'mega-menu', get_template_directory_uri() . '/assets/css/mega-menu.css', [], '1.0.0' );
wp_enqueue_script( 'mega-menu', get_template_directory_uri() . '/assets/js/mega-menu.js', [], '1.0.0', true );
```

### Use in a template

```php
<?php get_template_part( 'mega-menu' ); ?>
```

For dynamic menus, replace the hardcoded PHP array with `wp_nav_menu()` and a custom Walker class.

## Customizable Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `panelBg` | color | `#ffffff` | Dropdown panel background |
| `panelBorder` | color | `#e0d6c8` | Panel bottom border |
| `navBg` | color | `#1a1208` | Nav bar background |
| `navTextColor` | color | `#ffffff` | Nav bar text color |
| `accentColor` | color | `#b42318` | Hover color and panel top border |
| `columnHeadingColor` | color | `#1a1208` | Column heading text |
| `linkColor` | color | `#2c2416` | Link text color |
| `descColor` | color | `#6b5e4f` | Link description color |

## Accessibility

- `<button>` triggers for dropdowns (keyboard focusable)
- `aria-expanded` toggles on open/close
- `aria-haspopup="true"` on triggers with panels
- `role="menu"` on panels, `role="menuitem"` on links
- Escape key closes open panel and returns focus
- Plain links (no dropdown) use `<a>` — no unnecessary ARIA
