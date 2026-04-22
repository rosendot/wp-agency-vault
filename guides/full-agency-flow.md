# Atlas Studio infrastructure – full flow

## The big picture

Five layers. Everything flows top to bottom.

```
Your machine
     → git push
GitHub
     → git pull + composer install
Cloudways server
     → UpdraftPlus scheduled backups
Your cloud storage
     → client connects their own accounts
External services (POS, email, domain, analytics)
```

---

## Layer 1 – Your machine (local dev)

Where everything is built. Nothing goes live from here directly.

**Tools running locally:**
- **LocalWP** – runs a full WordPress environment at `clientname.local`, zero config
- **VS Code** – where you write code
- **Composer** – PHP package manager, installs WP core and plugins as dependencies
- **Git** – version control

**What a client project looks like locally (Bedrock structure):**

```
client-tacoria/               → git repo (your code only)
├── composer.json             → defines WP core version + plugins
├── composer.lock             → locks exact versions (committed)
├── .env                      → local DB credentials + salts (never committed)
├── .env.example              → template for .env (committed)
├── config/                   → Bedrock environment configs
└── web/
    ├── wp/                   → WordPress core (gitignored, managed by Composer)
    └── app/
        ├── themes/
        │   └── tacoria/      → YOUR custom theme (the only thing you write)
        ├── plugins/          → installed via Composer (gitignored)
        └── uploads/          → media (gitignored)
```

**What gets committed to Git:**

| Tracked | Not tracked |
|---------|-------------|
| `composer.json` / `composer.lock` | `vendor/` |
| `.env.example` | `.env` (secrets) |
| `config/` | `web/wp/` (WP core) |
| `web/app/themes/tacoria/` | `web/app/plugins/` |
| `wp-cli.yml` | `web/app/uploads/` |

---

## Layer 2 – GitHub

One private repo per client. The Atlas Studio repos (internal vault, public frontend, backend) each live separately.

```
GitHub/
├── atlas-studio-internal/    → internal toolkit (kits, base themes, guides, dashboard)
├── atlas-studio-frontend/    → public brochure site (atlasstudio.com)
├── atlas-studio-backend/     → internal backend services
├── client-tacoria/           → Tacoria's site
├── client-sunrise-salon/     → Salon's site
└── client-jewelry-co/        → Jewelry store's site
```

**What lives in the vault vs client repos:**

| `atlas-studio-internal` (vault) | Client repo |
|--------------------------------|-------------|
| Reusable kits (carousel, nav, hero, etc.) | Bedrock config |
| Base themes to pull from | Client-specific custom theme |
| Plugin registry (JSON) | composer.json referencing vault kits |
| Guides + documentation | .env.example |

The vault is the studio's competitive moat. Client repos are the deliverables built from it. Client repos pull from the vault via Git submodules or Composer – they never duplicate vault code.

---

## Layer 3 – Cloudways server (DigitalOcean)

One server. Multiple WordPress installs. Each is a separate "application" with its own database, domain, and file system. They share server hardware and the caching stack – nothing else.

**Server sizing:**
- 2GB ($28/mo) – up to ~5 clients
- 4GB ($54/mo) – ~5–12 clients
- 8GB ($107/mo) – 12+ clients

**Caching stack (shared across all sites):**
Varnish + Redis + Breeze – replaces WP Rocket. No extra cost, no extra plugin.

**What's running on this server:**

```
Cloudways server
├── mainwp.atlasstudio.com    → Atlas Studio's own site (not a client site)
│   └── MainWP Pro plugin     → monitors + manages all client sites
│
├── tacoria.com               → Client site A
│   ├── Custom theme (pulled from GitHub)
│   ├── Rank Math             → SEO (agency license, covers all sites)
│   ├── Wordfence Premium     → Security (per-site license)
│   ├── UpdraftPlus Enterprise→ Backups (agency license, covers all sites)
│   ├── WooCommerce           → E-commerce engine (free)
│   ├── Square for WooCommerce→ POS sync (free)
│   ├── Site Kit by Google    → GA4 + Search Console (free)
│   ├── Redirection           → 301 redirects + 404 tracking (free)
│   ├── MainWP Child          → connects site to your MainWP dashboard (free)
│   └── .env                  → production DB credentials + API keys
│
├── sunrisesalon.com          → Client site B
│   └── (same plugin stack)
│
└── ...more client sites
```

**MainWP – how it connects:**

