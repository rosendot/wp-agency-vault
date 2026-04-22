function createMarketResearchForm() {
  const form = FormApp.create('Atlas Studio — Local Business Market Research');

  form.setDescription(
    'Quick field-research questionnaire for local businesses. ' +
    'Takes 5–10 minutes per business. Answers are used to size up ' +
    'the market, identify pain points, and price Atlas Studio services.'
  );
  form.setCollectEmail(false);
  form.setAllowResponseEdits(true);
  form.setShowLinkToRespondAgain(true);

  form.addPageBreakItem()
    .setTitle('About this visit')
    .setHelpText('Basic info captured for every business you talk to.');

  form.addTextItem()
    .setTitle('Business name')
    .setRequired(true);

  form.addListItem()
    .setTitle('Business category')
    .setChoiceValues([
      'Restaurant / Cafe / Bar',
      'Salon / Spa / Barber',
      'Contractor / Trades (plumber, electrician, HVAC, etc.)',
      'Retail shop',
      'Professional service (lawyer, accountant, consultant)',
      'Health / Fitness / Wellness',
      'Auto (dealer, repair, wash)',
      'Real estate',
      'Other',
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Location (strip mall name or cross streets)')
    .setRequired(false);

  form.addListItem()
    .setTitle('Size')
    .setChoiceValues(['Solo / owner-operator', '2–5 employees', '6+ employees'])
    .setRequired(true);

  form.addListItem()
    .setTitle('Spoke to')
    .setChoiceValues(['Owner', 'Manager', 'Staff', 'Other'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Vibe / visible signals')
    .setHelpText('Busy? Quiet? Upscale? Casual? Any visible POS, online ordering posters, "we deliver" signage?')
    .setRequired(false);

  const trackPage = form.addPageBreakItem()
    .setTitle('Track selector')
    .setHelpText('Pick which questionnaire fits.');

  const trackQuestion = form.addListItem()
    .setTitle('Do they already have a website?')
    .setRequired(true);

  const trackAPage = form.addPageBreakItem()
    .setTitle('Track A — They already have a website')
    .setHelpText('Dig into cost, maintenance, pain points.');

  form.addListItem()
    .setTitle('Is the website on their radar much?')
    .setChoiceValues([
      'Very — they check / update it often',
      'Sometimes',
      'Mostly set-and-forget',
    ])
    .setRequired(false);

  form.addListItem()
    .setTitle('Who built it?')
    .setChoiceValues([
      'Agency',
      'Freelancer',
      'Family / friend',
      'DIY (Wix / Squarespace / GoDaddy / WordPress.com)',
      'Don\'t know',
    ])
    .setRequired(false);

  form.addListItem()
    .setTitle('How long ago was it built?')
    .setChoiceValues([
      'Less than 1 year',
      '1–3 years',
      '3–5 years',
      '5+ years',
      'Don\'t know',
    ])
    .setRequired(false);

  form.addListItem()
    .setTitle('Who updates it?')
    .setChoiceValues([
      'Owner / staff themselves',
      'Original builder',
      'Different person now',
      'Never gets updated',
    ])
    .setRequired(false);

  form.addTextItem()
    .setTitle('Roughly what did it cost to build?')
    .setHelpText('Even a rough range is fine — "a few hundred", "a few thousand", "don\'t remember".');

  form.addTextItem()
    .setTitle('Monthly cost, if any?')
    .setHelpText('Hosting, maintenance, SEO, domain — anything recurring.');

  form.addListItem()
    .setTitle('Do they feel they\'re getting value for the monthly fee?')
    .setChoiceValues(['Yes', 'Somewhat', 'No', 'No monthly fee', 'Not sure'])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('When something breaks or needs changing, how long does it take to get fixed?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Biggest annoyance with the current website?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Anything they\'ve wanted to add but haven\'t? Why not?')
    .setRequired(false);

  form.addListItem()
    .setTitle('Has the site ever gone down or been hacked?')
    .setChoiceValues(['Yes', 'No', 'Not sure'])
    .setRequired(false);

  form.addListItem()
    .setTitle('Does the website actually bring in customers?')
    .setChoiceValues([
      'Yes — measurable impact',
      'Some — it helps a bit',
      'No — mostly just a business card',
      'Not sure',
    ])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Magic wand — one thing they\'d change?')
    .setRequired(false);

  form.addListItem()
    .setTitle('Ever considered switching to a different web person?')
    .setChoiceValues(['Yes, actively looking', 'Yes, but not sure how', 'No', 'Once, but stayed'])
    .setRequired(false);

  form.addListItem()
    .setTitle('Interest in a custom rebuild + ongoing care flat monthly fee?')
    .setChoiceValues([
      'Very interested',
      'Somewhat interested',
      'Maybe — need more info',
      'Not interested',
    ])
    .setRequired(false);

  const trackBPage = form.addPageBreakItem()
    .setTitle('Track B — They do NOT have a website')
    .setHelpText('Dig into barriers, interest, willingness to pay.');

  form.addCheckboxItem()
    .setTitle('How do customers find them now?')
    .setChoiceValues([
      'Walk-in / foot traffic',
      'Word of mouth',
      'Google (search / maps)',
      'Social media (FB / IG / TikTok)',
      'Yelp or similar',
      'Referrals from other businesses',
      'Other',
    ])
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Existing online presence')
    .setChoiceValues([
      'Google Business Profile',
      'Facebook page',
      'Instagram',
      'Yelp',
      'None / not sure',
    ])
    .setRequired(false);

  form.addListItem()
    .setTitle('Have they ever had a website before?')
    .setChoiceValues([
      'No, never',
      'Yes, but it expired / got taken down',
      'Yes, long time ago',
    ])
    .setRequired(false);

  form.addListItem()
    .setTitle('Have they thought about getting one?')
    .setChoiceValues([
      'Yes, actively',
      'Occasionally',
      'Not really',
      'Never',
    ])
    .setRequired(false);

  form.addTextItem()
    .setTitle('Have they been quoted before? Roughly how much?')
    .setHelpText('Free text — "no", "$500 once", "got pitched $99/mo", etc.');

  form.addCheckboxItem()
    .setTitle('Main barrier to getting one')
    .setChoiceValues([
      'Cost',
      'Don\'t have time',
      'Not sure what to put on it',
      'Not sure it\'s worth it',
      'Bad experience with someone before',
      'Don\'t know who to trust',
      'Other',
    ])
    .setRequired(false);

  form.addListItem()
    .setTitle('Feel like they\'re missing out on customers without one?')
    .setChoiceValues(['Yes, definitely', 'Maybe', 'No, not really'])
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('If they had a website tomorrow, what would it do?')
    .setChoiceValues([
      'Show menu / services / pricing',
      'Take reservations / appointments',
      'Take orders / online sales',
      'Show hours + location + contact',
      'Show photos / portfolio',
      'Reviews / testimonials',
      'Blog / news',
      'Other',
    ])
    .setRequired(false);

  form.addListItem()
    .setTitle('Do they have good photos of the business?')
    .setChoiceValues(['Yes, plenty', 'Some', 'Not really', 'None'])
    .setRequired(false);

  form.addListItem()
    .setTitle('Do they have a logo?')
    .setChoiceValues(['Yes', 'Sort of', 'No'])
    .setRequired(false);

  form.addListItem()
    .setTitle('Fair upfront cost for a custom website?')
    .setChoiceValues([
      'Under $500',
      '$500–$1,000',
      '$1,000–$2,500',
      '$2,500–$5,000',
      '$5,000+',
      'No idea',
    ])
    .setRequired(false);

  form.addListItem()
    .setTitle('Fair monthly cost for maintenance + hosting?')
    .setChoiceValues([
      'Under $50/mo',
      '$50–$100/mo',
      '$100–$200/mo',
      '$200+/mo',
      'Wouldn\'t want monthly',
      'No idea',
    ])
    .setRequired(false);

  form.addListItem()
    .setTitle('Ever been pitched a "we build + host forever" monthly deal?')
    .setChoiceValues(['Yes, took it (bad)', 'Yes, declined', 'No'])
    .setRequired(false);

  form.addScaleItem()
    .setTitle('Interest level in getting a website in the next 6 months')
    .setBounds(1, 10)
    .setLabels('Not at all', 'Very interested')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('What would have to happen for their interest to go up?')
    .setRequired(false);

  const endPage = form.addPageBreakItem()
    .setTitle('Wrap up')
    .setHelpText('A few last fields for both tracks.');

  form.addParagraphTextItem()
    .setTitle('Best verbatim quote')
    .setHelpText('One memorable sentence they said. Priceless for landing copy later.')
    .setRequired(false);

  form.addListItem()
    .setTitle('Follow-up?')
    .setChoiceValues(['Yes — hot lead', 'Maybe — check back later', 'No'])
    .setRequired(false);

  form.addListItem()
    .setTitle('Best contact method')
    .setChoiceValues(['Email', 'Phone', 'Drop by', 'Didn\'t give any'])
    .setRequired(false);

  form.addTextItem()
    .setTitle('Contact info (if given)')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Your notes (vibe, signals, red flags, gut read)')
    .setRequired(false);

  trackQuestion.setChoices([
    trackQuestion.createChoice('Yes, they have a website', trackAPage),
    trackQuestion.createChoice('No, no website', trackBPage),
  ]);

  trackAPage.setGoToPage(endPage);
  trackBPage.setGoToPage(FormApp.PageNavigationType.CONTINUE);
  endPage.setGoToPage(FormApp.PageNavigationType.SUBMIT);

  const sheet = SpreadsheetApp.create('Atlas Studio — Market Research Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('✅ Form created.');
  Logger.log('Fill out on phone: ' + form.getPublishedUrl());
  Logger.log('Edit form: ' + form.getEditUrl());
  Logger.log('Responses sheet: ' + sheet.getUrl());
}
