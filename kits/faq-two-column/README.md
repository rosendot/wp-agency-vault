# FAQ Two-Column

Two-column FAQ layout. Questions listed on the left, clicking one displays the full answer on the right panel. First question selected by default. Clean and spacious.

## HTML Structure

```html
<section class="faq-two-col">
    <div class="faq-two-col__header">
        <h2 class="faq-two-col__title">Frequently Asked Questions</h2>
        <p class="faq-two-col__subtitle">Click a question to see the answer</p>
    </div>
    <div class="faq-two-col__grid">
        <div class="faq-two-col__questions" role="tablist">
            <button class="faq-two-col__question" role="tab" aria-selected="false"
                data-question="Question text"
                data-answer="Answer text">
                Question text
            </button>
            <!-- Repeat -->
        </div>
        <div class="faq-two-col__answer" role="tabpanel">
            <h3 class="faq-two-col__answer-title"></h3>
            <p class="faq-two-col__answer-text"></p>
            <div class="faq-two-col__answer-empty">Select a question</div>
        </div>
    </div>
</section>
```

## WordPress Integration

```php
wp_enqueue_style( 'faq-two-column', get_template_directory_uri() . '/assets/css/faq-two-column.css', [], '1.0.0' );
wp_enqueue_script( 'faq-two-column', get_template_directory_uri() . '/assets/js/faq-two-column.js', [], '1.0.0', true );
```

## Customizable Variables

| Variable | Type | Default |
|----------|------|---------|
| `sectionTitle` | string | Frequently Asked Questions |
| `sectionSubtitle` | string | Click a question to see the answer |

## Accessibility

- `role="tablist"` on question container, `role="tab"` on each question
- `aria-selected` toggles on active question
- `role="tabpanel"` on answer panel
- Keyboard focusable via native `<button>` elements
