# Client Onboarding

What the client needs to do before launch. Send this checklist to every new client at the start of the project.

## What you need from the client

### Domain
- Register a domain via Cloudflare Registrar (~$10–15/yr)
- Add agency as a member on their Cloudflare account
- Do NOT register the domain in the agency's name — it must be theirs

### Email
- Set up Google Workspace (~$7/user/mo) using their domain
- Agency will configure MX, DKIM, and SPF records during setup
- Add agency as admin for troubleshooting access

### Google accounts
The following are free and must be set up in the client's Google account:
- **Google Analytics (GA4)** — create a property, add agency as editor
- **Google Search Console** — add their domain, add agency as manager
- **Google Business Profile** — claim or create their listing, add agency as manager

### POS access
- **Square** — provide API credentials (sandbox first, then production)
- **Clover** — provide API credentials or Zaytech account access
- **Toast** — provide partner API access if applicable

### Content to provide
- [ ] Business logo (SVG or PNG, high resolution)
- [ ] Brand colors (hex values if known)
- [ ] Business photos (interior, exterior, food/products, team)
- [ ] Menu or services list with descriptions and pricing
- [ ] Hours of operation
- [ ] Address and phone number
- [ ] Any existing social media profile URLs
- [ ] 2–3 websites they like the look of (for design direction)

### Billing
- Client will receive a Stripe payment link on the day they sign the contract
- $399/mo charged automatically on the same date each month
- First charge is on the go-live date, not the contract date

## Agency's responsibilities during onboarding

- [ ] Send contract via eSignature, receive signed copy before starting
- [ ] Send Stripe payment link
- [ ] Create Cloudways application for their site
- [ ] Create private GitHub repo for their project
- [ ] Collect all content listed above before beginning design
- [ ] Set up DNS records once domain and hosting are ready
