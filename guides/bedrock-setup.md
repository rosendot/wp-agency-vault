# WordPress + Bedrock Local Development Setup Guide

## Summary

This guide walks through setting up a local WordPress development environment using **Bedrock** (a modern WordPress boilerplate by Roots) and **LocalWP** (a local server tool). The result is a version-controlled WordPress project with a custom theme, ready for client work.

### What each tool does

| Tool | Purpose |
|------|---------|
| **PHP** | The language WordPress is built on |
| **Composer** | PHP package manager — manages WordPress core and plugins as dependencies |
| **Bedrock** | A WordPress boilerplate that uses Composer, `.env` files, and a cleaner folder structure |
| **LocalWP** | Provides a local web server, MySQL database, and PHP runtime with zero config |
| **Git** | Version control for your theme and config files |

### Why Bedrock instead of vanilla WordPress?

- WordPress core is managed by Composer (like npm for PHP) — never edit core files
- Environment config lives in `.env` files (not hardcoded in `wp-config.php`)
- Better folder structure separating your code from WordPress internals
- `.gitignore` is pre-configured so you only track what matters
- Plugins are installed via Composer, making them reproducible across environments

---

## Step-by-Step Procedure

### Step 1 — Install PHP (Windows)

1. Go to **https://windows.php.net/download/**
2. Download the **VS16 x64 Thread Safe** ZIP under the latest PHP version
3. Extract it to `C:\PHP` (you should see `php.exe` directly inside)
4. Add `C:\PHP` to your system PATH:
   - Press **Win + S**, search **"Environment Variables"**
   - Click **"Edit the system environment variables"**
   - Click **"Environment Variables"** button
   - Under **User variables**, find **Path**, click **Edit**
   - Click **New**, add `C:\PHP`
   - Click **OK** on all dialogs
5. Restart your terminal and verify:
   ```
   php --version
   ```

### Step 2 — Install Composer

1. Go to **https://getcomposer.org/download/**
2. Download and run **Composer-Setup.exe**
3. The installer will auto-detect PHP at `C:\PHP\php.exe`
4. Click through with defaults
5. Restart your terminal and verify:
   ```
   composer --version
   ```

### Step 3 — Install LocalWP

1. Go to **https://localwp.com** and download
2. Install with defaults

### Step 4 — Create a Site in LocalWP

1. Open LocalWP
2. Click the **+** button (bottom left)
3. Choose **"Create a new site"**
4. Name it (e.g., `practice-wp-site-1`)
5. Choose **Preferred** for environment (PHP 8.x, MySQL 8.x, Nginx)
6. Set your WordPress username, password, and email
7. Click **Add Site**

LocalWP creates a full WordPress environment at:
```
C:\Users\<YourName>\Local Sites\practice-wp-site-1\
```

**Important:** Note the **Database** tab credentials — you'll need them later:
- Host: `localhost`
- Port: (e.g., `10005`)
- Database name: `local`
- Username: `root`
- Password: `root`

### Step 5 — Create the Bedrock Project

Open a terminal in your project directory (where your git repo is):

```bash
# Create Bedrock in a temp folder (can't create in a non-empty dir)
composer create-project roots/bedrock bedrock-temp

# Copy everything into your repo
cp -r bedrock-temp/* your-repo-folder/
cp bedrock-temp/.gitignore bedrock-temp/.env.example bedrock-temp/.editorconfig your-repo-folder/

# Clean up
rm -rf bedrock-temp
```

### Step 6 — Configure the .env File

Copy the example and fill in your LocalWP database credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
DB_NAME='local'
DB_USER='root'
DB_PASSWORD='root'
DB_HOST='localhost:10005'

WP_ENV='development'
WP_HOME='http://practice-wp-site-1.local'
WP_SITEURL="${WP_HOME}/wp"

# Generate unique values for each of these
# You can use: php -r "echo bin2hex(random_bytes(32));"
AUTH_KEY='generate-a-unique-64-char-hex-string'
SECURE_AUTH_KEY='generate-a-unique-64-char-hex-string'
LOGGED_IN_KEY='generate-a-unique-64-char-hex-string'
NONCE_KEY='generate-a-unique-64-char-hex-string'
AUTH_SALT='generate-a-unique-64-char-hex-string'
SECURE_AUTH_SALT='generate-a-unique-64-char-hex-string'
LOGGED_IN_SALT='generate-a-unique-64-char-hex-string'
NONCE_SALT='generate-a-unique-64-char-hex-string'
```

To generate all 8 salts at once:
```bash
php -r "for(\$i=0;\$i<8;\$i++){echo bin2hex(random_bytes(32)).PHP_EOL;}"
```

### Step 7 — Replace LocalWP's Default WordPress with Bedrock

1. **Stop the site** in LocalWP
2. Delete the default public folder:
   ```
   C:\Users\<YourName>\Local Sites\practice-wp-site-1\app\public\
   ```
3. Copy your entire Bedrock repo into that location as the new `public` folder

The result should look like:
```
Local Sites/practice-wp-site-1/app/public/
├── .env
├── .gitignore
├── composer.json
├── composer.lock
├── config/
├── vendor/
├── web/
│   ├── app/
│   │   ├── themes/
│   │   │   └── my-theme/    <-- your custom theme
│   │   ├── plugins/
│   │   └── uploads/
│   ├── wp/                  <-- WordPress core (managed by Composer)
│   └── index.php
└── wp-cli.yml
```

### Step 8 — Update LocalWP's Nginx Webroot

Bedrock serves from the `web/` subfolder, not the root. You need to tell Nginx.

Edit this file:
```
C:\Users\<YourName>\Local Sites\practice-wp-site-1\conf\nginx\site.conf.hbs
```

Find this line:
```nginx
root   "{{root}}";
```

Change it to:
```nginx
root   "{{root}}/web";
```

### Step 9 — Start the Site

1. Start the site in LocalWP
2. Visit `http://practice-wp-site-1.local` — you should see WordPress running
3. Visit `http://practice-wp-site-1.local/wp/wp-admin` to log in

