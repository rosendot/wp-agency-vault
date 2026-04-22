<?php
/**
 * Process Steps Template Partial
 *
 * Usage: <?php get_template_part( 'process-steps' ); ?>
 */

$title    = get_theme_mod( 'process_steps_title', 'How it works' );
$subtitle = get_theme_mod( 'process_steps_subtitle', 'From kickoff to live site in four simple steps' );
$variant  = get_theme_mod( 'process_steps_variant', '' );

// Example steps — replace with ACF repeater or Customizer-driven array.
$steps = array(
	array(
		'title' => 'Kickoff call',
		'body'  => 'A 30-minute conversation about your business, goals, and deadlines. No surprises later.',
	),
	array(
		'title' => 'Design & review',
		'body'  => 'We send a design within a week. You give feedback. We iterate until it\'s right.',
	),
	array(
		'title' => 'Build & launch',
		'body'  => 'We build on Bedrock + LocalWP, test everything, then deploy to your live domain.',
	),
	array(
		'title' => 'Ongoing care',
		'body'  => 'We keep the site healthy — updates, backups, uptime monitoring — for a flat monthly fee.',
	),
);

$classes = 'process-steps ' . esc_attr( $variant );
?>

<section class="<?php echo esc_attr( trim( $classes ) ); ?>">
	<?php if ( $title || $subtitle ) : ?>
		<div class="process-steps__header">
			<?php if ( $title ) : ?>
				<h2 class="process-steps__title"><?php echo esc_html( $title ); ?></h2>
			<?php endif; ?>
			<?php if ( $subtitle ) : ?>
				<p class="process-steps__subtitle"><?php echo esc_html( $subtitle ); ?></p>
			<?php endif; ?>
		</div>
	<?php endif; ?>

	<div class="process-steps__list" style="grid-template-columns: repeat(<?php echo esc_attr( count( $steps ) ); ?>, 1fr);">
		<?php foreach ( $steps as $index => $step ) : ?>
			<div class="process-steps__item">
				<div class="process-steps__badge"><?php echo esc_html( $index + 1 ); ?></div>
				<div class="process-steps__content">
					<h3 class="process-steps__step-title"><?php echo esc_html( $step['title'] ); ?></h3>
					<p class="process-steps__step-body"><?php echo esc_html( $step['body'] ); ?></p>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</section>
