const huntressOriginalValues = new WeakMap();

function rememberHuntressOriginal(element, attribute) {
    let values = huntressOriginalValues.get(element);
    if (!values) {
        values = new Map();
        huntressOriginalValues.set(element, values);
    }

    const key = attribute || 'innerHTML';
    if (!values.has(key)) {
        values.set(key, attribute ? element.getAttribute(attribute) : element.innerHTML);
    }
    return values.get(key);
}

function applyHuntressLocalization() {
    const useKorean = window.PortfolioI18n?.getLocale?.() === 'ko';
    const entries = window.HUNTRESS_KO_TRANSLATIONS || [];

    entries.forEach((entry) => {
        const elements = Array.from(document.querySelectorAll(entry.selector));
        elements.forEach((element, index) => {
            if (!entry.attribute && element.hasAttribute('data-i18n')) return;

            const original = rememberHuntressOriginal(element, entry.attribute);
            const localized = entry.values?.[index];
            const value = useKorean && localized !== undefined ? localized : original;

            if (entry.attribute) {
                if (value === null) element.removeAttribute(entry.attribute);
                else element.setAttribute(entry.attribute, value);
            } else {
                element.innerHTML = value;
            }
        });
    });
}

document.addEventListener('portfolio-locale-changed', applyHuntressLocalization);
applyHuntressLocalization();
