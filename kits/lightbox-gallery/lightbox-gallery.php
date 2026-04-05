<?php
/**
 * Lightbox Gallery Template Partial
 *
 * Usage: <?php get_template_part( 'lightbox-gallery' ); ?>
 *
 * Displays a thumbnail grid with full-screen lightbox on click.
 * Include lightbox-gallery.js for the modal functionality.
 */

$columns = get_theme_mod( 'lightbox_gallery_columns', 4 );
$gap     = get_theme_mod( 'lightbox_gallery_gap', '8px' );
$title   = get_theme_mod( 'lightbox_gallery_title', 'Gallery' );

$images = get_attached_media( 'image', get_the_ID() );
$images = array_values( $images );
?>

<section class="lightbox-gallery">
	<?php if ( $title ) : ?>
		<div class="lightbox-gallery__header">
			<h2 class="lightbox-gallery__title"><?php echo esc_html( $title ); ?></h2>
		</div>
	<?php endif; ?>

	<div class="lightbox-gallery__grid" style="grid-template-columns: repeat(<?php echo esc_attr( $columns ); ?>, 1fr); gap: <?php echo esc_attr( $gap ); ?>;">
		<?php foreach ( $images as $image ) :
			$full_url = wp_get_attachment_url( $image->ID );
		?>
			<div class="lightbox-gallery__thumb" data-full="<?php echo esc_url( $full_url ); ?>">
				<?php echo wp_get_attachment_image( $image->ID, 'medium', false, array( 'class' => 'lightbox-gallery__img' ) ); ?>
				<div class="lightbox-gallery__thumb-overlay">
					<span class="lightbox-gallery__thumb-icon" aria-hidden="true">&#x26F6;</span>
				</div>
			</div>
		<?php endforeach; ?>
	</div>

	<!-- Lightbox modal -->
	<div class="lightbox-modal" role="dialog" aria-label="<?php esc_attr_e( 'Image viewer', 'client-theme' ); ?>">
		<button class="lightbox-modal__close" aria-label="<?php esc_attr_e( 'Close', 'client-theme' ); ?>">&times;</button>
		<button class="lightbox-modal__nav lightbox-modal__nav--prev" aria-label="<?php esc_attr_e( 'Previous', 'client-theme' ); ?>">&#8249;</button>
		<img class="lightbox-modal__img" src="" alt="">
		<button class="lightbox-modal__nav lightbox-modal__nav--next" aria-label="<?php esc_attr_e( 'Next', 'client-theme' ); ?>">&#8250;</button>
		<div class="lightbox-modal__counter"></div>
	</div>
</section>
