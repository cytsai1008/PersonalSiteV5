document.addEventListener('DOMContentLoaded', function() {
    // Profile image click handlers
    const profileImages = document.querySelectorAll('.profile-image');
    profileImages.forEach(img => {
        img.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Footer icon click handlers
    const footerIcons = document.querySelectorAll('.footer-icon');
    footerIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const iconName = this.querySelector('.material-symbols-rounded').textContent;
            console.log(`Clicked ${iconName} icon`);
        });
    });

    // Mobile section click handlers
    const mobileSections = document.querySelectorAll('.mobile-section');
    mobileSections.forEach(section => {
        section.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Footer scroll behavior
    const footer = document.querySelector('.footer');

    window.addEventListener('scroll', () => {
        // Show footer if scrolled down, hide if at the top
        if (window.scrollY > 0) {
            footer.classList.add('show');
        } else {
            footer.classList.remove('show');
        }
    });
});