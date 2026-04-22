<?php
/**
 * Feature Alternating Template Partial
 *
 * Usage: <?php get_template_part( 'feature-alternating' ); ?>
 * Pulls feature rows from a custom post type, ACF repeater, or hardcoded array.
 */

$title    = get_theme_mod( 'feature_alternating_title', 'Built for the way you actually work' );
$subtitle = get_theme_mod( 'feature_alternating_subtitle', 'Each feature, explained in detail' );
$variant  = get_theme_mod( 'feature_alternating_variant', '' );

// Example rows — replace with WP_Query or ACF repeater.
$rows = array(
	array(
		'eyebrow' => 'Performance',
		'title'   => 'Fast on the first visit',
		'body'    => 'Every page is statically generated and served from the edge. No spinners, no layout shifts, no janky re-renders — just content that appears when you click.',
		'bullets' => array( 'Core Web Vitals in the green', 'Edge caching included', 'Optimized images out of the box' ),
		'cta'     => array( 'label' => 'See the benchmarks', 'url' => '#' ),
		'image'   => '',
	),
	array(
		'eyebrow' => 'Design',
		'title'   => 'Your brand, not a template',
		'body'    => 'Custom typography, custom colors, custom layouts. We start from your brand and build out — no off-the-shelf themes, no cookie-cutter look.',
		'bullets' => array( 'Bespoke layouts per page', 'Your type, your color system', 'Mobile-first, always' ),
		'cta'     => array( 'label' => 'View our work', 'url' => '#' ),
		'image'   => '',
	),
	array(
		'eyebrow' => 'Ops',
		'title'   => 'We handle the boring parts',
		'body'    => 'Updates, backups, uptime monitoring, security patches. You ship your business, we keep the site running.',
		'bullets' => array( '24/7 uptime monitoring', 'Daily automated backups', 'Security patches the same day' ),
		'cta'     => array( 'label' => 'See what\'s included', 'url' => '#' ),
		'image'   => '',
	),
);

$classes = 'feature-alternating ' . esc_attr( $variant );
?>

<section class="<?php echo esc_attr( trim( $classes ) ); ?>">
	<?php if ( $title || $subtitle ) : ?>
		<div class="feature-alternating__header">
			<?php if ( $title ) : ?>
				<h2 class="feature-alternating__title"><?php echo esc_html( $title ); ?></h2>
			<?php endif; ?>
			<?php if ( $subtitle ) : ?>
				<p class="feature-alternating__subtitle"><?php echo esc_html( $subtitle ); ?></p>
			<?php endif; ?>
		</div>
	<?php endif; ?>

	<div class="feature-alternating__rows">
		<?php foreach ( $rows as $index => $row ) : ?>
			<?php $row_class = 0 === $index % 2 ? '' : 'feature-alternating__row--reverse'; ?>
			<div class="feature-alternating__row <?php echo esc_attr( $row_class ); ?>">
				<div class="feature-alternating__text">
					<?php if ( ! empty( $row['eyebrow'] ) ) : ?>
						<span class="feature-alternating__eyebrow"><?php echo esc_html( $row['eyebrow'] ); ?></span>
					<?php endif; ?>
					<h3 class="feature-alternating__row-title"><?php echo esc_html( $row['title'] ); ?></h3>
					<p class="feature-alternating__row-body"><?php echo esc_html( $row['body'] ); ?></p>
					<?php if ( ! empty( $row['bullets'] ) ) : ?>
						<ul class="feature-alternating__bullets">
							<?php foreach ( $row['bullets'] as $bullet ) : ?>
								<li><?php echo esc_html( $bullet ); ?></li>
							<?php endforeach; ?>
						</ul>
					<?php endif; ?>
					<?php if ( ! empty( $row['cta']['label'] ) ) : ?>
						<a class="feature-alternating__cta" href="<?php echo esc_url( $row['cta']['url'] ); ?>">
							<?php echo esc_html( $row['cta']['label'] ); ?> <span aria-hidden="true">→</span>
						</a>
					<?php endif; ?>
				</div>
				<div class="feature-alternating__visual">
					<?php if ( ! empty( $row['image'] ) ) : ?>
						<img src="<?php echo esc_url( $row['image'] ); ?>" alt="<?php echo esc_attr( $row['title'] ); ?>" />
					<?php endif; ?>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</section>
