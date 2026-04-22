function createClientOnboardingForm() {
  const form = FormApp.create('Atlas Studio — New Client Onboarding');

  form.setDescription(
    'Welcome! This form helps us build your site right the first time. ' +
    'It takes 15–20 minutes. You can save progress and come back — ' +
    'just use the same browser and sign-in. Every field marked required ' +
    'is truly required for us to start, but anything you are unsure about ' +
    'you can leave blank and we will follow up.'
  );
  form.setCollectEmail(true);
  form.setAllowResponseEdits(true);
  form.setRequireLogin(false);

  // ─── Section 1: Business basics ──────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('1. Business basics')
    .setHelpText('The fundamentals we need to get started.');

  form.addTextItem()
    .setTitle('Business name (spelled exactly as you want it to appear)')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Tagline or one-line description')
    .setHelpText('Example: "Authentic Italian. Made from scratch."')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('About your business — 2 to 3 sentences')
    .setHelpText('Used on your About page. Write it the way you talk. We can polish the language.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Year founded')
    .setRequired(false);

  form.addListItem()
    .setTitle('Primary business type')
    .setChoiceValues([
      'Restaurant / Cafe / Bar',
      'Salon / Spa / Barber',
      'Contractor / Trades',
      'Retail shop',
      'Professional service',
      'Health / Fitness / Wellness',
      'Auto',
      'Real estate',
      'Other',
    ])
    .setRequired(true);

  // ─── Section 2: Contact + location ───────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('2. Contact & location')
    .setHelpText('What customers see on the site to reach you.');

  form.addTextItem()
    .setTitle('Full street address')
    .setHelpText('Example: 142 Pearl Street, Hoboken, NJ 07030')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Google Maps link to your location')
    .setHelpText('Open Google Maps → search your business → tap Share → Copy link.')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Primary phone number')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Primary email address')
    .setHelpText('Where customer inquiries should go.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Business hours')
    .setHelpText('Example:\nMon–Thu 11am–10pm\nFri–Sat 11am–11pm\nSun 10am–9pm')
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Social media — which accounts do you want linked?')
    .setChoiceValues([
      'Facebook',
      'Instagram',
      'TikTok',
      'YouTube',
      'LinkedIn',
      'Yelp',
      'Google Business Profile',
      'X / Twitter',
    ])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Social media URLs')
    .setHelpText('Paste one URL per line for each of the accounts you checked above.')
    .setRequired(false);

  // ─── Section 3: Brand assets ─────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('3. Brand & design')
    .setHelpText('How the site should look and feel.');

  form.addListItem()
    .setTitle('Do you have a logo?')
    .setChoiceValues([
      'Yes — high resolution (vector or PNG 1000px+)',
      'Yes — but only low resolution',
      'Sort of — just a text version',
      'No — need one made',
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Logo file — shared Google Drive / Dropbox link')
    .setHelpText('Upload your logo to Drive or Dropbox, share as "anyone with link can view", and paste the link here.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Brand colors — if you have them')
    .setHelpText('Example: "Dark red #b42318, cream #faf6f0, gold accents #d4a017". If you are not sure, just describe: "warm, earthy, red and gold".')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Brand fonts — if you have them')
    .setHelpText('Example: "Georgia for headings, Inter for body". If unsure, leave blank — we will pick.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Three websites you like the look of (any industry)')
    .setHelpText('Paste links and one sentence on what you like about each. Helps us match your taste.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('One or two websites you dislike')
    .setHelpText('Also helpful — tells us what to avoid.')
    .setRequired(false);

  form.addListItem()
    .setTitle('Overall vibe you want')
    .setChoiceValues([
      'Warm & traditional',
      'Modern & clean',
      'Bold & energetic',
      'Elegant & upscale',
      'Fun & casual',
      'Minimal & quiet',
      'Not sure — surprise me',
    ])
    .setRequired(false);

  // ─── Section 4: Site content ─────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('4. Site content')
    .setHelpText('What pages you need and what goes on them.');

  form.addCheckboxItem()
    .setTitle('Pages you need on the site')
    .setChoiceValues([
      'Home',
      'About',
      'Menu (restaurants)',
      'Services (service businesses)',
      'Gallery / Portfolio',
      'Reviews / Testimonials',
      'Blog / News',
      'Contact',
      'Reservations / Booking',
      'Online ordering',
      'Other',
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Services or menu items you offer')
    .setHelpText('List your top services or menu items. Include prices if customers should see them.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Unique selling points — why do customers pick you over the competition?')
    .setHelpText('Example: "Family-run for 20 years", "Wood-fired oven", "Same-day service", "Licensed & insured".')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Customer testimonials or reviews')
    .setHelpText('Paste 3–5 of your best reviews (Google, Yelp, Facebook — anywhere). Include the reviewer name if allowed.')
    .setRequired(false);

  form.addListItem()
    .setTitle('Photos — do you have professional business photos?')
    .setChoiceValues([
      'Yes, plenty (food, interior, staff, etc.)',
      'Some — could use more',
      'No — just phone snaps',
      'None — need a photographer recommendation',
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Photos folder — shared Google Drive / Dropbox link')
    .setHelpText('Dump your best 15–30 photos into a folder, share as "anyone with link", paste link here.')
    .setRequired(false);

  // ─── Section 5: Functionality ────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('5. Functionality')
    .setHelpText('What the site needs to DO, not just show.');

  form.addCheckboxItem()
    .setTitle('Features you want on the site')
    .setChoiceValues([
      'Contact form',
      'Reservation form / booking',
      'Online ordering (restaurants)',
      'Online appointment scheduler',
      'Quote request form',
      'Newsletter signup',
      'E-commerce / online store',
      'Customer login area',
      'Photo gallery with lightbox',
      'Google Maps embed',
      'Live chat',
      'Event calendar',
      'Other',
    ])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Existing tools you use that need to integrate')
    .setHelpText('Example: "Toast POS for ordering", "Square for payments", "Mailchimp for newsletter", "Calendly for booking".')
    .setRequired(false);

  form.addListItem()
    .setTitle('Do you have a domain name already?')
    .setChoiceValues([
      'Yes — I own it',
      'Yes — but I cannot find the login',
      'No — need to register one',
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Domain name (if you have one)')
    .setHelpText('Example: trattoriadelfuoco.com')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Where is the domain registered? (GoDaddy, Namecheap, Google, etc.)')
    .setRequired(false);

  form.addListItem()
    .setTitle('Do you have a business email on that domain?')
    .setChoiceValues([
      'Yes — using Google Workspace',
      'Yes — using something else',
      'No — using personal Gmail / Yahoo / etc.',
      'No — want to set up a business email',
    ])
    .setRequired(false);

  // ─── Section 6: Access & logins ──────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('6. Access & logins')
    .setHelpText('Credentials we need. If you are uncomfortable putting passwords in a form, send them via a password manager share link or we can get on a call.');

  form.addParagraphTextItem()
    .setTitle('Existing website — if any — URL and hosting provider')
    .setRequired(false);

  form.addListItem()
    .setTitle('Do you have admin login to your current website (if one exists)?')
    .setChoiceValues([
      'Yes',
      'No — lost access',
      'No — someone else manages it',
      'N/A — no existing site',
    ])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Google Business Profile — do you manage it?')
    .setHelpText('We may need access to update your website link, hours, or photos. Let us know the email that manages it.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Anything else we need access to?')
    .setHelpText('POS system, booking system, social accounts, email platform, Google Analytics, Meta Business, etc. Just list — we will reach out for specifics securely.')
    .setRequired(false);

  // ─── Section 7: Scope & timeline ─────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('7. Timeline & expectations')
    .setHelpText('Last step — helps us plan the build.');

  form.addListItem()
    .setTitle('Target launch — when do you need this live?')
    .setChoiceValues([
      'ASAP — within 2 weeks',
      'Within a month',
      'Within 2 months',
      'Flexible — quality over speed',
    ])
    .setRequired(true);

  form.addListItem()
    .setTitle('Is there a hard deadline (event, season, marketing push)?')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(false);

  form.addTextItem()
    .setTitle('If yes — what is the deadline date?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Primary point of contact for the build')
    .setHelpText('Name, role, email, phone. This is the person we ask questions during the build.')
    .setRequired(true);

  form.addListItem()
    .setTitle('Best way to reach you during the build')
    .setChoiceValues(['Email', 'Phone call', 'Text', 'Slack', 'Video call'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Anything else we should know?')
    .setHelpText('Special considerations, pet peeves, things the last web person did wrong, your cousin who says he knows HTML — anything.')
    .setRequired(false);

  // ─── Link to a Sheet ─────────────────────────────────────────────────────
  const sheet = SpreadsheetApp.create('Atlas Studio — Client Onboarding Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('✅ Form created.');
  Logger.log('Send to clients: ' + form.getPublishedUrl());
  Logger.log('Edit form: ' + form.getEditUrl());
  Logger.log('Responses sheet: ' + sheet.getUrl());
}
