<?php
/**
 * CTA Banner Template Partial
 *
 * Usage: <?php get_template_part( 'cta-banner' ); ?>
 */

$title           = get_theme_mod( 'cta_banner_title', 'Ready to ship faster?' );
$subtitle        = get_theme_mod( 'cta_banner_subtitle', 'Get a custom site built by people who actually maintain it afterward.' );
$primary_label   = get_theme_mod( 'cta_banner_primary_label', 'Start a project' );
$primary_url     = get_theme_mod( 'cta_banner_primary_url', '#' );
$secondary_label = get_theme_mod( 'cta_banner_secondary_label', 'Book a call' );
$secondary_url   = get_theme_mod( 'cta_banner_secondary_url', '#' );
$variant         = get_theme_mod( 'cta_banner_variant', '' );

$classes = 'cta-banner ' . esc_attr( $variant );
?>

<section class="<?php echo esc_attr( trim( $classes ) ); ?>">
	<div class="cta-banner__inner">
		<div class="cta-banner__content">
			<?php if ( $title ) : ?>
				<h2 class="cta-banner__title"><?php echo esc_html( $title ); ?></h2>
			<?php endif; ?>
			<?php if ( $subtitle ) : ?>
				<p class="cta-banner__subtitle"><?php echo esc_html( $subtitle ); ?></p>
			<?php endif; ?>
		</div>
		<div class="cta-banner__actions">
			<?php if ( $primary_label ) : ?>
				<a class="cta-banner__btn cta-banner__btn--primary" href="<?php echo esc_url( $primary_url ); ?>">
					<?php echo esc_html( $primary_label ); ?>
				</a>
			<?php endif; ?>
			<?php if ( $secondary_label ) : ?>
				<a class="cta-banner__btn cta-banner__btn--secondary" href="<?php echo esc_url( $secondary_url ); ?>">
					<?php echo esc_html( $secondary_label ); ?>
				</a>
			<?php endif; ?>
		</div>
	</div>
</section>
