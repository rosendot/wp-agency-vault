<?php
/**
 * Register Custom Post Type + Taxonomy
 *
 * Replace 'service' with your CPT slug and update labels.
 * After adding, flush permalinks: Settings > Permalinks > Save Changes.
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
        'show_in_rest' => true,
        'menu_icon'    => 'dashicons-hammer',
        'supports'     => array( 'title', 'editor', 'thumbnail' ),
        'rewrite'      => array( 'slug' => 'services' ),
    ) );

    register_taxonomy( 'service_category', 'service', array(
        'labels' => array(
            'name'          => 'Service Categories',
            'singular_name' => 'Service Category',
            'add_new_item'  => 'Add New Category',
            'search_items'  => 'Search Categories',
        ),
        'hierarchical' => true,
        'show_in_rest' => true,
        'rewrite'      => array( 'slug' => 'service-category' ),
    ) );
}
add_action( 'init', 'mytheme_register_post_types' );
