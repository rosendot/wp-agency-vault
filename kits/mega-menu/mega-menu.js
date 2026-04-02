/**
 * Mega Menu
 *
 * Opens dropdown panels on hover (desktop) and click (touch devices).
 * Closes when mouse leaves the item or when clicking outside.
 * See README.md for HTML structure.
 */
document.addEventListener('DOMContentLoaded', function () {
	var menus = document.querySelectorAll('.mega-menu');

	menus.forEach(function (menu) {
		var items = menu.querySelectorAll('.mega-menu__item');
		var closeDelay = null;

		items.forEach(function (item) {
			var trigger = item.querySelector('.mega-menu__trigger');
			if (!trigger) return;

			// Desktop: hover open/close with small delay to prevent flicker
			item.addEventListener('mouseenter', function () {
				clearTimeout(closeDelay);
				// Close other open items
				items.forEach(function (other) {
					if (other !== item) {
						other.classList.remove('mega-menu__item--open');
					}
				});
				item.classList.add('mega-menu__item--open');
				trigger.setAttribute('aria-expanded', 'true');
			});

			item.addEventListener('mouseleave', function () {
				closeDelay = setTimeout(function () {
					item.classList.remove('mega-menu__item--open');
					trigger.setAttribute('aria-expanded', 'false');
				}, 150);
			});

			// Touch/click fallback
			trigger.addEventListener('click', function (e) {
				var isOpen = item.classList.contains('mega-menu__item--open');

				// Close all
				items.forEach(function (other) {
					other.classList.remove('mega-menu__item--open');
					var otherTrigger = other.querySelector('.mega-menu__trigger');
					if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
				});

				if (!isOpen) {
					e.preventDefault();
					item.classList.add('mega-menu__item--open');
					trigger.setAttribute('aria-expanded', 'true');
				}
			});

			// Keyboard: Escape closes
			item.addEventListener('keydown', function (e) {
				if (e.key === 'Escape') {
					item.classList.remove('mega-menu__item--open');
					trigger.setAttribute('aria-expanded', 'false');
					trigger.focus();
				}
			});
		});

		// Click outside closes all
		document.addEventListener('click', function (e) {
			if (!menu.contains(e.target)) {
				items.forEach(function (item) {
					item.classList.remove('mega-menu__item--open');
					var trigger = item.querySelector('.mega-menu__trigger');
					if (trigger) trigger.setAttribute('aria-expanded', 'false');
				});
			}
		});
	});
});
