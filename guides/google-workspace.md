# Google Workspace

General reference for running Google Workspace as a small business — accounts, tools, automation, and the pieces that matter when your business lives on Google.

## The Google services worth knowing

| Service | Use for |
|---------|---------|
| **Gmail** | Business email |
| **Google Drive** | File storage, sharing, client deliverables |
| **Google Docs / Sheets / Slides** | Documents, spreadsheets, presentations |
| **Google Forms** | Simple questionnaires and internal surveys (data lands in a Sheet) |
| **Google Calendar** | Scheduling, meeting invites |
| **Google Meet** | Video calls (included with Workspace) |
| **Google Business Profile** | The free business listing that shows up on Maps and Search |
| **Google Analytics (GA4)** | Website traffic analytics |
| **Google Search Console** | How your site performs in Google search results |
| **Google Tag Manager** | Manage analytics / pixel / conversion tags without touching site code |
| **Google Apps Script** | Write JavaScript that automates any of the above |

## Personal Gmail vs Google Workspace

**Personal Gmail** (the free `@gmail.com` account):
- Free
- Works fine for one person running a side project
- You cannot have email at your own domain (`you@yourbusiness.com`)
- File ownership lives with one person; not transferable to the business later without hassle
- Fine for getting started; moveable later

**Google Workspace** (paid, starts around $6/user/month at time of writing):
- Custom domain email (`you@yourbusiness.com`)
- Shared drives (files owned by the org, not a person — survives employee turnover)
- Admin console for managing users, permissions, security
- Better security (2FA enforcement, device management, audit logs)
- Increased storage, business support
- Required once you have more than one person or want professional email

**When to switch:** the day you register a business domain and want email at it. Don't delay — every file you create in your personal account will have to be transferred later, and some (especially forms, calendars, sheets owned by the personal account) are painful to move.

## Transferring ownership between Google accounts

Situation: you built something in your personal account and need to move it to a new business / Workspace account.

Three paths:

### 1. Change owner (cleanest)
Share the file with the new account → open Share dialog → click the 3-dot menu next to the new account's name → **Make owner**.
- Works for Docs, Sheets, Slides, Forms, individual Drive files
- Both accounts must be on standard Gmail OR same Workspace organization
- Workspace accounts sometimes block cross-domain transfers

### 2. Move into a Shared Drive
If the target is a Workspace account with Shared Drives enabled:
- Create a Shared Drive on the new account
- Drag files from your personal Drive into the Shared Drive
- Ownership becomes the organization itself, not a user

### 3. Make a copy
- Open the file on the new account → **File → Make a copy**
- The copy is owned by whoever copied it (new account = new owner)
- You lose linked responses for Forms — use only for starting fresh
- Simplest fallback when ownership transfer is blocked

**For Google Forms specifically:** option 1 usually works. If the form has a linked Sheet, transfer both. The response history stays intact.

**For Google Calendar:** calendars can't change owner — but you can share a calendar with the new account with "Make changes and manage sharing" permission, which is effectively the same thing.

**For Google Business Profile:** the transfer flow is different — it lives in Business Profile Manager. The new owner requests access; the existing owner approves within 7 days.

## Google Apps Script — the overlooked power tool

Apps Script is JavaScript that runs on Google's servers with direct access to your Google services. Free with any Google account.

### What you can automate

- Create / edit / delete Forms, Docs, Sheets, Slides programmatically
- Send emails from your Gmail (with quota limits)
- Create / update Calendar events
- Move files around in Drive
- Trigger scripts on a schedule (every day at 9am, every Monday, etc.)
- Trigger scripts on events (new form submission, new calendar event, new email matching a filter)
- Call external HTTP APIs (integrate with anything that has an API)
- Build lightweight web apps (HTML served by Apps Script)

### When to use it

- You're about to manually do the same thing more than 5 times
- You want to scaffold a Form or Sheet with dozens of fields — much faster to write a script once
- You need an automation that Zapier / Make would charge for but Apps Script does free
- You want a scheduled reminder, report, or cleanup job

### When not to use it

- Anything customer-facing that needs to look polished — Apps Script web apps have a visible Google footer
- High-volume workflows (Apps Script has execution quotas: 6 min per run on free accounts, 30 min on Workspace)
- Anything that needs sub-second latency

