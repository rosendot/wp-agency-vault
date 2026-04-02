<?php

// Theme setup
function my_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');

    register_nav_menus([
        'primary' => 'Primary Navigation',
        'footer'  => 'Footer Navigation'
    ]);
}
add_action('after_setup_theme', 'my_theme_setup');

// Enqueue styles and scripts
function my_theme_assets() {
    wp_enqueue_style(
        'google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        [],
        null
    );

    wp_enqueue_style(
        'my-theme-style',
        get_stylesheet_uri(),
        ['google-fonts'],
        '1.0.0'
    );

    /*
     * JS from kits — copy into theme's assets/js/ during client setup:
     *   - kits/infinite-carousel/carousel.js → carousel logic
     *
     * Then enqueue:
     * wp_enqueue_script('carousel', get_template_directory_uri() . '/assets/js/carousel.js', [], '1.0.0', true);
     */
}
add_action('wp_enqueue_scripts', 'my_theme_assets');

// Register Menu Item custom post type
function my_theme_post_types() {
    register_post_type('menu_item', [
        'labels' => [
            'name'          => 'Menu Items',
            'singular_name' => 'Menu Item',
            'add_new_item'  => 'Add New Menu Item',
            'edit_item'     => 'Edit Menu Item'
        ],
        'public'       => true,
        'has_archive'  => false,
        'show_in_rest' => true,
        'supports'     => ['title', 'thumbnail'],
        'menu_icon'    => 'dashicons-food'
    ]);

    register_taxonomy('menu_category', 'menu_item', [
        'labels' => [
            'name'          => 'Menu Categories',
            'singular_name' => 'Menu Category',
            'add_new_item'  => 'Add New Category',
        ],
        'public'       => true,
        'hierarchical' => true,
        'show_in_rest' => true,
        'rewrite'      => ['slug' => 'menu-category'],
    ]);
}
add_action('init', 'my_theme_post_types');

// Register custom fields for menu items
function my_theme_meta_boxes() {
    add_meta_box(
        'menu_item_details',
        'Menu Item Details',
        'my_theme_menu_item_fields',
        'menu_item'
    );
}
add_action('add_meta_boxes', 'my_theme_meta_boxes');

function my_theme_menu_item_fields($post) {
    wp_nonce_field('my_theme_save_meta', 'my_theme_meta_nonce');
    $price       = get_post_meta($post->ID, 'price', true);
    $description = get_post_meta($post->ID, 'description', true);
    ?>
    <p>
        <label for="price"><strong>Price</strong></label><br>
        <input type="text" id="price" name="price" value="<?php echo esc_attr($price); ?>" style="width:100%;">
    </p>
    <p>
        <label for="description"><strong>Description</strong></label><br>
        <textarea id="description" name="description" rows="4" style="width:100%;"><?php echo esc_textarea($description); ?></textarea>
    </p>
    <?php
}

// Save custom fields
function my_theme_save_meta($post_id) {
    if (!isset($_POST['my_theme_meta_nonce']) ||
        !wp_verify_nonce($_POST['my_theme_meta_nonce'], 'my_theme_save_meta')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (isset($_POST['price'])) {
        update_post_meta($post_id, 'price', sanitize_text_field($_POST['price']));
    }
    if (isset($_POST['description'])) {
        update_post_meta($post_id, 'description', sanitize_textarea_field($_POST['description']));
    }
}
add_action('save_post_menu_item', 'my_theme_save_meta');
