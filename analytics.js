(() => {
    // Local previews and forks must not affect the portfolio's visitor counts.
    if (window.location.hostname !== 'haxx0rbunny.github.io') return;

    const measurementId = 'G-PSZ1QQG3EX';
    const pagePath = window.location.pathname === '/index.html' ? '/' : window.location.pathname;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
        page_location: window.location.origin + pagePath,
        allow_google_signals: false,
        allow_ad_personalization_signals: false
    });

    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(tag);
})();
