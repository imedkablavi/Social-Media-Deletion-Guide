/**
 * Main Application Controller
 * Orchestrates all components and handles initialization
 */

class App {
    constructor() {
        this.version = '2.0.0';
        this.isInitialized = false;
        this.components = {};
        
        // Bind methods
        this.init = this.init.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
    }

    // Initialize the application
    async init() {
        if (this.isInitialized) return;

        try {
            console.log(`🚀 Initializing Social Media Deletion Guide v${this.version}`);

            // Wait for DOM to be ready
            await this.waitForDOM();

            // Initialize components in order
            await this.initializeComponents();

            // Setup global event listeners
            this.setupGlobalEventListeners();

            // Load user preferences
            await this.loadUserPreferences();

            // Initial render
            this.performInitialRender();

            // Mark as initialized
            this.isInitialized = true;

            console.log('✅ Application initialized successfully');

            // Add loading screen fade out
            this.hideLoadingScreen();

        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.handleInitError(error);
        }
    }

    // Wait for DOM to be ready
    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    // Initialize all components
    async initializeComponents() {
        // Language manager should already be initialized
        if (typeof languageManager !== 'undefined') {
            this.components.languageManager = languageManager;
            languageManager.addObserver(this.onLanguageChange);
        }

        // UI manager should already be initialized
        if (typeof uiManager !== 'undefined') {
            this.components.uiManager = uiManager;
        } else {
            // Fallback initialization if global uiManager not ready (race condition safeguard)
            if (typeof UIManager !== 'undefined') {
                try {
                    const createInstance = () => {
                        if (window.__uiManagerCreated) return;
                        console.warn('[Fallback] Creating uiManager instance');
                        window.uiManager = new UIManager();
                        this.components.uiManager = window.uiManager;
                        window.__uiManagerCreated = true;
                        // Initial render if app already past init
                        try {
                            this.components.uiManager.renderPlatforms();
                            this.components.uiManager.updateStats();
                        } catch (e) { console.warn('Post-create render failed:', e); }
                    };

                    if (typeof platforms === 'undefined') {
                        console.warn('[Fallback] platforms not defined yet. Waiting...');
                        let attempts = 0;
                        const maxAttempts = 50; // ~5s if interval 100ms
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

        // Initialize analytics (if needed)
        // this.initializeAnalytics();

        // Initialize PWA features (if needed)
        // this.initializePWA();
    }

    // Setup global event listeners
    setupGlobalEventListeners() {
        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                if (this.components.uiManager) {
                    this.components.uiManager.handleResize();
                }
            }, 100);
        });

        // Handle online/offline status
        window.addEventListener('online', () => {
            this.handleConnectionChange(true);
        });

        window.addEventListener('offline', () => {
            this.handleConnectionChange(false);
        });

        // Handle visibility change (for performance optimization)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.handlePageHidden();
            } else {
                this.handlePageVisible();
            }
        });

        // Handle beforeunload (for cleanup)
        window.addEventListener('beforeunload', (e) => {
            this.handleBeforeUnload(e);
        });

        // Global error handler
        window.addEventListener('error', (e) => {
            this.handleGlobalError(e);
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            this.handleUnhandledRejection(e);
        });
    }

    // Load user preferences
    async loadUserPreferences() {
        try {
            // Load saved language preference
            const savedLang = languageManager?.loadLanguagePreference();
            if (savedLang) {
                languageManager.changeLanguage(savedLang);
            }

            // Load other preferences (theme, layout, etc.)
            const preferences = this.loadFromStorage('user_preferences', {});
            this.applyUserPreferences(preferences);

        } catch (error) {
            console.warn('Could not load user preferences:', error);
        }
    }

    // Apply user preferences
    applyUserPreferences(preferences) {
        // Apply theme
        if (preferences.theme) {
            document.body.setAttribute('data-theme', preferences.theme);
        }

        // Apply animations preference
        if (preferences.reduceAnimations) {
            document.body.classList.add('reduce-animations');
        }

        // Apply other preferences...
    }

    // Perform initial render
    performInitialRender() {
        if (this.components.uiManager) {
            // Render platforms
            this.components.uiManager.renderPlatforms();
            
            // Update statistics
            this.components.uiManager.updateStats();
            
            // Update language UI
            if (this.components.languageManager) {
                this.components.languageManager.updateLanguageUI();
            }
        }

        // Update footer year
        const yearEl = document.getElementById('footerYear');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    // Handle language change
    onLanguageChange(event, data) {
        console.log(`Language changed from ${data.from} to ${data.to}`);
        
        // Re-render UI components
        if (this.components.uiManager) {
            this.components.uiManager.renderPlatforms();
            this.components.uiManager.updateResourcesSection();
        }

        // Update any other language-dependent components
        this.updateLanguageDependentComponents();

        // Save the preference
        this.saveToStorage('user_preferences', {
            ...this.loadFromStorage('user_preferences', {}),
            language: data.to
        });
    }

    // Update components that depend on language
    updateLanguageDependentComponents() {
        // Update page title and meta tags
        this.updatePageMeta();
        
        // Update any dynamic content
        this.updateDynamicContent();
    }

    // Update page meta information
    updatePageMeta() {
        const langData = languageManager?.getCurrentLanguageData();
        if (!langData) return;

        // Update title
        document.title = langData.title;

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', langData.description);
        }

        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', langData.title);
        }

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
            ogDesc.setAttribute('content', langData.description);
        }
    }

    // Update dynamic content
    updateDynamicContent() {
        // Update any content that's dynamically generated
        // This could include tooltips, error messages, etc.
    }

    // Handle connection change
    handleConnectionChange(isOnline) {
        const notification = {
            type: isOnline ? 'success' : 'warning',
            message: isOnline ? 'Connection restored' : 'You are offline',
            duration: 3000
        };

        this.showNotification(notification);
    }

    // Handle page hidden (for performance)
    handlePageHidden() {
        // Pause animations, stop unnecessary processes
        document.body.classList.add('page-hidden');
    }

    // Handle page visible
    handlePageVisible() {
        // Resume animations, restart processes
        document.body.classList.remove('page-hidden');
    }

    // Handle before unload
    handleBeforeUnload(e) {
        // Save any pending changes
        this.savePendingChanges();
        
        // Don't actually prevent unload unless necessary
        // e.returnValue = 'Are you sure you want to leave?';
    }

    // Handle global errors
    handleGlobalError(e) {
        console.error('Global error:', e.error);
        
        // Report to error tracking service if configured
        // this.reportError(e.error);
        
        // Show user-friendly error message
        this.showErrorMessage('An unexpected error occurred. Please refresh the page.');
    }

    // Handle unhandled promise rejections
    handleUnhandledRejection(e) {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault(); // Prevent default console error
        
        // Report error and show message
        this.showErrorMessage('A network error occurred. Please check your connection.');
    }

    // Handle initialization errors
    handleInitError(error) {
        document.body.innerHTML = `
            <div class="init-error">
                <h1>Failed to Load Application</h1>
                <p>Sorry, we encountered an error while loading the application.</p>
                <button onclick="window.location.reload()">Reload Page</button>
                <details>
                    <summary>Technical Details</summary>
                    <pre>${error.message}\n${error.stack}</pre>
                </details>
            </div>
        `;
    }

    // Hide loading screen
    hideLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }

    // Show notification
    showNotification({ type, message, duration = 5000 }) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Setup close handler
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.hideNotification(notification);
        });

        // Auto hide
        setTimeout(() => {
            this.hideNotification(notification);
        }, duration);

        // Show with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
    }

    // Hide notification
    hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Show error message
    showErrorMessage(message) {
        this.showNotification({
            type: 'error',
            message,
            duration: 10000
        });
    }

    // Storage utilities
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

    // Save pending changes
    savePendingChanges() {
        // Save any unsaved state
        const appState = {
            selectedPlatforms: this.components.uiManager?.selectedPlatforms || [],
            lastActive: new Date().toISOString()
        };

        this.saveToStorage('app_state', appState);
    }

    // Get application info
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

    // Debug method
    debug() {
        console.log('App Debug Info:', this.getAppInfo());
        console.log('Selected Platforms:', this.components.uiManager?.selectedPlatforms);
        console.log('Filtered Platforms:', this.components.uiManager?.filteredPlatforms?.length);
    }
}

// Create and initialize the application
const app = new App();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', app.init);
} else {
    app.init();
}

// Make app available globally for debugging
window.app = app;

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}