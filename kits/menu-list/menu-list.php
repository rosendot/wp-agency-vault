<?php
/**
 * Menu List Section
 *
 * Classic vertical menu list grouped by category.
 * Each item shows name, dotted leader, price, and optional description/thumbnail.
 *
 * @package WPAgencyVault\Sections\MenuList
 */

defined( 'ABSPATH' ) || exit;

$section_title    = get_theme_mod( 'menu_list_title', 'Our Menu' );
$section_subtitle = get_theme_mod( 'menu_list_subtitle', 'Fresh ingredients, bold flavors' );

$categories = get_terms( array(
	'taxonomy'   => 'menu_category',
	'hide_empty' => true,
	'orderby'    => 'menu_order',
	'order'      => 'ASC',
) );

if ( is_wp_error( $categories ) || empty( $categories ) ) {
	return;
}
?>

<section class="menu-list" id="menu">
	<div class="menu-list__header">
		<h2 class="menu-list__title"><?php echo esc_html( $section_title ); ?></h2>
		<?php if ( $section_subtitle ) : ?>
			<p class="menu-list__subtitle"><?php echo esc_html( $section_subtitle ); ?></p>
		<?php endif; ?>
	</div>

	<?php foreach ( $categories as $category ) : ?>
		<div class="menu-list__category">
			<h3 class="menu-list__category-heading">
				<?php echo esc_html( $category->name ); ?>
				<span class="menu-list__category-underline"></span>
			</h3>

			<?php if ( $category->description ) : ?>
				<p class="menu-list__category-description">
					<?php echo esc_html( $category->description ); ?>
				</p>
			<?php endif; ?>

			<?php
			$items = new WP_Query( array(
				'post_type'      => 'menu_item',
				'posts_per_page' => -1,
				'orderby'        => 'menu_order',
				'order'          => 'ASC',
				'tax_query'      => array(
					array(
						'taxonomy' => 'menu_category',
						'field'    => 'term_id',
						'terms'    => $category->term_id,
					),
				),
			) );

			if ( $items->have_posts() ) :
				while ( $items->have_posts() ) :
					$items->the_post();

					$price       = get_post_meta( get_the_ID(), '_menu_item_price', true );
					$description = get_post_meta( get_the_ID(), '_menu_item_description', true );
					?>

					<div class="menu-list__item">
						<?php if ( has_post_thumbnail() ) : ?>
							<div class="menu-list__photo">
								<?php
								the_post_thumbnail( 'thumbnail', array(
									'class'   => 'menu-list__photo-img',
									'loading' => 'lazy',
									'alt'     => esc_attr( get_the_title() ),
								) );
								?>
							</div>
						<?php endif; ?>

						<div class="menu-list__item-content">
							<div class="menu-list__item-row">
								<span class="menu-list__item-name"><?php the_title(); ?></span>
								<span class="menu-list__item-leader"></span>
								<?php if ( $price ) : ?>
									<span class="menu-list__item-price">
										<?php echo esc_html( '$' . number_format( (float) $price, 2 ) ); ?>
									</span>
								<?php endif; ?>
							</div>

							<?php if ( $description ) : ?>
								<p class="menu-list__description">
									<?php echo esc_html( $description ); ?>
								</p>
							<?php endif; ?>
						</div>
					</div>

				<?php
				endwhile;
				wp_reset_postdata();
			endif;
			?>
		</div>
	<?php endforeach; ?>
</section>
