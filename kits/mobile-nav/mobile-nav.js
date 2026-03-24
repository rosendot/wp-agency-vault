/**
 * Mobile Nav Toggle
 *
 * Toggles .active on .nav-links and updates aria-expanded.
 * See README.md for HTML structure.
 */
document.addEventListener('DOMContentLoaded', function () {
	var toggle = document.querySelector('.nav-toggle');
	var navLinks = document.querySelector('.nav-links');

	if (toggle && navLinks) {
		toggle.addEventListener('click', function () {
			navLinks.classList.toggle('active');
			var expanded = navLinks.classList.contains('active');
			toggle.setAttribute('aria-expanded', expanded);
		});
	}
});
