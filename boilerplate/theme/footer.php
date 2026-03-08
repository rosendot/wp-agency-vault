<footer class="site-footer">
	<div class="container">
		<p>&copy; <?php echo date( 'Y' ); ?> <?php bloginfo( 'name' ); ?>. All rights reserved.</p>
		<nav class="footer-nav">
			<?php
			wp_nav_menu( array(
				'theme_location' => 'footer',
				'container'      => false,
				'fallback_cb'    => false,
			) );
			?>
		</nav>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
