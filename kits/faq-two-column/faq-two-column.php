<?php
/**
 * FAQ Two-Column Template Partial
 *
 * Usage: <?php get_template_part( 'faq-two-column' ); ?>
 *
 * Questions listed on the left, answer displayed on the right.
 */

$faqs = [
	[
		'question' => 'What are your hours?',
		'answer'   => 'We are open Monday through Friday from 11am to 10pm, and Saturday through Sunday from 10am to 11pm. We are closed on major holidays.',
	],
	[
		'question' => 'Do you take reservations?',
		'answer'   => 'Yes! You can call us directly or book online through our website. Walk-ins are always welcome, but we recommend reservations for parties of 6 or more.',
	],
	[
		'question' => 'Do you offer catering?',
		'answer'   => 'We offer catering for events of all sizes. Contact us for a custom menu and pricing. We typically need at least one week\'s notice for large orders.',
	],
	[
		'question' => 'Is there parking available?',
		'answer'   => 'Yes, we have a free parking lot behind the building with 30 spaces available. Street parking is also available on Main Street and Oak Avenue.',
	],
	[
		'question' => 'Do you accommodate dietary restrictions?',
		'answer'   => 'Absolutely. We offer vegetarian, vegan, and gluten-free options on our menu. Please let your server know about any allergies and we will do our best to accommodate you.',
	],
	[
		'question' => 'Do you have a private dining room?',
		'answer'   => 'Yes, our private dining room seats up to 24 guests. It includes a dedicated server, customizable menu, and AV equipment for presentations. Contact us to reserve.',
	],
];
?>

<section class="faq-two-col">
	<div class="faq-two-col__header">
		<h2 class="faq-two-col__title"><?php echo esc_html__( 'Frequently Asked Questions', 'client-theme' ); ?></h2>
		<p class="faq-two-col__subtitle"><?php echo esc_html__( 'Click a question to see the answer', 'client-theme' ); ?></p>
	</div>

	<div class="faq-two-col__grid">
		<div class="faq-two-col__questions" role="tablist">
			<?php foreach ( $faqs as $faq ) : ?>
				<button
					class="faq-two-col__question"
					role="tab"
					aria-selected="false"
					data-question="<?php echo esc_attr( $faq['question'] ); ?>"
					data-answer="<?php echo esc_attr( $faq['answer'] ); ?>"
				>
					<?php echo esc_html( $faq['question'] ); ?>
				</button>
			<?php endforeach; ?>
		</div>

		<div class="faq-two-col__answer" role="tabpanel">
			<h3 class="faq-two-col__answer-title"></h3>
			<p class="faq-two-col__answer-text"></p>
			<div class="faq-two-col__answer-empty">Select a question to see the answer</div>
		</div>
	</div>
</section>
