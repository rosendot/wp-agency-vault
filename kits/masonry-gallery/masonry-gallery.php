<?php
/**
 * Masonry Gallery Template Partial
 *
 * Usage: <?php get_template_part( 'masonry-gallery' ); ?>
 *
 * Displays a Pinterest-style masonry grid of images.
 * Pulls attached images from the current page.
 */

$columns = get_theme_mod( 'masonry_gallery_columns', 4 );
$gap     = get_theme_mod( 'masonry_gallery_gap', '12px' );
$title   = get_theme_mod( 'masonry_gallery_title', 'Gallery' );

$images = get_attached_media( 'image', get_the_ID() );
$images = array_values( $images );
?>

<section class="masonry-gallery">
	<?php if ( $title ) : ?>
		<div class="masonry-gallery__header">
			<h2 class="masonry-gallery__title"><?php echo esc_html( $title ); ?></h2>
		</div>
	<?php endif; ?>

	<div class="masonry-gallery__grid" style="columns: <?php echo esc_attr( $columns ); ?>; column-gap: <?php echo esc_attr( $gap ); ?>;">
		<?php foreach ( $images as $image ) : ?>
			<div class="masonry-gallery__item" style="margin-bottom: <?php echo esc_attr( $gap ); ?>;">
				<?php echo wp_get_attachment_image( $image->ID, 'large', false, array( 'class' => 'masonry-gallery__img' ) ); ?>
				<div class="masonry-gallery__overlay">
					<span class="masonry-gallery__icon" aria-hidden="true">+</span>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</section>
