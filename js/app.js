/**
 * Main Application Controller
 * Orchestrates all components and handles initialization
 */

class App {
    constructor() {
        this.version = '2.0.0';
        this.isInitialized = false;
        this.components = {};

        this.init = this.init.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
    }

    text(key, fallback) {
        return languageManager?.getText?.(key, fallback) || fallback;
    }

    async init() {
        if (this.isInitialized) return;

        try {
            console.log(`🚀 Initializing Social Media Deletion Guide v${this.version}`);
            await this.waitForDOM();
            await this.initializeComponents();
            this.setupGlobalEventListeners();
            await this.loadUserPreferences();
            this.performInitialRender();
            this.isInitialized = true;
            console.log('✅ Application initialized successfully');
            this.hideLoadingScreen();
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.handleInitError(error);
        }
    }

    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', resolve);
            else resolve();
        });
    }

    async initializeComponents() {
        if (typeof languageManager !== 'undefined') {
            this.components.languageManager = languageManager;
            languageManager.addObserver(this.onLanguageChange);
        }

        if (typeof uiManager !== 'undefined') {
            this.components.uiManager = uiManager;
        } else if (typeof UIManager !== 'undefined') {
            try {
                const createInstance = () => {
                    if (window.__uiManagerCreated) return;
                    console.warn('[Fallback] Creating uiManager instance');
                    window.uiManager = new UIManager();
                    this.components.uiManager = window.uiManager;
                    window.__uiManagerCreated = true;
                    try {
                        this.components.uiManager.renderPlatforms();
                        this.components.uiManager.updateStats();
                    } catch (e) { console.warn('Post-create render failed:', e); }
                };

                if (typeof platforms === 'undefined') {
                    console.warn('[Fallback] platforms not defined yet. Waiting...');
                    let attempts = 0;
                    const maxAttempts = 50;
                    const waitTimer = setInterval(() => {
                        attempts++;
                        if (typeof platforms !== 'undefined') {
                            clearInterval(waitTimer);
                            createInstance();
                        } else if (attempts >= maxAttempts) {
                            clearInterval(waitTimer);
                            console.error('Failed to detect platforms after waiting. uiManager not initialized.');
                        }
                    }, 100);
                } else {
                    createInstance();
                }
            } catch (e) {
                console.error('Fallback UIManager initialization failed:', e);
            }
        } else {
            console.error('UIManager class not found. Ensure js/ui-manager.js is loaded before app.js');
        }
    }

    setupGlobalEventListeners() {
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.components.uiManager?.handleResize(), 100);
        });

        window.addEventListener('online', () => this.handleConnectionChange(true));
        window.addEventListener('offline', () => this.handleConnectionChange(false));

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) this.handlePageHidden();
            else this.handlePageVisible();
        });

        window.addEventListener('beforeunload', (e) => this.handleBeforeUnload(e));
        window.addEventListener('error', (e) => this.handleGlobalError(e));
        window.addEventListener('unhandledrejection', (e) => this.handleUnhandledRejection(e));
    }

    async loadUserPreferences() {
        try {
            const savedLang = languageManager?.loadLanguagePreference();
            if (savedLang) languageManager.changeLanguage(savedLang);

            const preferences = this.loadFromStorage('user_preferences', {});
            this.applyUserPreferences(preferences);
        } catch (error) {
            console.warn('Could not load user preferences:', error);
        }
    }

    applyUserPreferences(preferences) {
        if (preferences.theme) document.body.setAttribute('data-theme', preferences.theme);
        if (preferences.reduceAnimations) document.body.classList.add('reduce-animations');
    }

    performInitialRender() {
        if (this.components.uiManager) {
            this.components.uiManager.renderPlatforms();
            this.components.uiManager.updateStats();
            this.components.languageManager?.updateLanguageUI();
        }

        const yearEl = document.getElementById('footerYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }

    onLanguageChange(event, data) {
        console.log(`Language changed from ${data.from} to ${data.to}`);

        if (this.components.uiManager) {
            this.components.uiManager.renderPlatforms();
            this.components.uiManager.updateResourcesSection();
        }

        this.updateLanguageDependentComponents();
        this.saveToStorage('user_preferences', {
            ...this.loadFromStorage('user_preferences', {}),
            language: data.to
        });
    }

    updateLanguageDependentComponents() {
        this.updatePageMeta();
        this.updateDynamicContent();
    }

    updatePageMeta() {
        const langData = languageManager?.getCurrentLanguageData();
        if (!langData) return;

        document.title = langData.title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', langData.description);
        document.querySelector('meta[property="og:title"]')?.setAttribute('content', langData.title);
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', langData.description);
    }

    updateDynamicContent() {}

    handleConnectionChange(isOnline) {
        this.showNotification({
            type: isOnline ? 'success' : 'warning',
            message: isOnline
                ? this.text('connectionRestored', 'Connection restored')
                : this.text('offlineNotice', 'You are offline'),
            duration: 3000
        });
    }

    handlePageHidden() {
        document.body.classList.add('page-hidden');
    }

    handlePageVisible() {
        document.body.classList.remove('page-hidden');
    }

    handleBeforeUnload(e) {
        this.savePendingChanges();
    }

    handleGlobalError(e) {
        console.error('Global error:', e.error);
        this.showErrorMessage(this.text('unexpectedError', 'An unexpected error occurred. Please refresh the page.'));
    }

    handleUnhandledRejection(e) {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
        this.showErrorMessage(this.text('networkError', 'A network error occurred. Please check your connection.'));
    }

    handleInitError(error) {
        const title = this.text('initErrorTitle', 'Failed to load the application');
        const message = this.text('initErrorText', 'The directory could not finish loading.');
        const reload = this.text('reloadPage', 'Reload page');
        const details = this.text('technicalDetails', 'Technical details');
        document.body.innerHTML = `
            <div class="init-error">
                <h1>${title}</h1>
                <p>${message}</p>
                <button onclick="window.location.reload()">${reload}</button>
                <details>
                    <summary>${details}</summary>
                    <pre></pre>
                </details>
            </div>
        `;
        const pre = document.querySelector('.init-error pre');
        if (pre) pre.textContent = `${error?.message || ''}\n${error?.stack || ''}`;
    }

    hideLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.remove(), 500);
        }
    }

    showNotification({ type, message, duration = 5000 }) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message"></span>
                <button class="notification-close" type="button" aria-label="${this.text('close', 'Close')}">&times;</button>
            </div>
        `;
        notification.querySelector('.notification-message').textContent = message;
        document.body.appendChild(notification);

        notification.querySelector('.notification-close').addEventListener('click', () => this.hideNotification(notification));
        setTimeout(() => this.hideNotification(notification), duration);
        setTimeout(() => notification.classList.add('show'), 10);
    }

    hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) notification.parentNode.removeChild(notification);
        }, 300);
    }

    showErrorMessage(message) {
        this.showNotification({ type: 'error', message, duration: 10000 });
    }

    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.warn('Could not save to storage:', error);
            return false;
        }
    }

    loadFromStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.warn('Could not load from storage:', error);
            return defaultValue;
        }
    }

    savePendingChanges() {
        const appState = {
            selectedPlatforms: this.components.uiManager?.selectedPlatforms || [],
            lastActive: new Date().toISOString()
        };
        this.saveToStorage('app_state', appState);
    }

    getAppInfo() {
        return {
            version: this.version,
            initialized: this.isInitialized,
            language: languageManager?.getCurrentLanguage(),
            components: Object.keys(this.components),
            userAgent: navigator.userAgent,
            screen: {
                width: window.screen.width,
                height: window.screen.height,
                devicePixelRatio: window.devicePixelRatio
            }
        };
    }

    debug() {
        console.log('App Debug Info:', this.getAppInfo());
        console.log('Selected Platforms:', this.components.uiManager?.selectedPlatforms);
        console.log('Filtered Platforms:', this.components.uiManager?.filteredPlatforms?.length);
    }
}

const app = new App();

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', app.init);
else app.init();

window.app = app;

if (typeof module !== 'undefined' && module.exports) module.exports = App;
