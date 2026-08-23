(function initializeOverAnimationLocalization() {
    const originalValues = new WeakMap();

    function getOriginalRecord(element) {
        let record = originalValues.get(element);
        if (!record) {
            record = {};
            originalValues.set(element, record);
        }
        return record;
    }

    function applyOverAnimationLocale() {
        const isKorean = window.PortfolioI18n?.getLocale?.() === 'ko';
        const translations = window.OVERANIM_KO || {};

        document.querySelectorAll('[data-oa-key]').forEach((element) => {
            const key = element.dataset.oaKey;
            const attribute = element.dataset.oaAttr;
            const record = getOriginalRecord(element);

            if (attribute) {
                if (!(attribute in record)) {
                    record[attribute] = element.getAttribute(attribute) || '';
                }
                const translatedValue = translations[key];
                element.setAttribute(
                    attribute,
                    isKorean && translatedValue !== undefined
                        ? translatedValue
                        : record[attribute]
                );
                return;
            }

            if (!('html' in record)) {
                record.html = element.innerHTML;
            }
            const translatedValue = translations[key];
            element.innerHTML = isKorean && translatedValue !== undefined
                ? translatedValue
                : record.html;
        });
    }

    document.addEventListener('portfolio-locale-changed', applyOverAnimationLocale);
    applyOverAnimationLocale();
})();
