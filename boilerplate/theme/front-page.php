<?php
/**
 * Homepage template — WordPress auto-uses this for the front page.
 */
get_header(); ?>

<main class="front-page">

	<!-- Hero Section -->
	<section class="hero">
		<div class="container">
			<h1><?php bloginfo( 'name' ); ?></h1>
			<p><?php bloginfo( 'description' ); ?></p>
		</div>
	</section>

	<!-- Add more sections here as needed -->

</main>

<?php get_footer(); ?>
