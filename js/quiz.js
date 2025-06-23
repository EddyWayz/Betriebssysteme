document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('simple-quiz');
    const result = document.getElementById('quiz-result');
    if (!form || !result) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const choice = form.querySelector('input[name="q1"]:checked');
        if (!choice) {
            result.textContent = 'Bitte eine Antwort wählen.';
            return;
        }
        if (choice.value === 'b') {
            result.textContent = 'Richtig!';
        } else {
            result.textContent = 'Leider falsch. Die korrekte Antwort ist B.';
        }
    });
});

