# Feature Grid Kit

Icon + title + blurb feature cards in a responsive grid. The workhorse value-prop section used on nearly every SaaS, service-business, and agency landing page.

## Files
| File | Purpose |
|------|---------|
| `feature-grid.css` | Grid layout, card styling, icon block, variant classes, responsive breakpoints |
| `feature-grid.php` | WordPress template partial with hardcoded or CPT/ACF data |

## Variables

| Variable | Type | Default | Notes |
|----------|------|---------|-------|
| `sectionTitle` | string | `Why Choose Us` | Big headline above the grid |
| `sectionSubtitle` | string | `Everything you need, nothing you don't` | Optional supporting line |
| `columns` | number | `3` | 2, 3, 4, or 6 |

## Variants

Add the modifier class to the root `.feature-grid` element:

| Class | Effect |
|-------|--------|
| `feature-grid--bordered` | Cards have a 1px border |
| `feature-grid--filled` | Cards have a filled background + soft shadow on hover |
| `feature-grid--minimal` | No card chrome — icon + text only, tighter spacing |

## Integration

1. Copy CSS into your theme or enqueue it:
   ```php
   wp_enqueue_style( 'feature-grid', get_template_directory_uri() . '/feature-grid.css' );
   ```
2. Copy `feature-grid.php` into your theme root
3. Replace the hardcoded `$features` array with a WP_Query, ACF repeater, or Customizer-driven array
4. Include with:
   ```php
   <?php get_template_part( 'feature-grid' ); ?>
   ```

## Responsive Behavior
- **1024px** — falls back to 2 columns
- **600px** — stacks to single column

## Typical uses
- SaaS landing page "Why X" section
- Service business "What we offer" block
- Agency landing "Our capabilities" section
- Restaurant "Why dine with us" (pair with softer icons)
