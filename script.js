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

    

    // Mouse hover effect for life sections
    const realLifeSection = document.querySelector('.real-life');
    const furryLifeSection = document.querySelector('.furry-life');
    const desktopLayout = document.querySelector('.desktop-layout');
    const footer = document.querySelector('.footer');
    let isMouseInFooter = false;

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

        document.addEventListener('mousemove', (e) => {
            if (isMouseInFooter) {
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
});