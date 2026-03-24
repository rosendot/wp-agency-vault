# Google Map Embed Kit

Responsive Google Maps iframe embed for "Visit Us" / "Contact" sections. No API key needed.

## Files
| File | Purpose |
|------|---------|
| `map.css` | Responsive container, border-radius, layout with info column |
| `map.php` | WordPress template partial with map + contact info grid |

## How to Get the Embed URL

1. Go to [Google Maps](https://maps.google.com)
2. Search for the address
3. Click **Share** → **Embed a map**
4. Copy the `src` URL from the iframe code

## Integration

1. Copy CSS from `map.css` into your theme's `style.css`
2. Copy `map.php` into your theme root
3. Replace the `src` URL in the iframe with your client's address
4. Update the address, phone, hours text
5. Include in any template:
```php
<?php get_template_part( 'map' ); ?>
```

## Customization
- **Map height**: Change `min-height` on `.visit-us__map iframe`
- **Layout**: The grid is 1fr 1fr by default, stacks on mobile
- **Border radius**: Adjust on `.visit-us__map`
