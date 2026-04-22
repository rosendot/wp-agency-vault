function createPostLaunchSatisfactionForm() {
  const form = FormApp.create('Atlas Studio — 30-Day Post-Launch Check-In');

  form.setDescription(
    'Your site has been live for about a month! This 3-minute check-in ' +
    'helps us catch anything that needs tweaking and make sure the care ' +
    'plan is actually delivering value. Honest answers = better service. ' +
    'Even the harsh ones — especially the harsh ones.'
  );
  form.setCollectEmail(true);
  form.setAllowResponseEdits(true);

  // ─── Overall satisfaction ────────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('First — the big picture')
    .setHelpText('One question to set the tone.');

  form.addScaleItem()
    .setTitle('Overall, how happy are you with the new site?')
    .setBounds(1, 10)
    .setLabels('Hate it', 'Love it')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Why did you give that score?')
    .setHelpText('Honesty welcome. We learn the most from the ugly answers.')
    .setRequired(true);

  // ─── Site itself ─────────────────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('The site itself')
    .setHelpText('How is it performing for you and your customers?');

  form.addScaleItem()
    .setTitle('How well does the site represent your business?')
    .setBounds(1, 10)
    .setLabels('Not at all', 'Perfectly')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('How easy is it for you to find things / navigate?')
    .setBounds(1, 10)
    .setLabels('Confusing', 'Obvious')
    .setRequired(true);

  form.addListItem()
    .setTitle('Has a customer ever commented on the site?')
    .setChoiceValues([
      'Yes — positive',
      'Yes — mixed',
      'Yes — negative',
      'Not yet',
      'Not sure',
    ])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('If yes — what did they say?')
    .setRequired(false);

  form.addListItem()
    .setTitle('Have you noticed more customers / inquiries / calls since launch?')
    .setChoiceValues([
      'Yes — noticeably more',
      'Maybe a little',
      'No change',
      'Actually fewer',
      'Too early to tell',
    ])
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Which parts of the site work best for you?')
    .setChoiceValues([
      'Home page',
      'About page',
      'Services / Menu page',
      'Contact / Reservations',
      'Gallery / Photos',
      'Reviews / Testimonials',
      'Blog / News',
      'Online ordering / booking',
      'Other',
    ])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Is there anything broken, weird, or wrong?')
    .setHelpText('Typos, bad photos, links that go nowhere, slow pages, confusing wording — anything. We fix these under the care plan for free.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Anything you wish the site did that it does not?')
    .setRequired(false);

  // ─── Care plan + service ─────────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('The care plan & working with us')
    .setHelpText('How are we doing as a vendor?');

  form.addScaleItem()
    .setTitle('How responsive have we been when you needed something?')
    .setBounds(1, 10)
    .setLabels('Ignored me', 'Lightning fast')
    .setRequired(true);

  form.addListItem()
    .setTitle('Have you asked us for any changes since launch?')
    .setChoiceValues([
      'Yes — several',
      'Yes — one or two',
      'Not yet',
    ])
    .setRequired(false);

  form.addListItem()
    .setTitle('If yes — how did we handle them?')
    .setChoiceValues([
      'Great',
      'Fine',
      'Slow',
      'Did not get what I asked for',
      'Did not handle them',
      'N/A',
    ])
    .setRequired(false);

  form.addScaleItem()
    .setTitle('Does the monthly care plan feel worth the price?')
    .setBounds(1, 10)
    .setLabels('Overpriced', 'Great value')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('What would make the care plan feel like an even better deal?')
    .setRequired(false);

  // ─── Referrals + retention ───────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('Referrals')
    .setHelpText('The question we care most about.');

  form.addScaleItem()
    .setTitle('How likely are you to recommend Atlas Studio to another business owner?')
    .setBounds(0, 10)
    .setLabels('Not at all likely', 'Extremely likely')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Who comes to mind?')
    .setHelpText('Business owner friends who could use what we did for you. Even just first names and businesses — we can ask you for intros later.')
    .setRequired(false);

  form.addListItem()
    .setTitle('Okay if we reach out to you about a referral reward program?')
    .setChoiceValues(['Yes', 'Maybe later', 'No thanks'])
    .setRequired(false);

  form.addListItem()
    .setTitle('Would you be willing to leave us a Google or Yelp review?')
    .setChoiceValues([
      'Yes — send me a link',
      'Maybe — ask me in a month',
      'Not right now',
    ])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('If you had to describe working with Atlas Studio in one sentence, what would you say?')
    .setHelpText('With your permission, we may use this as a testimonial on the site. We will always confirm before publishing.')
    .setRequired(false);

  // ─── Open feedback ───────────────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('One last thing')
    .setHelpText('The mic is yours.');

  form.addParagraphTextItem()
    .setTitle('Anything else — praise, complaints, ideas, wishlist — that we should hear?')
    .setRequired(false);

  form.addListItem()
    .setTitle('Best way to follow up with you if needed')
    .setChoiceValues(['Email', 'Phone', 'Text', 'No follow-up needed'])
    .setRequired(false);

  // ─── Link to a Sheet ─────────────────────────────────────────────────────
  const sheet = SpreadsheetApp.create('Atlas Studio — Post-Launch Satisfaction Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('✅ Form created.');
  Logger.log('Send to clients at +30 days: ' + form.getPublishedUrl());
  Logger.log('Edit form: ' + form.getEditUrl());
  Logger.log('Responses sheet: ' + sheet.getUrl());
}
