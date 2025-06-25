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
                // Initialize nav-specific parts only if nav loaded
                initNavToggle();
                initDarkModeToggle();
                highlightActiveLink();
                initSearch(); // Search can be initialized even if nav parts fail
            })
            .catch(err => {
                console.error("Navigation konnte nicht geladen werden:", err);
                // Potentially display a message to the user in the UI
                // We can still try to initialize search as it's independent
                initSearch();
            });
    } else {
        // If .site-nav doesn't exist, only init search (if it's outside nav)
        // or nothing that depends on nav.
        // For this structure, search input is in nav.html, so it wouldn't be found.
        // If dark mode toggle is also in nav.html, it won't be found either.
        // So, only parts that are *not* in nav.html should be initialized here.
        // Let's assume for now that if .site-nav is missing, nav.html isn't used.
        console.warn(".site-nav element not found. Navigation features will be limited.");
        // If search or dark mode were outside nav, they could be initialized here.
    }
    // Call functions that are independent of nav.html loading, if any.
    // In this case, highlightActiveLink and initSearch might be independent
    // if their target elements are not within the fetched nav.html.
    // However, current structure has them inside nav.html.
    // Let's refine initNav to be more granular.
});


function initNavToggle() {
    const toggle = document.querySelector(".nav-toggle");
    const navContainer = document.querySelector(".site-nav .container");
    if (toggle && navContainer) {
        toggle.addEventListener("click", () => {
            navContainer.classList.toggle("open");
        });
    } else {
        console.warn("Nav toggle or container not found. Mobile navigation might not work.");
    }
}

function initDarkModeToggle() {
    const darkToggle = document.getElementById("dark-mode-toggle");
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
    } else {
        console.warn("Dark mode toggle not found.");
    }
}

function highlightActiveLink() {
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
    let pages = [];
    fetch('search_index.json')
        .then(r => {
            if (!r.ok) {
                throw new Error(`HTTP error! status: ${r.status}`);
            }
            return r.json();
        })
        .then(data => {
            pages = data;
        })
        .catch(err => {
            console.error("Suchindex konnte nicht geladen werden:", err);
            if (input) input.disabled = true;
            if (button) button.disabled = true;
            // Optionally, display a message to the user in the UI
            const searchContainer = document.getElementById('search-container'); // Assuming a container
            if (searchContainer) {
                const errorMsg = document.createElement('p');
                errorMsg.textContent = 'Suche derzeit nicht verfügbar.';
                errorMsg.style.color = 'red';
                searchContainer.appendChild(errorMsg);
            }
        });

    const input = document.getElementById('search-input');
    const button = document.getElementById('search-btn');
    const searchFeedback = document.getElementById('search-feedback'); // For non-alert messages

    if (!input || !button) {
        console.warn("Search input or button not found. Search will not be initialized.");
        return;
    }

    function runSearch() {
        if (searchFeedback) searchFeedback.textContent = ''; // Clear previous feedback
        const q = input.value.toLowerCase().trim();
        if (!q) {
            if (searchFeedback) searchFeedback.textContent = 'Bitte Suchbegriff eingeben.';
            return;
        }
        if (pages.length === 0) {
            if (searchFeedback) searchFeedback.textContent = 'Suche nicht initialisiert oder Index leer.';
            return;
        }

        const page = pages.find(p =>
            (p.title && p.title.toLowerCase().includes(q)) ||
            (p.text && p.text.toLowerCase().includes(q))
        );
        if (page) {
            window.location.href = page.href;
        } else {
            if (searchFeedback) searchFeedback.textContent = 'Kein passendes Kapitel gefunden.';
            else alert('Kein passendes Kapitel gefunden'); // Fallback if no feedback element
        }
    }

    button.addEventListener('click', runSearch);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') runSearch();
    });
}
