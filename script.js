document.addEventListener("DOMContentLoaded", () => {
    // --- 1. UI Elements ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const darkIcon = document.getElementById("theme-toggle-dark-icon");
    const lightIcon = document.getElementById("theme-toggle-light-icon");
    const menuBtn = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const yearSpan = document.getElementById("current-year");
    const statsSection = document.getElementById('projects');

    // Set Current Year
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 2. Theme Management ---
    const updateIcons = () => {
        const isDark = document.documentElement.classList.contains("dark");
        darkIcon?.classList.toggle("hidden", isDark);
        lightIcon?.classList.toggle("hidden", !isDark);
    };

    updateIcons(); // Initial sync

    themeToggleBtn?.addEventListener("click", () => {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("color-theme", isDark ? "dark" : "light");
        updateIcons();
    });

    // --- 3. Mobile Navigation ---
    const toggleMenu = (forceClose = null) => {
        const menuIcon = menuBtn?.querySelector("i");
        const isOpen = forceClose === null 
            ? mobileMenu.classList.toggle("open") 
            : mobileMenu.classList.remove("open") || false;

        if (menuIcon) {
            menuIcon.classList.toggle("fa-xmark", isOpen);
            menuIcon.classList.toggle("fa-bars", !isOpen);
        }
    };

    menuBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close on link click or outside click
    document.querySelectorAll(".mobile-link").forEach(link => {
        link.addEventListener("click", () => toggleMenu(true));
    });

    document.addEventListener("click", (e) => {
        if (mobileMenu?.classList.contains("open") && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            toggleMenu(true);
        }
    });

    // --- 4. High-Performance Metrics Animation ---
    /**
     * @param {HTMLElement} obj - The element to update
     * @param {number} end - Final value
     * @param {string} suffix - Optional string (e.g., '%', 'ms')
     */
    function animateValue(obj, end, duration = 2000, suffix = "") {
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * end) + suffix;
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    // Single Observer for Project Stats and Reveal Effects
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'projects') {
                    // Metrics from Hybrid Runtime Strategy Guide
                    animateValue(document.getElementById("cost-reduction"), 38, 2000, "%");
                    animateValue(document.getElementById("cold-start"), 45, 2000, "x");
                    animateValue(document.getElementById("rps-count"), 180, 2000);
                    animateValue(document.getElementById("p95-latency"), 46, 2000, "ms");
                    animateValue(document.getElementById("throughput-gain"), 26, 2000, "%");
                    revealObserver.unobserve(entry.target);
                } else {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                }
            }
        });
    }, { threshold: 0.25 });

    // Initialize Observers
    if (statsSection) revealObserver.observe(statsSection);
    document.querySelectorAll('.prose, .project-card').forEach(el => {
        el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-4');
        revealObserver.observe(el);
    });
});