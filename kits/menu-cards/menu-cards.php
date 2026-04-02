<?php
/**
 * Menu Cards Section
 *
 * Large editorial cards with full-width photos, gradient overlays,
 * and a stacked single-column layout. Magazine-style presentation.
 * Odd cards show a bottom-up gradient; even cards use a top-down gradient
 * for visual variety.
 *
 * @package WPAgencyVault\Sections\MenuCards
 */

defined( 'ABSPATH' ) || exit;

$section_title    = get_theme_mod( 'menu_cards_title', 'Featured Dishes' );
$section_subtitle = get_theme_mod( 'menu_cards_subtitle', "Chef's favorites, crafted with care" );

$items = new WP_Query( array(
	'post_type'      => 'menu_item',
	'posts_per_page' => -1,
	'orderby'        => 'menu_order',
	'order'          => 'ASC',
	'meta_query'     => array(
		array(
			'key'     => '_menu_item_featured',
			'value'   => '1',
			'compare' => '=',
		),
	),
) );

if ( ! $items->have_posts() ) {
	return;
}
?>

<section class="menu-cards" id="featured-dishes">
	<div class="menu-cards__header">
		<h2 class="menu-cards__title"><?php echo esc_html( $section_title ); ?></h2>
		<?php if ( $section_subtitle ) : ?>
			<p class="menu-cards__subtitle"><?php echo esc_html( $section_subtitle ); ?></p>
		<?php endif; ?>
	</div>

	<?php
	$index = 0;
	while ( $items->have_posts() ) :
		$items->the_post();

		$price       = get_post_meta( get_the_ID(), '_menu_item_price', true );
		$description = get_post_meta( get_the_ID(), '_menu_item_description', true );
		$order_url   = get_post_meta( get_the_ID(), '_menu_item_order_url', true );
		$is_even     = ( $index % 2 === 1 );
		$modifier    = $is_even ? ' menu-cards__item--alt' : '';
		?>

		<article class="menu-cards__item<?php echo esc_attr( $modifier ); ?>">
			<?php if ( has_post_thumbnail() ) : ?>
				<div class="menu-cards__photo">
					<?php
					the_post_thumbnail( 'large', array(
						'class'   => 'menu-cards__photo-img',
						'loading' => 'lazy',
						'alt'     => esc_attr( get_the_title() ),
					) );
					?>
					<span class="menu-cards__name"><?php the_title(); ?></span>
				</div>
			<?php else : ?>
				<div class="menu-cards__photo menu-cards__photo--no-image">
					<span class="menu-cards__name"><?php the_title(); ?></span>
				</div>
			<?php endif; ?>

			<div class="menu-cards__body">
				<?php if ( $description ) : ?>
					<p class="menu-cards__description">
						<?php echo esc_html( $description ); ?>
					</p>
				<?php endif; ?>

				<div class="menu-cards__meta">
					<?php if ( $price ) : ?>
						<span class="menu-cards__price">
							<?php echo esc_html( '$' . number_format( (float) $price, 2 ) ); ?>
						</span>
					<?php endif; ?>

					<?php if ( $order_url ) : ?>
						<a href="<?php echo esc_url( $order_url ); ?>" class="menu-cards__cta">
							<?php esc_html_e( 'Order', 'theme-starter' ); ?>
						</a>
					<?php endif; ?>
				</div>
			</div>
		</article>

		<?php
		$index++;
	endwhile;
	wp_reset_postdata();
	?>
</section>
