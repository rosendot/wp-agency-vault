# Custom Post Type Kit

Register a custom post type with taxonomy and meta box. Everything you need for a new content type.

## Files
| File | Purpose |
|------|---------|
| `register-cpt.php` | `register_post_type()` + `register_taxonomy()` |
| `meta-box.php` | Custom field with nonce verification and sanitization |

## Integration

1. Copy both PHP files into your theme folder
2. In `functions.php`, include them:
```php
require_once get_template_directory() . '/register-cpt.php';
require_once get_template_directory() . '/meta-box.php';
```
3. Find and replace these placeholders:
   - `service` → your post type slug (singular, lowercase, no spaces)
   - `Services` / `Service` → your post type labels
   - `dashicons-hammer` → your icon ([dashicons list](https://developer.wordpress.org/resource/dashicons/))
4. After adding, go to **Settings → Permalinks → Save Changes** to flush rewrite rules

## Customization
- **Taxonomy**: The taxonomy is hierarchical (like categories). Set `'hierarchical' => false` for tag-style
- **Supports**: Add/remove from `'supports'` array: `title`, `editor`, `thumbnail`, `excerpt`, `custom-fields`
- **Meta fields**: Add more fields by duplicating the input blocks in `meta_box_html()` and the save logic
- **REST API**: `'show_in_rest' => true` is set for Gutenberg compatibility
