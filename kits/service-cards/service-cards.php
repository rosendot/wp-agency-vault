<?php
/**
 * Service Cards Template Partial
 *
 * Usage: <?php get_template_part( 'service-cards' ); ?>
 * Pulls services from a custom post type or ACF repeater.
 */

$title    = get_theme_mod( 'service_cards_title', 'What we do' );
$subtitle = get_theme_mod( 'service_cards_subtitle', 'Pick a service, or let us build you a full package' );
$columns  = (int) get_theme_mod( 'service_cards_columns', 3 );
$variant  = get_theme_mod( 'service_cards_variant', '' );

// Example services — replace with WP_Query for a services CPT or ACF repeater.
$services = array(
	array(
		'icon'     => '🌐',
		'image'    => '',
		'title'    => 'Website design & build',
		'body'     => 'Custom WordPress sites built on Bedrock. Mobile-first, fast, and built to match your brand.',
		'price'    => 'From',
		'price_value' => '$2,400',
		'url'      => '#',
		'cta'      => 'Learn more',
	),
	array(
		'icon'     => '🛠',
		'image'    => '',
		'title'    => 'Ongoing care',
		'body'     => 'Updates, backups, uptime monitoring, and security patches. Your site stays healthy while you run the business.',
		'price'    => '',
		'price_value' => '$399/mo',
		'url'      => '#',
		'cta'      => 'See what\'s included',
	),
	array(
		'icon'     => '📈',
		'image'    => '',
		'title'    => 'SEO & content',
		'body'     => 'Schema markup, on-page SEO, Google Business optimization, and quarterly content refreshes.',
		'price'    => 'From',
		'price_value' => '$600',
		'url'      => '#',
		'cta'      => 'Get a quote',
	),
);

$classes = 'service-cards ' . esc_attr( $variant );
?>

<section class="<?php echo esc_attr( trim( $classes ) ); ?>">
	<?php if ( $title || $subtitle ) : ?>
		<div class="service-cards__header">
			<?php if ( $title ) : ?>
				<h2 class="service-cards__title"><?php echo esc_html( $title ); ?></h2>
			<?php endif; ?>
			<?php if ( $subtitle ) : ?>
				<p class="service-cards__subtitle"><?php echo esc_html( $subtitle ); ?></p>
			<?php endif; ?>
		</div>
	<?php endif; ?>

	<div class="service-cards__grid" style="grid-template-columns: repeat(<?php echo esc_attr( $columns ); ?>, 1fr);">
		<?php foreach ( $services as $service ) : ?>
			<div class="service-cards__card">
				<?php if ( ! empty( $service['image'] ) ) : ?>
					<div class="service-cards__media">
						<img src="<?php echo esc_url( $service['image'] ); ?>" alt="<?php echo esc_attr( $service['title'] ); ?>" />
					</div>
				<?php elseif ( ! empty( $service['icon'] ) ) : ?>
					<div class="service-cards__icon"><?php echo esc_html( $service['icon'] ); ?></div>
				<?php endif; ?>

				<div class="service-cards__body-wrap">
					<h3 class="service-cards__card-title"><?php echo esc_html( $service['title'] ); ?></h3>
					<p class="service-cards__card-body"><?php echo esc_html( $service['body'] ); ?></p>
					<?php if ( ! empty( $service['price_value'] ) ) : ?>
						<div class="service-cards__price">
							<?php if ( ! empty( $service['price'] ) ) : ?>
								<?php echo esc_html( $service['price'] ); ?>
							<?php endif; ?>
							<span class="service-cards__price-value"><?php echo esc_html( $service['price_value'] ); ?></span>
						</div>
					<?php endif; ?>
					<a class="service-cards__cta" href="<?php echo esc_url( $service['url'] ); ?>">
						<?php echo esc_html( $service['cta'] ); ?> <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</section>