### Step 10 — Activate Your Custom Theme

1. In WordPress admin, go to **Appearance > Themes**
2. Find **My Theme** and click **Activate**
3. Visit the site — your custom theme is now live

---

## Project Structure Explained

```
practice-wp-site-1/
│
├── composer.json          # Defines WordPress version + plugins as dependencies
├── composer.lock          # Locks exact versions (commit this)
├── .env                   # Local database credentials + salts (NEVER commit)
├── .env.example           # Template for .env (commit this)
├── .gitignore             # Pre-configured by Bedrock
│
├── config/                # Bedrock environment configs
│   ├── application.php    # Main WordPress config (replaces wp-config.php)
│   └── environments/
│       ├── development.php
│       ├── staging.php
│       └── production.php
│
├── vendor/                # Composer dependencies (gitignored)
│
└── web/                   # The webroot — Nginx points here
    ├── index.php          # Entry point — loads Bedrock's bootstrap
    ├── wp/                # WordPress core (gitignored, managed by Composer)
    └── app/               # Equivalent to wp-content/
        ├── themes/
        │   └── my-theme/  # YOUR CODE — this is what you version control
        ├── plugins/       # Installed via Composer (gitignored)
        ├── mu-plugins/    # Must-use plugins
        └── uploads/       # Media uploads (gitignored)
```

### What gets committed to Git

| Tracked | Not tracked (gitignored) |
|---------|--------------------------|
| `composer.json` / `composer.lock` | `vendor/` |
| `.env.example` | `.env` |
| `config/` | `web/wp/` (WordPress core) |
| `web/app/themes/my-theme/` | `web/app/plugins/` |
| `wp-cli.yml` | `web/app/uploads/` |

### Why this matters

- **WordPress core** is a Composer dependency — you never edit it, just update the version in `composer.json`
- **Plugins** are Composer dependencies too — add them with `composer require wpackagist-plugin/plugin-name`
- **Your theme** is the only custom code you write and track in Git
- **Uploads** (images, media) are per-environment and not tracked
- **`.env`** contains secrets — each environment (local, staging, production) has its own

---

## Custom Theme Files Explained

### style.css
Required by WordPress to identify the theme. Contains the theme metadata comment block at the top (name, author, version) plus your CSS styles.

### functions.php
The theme's "brain." This is where you:
- Register theme features (`add_theme_support`)
- Enqueue CSS and JS files (`wp_enqueue_style`, `wp_enqueue_script`)
- Register navigation menus (`register_nav_menus`)
- Create custom post types (`register_post_type`)
- Add custom fields / meta boxes (`add_meta_box`)

### index.php
Required fallback template. WordPress uses this if no more specific template exists.

### front-page.php
WordPress automatically uses this file for the homepage. This is where the hero section, menu grid, and contact section live.

### header.php
Everything from `<!DOCTYPE html>` down to where the page content begins. Called with `get_header()`.

### footer.php
Everything from the footer through `</body></html>`. Called with `get_footer()`.

### Template hierarchy
WordPress picks which PHP file to render based on a priority system:
- Homepage: `front-page.php` > `home.php` > `index.php`
- Single post: `single-{post-type}.php` > `single.php` > `index.php`
- Page: `page-{slug}.php` > `page.php` > `index.php`
- Archive: `archive-{post-type}.php` > `archive.php` > `index.php`

---

## Custom Post Types

WordPress comes with two built-in content types: **Posts** and **Pages**. Everything else you create yourself.

In `functions.php`, `register_post_type()` creates a new content type with its own admin UI. For a restaurant, we created `menu_item`. For other businesses:

| Business | Post Type | Custom Fields |
|----------|-----------|---------------|
| Restaurant | `menu_item` | price, description |
| Jewelry Store | `product` | price, material, carat |
| Salon | `service` | price, duration |
| Real Estate | `listing` | price, bedrooms, sqft, address |
| Portfolio | `project` | client, year, category |

Each custom post type gets its own section in the WordPress admin sidebar, its own editor, and its own template files.

---

## Common Commands

```bash
# Install/update all dependencies (run after cloning)
composer install

# Add a WordPress plugin via Composer
composer require wpackagist-plugin/plugin-name

# Remove a plugin
composer remove wpackagist-plugin/plugin-name

# Update WordPress core
composer update roots/wordpress

# Generate salt values
php -r "for(\$i=0;\$i<8;\$i++){echo bin2hex(random_bytes(32)).PHP_EOL;}"
```

---

## Daily Workflow

1. Open LocalWP, start your site
2. Edit theme files in your code editor
3. Refresh browser to see changes (no build step needed for basic PHP/CSS/JS)
4. Add content in WordPress admin to test your templates
5. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add menu section styling"
   git push origin main
   ```
