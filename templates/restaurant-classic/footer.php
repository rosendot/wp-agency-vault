<footer class="site-footer">
    <div class="footer__grid">
        <div class="footer__contact">
            <h4 class="footer__title">Contact Us</h4>
            <p><!-- PLACEHOLDER: Street Address --><br><!-- PLACEHOLDER: City, ST 00000 --></p>
            <p><!-- PLACEHOLDER: (555) 000-0000 --></p>
            <p><!-- PLACEHOLDER: hello@example.com --></p>
        </div>

        <div class="footer__brand-col">
            <div class="footer__brand"><?php bloginfo('name'); ?></div>
            <p class="footer__tagline"><!-- PLACEHOLDER: Tagline --></p>
            <div class="footer__social">
                <a href="#" aria-label="Facebook" class="footer__social-link">FB</a>
                <a href="#" aria-label="Instagram" class="footer__social-link">IG</a>
            </div>
        </div>

        <div class="footer__hours">
            <h4 class="footer__title">Opening Hours</h4>
            <p><!-- PLACEHOLDER: Weekday hours --></p>
            <p><!-- PLACEHOLDER: Weekend hours --></p>
        </div>
    </div>

    <div class="footer__bottom">
        <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
