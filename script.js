/**
 * -----------------------------------------------------------------------------
 * Personal Website Script
 * -----------------------------------------------------------------------------
 * This script handles the dynamic functionality of the personal website,
 * including:
 * - Language localization based on the browser's language.
 * - A theme switcher with light, dark, and system modes.
 * - A hover effect for the desktop layout that expands the sections.
 * - Click animations for profile images.
 */
document.addEventListener('DOMContentLoaded', function () {

    /**
     * -------------------------------------------------------------------------
     * Localization
     * -------------------------------------------------------------------------
     * This section handles the language localization of the website. It
     * detects the user's browser language and fetches the appropriate
     * translations from a JSON file.
     */

    /**
     * Sets the language of the page by updating the content of elements with
     * the `data-translate` attribute.
     * @param {string} language - The language code (e.g., 'en', 'zh-TW').
     * @param {object} translations - An object containing the translations.
     */
    const setLanguage = (language, translations) => {
        document.documentElement.lang = language;
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language] && translations[language][key]) {
                element.innerHTML = translations[language][key];
            }
        });
    };

    /**
     * Fetches the language translations from the `languages.json` file and
     * sets the page language.
     */
    const fetchTranslations = async () => {
        try {
            const response = await fetch('assets/languages.json');
            const translations = await response.json();
            let userLanguage = navigator.language;
            const traditionalChineseLocales = ['zh-Hant', 'zh-Hant-TW', 'zh-Hant-MO', 'zh-Hant-HK', 'zh-TW'];
            const simplifiedChineseLocales = ['zh-Hans', 'zh-Hans-CN', 'zh-Hans-SG', 'zh-CN'];

            if (traditionalChineseLocales.includes(userLanguage)) {
                userLanguage = 'zh-TW';
            } else if (simplifiedChineseLocales.includes(userLanguage)) {
                userLanguage = 'zh-CN';
            }

            // Fallback to English if the user's language is not available.
            const language = translations[userLanguage] ? userLanguage : 'en';
            setLanguage(language, translations);
        } catch (error) {
            console.error('Error fetching translations:', error);
        }
    };

    fetchTranslations().catch(error => console.error('Unhandled promise rejection:', error));

    /**
     * -------------------------------------------------------------------------
     * UI Animations
     * -------------------------------------------------------------------------
     * This section handles the UI animations, such as the click animation
     * for the profile images.
     */

    const profileImages = document.querySelectorAll('.profile-image');
    profileImages.forEach(img => {
        img.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    /**
     * -------------------------------------------------------------------------
     * Desktop Hover Effect
     * -------------------------------------------------------------------------
     * This section handles the hover effect on desktop devices, which expands
     * the sections when the user hovers over them.
     */

    const realLifeSection = document.querySelector('.real-life');
    const furryLifeSection = document.querySelector('.furry-life');
    const desktopLayout = document.querySelector('.desktop-layout');
    const footer = document.querySelector('.footer');
    const mainHeader = document.querySelector('.main-header');
    let isMouseInRestrictedZone = false;

    // Only enable the hover effect on desktop devices.
    if (desktopLayout && window.matchMedia('(min-width: 769px)').matches) {

        [mainHeader, footer].forEach(element => {
            if (element) {
                element.addEventListener('mouseenter', () => {
                    isMouseInRestrictedZone = true;
                    realLifeSection.classList.remove('expanded');
                    furryLifeSection.classList.remove('expanded');
                });
                element.addEventListener('mouseleave', () => {
                    isMouseInRestrictedZone = false;
                });
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (isMouseInRestrictedZone) {
                return;
            }
            const windowWidth = window.innerWidth;
            const mouseX = e.clientX;

            if (mouseX < windowWidth / 3) {
                realLifeSection.classList.add('expanded');
                furryLifeSection.classList.remove('expanded');
            } else if (mouseX > windowWidth * 2 / 3) {
                furryLifeSection.classList.add('expanded');
                realLifeSection.classList.remove('expanded');
            } else {
                realLifeSection.classList.remove('expanded');
                furryLifeSection.classList.remove('expanded');
            }
        });

        document.addEventListener('mouseleave', () => {
            realLifeSection.classList.remove('expanded');
            furryLifeSection.classList.remove('expanded');
        });
    }

    /**
     * -------------------------------------------------------------------------
     * Theme Switcher
     * -------------------------------------------------------------------------
     * This section handles the theme switching functionality. It allows the
     * user to switch between light, dark, and system themes.
     */

    const themeIcon = document.getElementById('theme-icon');
    const themeDropdown = document.getElementById('theme-dropdown');
    const themeSwitcher = document.querySelector('.theme-switcher');
    const themeSwitcherButton = document.getElementById('theme-switcher-button');
    const mobileMediaQuery = window.matchMedia('(max-width: 768px)');

    /**
     * Animates an icon by adding a CSS class and removing it on animation end.
     * @param {HTMLElement} icon - The icon element to animate.
     * @param {string} animationClass - The CSS animation class to apply.
     */
    const animateIcon = (icon, animationClass) => {
        if (icon) {
            const listener = () => {
                icon.classList.remove(animationClass);
                icon.removeEventListener('animationend', listener);
            };
            icon.addEventListener('animationend', listener);
            icon.classList.add(animationClass);
        }
    };

    /**
     * Applies the selected theme to the page.
     * @param {string} theme - The theme to apply ('light', 'dark', or 'system').
     * @param {boolean} [animate=true] - Whether to animate the theme icon.
     */
    const applyTheme = (theme, animate = true) => {
        if (theme === 'system') {
            // If the theme is 'system', check the user's OS preference.
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light';
            themeIcon.textContent = 'brightness_auto';
        } else {
            // Otherwise, apply the selected theme directly.
            document.documentElement.dataset.theme = theme;
            themeIcon.textContent = theme === 'dark' ? 'dark_mode' : 'light_mode';
        }
        // Save the selected theme to local storage.
        localStorage.setItem('theme', theme);

        if (animate) {
            animateIcon(themeIcon, 'theme-icon-animation');
        }

        // Update icon fill for the active theme
        themeIcon.style.fontVariationSettings = "'FILL' 1";

        themeDropdown.querySelectorAll('a .material-symbols-rounded').forEach(icon => {
            icon.style.fontVariationSettings = "'FILL' 0";
        });

        const activeIcon = themeDropdown.querySelector(`a[data-theme="${theme}"] .material-symbols-rounded`);
        if (activeIcon) {
            activeIcon.style.fontVariationSettings = "'FILL' 1";
            if (animate) {
                animateIcon(activeIcon, 'selector-icon-animation');
            }
        }
    };

    // Listen for changes in the system's color scheme.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const savedTheme = localStorage.getItem('theme') || 'system';
        if (savedTheme === 'system') {
            applyTheme('system');
        }
    });

    // Add a click event listener to the theme dropdown.
    themeDropdown.addEventListener('click', (e) => {
        const theme = e.target.closest('a')?.dataset.theme;
        if (theme) {
            e.preventDefault();
            applyTheme(theme);
            if (mobileMediaQuery.matches) {
                themeSwitcher.classList.remove('show-dropdown');
            }
        }
    });

    if (themeSwitcherButton) {
        themeSwitcherButton.addEventListener('click', () => {
            if (mobileMediaQuery.matches) {
                themeSwitcher.classList.toggle('show-dropdown');
            }
        });

        const resetIconWeight = () => {
            themeIcon.style.fontVariationSettings = "'FILL' 1";
        };

        const pressIcon = () => {
            themeIcon.style.fontVariationSettings = "'FILL' 1, 'wght' 100";
        }

        ['mousedown', 'touchstart'].forEach(evt => themeSwitcherButton.addEventListener(evt, pressIcon));
        ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(evt => themeSwitcherButton.addEventListener(evt, resetIconWeight));
    }

    // Click outside to close dropdown on mobile
    document.addEventListener('click', (e) => {
        if (mobileMediaQuery.matches && !themeSwitcher.contains(e.target)) {
            themeSwitcher.classList.remove('show-dropdown');
        }
    });

    // Load the saved theme from local storage or default to 'system'.
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme, false);

    // -------------------------------------------------------------------------
    // Floating Theme Switcher on Mobile
    // -------------------------------------------------------------------------
    let lastScrollY = window.scrollY;
    const scrollThreshold = 100; // Pixels to scroll before showing/hiding

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (mobileMediaQuery.matches) {
            // Only apply on mobile
            if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
                // Scrolling down and past threshold
                themeSwitcher.classList.add('visible');
            } else if (currentScrollY < lastScrollY || currentScrollY <= scrollThreshold) {
                // Scrolling up or at the top of the page
                themeSwitcher.classList.remove('visible');
                themeSwitcher.classList.remove('show-dropdown'); // Also close dropdown
            }
        } else {
            // On desktop, ensure it's not floating and visible by default
            themeSwitcher.classList.remove('visible');
        }
        lastScrollY = currentScrollY;
    };

    const handleResize = () => {
        if (!mobileMediaQuery.matches) {
            // If resized to desktop, ensure the switcher is not floating
            themeSwitcher.classList.remove('visible');
            themeSwitcher.classList.remove('show-dropdown'); // Also close dropdown
        }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Initial check on load for mobile devices
    if (mobileMediaQuery.matches) {
        themeSwitcher.classList.remove('visible'); // Ensure it's hidden initially on mobile
    }
});
