# Restaurant Classic

Warm traditional restaurant theme with placeholder content. Copy into a Bedrock project, pull in the required kits, swap placeholders, and ship.

## Kit Dependencies

This theme does NOT duplicate kit code. You must include these kits:

| Kit | What It Provides |
|-----|-----------------|
| `kits/hero-section/` | Hero section CSS with overlay |
| `kits/infinite-carousel/` | Carousel CSS + JS (track, arrows, dots, swipe) |
| `kits/google-map-embed/` | Visit us map + info grid CSS |

## Setup for a Client Project

1. Copy this theme folder into `web/app/themes/client-name/`
2. Copy kit CSS files into the theme (or enqueue from a shared location):
   - `hero.css`, `carousel.css`, `map.css`
3. Copy kit JS files into `assets/js/`:
   - `carousel.js`
4. Uncomment the `wp_enqueue_script` lines in `functions.php`
5. Replace `<!-- PLACEHOLDER: ... -->` comments with client content
6. Update CSS variables in `style.css` `:root` for client colors/fonts
7. Replace Google Maps placeholder with client's embed iframe
8. Replace placeholder images with real photos

## Pages
- **Home** (`front-page.php`) — Hero with overlay text, fan favorites carousel (8 slots), visit us with Google Maps, photo gallery carousel
- **Menu** (`page-menu.php`) — Items grouped by category from `menu_item` CPT
- **About** (`page-about.php`) — Story section, 3 values cards, CTA

## What's Theme-Specific (not from kits)
- CSS variables and color scheme
- Buttons
- Section utilities (cream/dark/green backgrounds)
- Featured card styles (content inside carousel slides)
- Footer (3-column: contact, brand, hours)
- Menu page (category titles, menu list items)
- About page (story grid, values grid)
- Placeholder image styles
