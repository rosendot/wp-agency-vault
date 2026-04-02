<?php
/**
 * FAQ Tabbed Template Partial
 *
 * Usage: <?php get_template_part( 'faq-tabbed' ); ?>
 *
 * Category tabs at the top, accordion Q&As below.
 */

$categories = [
	'ordering' => [
		'label' => 'Ordering',
		'faqs'  => [
			[ 'q' => 'How do I place an order?', 'a' => 'You can order online through our website, call us directly, or walk in and order at the counter.' ],
			[ 'q' => 'Do you offer delivery?', 'a' => 'Yes, we deliver within a 5-mile radius. You can also order through DoorDash and UberEats.' ],
			[ 'q' => 'Can I customize my order?', 'a' => 'Absolutely. Let us know about any modifications and we will do our best to accommodate.' ],
		],
	],
	'dining' => [
		'label' => 'Dining',
		'faqs'  => [
			[ 'q' => 'Do you take reservations?', 'a' => 'Yes, call us or book online. Walk-ins are always welcome.' ],
			[ 'q' => 'Is there outdoor seating?', 'a' => 'Yes, we have a covered patio with 8 tables available year-round.' ],
			[ 'q' => 'Do you accommodate large parties?', 'a' => 'We can seat parties up to 24 in our private dining room. Contact us to reserve.' ],
		],
	],
	'menu' => [
		'label' => 'Menu & Diet',
		'faqs'  => [
			[ 'q' => 'Do you have vegetarian options?', 'a' => 'Yes, we have a full vegetarian section on our menu plus vegan modifications for most dishes.' ],
			[ 'q' => 'Are allergen details available?', 'a' => 'Yes, ask your server for our allergen guide. We can also customize dishes to avoid specific allergens.' ],
			[ 'q' => 'Do you have a kids menu?', 'a' => 'Yes, our kids menu is available for children 12 and under with smaller portions and kid-friendly options.' ],
		],
	],
];
?>

<section class="faq-tabbed">
	<div class="faq-tabbed__header">
		<h2 class="faq-tabbed__title"><?php echo esc_html__( 'Frequently Asked Questions', 'client-theme' ); ?></h2>
		<p class="faq-tabbed__subtitle"><?php echo esc_html__( 'Browse by category', 'client-theme' ); ?></p>
	</div>

	<div class="faq-tabbed__tabs" role="tablist">
		<?php $first = true; ?>
		<?php foreach ( $categories as $slug => $cat ) : ?>
			<button
				class="faq-tabbed__tab<?php echo $first ? ' faq-tabbed__tab--active' : ''; ?>"
				role="tab"
				aria-selected="<?php echo $first ? 'true' : 'false'; ?>"
				data-category="<?php echo esc_attr( $slug ); ?>"
			>
				<?php echo esc_html( $cat['label'] ); ?>
			</button>
			<?php $first = false; ?>
		<?php endforeach; ?>
	</div>

	<?php $first = true; ?>
	<?php foreach ( $categories as $slug => $cat ) : ?>
		<div
			class="faq-tabbed__panel<?php echo $first ? ' faq-tabbed__panel--active' : ''; ?>"
			data-category="<?php echo esc_attr( $slug ); ?>"
			role="tabpanel"
		>
			<?php foreach ( $cat['faqs'] as $index => $faq ) : ?>
				<div class="faq-tabbed__item">
					<button
						class="faq-tabbed__question"
						aria-expanded="false"
						aria-controls="faq-<?php echo esc_attr( $slug . '-' . $index ); ?>"
					>
						<?php echo esc_html( $faq['q'] ); ?>
						<span class="faq-tabbed__icon" aria-hidden="true"></span>
					</button>
					<div
						class="faq-tabbed__answer"
						id="faq-<?php echo esc_attr( $slug . '-' . $index ); ?>"
						role="region"
					>
						<div class="faq-tabbed__answer-inner">
							<?php echo esc_html( $faq['a'] ); ?>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
		<?php $first = false; ?>
	<?php endforeach; ?>
</section>
