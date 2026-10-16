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
