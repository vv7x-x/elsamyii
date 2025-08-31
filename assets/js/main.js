// Global state and translations
const state = { lang: localStorage.getItem('lang') || 'ar' };
const translations = {
    'nav_home': { ar: 'الرئيسية', en: 'Home' },
    'nav_about': { ar: 'عن المدرس', en: 'About' },
    'nav_videos': { ar: 'الفيديوهات', en: 'Videos' },
    'hero_title': { ar: 'اجعل الرياضيات مادتك المفضلة<br><span class="text-primary-color">مع خبرة تتجاوز 15 عاماً</span>', en: 'Make Math Your Favorite Subject<br><span class="text-primary-color">With Over 15 Years of Experience</span>' },
    'hero_subtitle': { ar: 'شرح تفصيلي ومبسط، أمثلة عملية، ومتابعة دورية لضمان استيعابك الكامل لمنهج الثانوية العامة.', en: 'Detailed and simplified explanations, practical examples, and regular follow-up to ensure your full understanding of the high school curriculum.' },
    'hero_btn_about': { ar: 'اعرف المزيد عني', en: 'About Me' },
    'hero_btn_videos': { ar: 'شاهد الشروحات', en: 'Watch Videos' },
    'why_us_title': { ar: 'لماذا تختار أ. أحمد سامي؟', en: 'Why Choose Mr. Ahmed Samy?' },
    'why_us_subtitle': { ar: 'نقدم لك أكثر من مجرد دروس، بل تجربة تعليمية متكاملة تضمن لك التفوق.', en: 'We offer more than just lessons, but an integrated educational experience that guarantees your excellence.' },
    'feature_1_title': { ar: 'شرح مبسط وعميق', en: 'Simple and Deep Explanation' },
    'feature_1_desc': { ar: 'تحويل أعقد المسائل إلى خطوات بسيطة ومنطقية يمكنك فهمها وتطبيقها بسهولة.', en: 'Turning the most complex problems into simple, logical steps you can easily understand and apply.' },
    'feature_2_title': { ar: 'متابعة فردية', en: 'Individual Follow-up' },
    'feature_2_desc': { ar: 'اهتمام شخصي بكل طالب، مع تقييمات مستمرة وواجبات لضمان عدم وجود أي ثغرات.', en: 'Personal attention to each student, with continuous assessments and assignments to ensure there are no gaps.' },
    'feature_3_title': { ar: 'محتوى عصري', en: 'Modern Content' },
    'feature_3_desc': { ar: 'استخدام أحدث الوسائل التكنولوجية لجعل عملية التعلم ممتعة وفعالة.', en: 'Using the latest technological means to make the learning process fun and effective.' }
};

// Function to set the language
const setLanguage = (lang) => {
    state.lang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.dataset.langKey;
        if (translations[key] && translations[key][lang]) {
            // Use innerHTML for keys that might contain HTML tags
            if (key.includes('title')) {
                el.innerHTML = translations[key][lang];
            } else {
                el.textContent = translations[key][lang];
            }
        }
    });
    
    const langSwitch = document.querySelector('#lang-switch');
    if (langSwitch) {
        langSwitch.textContent = lang === 'ar' ? 'EN' : 'عربي';
    }
};

// Function to set the active navigation link
const setActiveLink = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('bg-slate-200'); 
        }
    });
};

// Main initialization function, to be called after layout is loaded
function initializeComponents() {
    // Event Listeners
    const langSwitch = document.querySelector('#lang-switch');
    if (langSwitch) {
        langSwitch.addEventListener('click', () => setLanguage(state.lang === 'ar' ? 'en' : 'ar'));
    }

    const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
    const mobileMenu = document.querySelector('#mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }

    window.addEventListener('scroll', () => {
        const header = document.querySelector('#main-header');
        if (header) {
            window.scrollY > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
        }
    }, { passive: true });

    const yearSpan = document.querySelector('#year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Initial setup
    setLanguage(state.lang);
    setActiveLink();
}
