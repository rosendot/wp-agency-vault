<?php
/**
 * Register a Custom Post Type
 *
 * Usage: Copy into your theme's functions.php.
 * Replace 'service' with your post type slug and update labels accordingly.
 * Flush permalinks after adding: Settings > Permalinks > Save Changes.
 */
function mytheme_register_post_types() {
	register_post_type( 'service', array(
		'labels' => array(
			'name'               => 'Services',
			'singular_name'      => 'Service',
			'add_new_item'       => 'Add New Service',
			'edit_item'          => 'Edit Service',
			'all_items'          => 'All Services',
			'view_item'          => 'View Service',
			'search_items'       => 'Search Services',
			'not_found'          => 'No services found',
			'not_found_in_trash' => 'No services found in trash',
		),
		'public'       => true,
		'has_archive'  => true,
		'menu_icon'    => 'dashicons-hammer',
		'supports'     => array( 'title', 'editor', 'thumbnail' ),
		'rewrite'      => array( 'slug' => 'services' ),
	) );
}
add_action( 'init', 'mytheme_register_post_types' );
