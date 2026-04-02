<?php
/**
 * Mega Menu Template Partial
 *
 * Usage: <?php get_template_part( 'mega-menu' ); ?>
 *
 * Customize the menu columns and links below per client.
 * For dynamic menus, replace with wp_nav_menu() and a custom Walker.
 */

$menu_items = [
	[
		'label'   => 'Menu',
		'columns' => [
			[
				'title' => 'Food',
				'links' => [
					[ 'text' => 'Appetizers', 'url' => '/menu#appetizers' ],
					[ 'text' => 'Entrees', 'url' => '/menu#entrees' ],
					[ 'text' => 'Desserts', 'url' => '/menu#desserts' ],
					[ 'text' => 'Kids Menu', 'url' => '/menu#kids' ],
				],
			],
			[
				'title' => 'Drinks',
				'links' => [
					[ 'text' => 'Cocktails', 'url' => '/menu#cocktails' ],
					[ 'text' => 'Wine List', 'url' => '/menu#wine' ],
					[ 'text' => 'Beer', 'url' => '/menu#beer' ],
					[ 'text' => 'Non-Alcoholic', 'url' => '/menu#non-alcoholic' ],
				],
			],
			[
				'title' => 'Specials',
				'links' => [
					[ 'text' => 'Daily Specials', 'url' => '/specials' ],
					[ 'text' => 'Happy Hour', 'url' => '/happy-hour', 'desc' => 'Mon–Fri, 4–6pm' ],
					[ 'text' => 'Weekend Brunch', 'url' => '/brunch', 'desc' => 'Sat–Sun, 10am–2pm' ],
				],
			],
		],
	],
	[
		'label'   => 'About',
		'columns' => [
			[
				'title' => 'Our Story',
				'links' => [
					[ 'text' => 'History', 'url' => '/about#history' ],
					[ 'text' => 'Our Team', 'url' => '/about#team' ],
					[ 'text' => 'Press', 'url' => '/press' ],
				],
			],
			[
				'title' => 'Visit',
				'links' => [
					[ 'text' => 'Location & Hours', 'url' => '/contact' ],
					[ 'text' => 'Parking', 'url' => '/contact#parking' ],
					[ 'text' => 'Private Events', 'url' => '/events' ],
				],
			],
		],
	],
];
?>

<nav class="mega-menu" aria-label="<?php esc_attr_e( 'Main navigation', 'client-theme' ); ?>">
	<div class="mega-menu__bar">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="mega-menu__brand">
			<?php bloginfo( 'name' ); ?>
		</a>

		<ul class="mega-menu__nav">
			<?php foreach ( $menu_items as $item ) : ?>
				<li class="mega-menu__item">
					<button class="mega-menu__trigger" aria-expanded="false" aria-haspopup="true">
						<?php echo esc_html( $item['label'] ); ?>
						<span class="mega-menu__arrow" aria-hidden="true">▾</span>
					</button>
					<div class="mega-menu__panel" role="menu">
						<div class="mega-menu__panel-inner">
							<?php foreach ( $item['columns'] as $column ) : ?>
								<div>
									<h3 class="mega-menu__column-title"><?php echo esc_html( $column['title'] ); ?></h3>
									<ul class="mega-menu__links">
										<?php foreach ( $column['links'] as $link ) : ?>
											<li>
												<a href="<?php echo esc_url( $link['url'] ); ?>" class="mega-menu__link" role="menuitem">
													<?php echo esc_html( $link['text'] ); ?>
													<?php if ( ! empty( $link['desc'] ) ) : ?>
														<span class="mega-menu__link-desc"><?php echo esc_html( $link['desc'] ); ?></span>
													<?php endif; ?>
												</a>
											</li>
										<?php endforeach; ?>
									</ul>
								</div>
							<?php endforeach; ?>
						</div>
					</div>
				</li>
			<?php endforeach; ?>
		</ul>

		<a href="/order" class="mega-menu__cta"><?php esc_html_e( 'Order Online', 'client-theme' ); ?></a>
	</div>
</nav>
