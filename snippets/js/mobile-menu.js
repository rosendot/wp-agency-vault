/**
 * Mobile Menu Toggle
 *
 * Usage: Add a button with class .menu-toggle inside your header.
 * The nav should have class .primary-nav.
 * Add CSS to hide/show .primary-nav based on .is-open class.
 *
 * Example button: <button class="menu-toggle" aria-label="Menu">☰</button>
 */
document.addEventListener('DOMContentLoaded', function () {
	const toggle = document.querySelector('.menu-toggle');
	const nav = document.querySelector('.primary-nav');

	if (toggle && nav) {
		toggle.addEventListener('click', function () {
			nav.classList.toggle('is-open');
			const expanded = nav.classList.contains('is-open');
			toggle.setAttribute('aria-expanded', expanded);
		});
	}
});
