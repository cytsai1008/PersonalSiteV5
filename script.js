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
document.addEventListener('DOMContentLoaded', function() {

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
        img.addEventListener('click', function() {
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
    let isMouseInFooter = false;
    let isMouseInHeader = false;

    // Only enable the hover effect on desktop devices.
    if (desktopLayout && window.matchMedia('(min-width: 769px)').matches) {

        if (footer) {
            footer.addEventListener('mouseenter', () => {
                isMouseInFooter = true;
                realLifeSection.classList.remove('expanded');
                furryLifeSection.classList.remove('expanded');
            });

            footer.addEventListener('mouseleave', () => {
                isMouseInFooter = false;
            });
        }

        if (mainHeader) {
            mainHeader.addEventListener('mouseenter', () => {
                isMouseInHeader = true;
                realLifeSection.classList.remove('expanded');
                furryLifeSection.classList.remove('expanded');
            });

            mainHeader.addEventListener('mouseleave', () => {
                isMouseInHeader = false;
            });
        }

        document.addEventListener('mousemove', (e) => {
            if (isMouseInFooter || isMouseInHeader) {
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

    /**
     * Applies the selected theme to the page.
     * @param {string} theme - The theme to apply ('light', 'dark', or 'system').
     */
    const applyTheme = (theme) => {
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
    };

    // Add a click event listener to the theme dropdown.
    themeDropdown.addEventListener('click', (e) => {
        const theme = e.target.closest('a')?.dataset.theme;
        if (theme) {
            e.preventDefault();
            applyTheme(theme);
        }
    });

    // Load the saved theme from local storage or default to 'system'.
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);
});
