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
            localStorage.setItem(
                "darkMode",
                document.body.classList.contains("dark-mode")
            );
        });
    }

    initSearch();
}

// Suchfunktion
function initSearch() {
    const pages = [
        {title: 'Einführung', href: '01_einfuehrung.html'},
        {title: 'Grundlagen', href: '02_grundlagen.html'},
        {title: 'Prozesse', href: '03_prozesse.html'},
        {title: 'Threads', href: '04_threads.html'},
        {title: 'CPU-Scheduling', href: '05_scheduling.html'},
        {title: 'Synchronisation', href: '06_synchronisation.html'},
        {title: 'Kommunikation', href: '07_kommunikation.html'},
        {title: 'Deadlocks', href: '08_deadlocks.html'},
        {title: 'Speicherverwaltung', href: '09_speicherverwaltung.html'},
        {title: 'Dateisysteme', href: '10_dateisysteme.html'},
        {title: 'Übungen', href: 'uebungen.html'}
    ];

    const input = document.getElementById('search-input');
    const button = document.getElementById('search-btn');
    if (!input || !button) return;

    function runSearch() {
        const q = input.value.toLowerCase();
        const page = pages.find(p => p.title.toLowerCase().includes(q));
        if (page) {
            window.location.href = page.href;
        } else {
            alert('Kein passendes Kapitel gefunden');
        }
    }

    button.addEventListener('click', runSearch);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') runSearch();
    });
}
