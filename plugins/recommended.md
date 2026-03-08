# Recommended Plugins

Vetted plugins for common client needs. All installable via Composer with Bedrock:

```bash
composer require wpackagist-plugin/plugin-name
```

## Essential (Almost Every Project)

| Plugin | Composer Name | What It Does |
|--------|--------------|--------------|
| **Yoast SEO** | `wpackagist-plugin/wordpress-seo` | SEO meta tags, sitemaps, readability analysis |
| **WP Super Cache** | `wpackagist-plugin/wp-super-cache` | Page caching for performance |
| **Wordfence** | `wpackagist-plugin/wordfence` | Security: firewall, malware scan, login protection |
| **UpdraftPlus** | `wpackagist-plugin/updraftplus` | Automated backups to cloud storage |

## Content & Editing

| Plugin | Composer Name | What It Does |
|--------|--------------|--------------|
| **Advanced Custom Fields** | `wpackagist-plugin/advanced-custom-fields` | GUI for adding custom fields (alternative to hand-coded meta boxes) |
| **Classic Editor** | `wpackagist-plugin/classic-editor` | Disables Gutenberg, restores classic editor |
| **Safe SVG** | `wpackagist-plugin/safe-svg` | Allows SVG uploads with sanitization |

## Forms

| Plugin | Composer Name | What It Does |
|--------|--------------|--------------|
| **Contact Form 7** | `wpackagist-plugin/contact-form-7` | Simple contact forms, widely supported |
| **WPForms Lite** | `wpackagist-plugin/wpforms-lite` | Drag-and-drop form builder (free tier) |

## Performance

| Plugin | Composer Name | What It Does |
|--------|--------------|--------------|
| **Autoptimize** | `wpackagist-plugin/autoptimize` | Minifies and combines CSS/JS |
| **ShortPixel** | `wpackagist-plugin/shortpixel-image-optimiser` | Image compression and WebP conversion |

## When NOT to Use a Plugin

- If you can do it in 10-20 lines of PHP in `functions.php`, skip the plugin
- Avoid plugins that load heavy scripts site-wide for a feature used on one page
- Be wary of plugins not updated in 6+ months
- Check active installs and reviews before committing
