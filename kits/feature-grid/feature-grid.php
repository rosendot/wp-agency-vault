<?php
/**
 * Feature Grid Template Partial
 *
 * Usage: <?php get_template_part( 'feature-grid' ); ?>
 * Pulls features from a custom post type, ACF repeater, or hardcoded array.
 */

$title    = get_theme_mod( 'feature_grid_title', 'Why Choose Us' );
$subtitle = get_theme_mod( 'feature_grid_subtitle', 'Everything you need, nothing you don\'t' );
$columns  = (int) get_theme_mod( 'feature_grid_columns', 3 );
$variant  = get_theme_mod( 'feature_grid_variant', 'feature-grid--bordered' );

// Example features — replace with WP_Query or ACF repeater.
$features = array(
	array(
		'icon'  => '⚡',
		'title' => 'Fast by default',
		'body'  => 'Built on a modern stack with performance baked in from day one.',
	),
	array(
		'icon'  => '🛡️',
		'title' => 'Secure & reliable',
		'body'  => 'Automated backups, daily uptime checks, and hardened plugin stack.',
	),
	array(
		'icon'  => '🎨',
		'title' => 'Custom design',
		'body'  => 'No cookie-cutter themes. Built to match your brand, not someone else\'s.',
	),
);

$classes = 'feature-grid ' . esc_attr( $variant );
?>

<section class="<?php echo esc_attr( $classes ); ?>">
	<?php if ( $title || $subtitle ) : ?>
		<div class="feature-grid__header">
			<?php if ( $title ) : ?>
				<h2 class="feature-grid__title"><?php echo esc_html( $title ); ?></h2>
			<?php endif; ?>
			<?php if ( $subtitle ) : ?>
				<p class="feature-grid__subtitle"><?php echo esc_html( $subtitle ); ?></p>
			<?php endif; ?>
		</div>
	<?php endif; ?>

	<div class="feature-grid__grid" style="grid-template-columns: repeat(<?php echo esc_attr( $columns ); ?>, 1fr);">
		<?php foreach ( $features as $feature ) : ?>
			<div class="feature-grid__card">
				<div class="feature-grid__icon"><?php echo esc_html( $feature['icon'] ); ?></div>
				<h3 class="feature-grid__card-title"><?php echo esc_html( $feature['title'] ); ?></h3>
				<p class="feature-grid__card-body"><?php echo esc_html( $feature['body'] ); ?></p>
			</div>
		<?php endforeach; ?>
	</div>
</section>
