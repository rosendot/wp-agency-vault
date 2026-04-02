# Deploy Checklist

Generates a step-by-step deployment checklist for taking a client site from local dev to production. Integrates the full analyzer/improver pipeline as pre-launch quality gates.

## Usage
`/deploy-checklist <client-name>`

## Steps

1. Generate the following checklist with `$ARGUMENTS` filled in as the client name:

---

## Deploy Checklist: $ARGUMENTS

### 1. Local build complete
- [ ] Site works at `$ARGUMENTS.local` in LocalWP
- [ ] All pages render correctly
- [ ] Forms submit and validate
- [ ] Mobile responsive at 320px, 768px, 1024px, 1440px
- [ ] No console errors

### 2. Quality gates (run in order)

#### Kit validation
- [ ] Run `/audit-kit` on all kits used by the template — fix any errors

#### Code review
- [ ] Run **template-reviewer agent** on the template — fix Critical and Warning issues

#### Client readiness
- [ ] Run **template-preflight agent** on the template with client name "$ARGUMENTS"
- [ ] Run `/client-preflight` — replace all placeholder content with real client values, fix blockers

#### SEO
- [ ] Run **seo-analyzer agent** on the template
- [ ] Run `/seo-improve` — apply all Critical and Warning fixes

#### Accessibility
- [ ] Run **a11y-analyzer agent** on the template
- [ ] Run `/a11y-improve` — apply all Critical and Warning fixes
- [ ] Manually verify items flagged in the a11y report (contrast, keyboard nav)

#### Performance
- [ ] Run **perf-analyzer agent** on the template
- [ ] Run `/perf-improve` — apply all Critical and Warning fixes

### 3. Code pushed to GitHub
- [ ] Repo created: `client-$ARGUMENTS`
- [ ] Only template + Bedrock config committed (no vendor/, wp/, uploads/)
- [ ] `.env.example` committed (no secrets)
- [ ] `composer.lock` committed

### 4. Cloudways application created
- [ ] New application on Cloudways server
- [ ] Temporary `*.cloudways.dev` URL working
- [ ] SSH access confirmed
- [ ] Git pull + composer install successful
- [ ] Production `.env` created with live DB credentials

### 5. Database migrated
- [ ] Local DB exported
- [ ] Imported on Cloudways
- [ ] `wp search-replace '$ARGUMENTS.local' '<live-domain>'` run
- [ ] Permalinks flushed

### 6. Plugins configured
- [ ] Rank Math — activated, setup wizard complete, business schema set
- [ ] Wordfence Premium — activated, scan complete
- [ ] UpdraftPlus — backup schedule set (daily DB, weekly files)
- [ ] Site Kit — GA4 + Search Console connected (client's Google account)
- [ ] Redirection — activated, 404 monitoring on
- [ ] MainWP Child — installed, connected to MainWP dashboard
- [ ] POS integration connected (if applicable): Square / Clover / Toast
- [ ] Complianz — cookie consent configured (if needed)

### 7. Client accounts connected
- [ ] Domain DNS pointed to Cloudways IP (client's Cloudflare)
- [ ] SSL enabled in Cloudways
- [ ] Google Workspace MX/DKIM/SPF records set (if new email)
- [ ] GA4 property — agency added as editor
- [ ] Search Console — agency added as manager
- [ ] Google Business Profile — agency added as manager

### 8. Go-live verification
- [ ] Site loads on live domain with SSL
- [ ] All pages render correctly
- [ ] Forms submit to correct email
- [ ] POS/ordering integration works
- [ ] Mobile responsive
- [ ] Wordfence scan clean
- [ ] First UpdraftPlus backup completed
- [ ] MainWP dashboard shows site as connected

---

2. Output this checklist so the user can copy it or use it as a task list.

## Rules
- This is a reference generator — do not actually perform any deployment steps
- Always use the client name from $ARGUMENTS throughout the checklist
- If no $ARGUMENTS provided, use `<client-name>` as placeholder
- Section 2 (Quality gates) must be completed in order — each step depends on the previous
