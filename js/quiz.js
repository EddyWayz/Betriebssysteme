document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.chapter-quiz').forEach(form => {
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
            } else {
                result.textContent = 'Leider falsch.';
            }
        });
    });
});

