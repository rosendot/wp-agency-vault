<?php
/**
 * The main template file — required fallback for all template types.
 */
get_header(); ?>

<main>
	<?php if ( have_posts() ) : ?>
		<?php while ( have_posts() ) : the_post(); ?>
			<article id="post-<?php the_ID(); ?>">
				<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
				<div class="entry-content">
					<?php the_excerpt(); ?>
				</div>
			</article>
		<?php endwhile; ?>
	<?php else : ?>
		<p>No content found.</p>
	<?php endif; ?>
</main>

<?php get_footer(); ?>
