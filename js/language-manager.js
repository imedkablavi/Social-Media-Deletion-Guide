/**
 * Language Management System
 * Handles language detection, switching, and content updates
 */

class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.supportedLangs = ['ar', 'en', 'fr', 'tr'];
        this.observers = [];

        this.init();
    }

    init() {
        this.detectBrowserLanguage();
        this.setupEventListeners();
        this.updateHTMLAttributes();
    }

    // Keep English as the first-visit default. A saved user preference still wins later.
    detectBrowserLanguage() {
        this.currentLang = 'en';
        console.log('Default language: en');
    }

    // Setup language dropdown event listeners
    setupEventListeners() {
        const languageBtn = document.getElementById('languageBtn');
        const languageDropdown = document.getElementById('languageDropdown');

        if (languageBtn) {
            languageBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleLanguageDropdown();
            });
        }

        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = e.target.getAttribute('data-lang') ||
                           e.target.closest('.language-option').getAttribute('data-lang');
                if (lang && lang !== this.currentLang) {
                    this.changeLanguage(lang);
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (languageDropdown && !languageBtn?.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('show');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && languageDropdown) {
                languageDropdown.classList.remove('show');
            }
        });
    }

    toggleLanguageDropdown() {
        const dropdown = document.getElementById('languageDropdown');
        if (dropdown) dropdown.classList.toggle('show');
    }

    changeLanguage(newLang) {
        if (!this.supportedLangs.includes(newLang) || newLang === this.currentLang) return;

        const oldLang = this.currentLang;
        this.currentLang = newLang;
        this.updateHTMLAttributes();
        this.updateLanguageUI();

        const dropdown = document.getElementById('languageDropdown');
        if (dropdown) dropdown.classList.remove('show');

        this.notifyObservers('languageChanged', { from: oldLang, to: newLang });
        this.saveLanguagePreference(newLang);
        console.log(`Language changed from ${oldLang} to ${newLang}`);
    }

    updateHTMLAttributes() {
        const html = document.documentElement;
        html.setAttribute('lang', this.currentLang);
        html.setAttribute('dir', this.currentLang === 'ar' ? 'rtl' : 'ltr');

        document.body.className = document.body.className
            .replace(/\blang-\w+\b/g, '') + ` lang-${this.currentLang}`;
    }

    updateLanguageUI() {
        const currentLangSpan = document.getElementById('currentLang');
        if (currentLangSpan && languageNames) {
            currentLangSpan.textContent = languageNames[this.currentLang];
        }

        document.querySelectorAll('.language-option').forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === this.currentLang) option.classList.add('active');
        });

        this.updateAllTextElements();

        if (translations && translations[this.currentLang]) {
            document.title = translations[this.currentLang].title;
        }

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && translations && translations[this.currentLang]) {
            metaDesc.setAttribute('content', translations[this.currentLang].description);
        }
    }

    updateAllTextElements() {
        if (!translations || !translations[this.currentLang]) return;

        const langData = translations[this.currentLang];

        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (langData[key]) {
                if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'search')) {
                    element.placeholder = langData[key];
                } else {
                    element.textContent = langData[key];
                }
            }
        });

        const searchInput = document.getElementById('searchInput');
        if (searchInput && langData.search) searchInput.placeholder = langData.search;

        document.querySelectorAll('[data-tooltip-key]').forEach(element => {
            const key = element.getAttribute('data-tooltip-key');
            if (langData[key]) element.setAttribute('data-tooltip', langData[key]);
        });

        const scrollHintEl = document.querySelector('.scroll-indicator [data-key="scrollHint"]');
        if (scrollHintEl && langData.scrollHint) scrollHintEl.textContent = langData.scrollHint;
    }

    getCurrentLanguage() { return this.currentLang; }

    getCurrentLanguageData() {
        return translations ? translations[this.currentLang] : null;
    }

    getText(key, fallback = '') {
        const langData = this.getCurrentLanguageData();
        return langData && langData[key] ? langData[key] : fallback;
    }

    getPlatformName(platformKey) {
        const langData = this.getCurrentLanguageData();
        return langData && langData.platforms && langData.platforms[platformKey]
            ? langData.platforms[platformKey]
            : platformKey;
    }

    saveLanguagePreference(lang) {
        try {
            localStorage.setItem('preferred_language', lang);
        } catch (e) {
            console.warn('Could not save language preference:', e);
        }
    }

    loadLanguagePreference() {
        try {
            const saved = localStorage.getItem('preferred_language');
            if (saved && this.supportedLangs.includes(saved)) return saved;
        } catch (e) {
            console.warn('Could not load language preference:', e);
        }
        return null;
    }

    isRTL(lang = null) {
        const checkLang = lang || this.currentLang;
        return checkLang === 'ar';
    }

    addObserver(callback) { this.observers.push(callback); }

    removeObserver(callback) {
        this.observers = this.observers.filter(obs => obs !== callback);
    }

    notifyObservers(event, data) {
        this.observers.forEach(callback => {
            try {
                callback(event, data);
            } catch (e) {
                console.error('Observer callback error:', e);
            }
        });
    }

    formatNumber(number) {
        try {
            const locale = this.currentLang === 'ar' ? 'ar-EG' :
                          this.currentLang === 'fr' ? 'fr-FR' :
                          this.currentLang === 'tr' ? 'tr-TR' : 'en-US';
            return new Intl.NumberFormat(locale).format(number);
        } catch (e) {
            return number.toString();
        }
    }

    formatDate(date, options = {}) {
        try {
            const locale = this.currentLang === 'ar' ? 'ar-EG' :
                          this.currentLang === 'fr' ? 'fr-FR' :
                          this.currentLang === 'tr' ? 'tr-TR' : 'en-US';
            const defaultOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(date);
        } catch (e) {
            return date.toLocaleDateString();
        }
    }
}

const languageManager = new LanguageManager();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
}
