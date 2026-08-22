/**
 * Directory UI behavior layered on top of the legacy app.
 * Keeps the data model backwards compatible while providing current filtering,
 * brand marks, localization and resource metadata.
 */
(() => {
    const difficultyDefaults = {
        twitter: 'medium', instagram: 'medium', facebook: 'medium', whatsapp: 'medium', tiktok: 'medium', snapchat: 'medium',
        google: 'hard', microsoft: 'hard', apple: 'hard', amazon: 'hard', netflix: 'medium', spotify: 'easy',
        discord: 'easy', telegram: 'medium', github: 'hard', gitlab: 'hard', reddit: 'easy', linkedin: 'medium',
        paypal: 'hard', ebay: 'medium', steam: 'hard', epicgames: 'medium', playstation: 'hard', notion: 'easy',
        slack: 'medium', zoom: 'easy', dropbox: 'easy', adobe: 'medium', yahoo: 'medium', protonmail: 'easy'
    };

    const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[char]);

    const text = (key, fallback) => languageManager?.getText(key, fallback) || fallback;
    const titleFor = (resource, lang) => resource?.title?.[lang] || resource?.title?.en || resource?.title?.ar || resource?.url || '';
    const platformNameFor = (platform, langData) => platform.displayName || langData?.platforms?.[platform.name] || platform.name;
    const difficultyLabel = value => text(`difficulty${value.charAt(0).toUpperCase()}${value.slice(1)}Label`, value);
    const noteFor = (platform, lang) => {
        if (!platform?.note) return '';
        if (typeof platform.note === 'string') return lang === 'en' ? platform.note : '';
        return platform.note[lang] || platform.note.en || '';
    };
    const scopeLabel = scope => {
        const key = String(scope || '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        return text(`scope${key.charAt(0).toUpperCase()}${key.slice(1)}`, String(scope || '').replaceAll('-', ' '));
    };

    function readableIconColor(color) {
        const value = String(color || '').replace('#', '');
        if (!/^[0-9a-f]{6}$/i.test(value)) return 'dbe4ee';
        const r = parseInt(value.slice(0, 2), 16);
        const g = parseInt(value.slice(2, 4), 16);
        const b = parseInt(value.slice(4, 6), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
        return luminance < 62 ? 'dbe4ee' : value;
    }

    function brandMarkup(platform, displayName) {
        const meta = typeof getBrandIconMeta === 'function'
            ? getBrandIconMeta(platform, displayName)
            : { slug: null, fallback: displayName.slice(0, 2).toUpperCase() };
        const fallback = `<span class="brand-fallback" aria-hidden="true">${escapeHtml(meta.fallback)}</span>`;
        if (!meta.slug) return `<span class="brand-mark-wrap fallback-only">${fallback}</span>`;

        const color = readableIconColor(platform.color);
        const src = `https://cdn.simpleicons.org/${encodeURIComponent(meta.slug)}/${color}?viewbox=auto`;
        return `<span class="brand-mark-wrap">
            <img class="brand-logo" src="${src}" width="30" height="30" loading="lazy" decoding="async" fetchpriority="low" alt="" aria-hidden="true">
            ${fallback}
        </span>`;
    }

    function bindBrandFallbacks(scope) {
        scope.querySelectorAll('.brand-logo').forEach(image => {
            image.addEventListener('error', () => image.closest('.brand-mark-wrap')?.classList.add('brand-failed'), { once: true });
        });
    }

    platforms.forEach(platform => {
        platform.difficulty = platform.difficulty || difficultyDefaults[platform.id] || 'medium';
        platform.loginRequired = platform.loginRequired !== false;
        platform.featured = Boolean(platform.featured);
        platform.searchText = [platform.id, platform.name, platform.displayName, platform.category]
            .filter(Boolean).join(' ').toLowerCase();
    });

    UIManager.prototype.setupProControls = function () {
        if (this.__proControlsReady) return;
        this.__proControlsReady = true;
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
        difficulty?.addEventListener('change', () => {
            this.proFilters.difficulty = difficulty.value;
            this.applyProFilters();
        });

        document.getElementById('showAiOnly')?.addEventListener('click', () => {
            document.querySelector('[data-category-filter="ai"]')?.click();
            document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

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
            const haystack = [platform.searchText, localizedName, localizedCategory, resourceText].join(' ');
            return (!state.query || haystack.includes(state.query)) &&
                (state.category === 'all' || platform.category === state.category) &&
                (state.difficulty === 'all' || platform.difficulty === state.difficulty);
        });

        this.renderPlatforms();
        this.updateStats();
        this.updateResultSummary();
        this.filteredPlatforms.length ? this.hideNoResults() : this.showNoResults();
    };

    UIManager.prototype.updateResultSummary = function () {
        const resources = this.filteredPlatforms.flatMap(platform => platform.resources || []);
        const official = resources.filter(resource => resource.official !== false).length;
        const resultCount = document.getElementById('resultCount');
        const verifiedCount = document.getElementById('verifiedCount');
        if (resultCount) resultCount.textContent = `${languageManager.formatNumber(this.filteredPlatforms.length)} ${text('resultServices', 'services')}`;
        if (verifiedCount) verifiedCount.textContent = `${languageManager.formatNumber(official)} ${text('resultOfficialLinks', 'official links')}`;
    };

    UIManager.prototype.renderPlatforms = function () {
        const grid = document.getElementById('platformsGrid');
        if (!grid) return;
        const langData = languageManager.getCurrentLanguageData();
        const lang = languageManager.getCurrentLanguage();

        grid.innerHTML = this.filteredPlatforms.map(platform => {
            const resourceCount = (platform.resources || []).length;
            const officialCount = (platform.resources || []).filter(resource => resource.official !== false).length;
            const selected = this.selectedPlatforms.includes(platform.id);
            const name = platformNameFor(platform, langData);
            const category = categories[platform.category]?.[lang] || platform.category;
            const resourceLabel = text('resourcesCountLabel', 'resources');

            return `<button class="platform-card ${selected ? 'active' : ''}" data-id="${escapeHtml(platform.id)}" type="button"
                onclick="uiManager.selectPlatform('${escapeHtml(platform.id)}')" aria-pressed="${selected}" aria-label="${escapeHtml(name)}, ${languageManager.formatNumber(resourceCount)} ${escapeHtml(resourceLabel)}">
                <div class="platform-card-top">
                    ${brandMarkup(platform, name)}
                    <span class="resource-total">${languageManager.formatNumber(resourceCount)}</span>
                </div>
                <h3 class="platform-name">${escapeHtml(name)}</h3>
                <p class="platform-category">${escapeHtml(category)}</p>
                <div class="platform-meta">
                    <span class="verified-dot"><i class="fas fa-circle-check" aria-hidden="true"></i> ${languageManager.formatNumber(officialCount)} ${escapeHtml(text('official', 'official'))}</span>
                    <span class="difficulty difficulty-${escapeHtml(platform.difficulty)}">${escapeHtml(difficultyLabel(platform.difficulty))}</span>
                    ${platform.category === 'ai' ? '<span class="category-tag">AI</span>' : ''}
                </div>
            </button>`;
        }).join('');

        bindBrandFallbacks(grid);
    };

    UIManager.prototype.selectPlatform = function (platformId) {
        const wasSelected = this.selectedPlatforms.includes(platformId);
        this.selectedPlatforms = wasSelected
            ? this.selectedPlatforms.filter(id => id !== platformId)
            : [...this.selectedPlatforms, platformId];

        this.renderPlatforms();
        this.updateResetButton();
        this.updateResourcesSection();
        this.updateStats();

        if (!wasSelected && this.selectedPlatforms.length === 1) {
            setTimeout(() => document.getElementById('resourcesSection')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
        }
    };

    UIManager.prototype.showSelectedPlatformsResources = function () {
        const section = document.getElementById('resourcesSection');
        const grid = document.getElementById('resourcesGrid');
        if (!section || !grid) return;

        const lang = languageManager.getCurrentLanguage();
        const langData = languageManager.getCurrentLanguageData();
        const selected = platforms.filter(platform => this.selectedPlatforms.includes(platform.id));
        const resources = selected.flatMap(platform => (platform.resources || []).map(resource => ({ ...resource, platform })));

        if (!resources.length) {
            this.hideResourcesSection();
            return;
        }

        const groups = this.groupResourcesByType(resources);
        grid.innerHTML = `<div class="selected-summary">
            <div><strong>${languageManager.formatNumber(selected.length)} ${escapeHtml(text('selectedDynamic', 'selected'))}</strong><span>${languageManager.formatNumber(resources.length)} ${escapeHtml(text('actionsDynamic', 'actions'))}</span></div>
            <button type="button" onclick="uiManager.resetSelection()">${escapeHtml(text('clearSelection', 'Clear selection'))}</button>
        </div>
        ${Object.entries(groups).map(([type, items]) => {
            const info = resourceTypes[type] || resourceTypes.settings;
            return `<section class="resource-type-section">
                <h4 class="resource-type-title"><i class="${info.icon}" aria-hidden="true"></i>${escapeHtml(info[lang] || info.en || type)}</h4>
                <div class="resource-cards">
                    ${items.map(resource => {
                        const platform = resource.platform;
                        const platformName = platformNameFor(platform, langData);
                        const note = noteFor(platform, lang);
                        const warning = resource.destructiveScope
                            ? `<span class="scope-warning"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> ${escapeHtml(text('entireAccount', 'Entire account'))}: ${escapeHtml(scopeLabel(resource.destructiveScope))}</span>` : '';
                        return `<article class="resource-card">
                            <a href="${escapeHtml(resource.url)}" target="_blank" rel="noopener noreferrer" class="resource-link">
                                <div class="resource-service">${brandMarkup(platform, platformName)}<span>${escapeHtml(platformName)}</span></div>
                                <h5 class="resource-title">${escapeHtml(titleFor(resource, lang))}</h5>
                                <div class="resource-meta">
                                    ${resource.official !== false ? `<span class="official"><i class="fas fa-circle-check" aria-hidden="true"></i> ${escapeHtml(text('official', 'Official'))}</span>` : ''}
                                    ${resource.verified ? `<span>${escapeHtml(text('checked', 'Checked'))} ${escapeHtml(resource.verified)}</span>` : ''}
                                    ${platform.loginRequired ? `<span><i class="fas fa-lock" aria-hidden="true"></i> ${escapeHtml(text('signIn', 'Sign-in'))}</span>` : ''}
                                    ${warning}
                                </div>
                                ${note ? `<p class="resource-note">${escapeHtml(note)}</p>` : ''}
                                <span class="open-resource">${escapeHtml(text('openOfficialPage', 'Open official page'))} <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></span>
                            </a>
                        </article>`;
                    }).join('')}
                </div>
            </section>`;
        }).join('')}`;

        bindBrandFallbacks(grid);
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

    // Do not hijack browser-standard Ctrl/Cmd+R or Ctrl/Cmd+F. '/' is a conventional
    // site-search shortcut and Escape only closes the legacy modal when present.
    UIManager.prototype.handleKeyboardShortcuts = function (event) {
        const target = event.target;
        const typing = target?.matches?.('input, textarea, select, [contenteditable="true"]');
        if (event.key === '/' && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                event.preventDefault();
                searchInput.focus();
            }
        } else if (event.key === 'Escape') {
            this.hideModal?.();
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        uiManager.setupProControls?.();
        languageManager.addObserver((event) => {
            if (event !== 'languageChanged') return;
            uiManager.applyProFilters?.();
            uiManager.updateResourcesSection?.();
        });
    });
})();
