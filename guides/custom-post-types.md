# Custom Post Types Guide

## What Are Custom Post Types?

WordPress has two built-in content types: **Posts** and **Pages**. Custom post types (CPTs) let you create new content types with their own admin UI, editor, and template files.

## When to Use Them

Any time a client has structured, repeatable content that isn't a blog post or a static page:
- Menu items (restaurant)
- Products (store)
- Services (salon, agency)
- Listings (real estate)
- Projects (portfolio)
- Testimonials
- Team members
- Events
- FAQs

## How to Register a CPT

Add this to your theme's `functions.php`:

```php
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
```

## Adding Custom Fields with Meta Boxes

```php
function mytheme_service_meta_box() {
    add_meta_box(
        'service_details',
        'Service Details',
        'mytheme_service_meta_box_html',
        'service',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'mytheme_service_meta_box' );

function mytheme_service_meta_box_html( $post ) {
    $price    = get_post_meta( $post->ID, '_service_price', true );
    $duration = get_post_meta( $post->ID, '_service_duration', true );
    wp_nonce_field( 'mytheme_service_nonce', 'mytheme_service_nonce_field' );
    ?>
    <p>
        <label for="service_price">Price ($):</label><br>
        <input type="text" id="service_price" name="service_price" value="<?php echo esc_attr( $price ); ?>">
    </p>
    <p>
        <label for="service_duration">Duration (minutes):</label><br>
        <input type="text" id="service_duration" name="service_duration" value="<?php echo esc_attr( $duration ); ?>">
    </p>
    <?php
}

function mytheme_save_service_meta( $post_id ) {
    if ( ! isset( $_POST['mytheme_service_nonce_field'] ) ) {
        return;
    }
    if ( ! wp_verify_nonce( $_POST['mytheme_service_nonce_field'], 'mytheme_service_nonce' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }

    if ( isset( $_POST['service_price'] ) ) {
        update_post_meta( $post_id, '_service_price', sanitize_text_field( $_POST['service_price'] ) );
    }
    if ( isset( $_POST['service_duration'] ) ) {
        update_post_meta( $post_id, '_service_duration', sanitize_text_field( $_POST['service_duration'] ) );
    }
}
add_action( 'save_post_service', 'mytheme_save_service_meta' );
```

## Template Files for CPTs

Create these in your theme to control how CPTs display:

- `single-service.php` — individual service page
- `archive-service.php` — service listing page

### Example: archive-service.php

```php
<?php get_header(); ?>

<main class="services-archive">
    <h1>Our Services</h1>
    <div class="services-grid">
        <?php while ( have_posts() ) : the_post(); ?>
            <div class="service-card">
                <?php if ( has_post_thumbnail() ) : ?>
                    <div class="service-image">
                        <?php the_post_thumbnail( 'medium' ); ?>
                    </div>
                <?php endif; ?>
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <?php
                $price = get_post_meta( get_the_ID(), '_service_price', true );
                if ( $price ) :
                ?>
                    <p class="price">$<?php echo esc_html( $price ); ?></p>
                <?php endif; ?>
                <div class="excerpt"><?php the_excerpt(); ?></div>
            </div>
        <?php endwhile; ?>
    </div>
</main>

<?php get_footer(); ?>
```

## Common CPT Patterns by Business Type

| Business | Post Type Slug | Suggested Fields |
|----------|---------------|-----------------|
| Restaurant | `menu_item` | price, description, category (taxonomy) |
| Jewelry Store | `product` | price, material, carat, availability |
| Salon / Spa | `service` | price, duration, category |
| Real Estate | `listing` | price, bedrooms, bathrooms, sqft, address |
| Portfolio / Agency | `project` | client, year, category, URL |
| Gym / Fitness | `class` | instructor, schedule, capacity |
| Law Firm | `practice_area` | description, related attorneys |
| Nonprofit | `cause` | goal amount, current amount, deadline |

## Flush Rewrite Rules

After registering a new CPT, WordPress needs to update its URL rules. Either:
- Go to **Settings > Permalinks** in WP admin and click **Save Changes** (easiest)
- Or call `flush_rewrite_rules()` once (never on every page load)