### How to run a script

1. [script.google.com](https://script.google.com)
2. **New project**
3. Paste code
4. Save (Ctrl+S)
5. Click **Run** (▶)
6. First run only: approve OAuth permissions
7. Check the **Execution log** at the bottom for output

### Minimal example — create a Form with a linked Sheet

```javascript
function makeForm() {
  const form = FormApp.create('Example form');
  form.setDescription('Built in 10 lines of Apps Script.');

  form.addTextItem().setTitle('Your name').setRequired(true);
  form.addParagraphTextItem().setTitle('Comments');
  form.addListItem()
    .setTitle('How did you hear about us?')
    .setChoiceValues(['Friend', 'Google', 'Social media', 'Other']);
  form.addScaleItem()
    .setTitle('Rating')
    .setBounds(1, 5)
    .setLabels('Poor', 'Great');

  const sheet = SpreadsheetApp.create('Example form — responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('Form: ' + form.getPublishedUrl());
  Logger.log('Sheet: ' + sheet.getUrl());
}
```

### Minimal example — scheduled email

```javascript
function dailyReminder() {
  GmailApp.sendEmail(
    'you@example.com',
    'Daily check',
    'This fires every morning at 9am.'
  );
}
// Then in the Apps Script editor:
// ⏱ Triggers (left sidebar) → Add Trigger → dailyReminder, time-driven, day timer, 9am–10am
```

### Minimal example — clean up files by title

Useful when scripts create test files you want to remove in bulk.

```javascript
function trashFilesByTitle(titleContains) {
  const files = DriveApp.searchFiles('title contains "' + titleContains + '"');
  let count = 0;
  while (files.hasNext()) {
    const file = files.next();
    Logger.log('Trashing: ' + file.getName());
    file.setTrashed(true);
    count++;
  }
  Logger.log('Trashed ' + count + ' file(s). Empty Drive trash manually to finalize.');
}

// Call it like:
// trashFilesByTitle('Old test form');
```

Files stay in Drive trash for 30 days — empty trash in Drive to make the deletion permanent sooner.

## Google Forms quick reference

Full item-type list for Apps Script:

```javascript
form.addTextItem()             // single-line text
form.addParagraphTextItem()    // multi-line text
form.addListItem()             // dropdown
form.addMultipleChoiceItem()   // radio buttons
form.addCheckboxItem()         // checkboxes
form.addScaleItem()            // linear scale (1–5, 1–10, etc.)
form.addGridItem()             // multiple choice grid
form.addCheckboxGridItem()     // checkbox grid
form.addDateItem()             // date picker
form.addTimeItem()             // time picker
form.addDateTimeItem()         // date + time
form.addDurationItem()         // hh:mm:ss duration
form.addSectionHeaderItem()    // visual section header (no input)
form.addPageBreakItem()        // page break (for multi-page forms + branching)
form.addImageItem()            // image
form.addVideoItem()            // video
form.addFileUploadItem()       // file upload (requires sign-in)
```

### Branching between pages

```javascript
const pageA = form.addPageBreakItem().setTitle('Path A');
// ...Path A questions...
const pageB = form.addPageBreakItem().setTitle('Path B');
// ...Path B questions...
const wrapUp = form.addPageBreakItem().setTitle('Wrap up');
// ...shared questions...

const router = form.addListItem().setTitle('Which path?');
router.setChoices([
  router.createChoice('A', pageA),
  router.createChoice('B', pageB),
]);

// Skip B after A finishes
pageA.setGoToPage(wrapUp);
// B flows naturally into the next page
pageB.setGoToPage(FormApp.PageNavigationType.CONTINUE);
// Wrap-up submits
wrapUp.setGoToPage(FormApp.PageNavigationType.SUBMIT);
```

Page navigation only works reliably when set AFTER all items are added.

## Google Drive tips

- **Search operators** work in the Drive search box: `type:pdf`, `owner:me`, `before:2025-01-01`, `title:contains "invoice"`. Same syntax works in `DriveApp.searchFiles()` in Apps Script.
- **Shared with me** files don't appear in search unless you explicitly add them to your Drive — right-click → **Add shortcut to Drive**.
- **Version history** on any Doc / Sheet / Slide: `File → Version history → See version history`. You can name versions and revert.
- **Request access** flow: if a link says access denied, always click "Request access" — the owner gets a one-click approval email. Faster than emailing them.

## Google Calendar tips

- **Multiple calendars** per account — create a separate one for client work, personal, etc. Toggle visibility to reduce noise.
- **Appointment slots / booking pages** — built into Calendar. Free. Simpler than Calendly for 1-on-1 bookings.
- **Find a time** feature when inviting attendees shows everyone's free/busy (if they're on Calendar and share free/busy).
- **Quick meet link** — any event can get a Meet link with one click. No Zoom needed.

