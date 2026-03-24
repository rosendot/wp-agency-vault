<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<nav class="navbar">
    <div class="nav-brand">
        <a href="<?php echo esc_url(home_url()); ?>"><?php bloginfo('name'); ?></a>
        <span class="nav-brand__address"><!-- PLACEHOLDER: Street Address, City, ST 00000 --></span>
    </div>

    <button class="nav-toggle" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
    </button>

    <ul class="nav-links">
        <?php wp_nav_menu([
            'theme_location' => 'primary',
            'container'      => false,
            'items_wrap'     => '%3$s',
            'fallback_cb'    => false
        ]); ?>
    </ul>

    <div class="nav-cta">
        <a href="<?php echo esc_url(home_url('/menu')); ?>" class="btn btn--nav">Order Online</a>
    </div>
</nav>
