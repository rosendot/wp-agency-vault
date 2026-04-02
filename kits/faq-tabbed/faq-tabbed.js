/**
 * FAQ Tabbed
 *
 * Category tabs switch which FAQ panel is visible.
 * Each panel has its own accordion behavior.
 * See README.md for HTML structure.
 */
document.addEventListener('DOMContentLoaded', function () {
	var containers = document.querySelectorAll('.faq-tabbed');

	containers.forEach(function (container) {
		var tabs = container.querySelectorAll('.faq-tabbed__tab');
		var panels = container.querySelectorAll('.faq-tabbed__panel');

		// Tab switching
		tabs.forEach(function (tab) {
			tab.addEventListener('click', function () {
				var target = tab.dataset.category;

				tabs.forEach(function (t) {
					t.classList.remove('faq-tabbed__tab--active');
					t.setAttribute('aria-selected', 'false');
				});
				tab.classList.add('faq-tabbed__tab--active');
				tab.setAttribute('aria-selected', 'true');

				panels.forEach(function (panel) {
					if (panel.dataset.category === target) {
						panel.classList.add('faq-tabbed__panel--active');
					} else {
						panel.classList.remove('faq-tabbed__panel--active');
					}
				});
			});
		});

		// Accordion within each panel
		var items = container.querySelectorAll('.faq-tabbed__item');
		items.forEach(function (item) {
			var question = item.querySelector('.faq-tabbed__question');
			var answer = item.querySelector('.faq-tabbed__answer');
			if (!question || !answer) return;

			question.addEventListener('click', function () {
				var isOpen = item.classList.contains('faq-tabbed__item--open');

				if (isOpen) {
					item.classList.remove('faq-tabbed__item--open');
					answer.style.maxHeight = '0';
					question.setAttribute('aria-expanded', 'false');
				} else {
					item.classList.add('faq-tabbed__item--open');
					answer.style.maxHeight = answer.scrollHeight + 'px';
					question.setAttribute('aria-expanded', 'true');
				}
			});
		});
	});
});
