# Infinite Carousel Kit

Reusable infinite-loop carousel with arrow navigation, dot indicators, and touch swipe.

## Features
- Infinite seamless looping (both directions)
- Arrow buttons on desktop, hidden on mobile
- Dot indicators
- Touch swipe support (50px threshold)
- Responsive: 4/3/1 per view (default) or 3/2/1 (gallery variant)
- Multiple carousels on one page

## Files
| File | Purpose |
|------|---------|
| `carousel.js` | All carousel logic — cloning, navigation, swipe, resize |
| `carousel.css` | Layout, arrows, dots, responsive breakpoints |

## HTML Structure

```html
<div class="carousel">
    <div class="carousel__track">
        <div class="carousel__slide"><!-- Your content --></div>
        <div class="carousel__slide"><!-- Your content --></div>
        <div class="carousel__slide"><!-- Your content --></div>
    </div>
    <div class="carousel__dots"></div>
</div>
```

For the gallery variant (3 per view instead of 4):
```html
<div class="carousel carousel--gallery">
    ...
</div>
```

## Integration

1. Copy `carousel.js` into your theme's `assets/js/` folder
2. Copy the CSS from `carousel.css` into your theme's `style.css` (or enqueue separately)
3. Enqueue the JS in `functions.php`:
```php
wp_enqueue_script( 'carousel', get_template_directory_uri() . '/assets/js/carousel.js', array(), '1.0', true );
```
4. Drop the HTML structure into any template file

## Customization
- **Slides per view**: Edit `getSlidesPerView()` in the JS
- **Transition speed**: Change `0.5s` in `slideTo()` and `.carousel__track` CSS
- **Arrow style**: Modify `.carousel__arrow` in CSS
- **Dot colors**: Change `.carousel__dot` and `.carousel__dot--active` colors
- **Swipe threshold**: Change `50` in the `touchend` handler
