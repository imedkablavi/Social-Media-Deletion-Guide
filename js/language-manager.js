/**
 * Language Management System
 * Handles language detection, switching, and content updates
 */

class LanguageManager {
    constructor() {
        this.currentLang = 'ar';
    this.supportedLangs = ['ar', 'en', 'fr', 'tr'];
        this.observers = [];
        
        this.init();
    }

    init() {
        this.detectBrowserLanguage();
        this.setupEventListeners();
        this.updateHTMLAttributes();
    }

    // Detect browser language automatically
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();
        
        if (this.supportedLangs.includes(langCode)) {
            this.currentLang = langCode;
        } else {
            this.currentLang = 'ar'; // Default to Arabic
        }
        
        console.log(`Browser language detected: ${browserLang}, Using: ${this.currentLang}`);
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

        // Language option clicks
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

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (languageDropdown && !languageBtn?.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('show');
            }
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && languageDropdown) {
                languageDropdown.classList.remove('show');
            }
        });
    }

    // Toggle language dropdown visibility
    toggleLanguageDropdown() {
        const dropdown = document.getElementById('languageDropdown');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    }

    // Change language
    changeLanguage(newLang) {
        if (!this.supportedLangs.includes(newLang) || newLang === this.currentLang) {
            return;
        }

        const oldLang = this.currentLang;
        this.currentLang = newLang;

        // Update HTML attributes
        this.updateHTMLAttributes();

        // Update UI
        this.updateLanguageUI();

        // Hide dropdown
        const dropdown = document.getElementById('languageDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }

        // Notify observers
        this.notifyObservers('languageChanged', { from: oldLang, to: newLang });

        // Store preference
        this.saveLanguagePreference(newLang);

        console.log(`Language changed from ${oldLang} to ${newLang}`);
    }

    // Update HTML attributes for language and direction
    updateHTMLAttributes() {
        const html = document.documentElement;
        
        html.setAttribute('lang', this.currentLang);
        html.setAttribute('dir', this.currentLang === 'ar' ? 'rtl' : 'ltr');
        
        // Update body class for styling
        document.body.className = document.body.className
            .replace(/\blang-\w+\b/g, '') + ` lang-${this.currentLang}`;
    }

    // Update language UI elements
    updateLanguageUI() {
        // Update current language display
        const currentLangSpan = document.getElementById('currentLang');
        if (currentLangSpan && languageNames) {
            currentLangSpan.textContent = languageNames[this.currentLang];
        }

        // Update active language option
        document.querySelectorAll('.language-option').forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === this.currentLang) {
                option.classList.add('active');
            }
        });

        // Update all text elements
        this.updateAllTextElements();

        // Update document title
        if (translations && translations[this.currentLang]) {
            document.title = translations[this.currentLang].title;
        }

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && translations && translations[this.currentLang]) {
            metaDesc.setAttribute('content', translations[this.currentLang].description);
        }
    }

    // Update all elements with data-key attributes
    updateAllTextElements() {
        if (!translations || !translations[this.currentLang]) return;

        const langData = translations[this.currentLang];

        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (langData[key]) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = langData[key];
                } else {
                    element.textContent = langData[key];
                }
            }
        });

        // Update search placeholder specifically
        const searchInput = document.getElementById('searchInput');
        if (searchInput && langData.search) {
            searchInput.placeholder = langData.search;
        }

        // Update tooltips
        document.querySelectorAll('[data-tooltip-key]').forEach(element => {
            const key = element.getAttribute('data-tooltip-key');
            if (langData[key]) {
                element.setAttribute('data-tooltip', langData[key]);
            }
        });

        // Update scroll hint if present
        const scrollHintEl = document.querySelector('.scroll-indicator [data-key="scrollHint"]');
        if (scrollHintEl && langData.scrollHint) {
            scrollHintEl.textContent = langData.scrollHint;
        }
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLang;
    }

    // Get current language data
    getCurrentLanguageData() {
        return translations ? translations[this.currentLang] : null;
    }

    // Get text by key in current language
    getText(key, fallback = '') {
        const langData = this.getCurrentLanguageData();
        return langData && langData[key] ? langData[key] : fallback;
    }

    // Get platform name in current language
    getPlatformName(platformKey) {
        const langData = this.getCurrentLanguageData();
        return langData && langData.platforms && langData.platforms[platformKey] 
            ? langData.platforms[platformKey] 
            : platformKey;
    }

    // Save language preference to localStorage
    saveLanguagePreference(lang) {
        try {
            localStorage.setItem('preferred_language', lang);
        } catch (e) {
            console.warn('Could not save language preference:', e);
        }
    }

    // Load language preference from localStorage
    loadLanguagePreference() {
        try {
            const saved = localStorage.getItem('preferred_language');
            if (saved && this.supportedLangs.includes(saved)) {
                return saved;
            }
        } catch (e) {
            console.warn('Could not load language preference:', e);
        }
        return null;
    }

    // Check if language is RTL
    isRTL(lang = null) {
        const checkLang = lang || this.currentLang;
        return checkLang === 'ar';
    }

    // Add observer for language changes
    addObserver(callback) {
        this.observers.push(callback);
    }

    // Remove observer
    removeObserver(callback) {
        this.observers = this.observers.filter(obs => obs !== callback);
    }

    // Notify all observers
    notifyObservers(event, data) {
        this.observers.forEach(callback => {
            try {
                callback(event, data);
            } catch (e) {
                console.error('Observer callback error:', e);
            }
        });
    }

    // Format numbers according to locale
    formatNumber(number) {
        try {
            const locale = this.currentLang === 'ar' ? 'ar-EG' : 
                          this.currentLang === 'fr' ? 'fr-FR' : 'en-US';
            return new Intl.NumberFormat(locale).format(number);
        } catch (e) {
            return number.toString();
        }
    }

    // Format dates according to locale
    formatDate(date, options = {}) {
        try {
            const locale = this.currentLang === 'ar' ? 'ar-EG' : 
                          this.currentLang === 'fr' ? 'fr-FR' : 'en-US';
            
            const defaultOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };

            return new Intl.DateTimeFormat(locale, {...defaultOptions, ...options}).format(date);
        } catch (e) {
            return date.toLocaleDateString();
        }
    }
}

// Create global language manager instance
const languageManager = new LanguageManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
}