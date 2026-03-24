<?php
/**
 * Hero Section Template Partial
 *
 * Usage: <?php get_template_part( 'hero' ); ?>
 *
 * To add a background image, set it inline on .hero or use a custom field.
 */
?>
<section class="hero">
    <div class="hero__content">
        <p class="hero__label"><?php echo esc_html__( 'Welcome to', 'client-theme' ); ?></p>
        <h1 class="hero__title"><?php bloginfo( 'name' ); ?></h1>
        <p class="hero__text"><?php bloginfo( 'description' ); ?></p>
        <div class="hero__buttons">
            <a href="/menu" class="btn btn--primary"><?php echo esc_html__( 'View Menu', 'client-theme' ); ?></a>
            <a href="/about" class="btn btn--outline"><?php echo esc_html__( 'Our Story', 'client-theme' ); ?></a>
        </div>
    </div>
</section>
