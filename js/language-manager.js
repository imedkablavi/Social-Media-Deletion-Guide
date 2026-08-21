/**
 * Language management for EN / AR / FR / TR.
 * English is the first-visit default; an explicit saved preference wins later.
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
        this.ensureAccessibleLabels();
    }

    detectBrowserLanguage() {
        this.currentLang = 'en';
    }

    setupEventListeners() {
        const languageBtn = document.getElementById('languageBtn');
        const languageDropdown = document.getElementById('languageDropdown');

        languageBtn?.addEventListener('click', event => {
            event.stopPropagation();
            this.toggleLanguageDropdown();
        });

        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', event => {
                event.stopPropagation();
                const lang = event.currentTarget.getAttribute('data-lang');
                if (lang && lang !== this.currentLang) this.changeLanguage(lang);
                else this.closeLanguageDropdown();
            });
        });

        document.addEventListener('click', event => {
            if (languageDropdown && !languageBtn?.contains(event.target) && !languageDropdown.contains(event.target)) {
                this.closeLanguageDropdown();
            }
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                const wasOpen = languageDropdown?.classList.contains('show');
                this.closeLanguageDropdown();
                if (wasOpen) languageBtn?.focus();
            }
        });
    }

    ensureAccessibleLabels() {
        const githubLink = document.querySelector('.nav-github');
        if (githubLink) githubLink.setAttribute('aria-label', 'GitHub repository');
    }

    toggleLanguageDropdown() {
        const dropdown = document.getElementById('languageDropdown');
        const button = document.getElementById('languageBtn');
        if (!dropdown) return;
        const open = dropdown.classList.toggle('show');
        button?.setAttribute('aria-expanded', String(open));
        if (open) dropdown.querySelector('.language-option.active')?.focus();
    }

    closeLanguageDropdown() {
        document.getElementById('languageDropdown')?.classList.remove('show');
        document.getElementById('languageBtn')?.setAttribute('aria-expanded', 'false');
    }

    changeLanguage(newLang) {
        if (!this.supportedLangs.includes(newLang) || newLang === this.currentLang) return;
        const oldLang = this.currentLang;
        this.currentLang = newLang;
        this.updateHTMLAttributes();
        this.updateLanguageUI();
        this.closeLanguageDropdown();
        this.notifyObservers('languageChanged', { from: oldLang, to: newLang });
        this.saveLanguagePreference(newLang);
    }

    updateHTMLAttributes() {
        const html = document.documentElement;
        html.setAttribute('lang', this.currentLang);
        html.setAttribute('dir', this.currentLang === 'ar' ? 'rtl' : 'ltr');
        if (document.body) {
            document.body.className = document.body.className.replace(/\blang-\w+\b/g, '').trim();
            document.body.classList.add(`lang-${this.currentLang}`);
        }
    }

    updateLanguageUI() {
        const currentLangSpan = document.getElementById('currentLang');
        if (currentLangSpan && typeof languageNames !== 'undefined') currentLangSpan.textContent = languageNames[this.currentLang];

        document.querySelectorAll('.language-option').forEach(option => {
            const active = option.getAttribute('data-lang') === this.currentLang;
            option.classList.toggle('active', active);
            option.setAttribute('aria-current', active ? 'true' : 'false');
        });

        this.updateAllTextElements();
        this.ensureAccessibleLabels();
        const langData = this.getCurrentLanguageData();
        if (langData?.title) document.title = langData.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && langData?.description) metaDesc.setAttribute('content', langData.description);
    }

    updateAllTextElements() {
        const langData = this.getCurrentLanguageData();
        if (!langData) return;

        document.querySelectorAll('[data-key]').forEach(element => {
            const value = langData[element.getAttribute('data-key')];
            if (value != null) element.textContent = value;
        });

        document.querySelectorAll('[data-key-placeholder]').forEach(element => {
            const value = langData[element.getAttribute('data-key-placeholder')];
            if (value != null) element.setAttribute('placeholder', value);
        });

        document.querySelectorAll('[data-tooltip-key]').forEach(element => {
            const value = langData[element.getAttribute('data-tooltip-key')];
            if (value != null) element.setAttribute('data-tooltip', value);
        });
    }

    getCurrentLanguage() { return this.currentLang; }
    getCurrentLanguageData() { return typeof translations !== 'undefined' ? translations[this.currentLang] : null; }

    getText(key, fallback = '') {
        return this.getCurrentLanguageData()?.[key] ?? fallback;
    }

    getPlatformName(platformKey) {
        return this.getCurrentLanguageData()?.platforms?.[platformKey] ?? platformKey;
    }

    saveLanguagePreference(lang) {
        try { localStorage.setItem('preferred_language', lang); }
        catch (error) { console.warn('Could not save language preference:', error); }
    }

    loadLanguagePreference() {
        try {
            const saved = localStorage.getItem('preferred_language');
            return saved && this.supportedLangs.includes(saved) ? saved : null;
        } catch (error) {
            console.warn('Could not load language preference:', error);
            return null;
        }
    }

    isRTL(lang = this.currentLang) { return lang === 'ar'; }
    addObserver(callback) { this.observers.push(callback); }
    removeObserver(callback) { this.observers = this.observers.filter(observer => observer !== callback); }

    notifyObservers(event, data) {
        this.observers.forEach(callback => {
            try { callback(event, data); }
            catch (error) { console.error('Observer callback error:', error); }
        });
    }

    locale() {
        return this.currentLang === 'ar' ? 'ar-EG' : this.currentLang === 'fr' ? 'fr-FR' : this.currentLang === 'tr' ? 'tr-TR' : 'en-US';
    }

    formatNumber(number) {
        try { return new Intl.NumberFormat(this.locale()).format(number); }
        catch (_) { return String(number); }
    }

    formatDate(date, options = {}) {
        try {
            return new Intl.DateTimeFormat(this.locale(), { year: 'numeric', month: 'long', day: 'numeric', ...options }).format(date);
        } catch (_) {
            return date.toLocaleDateString();
        }
    }
}

const languageManager = new LanguageManager();

if (typeof module !== 'undefined' && module.exports) module.exports = LanguageManager;
