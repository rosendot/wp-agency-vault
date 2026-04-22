# Feature Alternating Kit

Alternating rows of text + image pairs — the "zig-zag" feature deep-dive pattern used by Stripe, Notion, Basecamp, and most SaaS landing pages. Each row has an eyebrow label, headline, body, optional bullets, and CTA link, paired with a visual on the opposite side. Every other row flips, producing the alternating rhythm.

## Files
| File | Purpose |
|------|---------|
| `feature-alternating.css` | Row grid, alternating order, bullets, CTA link, responsive stacking |
| `feature-alternating.php` | WordPress template partial with hardcoded or CPT/ACF data |

## Variables

| Variable | Type | Default | Notes |
|----------|------|---------|-------|
| `sectionTitle` | string | `Built for the way you actually work` | Big headline |
| `sectionSubtitle` | string | `Each feature, explained in detail` | Optional supporting line |

Each row supports: `eyebrow`, `title`, `body`, `bullets[]`, `cta { label, url }`, `image`.

## Variants

| Class | Effect |
|-------|--------|
| `feature-alternating--compact` | Tighter vertical gap between rows |
| `feature-alternating--image-bleed` | Removes border-radius on images (full-bleed look) |

## Integration

1. Copy CSS into your theme or enqueue it:
   ```php
   wp_enqueue_style( 'feature-alternating', get_template_directory_uri() . '/feature-alternating.css' );
   ```
2. Copy `feature-alternating.php` into your theme root
3. Replace the hardcoded `$rows` array with a WP_Query, ACF repeater, or Customizer-driven array
4. Include with:
   ```php
   <?php get_template_part( 'feature-alternating' ); ?>
   ```

## Responsive Behavior
- **900px** — stacks to single column, text-then-image order regardless of alternating class

## Typical uses
- SaaS landing "How it works in depth" deep-dive
- Agency landing "Our process" narrative
- Service business landing "What you get" storytelling
