/**
 * FAQ Two-Column
 *
 * Clicking a question on the left shows the answer on the right.
 * First question is selected by default.
 * See README.md for HTML structure.
 */
document.addEventListener('DOMContentLoaded', function () {
	var containers = document.querySelectorAll('.faq-two-col');

	containers.forEach(function (container) {
		var questions = container.querySelectorAll('.faq-two-col__question');
		var answerTitle = container.querySelector('.faq-two-col__answer-title');
		var answerText = container.querySelector('.faq-two-col__answer-text');
		var emptyState = container.querySelector('.faq-two-col__answer-empty');

		if (!questions.length || !answerTitle || !answerText) return;

		function selectQuestion(btn) {
			// Remove active from all
			questions.forEach(function (q) {
				q.classList.remove('faq-two-col__question--active');
				q.setAttribute('aria-selected', 'false');
			});

			// Activate clicked
			btn.classList.add('faq-two-col__question--active');
			btn.setAttribute('aria-selected', 'true');

			// Show answer
			answerTitle.textContent = btn.dataset.question;
			answerText.textContent = btn.dataset.answer;

			if (emptyState) {
				emptyState.style.display = 'none';
			}
			answerTitle.style.display = '';
			answerText.style.display = '';
		}

		questions.forEach(function (btn) {
			btn.addEventListener('click', function () {
				selectQuestion(btn);
			});
		});

		// Select first question by default
		selectQuestion(questions[0]);
	});
});
