<?php
/**
 * FAQ Cards Template Partial
 *
 * Usage: <?php get_template_part( 'faq-cards' ); ?>
 *
 * Q&A displayed as a grid of cards.
 */

$faqs = [
	[
		'question' => 'What are your hours?',
		'answer'   => 'Mon–Fri 11am–10pm, Sat–Sun 10am–11pm. Closed major holidays.',
	],
	[
		'question' => 'Do you take reservations?',
		'answer'   => 'Yes, call us or book online. Walk-ins welcome. Reservations recommended for 6+.',
	],
	[
		'question' => 'Do you offer catering?',
		'answer'   => 'We cater events of all sizes. Contact us for custom menus and pricing.',
	],
	[
		'question' => 'Is there parking?',
		'answer'   => 'Free lot behind the building (30 spaces). Street parking also available.',
	],
	[
		'question' => 'Dietary restrictions?',
		'answer'   => 'Vegetarian, vegan, and gluten-free options available. Tell your server about allergies.',
	],
	[
		'question' => 'Private events?',
		'answer'   => 'Private dining room seats 24 with dedicated server and AV equipment.',
	],
];

$columns = get_theme_mod( 'faq_cards_columns', 3 );
?>

<section class="faq-cards">
	<div class="faq-cards__header">
		<h2 class="faq-cards__title"><?php echo esc_html__( 'Frequently Asked Questions', 'client-theme' ); ?></h2>
		<p class="faq-cards__subtitle"><?php echo esc_html__( 'Quick answers to common questions', 'client-theme' ); ?></p>
	</div>

	<div class="faq-cards__grid" style="grid-template-columns: repeat(<?php echo esc_attr( $columns ); ?>, 1fr);">
		<?php foreach ( $faqs as $index => $faq ) : ?>
			<div class="faq-cards__card">
				<div class="faq-cards__icon" aria-hidden="true">Q</div>
				<h3 class="faq-cards__question"><?php echo esc_html( $faq['question'] ); ?></h3>
				<p class="faq-cards__answer"><?php echo esc_html( $faq['answer'] ); ?></p>
			</div>
		<?php endforeach; ?>
	</div>
</section>
