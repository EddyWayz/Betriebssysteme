// js/main.js

// Dieser Code wird auf jeder Seite der Webseite ausgeführt.
// Aktuell sind noch keine interaktiven Elemente geplant.
// Hier könnte später Funktionalität wie ein "Dark Mode"-Umschalter
// oder eine dynamische Suchfunktion hinzugefügt werden.

console.log("Lernportal Betriebssysteme wurde geladen.");

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".nav-toggle");
    const navContainer = document.querySelector(".site-nav .container");

    if (toggle && navContainer) {
        toggle.addEventListener("click", () => {
            navContainer.classList.toggle("open");
        });
    }
});
