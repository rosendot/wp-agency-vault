# Process Steps Kit

Numbered "How it works" steps — 3 to 5 stages with number badges, titles, and descriptions. Horizontal on desktop, vertical stacking on mobile. Used by service businesses, agencies, and SaaS onboarding pages.

## Files
| File | Purpose |
|------|---------|
| `process-steps.css` | Step grid, number badge, connector line, variant classes, responsive stacking |
| `process-steps.php` | WordPress template partial |

## Variables

| Variable | Type | Default | Notes |
|----------|------|---------|-------|
| `sectionTitle` | string | `How it works` | Big headline |
| `sectionSubtitle` | string | `From kickoff to live site in four simple steps` | Supporting line |

Each step supports: `title`, `body`. Numbers are generated automatically (1, 2, 3, …).

## Variants

| Class | Effect |
|-------|--------|
| `process-steps--connected` | Adds a subtle horizontal line behind the number badges |
| `process-steps--vertical` | Forces vertical layout on desktop (number left, text right) |
| `process-steps--cards` | Each step becomes a bordered card with left-aligned text |

## Integration

1. Copy CSS into your theme or enqueue it:
   ```php
   wp_enqueue_style( 'process-steps', get_template_directory_uri() . '/process-steps.css' );
   ```
2. Copy `process-steps.php` into your theme root
3. Replace the hardcoded `$steps` array with an ACF repeater or Customizer-driven array
4. Include with:
   ```php
   <?php get_template_part( 'process-steps' ); ?>
   ```

## Responsive Behavior
- **900px** — collapses to vertical stack with left-aligned text regardless of variant

## Typical uses
- Service-business landing: "How we work together"
- Agency landing: "Our process"
- SaaS onboarding explainer: "Get started in 3 steps"
- Restaurant reservation / catering: "How to book"
