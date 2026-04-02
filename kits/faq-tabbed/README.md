# FAQ Tabbed

Category tabs at the top, accordion Q&As below. Each tab shows its own set of questions. Great for large FAQ sets that need organization.

## HTML Structure

```html
<section class="faq-tabbed">
    <div class="faq-tabbed__header">
        <h2 class="faq-tabbed__title">Frequently Asked Questions</h2>
        <p class="faq-tabbed__subtitle">Browse by category</p>
    </div>

    <div class="faq-tabbed__tabs" role="tablist">
        <button class="faq-tabbed__tab faq-tabbed__tab--active" role="tab" data-category="ordering">Ordering</button>
        <button class="faq-tabbed__tab" role="tab" data-category="dining">Dining</button>
    </div>

    <div class="faq-tabbed__panel faq-tabbed__panel--active" data-category="ordering" role="tabpanel">
        <div class="faq-tabbed__item">
            <button class="faq-tabbed__question" aria-expanded="false">
                Question text
                <span class="faq-tabbed__icon" aria-hidden="true"></span>
            </button>
            <div class="faq-tabbed__answer">
                <div class="faq-tabbed__answer-inner">Answer text</div>
            </div>
        </div>
    </div>
</section>
```

## WordPress Integration

```php
wp_enqueue_style( 'faq-tabbed', get_template_directory_uri() . '/assets/css/faq-tabbed.css', [], '1.0.0' );
wp_enqueue_script( 'faq-tabbed', get_template_directory_uri() . '/assets/js/faq-tabbed.js', [], '1.0.0', true );
```

## Customizable Variables

| Variable | Type | Default |
|----------|------|---------|
| `sectionTitle` | string | Frequently Asked Questions |
| `sectionSubtitle` | string | Browse by category |

## Behavior

- Clicking a tab shows that category's questions, hides others
- Within each tab, questions expand/collapse independently (multi-open)
- First tab is active by default
- Tabs scroll horizontally on mobile

## Accessibility

- `role="tablist"` on tab container, `role="tab"` on each tab
- `aria-selected` toggles on active tab
- `role="tabpanel"` on each panel
- `aria-expanded` on accordion questions
- Focus-visible outline on interactive elements
