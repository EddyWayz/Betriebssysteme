// js/main.js
// Gemeinsame Skripte für Navigation und Dark Mode

console.log("Lernportal Betriebssysteme wurde geladen.");

document.addEventListener("DOMContentLoaded", () => {
    const navElement = document.querySelector(".site-nav");
    if (navElement) {
        fetch("nav.html")
            .then(r => r.text())
            .then(html => {
                navElement.innerHTML = html;
                initNav();
            })
            .catch(err => {
                console.error("Navigation konnte nicht geladen werden:", err);
                initNav();
            });
    } else {
        initNav();
    }
});

function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const navContainer = document.querySelector(".site-nav .container");
    const darkToggle = document.getElementById("dark-mode-toggle");

    // Aktuelle Seite hervorheben
    const links = document.querySelectorAll(".site-nav a");
    const current = location.pathname.split('/').pop();
    links.forEach(link => {
        if (link.getAttribute("href") === current) {
            link.classList.add("active");
        }
    });

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
            localStorage.setItem("darkMode",
                document.body.classList.contains("dark-mode")
            );
        });
    }
}
