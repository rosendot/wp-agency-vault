# CTA Banner Kit

Final-call conversion banner with headline, subhead, and 1–2 buttons on an accent background. The "Ready to get started?" closer used on nearly every landing page.

## Files
| File | Purpose |
|------|---------|
| `cta-banner.css` | Banner padding, button styles, split/outlined variant support, responsive stacking |
| `cta-banner.php` | WordPress template partial |

## Variables

| Variable | Type | Default | Notes |
|----------|------|---------|-------|
| `title` | string | `Ready to ship faster?` | Main headline |
| `subtitle` | string | `Get a custom site built by people who actually maintain it afterward.` | Supporting line |
| `primaryLabel` | string | `Start a project` | Primary button text |
| `primaryUrl` | string | `#` | Primary button destination |
| `secondaryLabel` | string | `Book a call` | Secondary button text (leave blank to hide) |
| `secondaryUrl` | string | `#` | Secondary button destination |

## Variants

| Class | Effect |
|-------|--------|
| `cta-banner--split` | Text left, buttons right (wide desktop layout) |
| `cta-banner--dark` | Dark background (pair with theme colors) |
| `cta-banner--outlined` | Transparent background with border (subtle variant) |

## Integration

1. Copy CSS into your theme or enqueue it:
   ```php
   wp_enqueue_style( 'cta-banner', get_template_directory_uri() . '/cta-banner.css' );
   ```
2. Copy `cta-banner.php` into your theme root
3. Include with:
   ```php
   <?php get_template_part( 'cta-banner' ); ?>
   ```

## Responsive Behavior
- **720px** — padding shrinks, split variant stacks to centered column

## Typical uses
- Final "Ready to get started?" section before the footer on every landing page
- Mid-page conversion prompt after a long feature deep-dive
- End-of-article CTA on blog posts
