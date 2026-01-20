
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

    // Performance Metrics
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Logic to trigger a "fade-in" or "count-up" if you add stat numbers
                entry.target.classList.add('opacity-100');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.prose').forEach(el => observer.observe(el));



    function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const statsSection = document.getElementById('projects');
const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Values pulled directly from Project Guide
            animateValue(document.getElementById("cost-reduction"), 0, 38, 2000);
            animateValue(document.getElementById("cold-start"), 0, 45, 2000);
            animateValue(document.getElementById("rps-count"), 0, 180, 2000);
            animateValue(document.getElementById("throughput-gain"), 0, 26, 2000);
            observer1.unobserve(statsSection); // Run once
        }
    });
}, { threshold: 0.2 });

observer1.observe(statsSection);

});