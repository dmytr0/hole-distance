(() => {
    const key = 'black-olive-theme';
    const controls = document.querySelectorAll('[data-theme-toggle]');
    const apply = (theme) => {
        document.documentElement.dataset.theme = theme;
        controls.forEach((control) => {
            const isDark = theme === 'dark';
            const label = isDark ? 'Світла тема' : 'Темна тема';
            control.textContent = `${isDark ? '☀' : '☾'} ${label}`;
            control.setAttribute('aria-label', label);
            control.setAttribute('title', label);
            control.setAttribute('aria-pressed', String(isDark));
        });
    };
    let theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    apply(theme);
    controls.forEach((control) => control.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem(key, theme); } catch (_) { /* local storage unavailable */ }
        apply(theme);
    }));
})();
