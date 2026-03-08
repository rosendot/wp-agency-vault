<?php
/**
 * Theme Functions
 *
 * @package ClientTheme
 */

// ─── Theme Setup ────────────────────────────────────────────
function clienttheme_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'client-theme' ),
		'footer'  => __( 'Footer Menu', 'client-theme' ),
	) );
}
add_action( 'after_setup_theme', 'clienttheme_setup' );

// ─── Enqueue Styles & Scripts ───────────────────────────────
function clienttheme_enqueue_assets() {
	wp_enqueue_style(
		'clienttheme-style',
		get_stylesheet_uri(),
		array(),
		wp_get_theme()->get( 'Version' )
	);
}
add_action( 'wp_enqueue_scripts', 'clienttheme_enqueue_assets' );
