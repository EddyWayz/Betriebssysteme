// js/main.js

// Dieser Code wird auf jeder Seite der Webseite ausgeführt.
// Aktuell sind noch keine interaktiven Elemente geplant.
// Hier könnte später Funktionalität wie ein "Dark Mode"-Umschalter
// oder eine dynamische Suchfunktion hinzugefügt werden.

console.log("Lernportal Betriebssysteme wurde geladen.");

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".nav-toggle");
    const navContainer = document.querySelector(".site-nav .container");
    const darkToggle = document.getElementById("dark-mode-toggle");

    if (toggle && navContainer) {
        toggle.addEventListener("click", () => {
            navContainer.classList.toggle("open");
        });
    }

    if (darkToggle) {
        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark-mode");
        }

        darkToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem(
                "darkMode",
                document.body.classList.contains("dark-mode")
            );
        });
    }
});
