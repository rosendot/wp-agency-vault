<?php
/**
 * Menu Grid Section
 *
 * Responsive card grid with photo, item name, description, and price.
 * Category tabs at the top for filtering.
 *
 * @package WPAgencyVault\Sections\MenuGrid
 *
 * Variables (passed via $args or set as defaults):
 *   section_title   — Heading text
 *   section_subtitle — Subheading text
 *   columns         — Number of desktop columns (used as CSS custom property)
 */

$section_title    = $args['section_title'] ?? 'Our Menu';
$section_subtitle = $args['section_subtitle'] ?? 'Tap a category to filter';
$columns          = $args['columns'] ?? 3;

// Fetch all menu categories.
$categories = get_terms( array(
	'taxonomy'   => 'menu_category',
	'hide_empty' => true,
) );

// Fetch all menu items.
$menu_items = new WP_Query( array(
	'post_type'      => 'menu_item',
	'posts_per_page' => -1,
	'orderby'        => 'menu_order',
	'order'          => 'ASC',
) );
?>

<section class="menu-grid" style="--menu-grid-columns: <?php echo esc_attr( $columns ); ?>;">
	<div class="menu-grid__header">
		<h2 class="menu-grid__title"><?php echo esc_html( $section_title ); ?></h2>
		<?php if ( $section_subtitle ) : ?>
			<p class="menu-grid__subtitle"><?php echo esc_html( $section_subtitle ); ?></p>
		<?php endif; ?>
	</div>

	<?php if ( ! is_wp_error( $categories ) && ! empty( $categories ) ) : ?>
		<div class="menu-grid__tabs" role="tablist">
			<button
				class="menu-grid__tab menu-grid__tab--active"
				type="button"
				role="tab"
				aria-selected="true"
				data-category="all"
			>
				<?php esc_html_e( 'All', 'theme-textdomain' ); ?>
			</button>
			<?php foreach ( $categories as $category ) : ?>
				<button
					class="menu-grid__tab"
					type="button"
					role="tab"
					aria-selected="false"
					data-category="<?php echo esc_attr( $category->slug ); ?>"
				>
					<?php echo esc_html( $category->name ); ?>
				</button>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>

	<?php if ( $menu_items->have_posts() ) : ?>
		<div class="menu-grid__items">
			<?php while ( $menu_items->have_posts() ) : $menu_items->the_post(); ?>
				<?php
				$price       = get_post_meta( get_the_ID(), 'menu_item_price', true );
				$description = get_post_meta( get_the_ID(), 'menu_item_description', true );
				$item_cats   = wp_get_post_terms( get_the_ID(), 'menu_category', array( 'fields' => 'slugs' ) );
				$cat_slugs   = ! is_wp_error( $item_cats ) ? implode( ' ', $item_cats ) : '';
				?>
				<article
					class="menu-grid__card"
					data-categories="<?php echo esc_attr( $cat_slugs ); ?>"
				>
					<?php if ( has_post_thumbnail() ) : ?>
						<div class="menu-grid__photo">
							<?php the_post_thumbnail( 'medium_large', array(
								'class'   => 'menu-grid__img',
								'loading' => 'lazy',
								'alt'     => esc_attr( get_the_title() ),
							) ); ?>
						</div>
					<?php else : ?>
						<div class="menu-grid__photo menu-grid__photo--placeholder">
							<span class="menu-grid__photo-icon" aria-hidden="true">&#127860;</span>
						</div>
					<?php endif; ?>

					<div class="menu-grid__info">
						<h3 class="menu-grid__name"><?php the_title(); ?></h3>

						<?php if ( $description ) : ?>
							<p class="menu-grid__desc"><?php echo esc_html( $description ); ?></p>
						<?php endif; ?>

						<?php if ( $price ) : ?>
							<span class="menu-grid__price">
								<?php echo esc_html( '$' . number_format( (float) $price, 2 ) ); ?>
							</span>
						<?php endif; ?>
					</div>
				</article>
			<?php endwhile; ?>
		</div>
		<?php wp_reset_postdata(); ?>
	<?php else : ?>
		<p class="menu-grid__empty"><?php esc_html_e( 'No menu items found.', 'theme-textdomain' ); ?></p>
	<?php endif; ?>
</section>

<script>
(function () {
	var tabs  = document.querySelectorAll( '.menu-grid__tab' );
	var cards = document.querySelectorAll( '.menu-grid__card' );

	tabs.forEach( function ( tab ) {
		tab.addEventListener( 'click', function () {
			// Update active tab.
			tabs.forEach( function ( t ) {
				t.classList.remove( 'menu-grid__tab--active' );
				t.setAttribute( 'aria-selected', 'false' );
			});
			tab.classList.add( 'menu-grid__tab--active' );
			tab.setAttribute( 'aria-selected', 'true' );

			var category = tab.getAttribute( 'data-category' );

			// Show / hide cards.
			cards.forEach( function ( card ) {
				if ( category === 'all' ) {
					card.style.display = '';
				} else {
					var cats = card.getAttribute( 'data-categories' ) || '';
					card.style.display = cats.split( ' ' ).indexOf( category ) !== -1 ? '' : 'none';
				}
			});
		});
	});
})();
</script>