## Google Business Profile (GBP)

The free listing that shows up on Google Maps and in search results when someone Googles a business. Historically called "Google My Business."

Key things to know:
- It's free; it's a huge source of local traffic
- Claim it early — even before a site exists, a claimed GBP shows hours, phone, address, and reviews
- Verify with postcard, phone, or video call (depends on business type)
- Post updates, photos, hours changes, holiday hours
- Reply to reviews (especially the negative ones)
- Questions & Answers section — customers can ask; you can answer or pre-answer common ones
- For agencies helping clients: they add you as a manager in GBP settings. You do not need their login.

## Google Analytics 4 (GA4) and Search Console

Two different tools, commonly confused:

- **GA4** = what visitors do on your site (pageviews, session length, traffic sources, conversion events)
- **Search Console** = how Google indexes and ranks your site (what queries brought people, click-through rates, coverage errors, sitemap submission)

Install both on every site you ship. Free. Wire both with a Google Tag Manager container so you can add more tags (Meta Pixel, Hotjar, etc.) without changing site code.

## Security basics

- **2FA everywhere** — use an authenticator app (Google Authenticator, Authy, 1Password's built-in). Avoid SMS.
- **Passkeys** — Google supports these now and they're great for personal accounts. Set one up as a backup.
- **Account recovery** — set a recovery email AND phone. If you lose access, Google needs multiple signals to verify you.
- **Per-app passwords** — if you ever need a legacy app to access Gmail, use app passwords, not your main one.
- **Security checkup** — Google nudges you to this occasionally. Actually do it.

## Common gotchas

- **Sheet responses tab from a Form** — don't edit the header row manually, don't reorder columns. Apps Script and form submissions assume the original order. Instead, use a second tab with `=QUERY()` or `=ARRAYFORMULA()` formulas pointing at the responses tab.
- **"Force copy" Doc / Sheet links** — replace `/edit` at the end of any share URL with `/copy` and anyone who clicks gets their own copy. Useful for distributing templates.
- **Drive storage fills up from email attachments** — Workspace storage is pooled. Use the Drive storage breakdown to find oversized files.
- **Forms "anyone can respond" vs "restricted to domain"** — toggle depending on whether the audience is internal or public. Default for Workspace is usually domain-restricted.
- **Calendar invite "Yes" with no email reply** — the invite tracks RSVPs in the event itself, not via email. Check the event attendee list.

## Troubleshooting

**Apps Script "Authorization required":** normal on first run. Approve OAuth; Google requires explicit permission for the script to touch your data.

**Script keeps timing out:** Apps Script has a 6-min execution limit (free) / 30-min (Workspace). Break long-running jobs into smaller chunks triggered sequentially, or use batch operations (`Range.setValues()` beats looping `Range.setValue()` by 100x).

**Form / Sheet / Doc I deleted keeps appearing in Recent:** the "Recent" list is a cache independent of Drive trash. Either wait a day, or trash the item AND empty Drive trash AND hard-refresh the Recent view.

**"This account is not authorized to use this API":** usually means you're trying to use a Workspace-only API from a personal account, OR admin policies block the API. Check the Workspace admin console if applicable.

## Further reading

- [Google Apps Script docs](https://developers.google.com/apps-script) — all APIs and examples
- [Google Workspace admin help](https://support.google.com/a/) — for Workspace-specific setup
- [Google Business Profile help](https://support.google.com/business) — GBP specifics
- [GA4 migration guide](https://support.google.com/analytics) — if you're still on old Universal Analytics (it was sunset in 2023)
