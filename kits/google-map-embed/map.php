<?php
/**
 * Google Map Embed Template Partial
 *
 * Usage: <?php get_template_part( 'map' ); ?>
 *
 * Replace the iframe src with your client's Google Maps embed URL.
 * Update address, phone, and hours below.
 */
?>
<section class="section section--dark">
    <div class="section__header">
        <h2 class="section__title"><?php echo esc_html__( 'Visit Us', 'client-theme' ); ?></h2>
    </div>
    <div class="visit-us__grid">
        <div class="visit-us__map">
            <iframe
                src="REPLACE_WITH_GOOGLE_MAPS_EMBED_URL"
                width="600"
                height="450"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
        <div class="visit-us__info">
            <div class="visit-us__detail">
                <h3><?php echo esc_html__( 'Location', 'client-theme' ); ?></h3>
                <p>123 Main Street<br>City, ST 00000</p>
            </div>
            <div class="visit-us__detail">
                <h3><?php echo esc_html__( 'Hours', 'client-theme' ); ?></h3>
                <p>Monday &ndash; Friday: 11am &ndash; 10pm<br>Saturday &ndash; Sunday: 10am &ndash; 11pm</p>
            </div>
            <div class="visit-us__detail">
                <h3><?php echo esc_html__( 'Contact', 'client-theme' ); ?></h3>
                <p>(000) 000-0000<br>hello@example.com</p>
            </div>
        </div>
    </div>
</section>
