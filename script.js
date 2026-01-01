
document.addEventListener("DOMContentLoaded", () => {
    // --- Elements ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const darkIcon = document.getElementById("theme-toggle-dark-icon");
    const lightIcon = document.getElementById("theme-toggle-light-icon");
    const menuBtn = document.getElementById("mobile-menu-button");
    const menuIcon = menuBtn.querySelector("i");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");
    const yearSpan = document.getElementById("current-year");

    // --- 1. Set Current Year ---
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 2. Theme Toggle Logic ---
    function updateIcons() {
        if (document.documentElement.classList.contains("dark")) {
            darkIcon.classList.add("hidden");
            lightIcon.classList.remove("hidden");
        } else {
            lightIcon.classList.add("hidden");
            darkIcon.classList.remove("hidden");
        }
    }

    // Run once on load to sync icons with the theme set by the head script
    updateIcons();

    themeToggleBtn.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        const isDark = document.documentElement.classList.contains("dark");
        localStorage.setItem("color-theme", isDark ? "dark" : "light");
        updateIcons();
    });

    // --- 3. Mobile Menu Logic ---
    function toggleMenu() {
        const isOpen = mobileMenu.classList.toggle("open");
        
        // Update Icon (Bars vs X)
        if (isOpen) {
            menuIcon.classList.replace("fa-bars", "fa-xmark");
        } else {
            menuIcon.classList.replace("fa-xmark", "fa-bars");
        }
    }

    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            menuIcon.classList.replace("fa-xmark", "fa-bars");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (mobileMenu.classList.contains("open")) {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.remove("open");
                menuIcon.classList.replace("fa-xmark", "fa-bars");
            }
        }
    });
});