<?php
/**
 * Template Name: Menu Page
 */
get_header(); ?>

<main class="menu-page">

    <!-- Menu Hero -->
    <section class="menu-page__hero">
        <h1 class="section__title">Our Menu</h1>
        <p class="section__subtitle" style="color: rgba(250,246,240,0.7);">Authentic flavors, made fresh daily</p>
    </section>

    <!-- Menu Items by Category -->
    <section class="section section--cream">
        <div class="container">
            <?php
            $categories = get_terms([
                'taxonomy'   => 'menu_category',
                'hide_empty' => true,
                'orderby'    => 'name',
                'order'      => 'ASC'
            ]);

            if ($categories && !is_wp_error($categories)):
                foreach ($categories as $category):
            ?>
                <div class="menu-category">
                    <h2 class="menu-category__title"><?php echo esc_html($category->name); ?></h2>
                    <div class="menu-list">
                        <?php
                        $items = get_posts([
                            'post_type'      => 'menu_item',
                            'posts_per_page' => -1,
                            'orderby'        => 'title',
                            'order'          => 'ASC',
                            'tax_query'      => [
                                [
                                    'taxonomy' => 'menu_category',
                                    'field'    => 'term_id',
                                    'terms'    => $category->term_id,
                                ]
                            ]
                        ]);

                        foreach ($items as $item):
                            $price       = get_post_meta($item->ID, 'price', true);
                            $description = get_post_meta($item->ID, 'description', true);
                        ?>
                            <div class="menu-list-item">
                                <?php if (has_post_thumbnail($item->ID)): ?>
                                    <img class="menu-list-item__image"
                                         src="<?php echo esc_url(get_the_post_thumbnail_url($item->ID, 'thumbnail')); ?>"
                                         alt="<?php echo esc_attr($item->post_title); ?>">
                                <?php endif; ?>
                                <div class="menu-list-item__content">
                                    <div class="menu-list-item__header">
                                        <h3 class="menu-list-item__name"><?php echo esc_html($item->post_title); ?></h3>
                                        <?php if ($price): ?>
                                            <span class="menu-list-item__price">$<?php echo esc_html($price); ?></span>
                                        <?php endif; ?>
                                    </div>
                                    <?php if ($description): ?>
                                        <p class="menu-list-item__description"><?php echo esc_html($description); ?></p>
                                    <?php endif; ?>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php
                endforeach;
            else:
            ?>
                <p style="text-align: center; color: var(--color-text-light); font-size: 1.1rem;">Menu items coming soon! Check back later.</p>
            <?php endif; ?>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="section section--dark" style="text-align: center;">
        <h2 class="section__title" style="color: var(--color-secondary); margin-bottom: 1rem;">Ready to Eat?</h2>
        <p class="section__subtitle" style="margin-bottom: 2rem;">Call us to place an order or just walk in</p>
        <a href="tel:+15550000000" class="btn btn--primary">Call (555) 000-0000</a>
    </section>

</main>

<?php get_footer(); ?>
