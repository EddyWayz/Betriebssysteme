document.addEventListener('DOMContentLoaded', () => {
    const MAX_VISIBLE = 5;

    document.querySelectorAll('.quiz-section').forEach(section => {
        const forms = Array.from(section.querySelectorAll('.chapter-quiz'));

        forms.forEach((form, idx) => {
            if (idx >= MAX_VISIBLE) {
                form.classList.add('hidden');
            }
            initQuizForm(form, section);
        });
    });
});

function initQuizForm(form, section) {
    const result = form.querySelector('.quiz-result');
    const correct = form.dataset.answer;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const choice = form.querySelector('input[type="radio"]:checked');
        if (!choice) {
            result.textContent = 'Bitte eine Antwort wählen.';
            return;
        }

        if (choice.value === correct) {
            result.textContent = 'Richtig!';
            disableQuizForm(form);
            form.classList.add('done');
            form.classList.add('hidden');
            showNextQuiz(section);
        } else {
            result.textContent = 'Leider falsch.';
        }
    });
}

function disableQuizForm(form) {
    form.querySelectorAll('input, button').forEach(el => el.disabled = true);
}

function showNextQuiz(section) {
    const next = section.querySelector('.chapter-quiz.hidden:not(.done)');
    if (next) {
        next.classList.remove('hidden');
    }
}

