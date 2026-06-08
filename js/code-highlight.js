document.addEventListener('DOMContentLoaded', function () {
    if (!window.hljs) {
        return;
    }

    const aliases = {
        'composer.json': 'json',
        'html': 'xml'
    };

    document.querySelectorAll('pre code').forEach(function (code) {
        const languageClass = Array.from(code.classList).find(function (className) {
            return className.startsWith('language-');
        });

        if (languageClass) {
            const language = languageClass.replace('language-', '').toLowerCase();
            const normalizedLanguage = aliases[language] || language;

            if (languageClass !== 'language-' + normalizedLanguage) {
                code.classList.remove(languageClass);
                code.classList.add('language-' + normalizedLanguage);
            }
        }

        hljs.highlightElement(code);
    });
});
