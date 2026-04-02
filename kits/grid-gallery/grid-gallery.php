<?php
/**
 * Grid Gallery Template Partial
 *
 * Usage: <?php get_template_part( 'grid-gallery' ); ?>
 *
 * Displays a grid of gallery images. Attach images to the page
 * or query a gallery custom field. The structure below uses
 * attached images as a starting point.
 */

$columns = get_theme_mod( 'grid_gallery_columns', 5 );
$rows    = get_theme_mod( 'grid_gallery_rows', 3 );
$gap     = get_theme_mod( 'grid_gallery_gap', '4px' );
$title   = get_theme_mod( 'grid_gallery_title', 'Gallery' );
$total   = $columns * $rows;

$images = get_attached_media( 'image', get_the_ID() );
$images = array_slice( array_values( $images ), 0, $total );
?>

<section class="grid-gallery">
	<?php if ( $title ) : ?>
		<div class="grid-gallery__header">
			<h2 class="grid-gallery__title"><?php echo esc_html( $title ); ?></h2>
		</div>
	<?php endif; ?>

	<div class="grid-gallery__grid" style="grid-template-columns: repeat(<?php echo esc_attr( $columns ); ?>, 1fr); gap: <?php echo esc_attr( $gap ); ?>;">
		<?php foreach ( $images as $image ) : ?>
			<div class="grid-gallery__item">
				<?php echo wp_get_attachment_image( $image->ID, 'medium_large', false, array( 'class' => 'grid-gallery__img' ) ); ?>
				<div class="grid-gallery__overlay">
					<span class="grid-gallery__icon" aria-hidden="true">+</span>
				</div>
			</div>
		<?php endforeach; ?>

		<?php
		// Fill remaining slots with placeholders if not enough images
		$remaining = $total - count( $images );
		for ( $i = 0; $i < $remaining; $i++ ) :
		?>
			<div class="grid-gallery__item">
				<div class="grid-gallery__placeholder" style="background: #d4cec4;">
					<?php echo esc_html( $i + count( $images ) + 1 ); ?>
				</div>
				<div class="grid-gallery__overlay">
					<span class="grid-gallery__icon" aria-hidden="true">+</span>
				</div>
			</div>
		<?php endfor; ?>
	</div>
</section>
