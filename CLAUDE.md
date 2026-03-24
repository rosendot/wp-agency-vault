# WP Agency Vault

Personal knowledge base and reusable toolkit for building WordPress client sites using Bedrock + LocalWP.

## Repo Structure

```
wp-agency-vault/
├── kits/                    # Ready-to-ship feature kits (grab and go)
│   ├── infinite-carousel/   # Carousel with infinite loop, arrows, swipe
│   ├── mobile-nav/          # Responsive hamburger menu
│   ├── hero-section/        # Full-width hero with overlay
│   ├── google-map-embed/    # Maps iframe + contact info grid
│   └── custom-post-type/    # CPT + taxonomy + meta box
├── guides/                  # Step-by-step reference docs
├── boilerplate/             # Starter files to copy into new projects
│   └── theme/               # Blank starter theme skeleton
└── plugins/                 # Notes on vetted plugins
    └── recommended.md
```

## Conventions

- All guides assume **Bedrock** (Roots) project structure with **LocalWP** for local dev
- WordPress core and plugins are managed via **Composer** — never edit them directly
- Only the custom theme is version-controlled in client projects
- `.env` files contain secrets and are never committed
- Each kit is self-contained: all files for one feature in one folder with a README
- Kit READMEs explain integration, HTML structure, and customization options
- PHP follows WordPress coding standards (tabs for indentation, snake_case functions)

## Stack

- **PHP** — WordPress language
- **Composer** — PHP dependency management
- **Bedrock** — Modern WordPress boilerplate (Roots)
- **LocalWP** — Local development server
- **Git** — Version control (theme + config only)
