# FAQ Cards

Q&A displayed as a grid of cards. Question as the card title with a "Q" icon badge, answer as body text. Great for short, scannable answers. No JavaScript required.

## HTML Structure

```html
<section class="faq-cards">
    <div class="faq-cards__header">
        <h2 class="faq-cards__title">Frequently Asked Questions</h2>
        <p class="faq-cards__subtitle">Quick answers to common questions</p>
    </div>
    <div class="faq-cards__grid">
        <div class="faq-cards__card">
            <div class="faq-cards__icon" aria-hidden="true">Q</div>
            <h3 class="faq-cards__question">Question text</h3>
            <p class="faq-cards__answer">Answer text</p>
        </div>
        <!-- Repeat -->
    </div>
</section>
```

## WordPress Integration

```php
wp_enqueue_style( 'faq-cards', get_template_directory_uri() . '/assets/css/faq-cards.css', [], '1.0.0' );
```

No JavaScript needed — this is a pure CSS layout.

## Customizable Variables

| Variable | Type | Default |
|----------|------|---------|
| `sectionTitle` | string | Frequently Asked Questions |
| `sectionSubtitle` | string | Quick answers to common questions |
| `columns` | number | 3 |

Set columns via inline style on `.faq-cards__grid`:
```html
<div class="faq-cards__grid" style="grid-template-columns: repeat(3, 1fr);">
```

## Responsive

- **1024px** — 2 columns
- **600px** — 1 column
