/**
 * This script handles the dynamic functionality of the personal website, including:
 * - Language localization based on the browser's language.
 * - Click animations for profile images.
 * - A hover effect for the desktop layout that expands the sections.
 */
document.addEventListener('DOMContentLoaded', function() {

    // --- Localization ---

    /**
     * Sets the language of the page by updating the content of elements with the `data-translate` attribute.
     * @param {string} language - The language code (e.g., 'en', 'zh-TW').
     * @param {object} translations - An object containing the translations for all languages.
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
     * Fetches the language translations from the `languages.json` file and sets the page language.
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

    // --- UI Animations ---

    /**
     * Adds a click animation to all elements with the `.profile-image` class.
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

    // --- Desktop Hover Effect ---

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

            // Expand the left section when the mouse is in the left third of the screen.
            if (mouseX < windowWidth / 3) {
                realLifeSection.classList.add('expanded');
                furryLifeSection.classList.remove('expanded');
            } 
            // Expand the right section when the mouse is in the right third of the screen.
            else if (mouseX > windowWidth * 2 / 3) {
                furryLifeSection.classList.add('expanded');
                realLifeSection.classList.remove('expanded');
            } 
            // Reset to the default state when the mouse is in the middle third.
            else {
                realLifeSection.classList.remove('expanded');
                furryLifeSection.classList.remove('expanded');
            }
        });

        // Reset the layout when the mouse leaves the window.
        document.addEventListener('mouseleave', () => {
            realLifeSection.classList.remove('expanded');
            furryLifeSection.classList.remove('expanded');
        });
    }
});