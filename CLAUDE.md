# WP Agency Vault

Personal knowledge base and reusable toolkit for building WordPress client sites using Bedrock + LocalWP.

## Repo Structure

```
wp-agency-vault/
├── guides/              # Step-by-step reference docs (Bedrock, LocalWP, deployment, etc.)
├── boilerplate/         # Starter files to copy into new client projects
│   ├── theme/           # Blank starter theme skeleton
│   ├── .claude/         # Claude config to drop into any project
│   └── .env.example     # Template .env with comments
├── snippets/            # Copy-paste code patterns
│   ├── php/             # Meta boxes, nav walkers, queries, CPTs
│   ├── css/             # Grid layouts, responsive nav, hero sections
│   └── js/              # Mobile menu toggle, scroll effects
└── plugins/             # Notes on vetted plugins
    └── recommended.md   # Plugin list with use cases
```

## Conventions

- All guides assume **Bedrock** (Roots) project structure with **LocalWP** for local dev
- WordPress core and plugins are managed via **Composer** — never edit them directly
- Only the custom theme is version-controlled in client projects
- `.env` files contain secrets and are never committed
- Snippets should be self-contained and include a comment header explaining usage
- PHP follows WordPress coding standards (tabs for indentation, snake_case functions)

## Stack

- **PHP** — WordPress language
- **Composer** — PHP dependency management
- **Bedrock** — Modern WordPress boilerplate (Roots)
- **LocalWP** — Local development server
- **Git** — Version control (theme + config only)
