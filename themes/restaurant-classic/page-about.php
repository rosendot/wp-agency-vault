<?php
/**
 * Template Name: About Page
 */
get_header(); ?>

<main class="about-page">

    <!-- About Hero -->
    <section class="about-hero">
        <h1 class="section__title">Our Story</h1>
        <p class="section__subtitle" style="color: rgba(250,246,240,0.7);"><!-- PLACEHOLDER: About page subtitle --></p>
    </section>

    <!-- Story Section -->
    <section class="section">
        <div class="about-story">
            <div class="about-story__content">
                <h2 class="about-story__title"><!-- PLACEHOLDER: Story heading --></h2>
                <p class="about-story__text"><!-- PLACEHOLDER: First paragraph about the business origin story --></p>
                <p class="about-story__text"><!-- PLACEHOLDER: Second paragraph about values or mission --></p>
            </div>
            <div>
                <div class="about-story__image" style="background: var(--color-cream); display: flex; align-items: center; justify-content: center; color: var(--color-text-light); font-size: 1rem;">Photo placeholder</div>
            </div>
        </div>
    </section>

    <!-- Values Section -->
    <section class="section section--cream">
        <div class="section__header">
            <h2 class="section__title"><!-- PLACEHOLDER: Values section title --></h2>
            <p class="section__subtitle"><!-- PLACEHOLDER: Values section subtitle --></p>
        </div>
        <div class="values-grid">
            <div class="value-card">
                <div class="value-card__icon"><!-- PLACEHOLDER: emoji --></div>
                <h3 class="value-card__title"><!-- PLACEHOLDER: Value 1 --></h3>
                <p class="value-card__text"><!-- PLACEHOLDER: Value 1 description --></p>
            </div>
            <div class="value-card">
                <div class="value-card__icon"><!-- PLACEHOLDER: emoji --></div>
                <h3 class="value-card__title"><!-- PLACEHOLDER: Value 2 --></h3>
                <p class="value-card__text"><!-- PLACEHOLDER: Value 2 description --></p>
            </div>
            <div class="value-card">
                <div class="value-card__icon"><!-- PLACEHOLDER: emoji --></div>
                <h3 class="value-card__title"><!-- PLACEHOLDER: Value 3 --></h3>
                <p class="value-card__text"><!-- PLACEHOLDER: Value 3 description --></p>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="section section--green" style="text-align: center;">
        <h2 class="section__title" style="margin-bottom: 1rem;"><!-- PLACEHOLDER: CTA heading --></h2>
        <p class="section__subtitle" style="margin-bottom: 2rem;"><!-- PLACEHOLDER: CTA text --></p>
        <a href="<?php echo esc_url(home_url('/menu')); ?>" class="btn btn--outline">See Our Menu</a>
    </section>

</main>

<?php get_footer(); ?>
