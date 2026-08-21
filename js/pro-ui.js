/**
 * Professional directory behavior.
 * Extends the existing UIManager without breaking the original app bootstrap.
 */
(() => {
    const difficultyDefaults = {
        twitter: 'medium', instagram: 'medium', facebook: 'medium', whatsapp: 'medium', tiktok: 'medium', snapchat: 'medium',
        google: 'hard', microsoft: 'hard', apple: 'hard', amazon: 'hard', netflix: 'medium', spotify: 'easy',
        discord: 'easy', telegram: 'medium', github: 'hard', gitlab: 'hard', reddit: 'easy', linkedin: 'medium',
        paypal: 'hard', ebay: 'medium', steam: 'hard', epicgames: 'medium', playstation: 'hard', notion: 'easy',
        slack: 'medium', zoom: 'easy', dropbox: 'easy', adobe: 'medium', yahoo: 'medium', protonmail: 'easy'
    };

    platforms.forEach(platform => {
        platform.difficulty = platform.difficulty || difficultyDefaults[platform.id] || 'medium';
        platform.loginRequired = platform.loginRequired !== false;
        platform.featured = Boolean(platform.featured);
        platform.searchText = [platform.id, platform.name, platform.displayName, platform.category]
            .filter(Boolean).join(' ').toLowerCase();
    });

    const titleFor = (resource, lang) => resource?.title?.[lang] || resource?.title?.en || resource?.title?.ar || resource?.url || '';
    const platformNameFor = (platform, langData) => platform.displayName || langData?.platforms?.[platform.name] || platform.name;

    UIManager.prototype.setupProControls = function () {
        this.proFilters = this.proFilters || { query: '', category: 'all', difficulty: 'all' };

        document.querySelectorAll('[data-category-filter]').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('[data-category-filter]').forEach(item => item.classList.remove('active'));
                button.classList.add('active');
                this.proFilters.category = button.dataset.categoryFilter;
                this.applyProFilters();
            });
        });

        const difficulty = document.getElementById('difficultyFilter');
        if (difficulty) {
            difficulty.addEventListener('change', () => {
                this.proFilters.difficulty = difficulty.value;
                this.applyProFilters();
            });
        }

        const aiButton = document.getElementById('showAiOnly');
        if (aiButton) {
            aiButton.addEventListener('click', () => {
                const target = document.querySelector('[data-category-filter="ai"]');
                if (target) target.click();
                document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }

        this.applyProFilters();
    };

    UIManager.prototype.handleSearch = function (query) {
        this.proFilters = this.proFilters || { query: '', category: 'all', difficulty: 'all' };
        this.proFilters.query = String(query || '').toLowerCase().trim();
        this.applyProFilters();
    };

    UIManager.prototype.applyProFilters = function () {
        const state = this.proFilters || { query: '', category: 'all', difficulty: 'all' };
        const langData = languageManager.getCurrentLanguageData();
        const lang = languageManager.getCurrentLanguage();

        this.filteredPlatforms = platforms.filter(platform => {
            const localizedName = platformNameFor(platform, langData).toLowerCase();
            const localizedCategory = (categories[platform.category]?.[lang] || platform.category || '').toLowerCase();
            const resourceText = (platform.resources || []).map(resource => titleFor(resource, lang)).join(' ').toLowerCase();
            const matchesQuery = !state.query || [platform.searchText, localizedName, localizedCategory, resourceText].join(' ').includes(state.query);
            const matchesCategory = state.category === 'all' || platform.category === state.category;
            const matchesDifficulty = state.difficulty === 'all' || platform.difficulty === state.difficulty;
            return matchesQuery && matchesCategory && matchesDifficulty;
        });

        this.renderPlatforms();
        this.updateStats();
        this.updateResultSummary();

        if (this.filteredPlatforms.length === 0) this.showNoResults();
        else this.hideNoResults();
    };

    UIManager.prototype.updateResultSummary = function () {
        const resultCount = document.getElementById('resultCount');
        const verifiedCount = document.getElementById('verifiedCount');
        if (resultCount) resultCount.textContent = `${this.filteredPlatforms.length} services`;
        if (verifiedCount) {
            const resources = this.filteredPlatforms.flatMap(platform => platform.resources || []);
            const verified = resources.filter(resource => resource.official !== false).length;
            verifiedCount.textContent = `${verified} official links`;
        }
    };

    UIManager.prototype.renderPlatforms = function () {
        const grid = document.getElementById('platformsGrid');
        if (!grid) return;
        const langData = languageManager.getCurrentLanguageData();
        const lang = languageManager.getCurrentLanguage();

        grid.innerHTML = this.filteredPlatforms.map(platform => {
            const resourceCount = (platform.resources || []).length;
            const isSelected = this.selectedPlatforms.includes(platform.id);
            const categoryLabel = categories[platform.category]?.[lang] || platform.category;
            const name = platformNameFor(platform, langData);
            const verifiedResources = (platform.resources || []).filter(resource => resource.official !== false).length;
            const isAI = platform.category === 'ai';
            const glow = `${platform.color || '#8b5cf6'}24`;

            return `
                <button class="platform-card ${isSelected ? 'active' : ''}" data-id="${platform.id}" type="button"
                    onclick="uiManager.selectPlatform('${platform.id}')" style="--platform-glow:${glow}"
                    aria-pressed="${isSelected}" aria-label="${name}, ${resourceCount} resources">
                    <div class="platform-head">
                        <div class="platform-icon" style="color:${platform.color || '#c4b5fd'}"><i class="${platform.icon || 'fas fa-link'}"></i></div>
                        <div class="platform-badge"><i class="fas fa-link"></i> ${resourceCount}</div>
                    </div>
                    <h3 class="platform-name">${name}</h3>
                    <div class="platform-category">${categoryLabel}</div>
                    <div class="platform-meta">
                        <span class="meta-badge verified"><i class="fas fa-circle-check"></i> ${verifiedResources}/${resourceCount} official</span>
                        <span class="meta-badge difficulty-${platform.difficulty}">${platform.difficulty}</span>
                        ${isAI ? '<span class="meta-badge ai"><i class="fas fa-wand-magic-sparkles"></i> AI</span>' : ''}
                    </div>
                </button>`;
        }).join('');
    };

    UIManager.prototype.selectPlatform = function (platformId) {
        const isSelected = this.selectedPlatforms.includes(platformId);
        this.selectedPlatforms = isSelected
            ? this.selectedPlatforms.filter(id => id !== platformId)
            : [...this.selectedPlatforms, platformId];

        this.renderPlatforms();
        this.updateResetButton();
        this.updateResourcesSection();
        this.updateStats();

        if (!isSelected) {
            const section = document.getElementById('resourcesSection');
            if (section && this.selectedPlatforms.length === 1) {
                setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
            }
        }
    };

    UIManager.prototype.showSelectedPlatformsResources = function () {
        const section = document.getElementById('resourcesSection');
        const grid = document.getElementById('resourcesGrid');
        if (!section || !grid) return;

        const lang = languageManager.getCurrentLanguage();
        const langData = languageManager.getCurrentLanguageData();
        const selected = platforms.filter(platform => this.selectedPlatforms.includes(platform.id));
        const resources = [];

        selected.forEach(platform => {
            (platform.resources || []).forEach(resource => resources.push({ ...resource, platform }));
        });

        if (!resources.length) {
            this.hideResourcesSection();
            return;
        }

        const groups = this.groupResourcesByType(resources);
        grid.innerHTML = `
            <div class="selected-summary">
                <strong>${selected.length} selected service${selected.length === 1 ? '' : 's'}</strong>
                <span>${resources.length} verified actions and settings</span>
            </div>
            ${Object.entries(groups).map(([type, items]) => {
                const info = resourceTypes[type] || resourceTypes.settings;
                return `
                    <div class="resource-type-section">
                        <h4 class="resource-type-title" style="color:${info.color}"><i class="${info.icon}"></i> ${info[lang] || info.en || type}</h4>
                        <div class="resource-cards">
                            ${items.map(resource => {
                                const platform = resource.platform;
                                const platformName = platformNameFor(platform, langData);
                                const scopeWarning = resource.destructiveScope
                                    ? `<span class="scope-warning"><i class="fas fa-triangle-exclamation"></i> Deletes entire ${resource.destructiveScope.replace('-', ' ')}</span>` : '';
                                return `
                                    <article class="resource-card">
                                        <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="resource-link">
                                            <h5 class="resource-title"><i class="${info.icon}" style="color:${info.color}"></i> ${titleFor(resource, lang)}</h5>
                                            <p class="resource-description"><i class="fas fa-arrow-up-right-from-square"></i> ${platformName}</p>
                                            <div class="resource-meta">
                                                ${resource.official !== false ? '<span class="official"><i class="fas fa-circle-check"></i> Official</span>' : ''}
                                                ${resource.verified ? `<span><i class="fas fa-calendar-check"></i> ${resource.verified}</span>` : ''}
                                                ${platform.loginRequired ? '<span><i class="fas fa-lock"></i> Sign-in may be required</span>' : ''}
                                                ${scopeWarning}
                                            </div>
                                            ${platform.note ? `<p class="resource-note">${platform.note}</p>` : ''}
                                        </a>
                                    </article>`;
                            }).join('')}
                        </div>
                    </div>`;
            }).join('')}`;

        section.classList.add('show');
    };

    UIManager.prototype.resetSelection = function () {
        this.selectedPlatforms = [];
        this.updateResetButton();
        this.hideResourcesSection();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        this.proFilters = { query: '', category: 'all', difficulty: 'all' };
        document.querySelectorAll('[data-category-filter]').forEach(item => item.classList.toggle('active', item.dataset.categoryFilter === 'all'));
        const difficulty = document.getElementById('difficultyFilter');
        if (difficulty) difficulty.value = 'all';
        this.applyProFilters();
    };

    document.addEventListener('DOMContentLoaded', () => {
        uiManager.setupProControls?.();
    });
})();
