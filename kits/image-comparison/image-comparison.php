<?php
/**
 * Image Comparison Template Partial
 *
 * Usage: <?php get_template_part( 'image-comparison' ); ?>
 *
 * Define comparison pairs as an array or pull from ACF repeater.
 */

$title   = get_theme_mod( 'img_comparison_title', 'Compare' );
$columns = get_theme_mod( 'img_comparison_columns', 2 );
$gap     = get_theme_mod( 'img_comparison_gap', '2rem' );

// Example pairs — replace with ACF repeater or custom fields
$pairs = array(
	array(
		'left_id'    => get_post_meta( get_the_ID(), 'compare_1_left', true ),
		'right_id'   => get_post_meta( get_the_ID(), 'compare_1_right', true ),
		'left_label'  => __( 'Before', 'client-theme' ),
		'right_label' => __( 'After', 'client-theme' ),
		'caption'     => '',
	),
);
?>

<section class="img-comparison">
	<?php if ( $title ) : ?>
		<div class="img-comparison__header">
			<h2 class="img-comparison__title"><?php echo esc_html( $title ); ?></h2>
		</div>
	<?php endif; ?>

	<div class="img-comparison__grid" style="grid-template-columns: repeat(<?php echo esc_attr( $columns ); ?>, 1fr); gap: <?php echo esc_attr( $gap ); ?>;">
		<?php foreach ( $pairs as $pair ) : ?>
			<div class="img-comparison__pair">
				<div class="img-comparison__side">
					<?php if ( $pair['left_id'] ) : ?>
						<?php echo wp_get_attachment_image( $pair['left_id'], 'medium_large', false, array( 'class' => 'img-comparison__img' ) ); ?>
					<?php else : ?>
						<div class="img-comparison__placeholder" style="background: #a89880;"></div>
					<?php endif; ?>
					<span class="img-comparison__label"><?php echo esc_html( $pair['left_label'] ); ?></span>
				</div>
				<div class="img-comparison__side">
					<?php if ( $pair['right_id'] ) : ?>
						<?php echo wp_get_attachment_image( $pair['right_id'], 'medium_large', false, array( 'class' => 'img-comparison__img' ) ); ?>
					<?php else : ?>
						<div class="img-comparison__placeholder" style="background: #c4b5a0;"></div>
					<?php endif; ?>
					<span class="img-comparison__label"><?php echo esc_html( $pair['right_label'] ); ?></span>
				</div>
				<?php if ( ! empty( $pair['caption'] ) ) : ?>
					<div class="img-comparison__caption"><?php echo esc_html( $pair['caption'] ); ?></div>
				<?php endif; ?>
			</div>
		<?php endforeach; ?>
	</div>
</section>