MainWP lives on its own WordPress install on the same server. Each client site has the free MainWP Child plugin installed. MainWP uses an encrypted connection to pull data from every child site into one dashboard. From there you can:
- Push plugin/theme updates to all sites at once
- Monitor uptime, security scan status, backup status
- Generate white-label monthly maintenance reports for clients
- Run bulk actions across all sites

Clients never see or touch MainWP. It's your ops layer.

**Plugin license coverage:**

| Plugin | License type | Covers |
|--------|-------------|--------|
| Rank Math Business | Agency | 100 sites – one license for all |
| Wordfence Premium | Per-site | 1 license per client site |
| UpdraftPlus Enterprise | Agency | Unlimited sites – one license for all |
| MainWP Pro | Agency | Unlimited child sites |
| Complianz Agency | Agency | 25 sites (buy when first client needs it) |

---

## Layer 4 – Your cloud storage

UpdraftPlus runs on a schedule you set (daily or weekly) and sends encrypted backups off-site. Separate from Cloudways so a server problem doesn't take your backups with it.

Storage options: AWS S3, Backblaze B2, Google Drive, Dropbox. Your choice.

Never rely solely on Cloudways snapshots. UpdraftPlus is the safety net.

---

## Layer 5 – External services (client-owned)

Clients pay for these directly. You configure the connections as part of onboarding. You are never the middleman on these costs.

| Service | Who pays | What you do |
|---------|---------|-------------|
| Square / Clover / Toast | Client | Connect APIs, build ordering UI or sync WooCommerce |
| Google Workspace | Client (~$7/user/mo) | Configure MX records on their domain |
| Cloudflare domain | Client (~$10–15/yr) | Point DNS to Cloudways, set up SSL |
| SendGrid / Mailgun | You (via functions.php) | SMTP relay for form submissions + order emails |
| GA4 + Search Console | Client (free) | Connect via Site Kit, give client direct dashboard access |
| Stripe | You | Recurring $149/mo retainer per client. Client pays via Stripe payment link on go-live day. |

---

## Local → production workflow

Step by step for each new client:

```
1. Build locally
   └── Create new site in LocalWP
   └── Set up Bedrock project
   └── Pull base theme from vault, customize for client
   └── Build + test at clientname.local

2. Create production app
   └── New application in Cloudways (takes 2 min)
   └── Gets a temporary *.cloudways.dev URL → work here before DNS switches

3. Deploy code
   └── Push theme to GitHub
   └── SSH into Cloudways, git pull, composer install
   └── Create .env with production DB credentials + live URL

4. Migrate database
   └── Export local DB
   └── Import on Cloudways
   └── wp search-replace 'clientname.local' 'clientname.com'

5. Configure plugins
   └── Activate + configure Rank Math (set business schema)
   └── Activate + configure Wordfence
   └── Set up UpdraftPlus backup schedule
   └── Connect Square/Clover/Toast APIs
   └── Connect Site Kit (GA4 + Search Console)
   └── Install MainWP Child, connect to your MainWP dashboard

6. Go live
   └── Point client's Cloudflare domain → Cloudways IP
   └── Enable SSL in Cloudways (one click)
   └── Test everything on live domain
   └── Done
```

---

## GitHub repo structure – full picture

```
GitHub/
│
├── atlas-studio-internal/              → private vault (this repo)
│   ├── app/                            → Next.js dashboard
│   ├── websites/                       → mocks, in-progress builds, live client sites
│   ├── kits/                           → reusable components
│   ├── palettes/                       → color systems + typography
│   ├── plugins/                        → plugin + tools registry (JSON)
│   └── guides/                         → this file lives here
│
├── atlas-studio-frontend/              → public brochure site (atlasstudio.com)
│   └── (Astro + Tailwind + Vercel)
│
├── atlas-studio-backend/               → internal backend services
│
├── client-tacoria/                     → one repo per client
│   ├── composer.json
│   ├── .env.example
│   ├── config/
│   └── web/app/themes/tacoria/
│
├── client-sunrise-salon/
└── client-jewelry-co/
```

---

## What you monitor vs what clients touch

| You monitor (silently) | Client touches |
|----------------------|----------------|
| Wordfence alerts (your email) | Their content in wp-admin |
| Plugin/theme updates via MainWP | Their POS dashboard (menu, inventory) |
| UpdraftPlus backup logs | Their Google Workspace (email) |
| Uptime monitoring | Nothing else |
| Monthly report – emailed to client | |

Clients never log into Cloudways, MainWP, Wordfence, or UpdraftPlus. That's what the retainer covers.
