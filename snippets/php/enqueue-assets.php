<?php
/**
 * Enqueue Styles and Scripts
 *
 * Usage: Copy into functions.php. Add/remove files as needed.
 * Uses theme version for cache busting.
 */
function mytheme_enqueue_assets() {
	$version = wp_get_theme()->get( 'Version' );

	// Main stylesheet
	wp_enqueue_style( 'mytheme-style', get_stylesheet_uri(), array(), $version );

	// Additional CSS (uncomment if needed)
	// wp_enqueue_style( 'mytheme-custom', get_template_directory_uri() . '/assets/css/custom.css', array(), $version );

	// JavaScript (loads in footer)
	wp_enqueue_script( 'mytheme-main', get_template_directory_uri() . '/assets/js/main.js', array(), $version, true );
}
add_action( 'wp_enqueue_scripts', 'mytheme_enqueue_assets' );
