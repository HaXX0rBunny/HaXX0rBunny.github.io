const DETAIL_THEME_STORAGE_KEY = 'portfolio-theme-v2';

function initializeDetailPageChrome() {
    const themeToggle = document.getElementById('themeToggle');
    const languageToggle = document.getElementById('languageToggle');

    const applyTheme = (theme, persist = true) => {
        const nextTheme = theme === 'light' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-color-scheme', nextTheme);

        if (persist) {
            try {
                localStorage.setItem(DETAIL_THEME_STORAGE_KEY, nextTheme);
            } catch (error) {
                console.warn('Theme preference save failed:', error);
            }
        }

        if (themeToggle) {
            const isDark = nextTheme === 'dark';
            themeToggle.textContent = window.PortfolioI18n?.t(
                isDark ? 'global.themeToLight' : 'global.themeToDark',
                isDark ? 'Light' : 'Dark'
            );
            themeToggle.setAttribute('aria-label', window.PortfolioI18n?.t(
                isDark ? 'global.themeToLightAria' : 'global.themeToDarkAria',
                isDark ? 'Switch to light theme' : 'Switch to dark theme'
            ));
        }
    };

    let savedTheme = 'light';
    try {
        savedTheme = localStorage.getItem(DETAIL_THEME_STORAGE_KEY) || 'light';
    } catch (error) {
        console.warn('Theme preference read failed:', error);
    }
    applyTheme(savedTheme, false);

    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    if (window.PortfolioI18n) {
        const currentLocale = window.PortfolioI18n.getLocale();
        window.PortfolioI18n.setLocale(currentLocale, { persist: false, force: true });
        window.PortfolioI18n.initializeLocaleToggle('languageToggle');
    }

    document.addEventListener('portfolio-locale-changed', () => {
        applyTheme(document.documentElement.getAttribute('data-color-scheme'), false);
        window.PortfolioI18n?.updateLanguageButton?.(languageToggle);
    });
}

initializeDetailPageChrome();

document.addEventListener('click', (event) => {
    const button = event.target.closest('.video-poster[data-video-id]');
    if (!button) return;
    const videoId = button.dataset.videoId;
    if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) return;
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    frame.title = button.getAttribute('aria-label');
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    button.replaceWith(frame);
    frame.focus();
});
