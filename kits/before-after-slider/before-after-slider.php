<?php
/**
 * Before/After Slider Template Partial
 *
 * Usage: <?php get_template_part( 'before-after-slider' ); ?>
 *
 * Set before and after image URLs via custom fields or theme mods.
 */

$title     = get_theme_mod( 'ba_slider_title', 'Before & After' );
$start_pct = get_theme_mod( 'ba_slider_start', 50 );
$before_id = get_post_meta( get_the_ID(), 'ba_before_image', true );
$after_id  = get_post_meta( get_the_ID(), 'ba_after_image', true );
?>

<section class="ba-slider">
	<?php if ( $title ) : ?>
		<div class="ba-slider__header">
			<h2 class="ba-slider__title"><?php echo esc_html( $title ); ?></h2>
		</div>
	<?php endif; ?>

	<div class="ba-slider__container" data-start="<?php echo esc_attr( $start_pct ); ?>">
		<!-- After image (bottom layer) -->
		<?php if ( $after_id ) : ?>
			<?php echo wp_get_attachment_image( $after_id, 'large', false, array( 'class' => 'ba-slider__after' ) ); ?>
		<?php else : ?>
			<div class="ba-slider__after" style="width:100%;aspect-ratio:16/9;background:#d4c5b0;"></div>
		<?php endif; ?>

		<!-- Before image (clipped top layer) -->
		<div class="ba-slider__before-wrap">
			<?php if ( $before_id ) : ?>
				<?php echo wp_get_attachment_image( $before_id, 'large', false, array( 'class' => 'ba-slider__before' ) ); ?>
			<?php else : ?>
				<div class="ba-slider__before" style="width:100%;height:100%;background:#a89880;"></div>
			<?php endif; ?>
			<span class="ba-slider__label ba-slider__label--before"><?php echo esc_html__( 'Before', 'client-theme' ); ?></span>
		</div>

		<span class="ba-slider__label ba-slider__label--after"><?php echo esc_html__( 'After', 'client-theme' ); ?></span>

		<!-- Divider + handle -->
		<div class="ba-slider__divider"></div>
		<div class="ba-slider__handle">
			<span class="ba-slider__handle-arrows">&lsaquo; &rsaquo;</span>
		</div>
	</div>
</section>
