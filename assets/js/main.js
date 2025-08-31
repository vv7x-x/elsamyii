// assets/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const state = { lang: localStorage.getItem('lang') || 'ar' };
    const translations = {
        'nav_home': { ar: 'الرئيسية', en: 'Home' },
        'nav_about': { ar: 'عن المدرس', en: 'About' },
        'nav_videos': { ar: 'الفيديوهات', en: 'Videos' }, // تم التحديث
    };

    const setLanguage = (lang) => {
        state.lang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            if (translations[key] && translations[key][lang]) {
                el.textContent = translations[key][lang];
            }
        });
        document.querySelector('#lang-switch').textContent = lang === 'ar' ? 'EN' : 'عربي';
    };

    const setActiveLink = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPage) link.classList.add('active');
        });
    };

    document.querySelector('#lang-switch').addEventListener('click', () => setLanguage(state.lang === 'ar' ? 'en' : 'ar'));
    document.querySelector('#mobile-menu-btn').addEventListener('click', () => document.querySelector('#mobile-menu').classList.toggle('hidden'));
    window.addEventListener('scroll', () => {
        const header = document.querySelector('#main-header');
        window.scrollY > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
    }, { passive: true });
    document.querySelector('#year').textContent = new Date().getFullYear();

    setLanguage(state.lang);
    setActiveLink();
});