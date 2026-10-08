// コードの色分けと、長いコードの折りたたみを設定する。
document.addEventListener('DOMContentLoaded', function () {
    // 言語名をhighlight.jsの対応名にそろえる。
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

        // highlight.jsが読み込まれていれば、コードを色分けする。
        if (window.hljs) {
            hljs.highlightElement(code);
        }

        // 末尾の空行を除いて数え、7行以上を折りたたむ。
        const source = code.textContent.replace(/\r\n?/g, '\n').replace(/\n+$/, '');
        if (source.split('\n').length < 7) {
            return;
        }

        // 同じコードに折りたたみを重複して設定しない。
        const pre = code.closest('pre');
        if (pre.parentElement.classList.contains('code-example')) {
            return;
        }

        // コードを囲み、5行分の高さをCSSに渡す。
        const wrapper = document.createElement('div');
        wrapper.className = 'code-example is-collapsed';
        const lineHeight = parseFloat(window.getComputedStyle(code).lineHeight)
            || parseFloat(window.getComputedStyle(code).fontSize) * 1.5;
        wrapper.style.setProperty('--code-line-height', lineHeight + 'px');

        // ボタンとコードを関連付けるため、重複しないIDを付ける。
        if (!pre.id) {
            let number = 1;
            while (document.getElementById('code-example-' + number)) {
                number += 1;
            }
            pre.id = 'code-example-' + number;
        }

        // 「全部見る」ボタンを作る。
        const controls = document.createElement('div');
        controls.className = 'code-example-controls';
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-outline-success btn-sm code-example-toggle';
        button.textContent = '全部見る';
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', pre.id);
        // クリックで表示状態とボタンの文言を切り替える。
        button.addEventListener('click', function () {
            const expanded = wrapper.classList.toggle('is-collapsed') === false;
            button.setAttribute('aria-expanded', String(expanded));
            button.textContent = expanded ? '折りたたむ' : '全部見る';
        });

        pre.before(wrapper);
        wrapper.append(pre, controls);
        controls.append(button);
    });
});
