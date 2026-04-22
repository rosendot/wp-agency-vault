# Service Cards Kit

Service offering cards with image or icon, title, description, optional price, and "Learn more" link. Taller and more detailed than `feature-grid` — built for service businesses that need each card to link to a dedicated service page.

## Files
| File | Purpose |
|------|---------|
| `service-cards.css` | Grid layout, card styling, icon/media block, price label, responsive stacking |
| `service-cards.php` | WordPress template partial with hardcoded or CPT/ACF data |

## Variables

| Variable | Type | Default | Notes |
|----------|------|---------|-------|
| `sectionTitle` | string | `What we do` | Big headline |
| `sectionSubtitle` | string | `Pick a service, or let us build you a full package` | Supporting line |
| `columns` | number | `3` | 2, 3, or 4 |

Each service supports: `icon` OR `image`, `title`, `body`, `price` (label like "From"), `price_value` ("$2,400"), `url`, `cta` ("Learn more").

## Variants

| Class | Effect |
|-------|--------|
| `service-cards--image-top` | Full-bleed image at top of card (instead of floating icon) |
| `service-cards--compact` | Hides body copy — shows icon + title + price + CTA only |

## Integration

1. Copy CSS into your theme or enqueue it:
   ```php
   wp_enqueue_style( 'service-cards', get_template_directory_uri() . '/service-cards.css' );
   ```
2. Copy `service-cards.php` into your theme root
3. Replace the hardcoded `$services` array with a WP_Query for a services CPT or ACF repeater
4. Include with:
   ```php
   <?php get_template_part( 'service-cards' ); ?>
   ```

## Responsive Behavior
- **1024px** — falls back to 2 columns
- **600px** — stacks to single column

## vs feature-grid

Use `feature-grid` for value-prop "why choose us" benefits (no links, shorter cards).
Use `service-cards` when each card links to a service detail page and needs price/CTA treatment.
