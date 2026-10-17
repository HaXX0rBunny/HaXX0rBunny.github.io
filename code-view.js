(() => {
    const tokens = /\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:alignas|auto|bool|break|case|class|const|constexpr|continue|default|delete|double|else|enum|explicit|false|float|for|if|int|namespace|new|nullptr|override|private|protected|public|return|sizeof|static|static_cast|struct|switch|template|this|true|typename|uint32|uint64|using|virtual|void|while)\b|\b(?:0x[\da-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[fFuUlL]*)\b/g;
    const decorate = root => {
        const samples = root.matches?.('pre code') ? [root] : root.querySelectorAll?.('pre code') || [];
        for (const code of samples) {
            if (code.dataset.codeView) continue;
            code.dataset.codeView = 'ready';
            const text = code.textContent;
            const fragment = document.createDocumentFragment();
            let offset = 0;
            for (const match of text.matchAll(tokens)) {
                fragment.append(document.createTextNode(text.slice(offset, match.index)));
                const span = document.createElement('span');
                const value = match[0];
                span.className = value.startsWith('//') || value.startsWith('/*') ? 'code-comment'
                    : /^['"]/.test(value) ? 'code-string'
                    : /^\d/.test(value) ? 'code-number' : 'code-keyword';
                span.textContent = value;
                fragment.append(span);
                offset = match.index + value.length;
            }
            fragment.append(document.createTextNode(text.slice(offset)));
            code.replaceChildren(fragment);
            code.parentElement.tabIndex = 0;
        }
    };
    decorate(document);
    // Weekly project tabs insert their code examples after navigation.
    new MutationObserver(records => {
        for (const record of records) {
            for (const node of record.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) decorate(node);
            }
        }
    }).observe(document.querySelector('main') || document.body, {childList: true, subtree: true});
})();
