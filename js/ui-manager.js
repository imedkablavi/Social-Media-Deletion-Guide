/**
 * UI Manager - Handles all user interface interactions and animations
 */

class UIManager {
    constructor() {
        this.selectedPlatforms = [];
        this.filteredPlatforms = [...platforms];
        this.animationQueue = [];
        this.isAnimating = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeTooltips();
        this.setupAnimations();
    }

    // Setup all event listeners
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.handleSearch(e.target.value);
            }, 300));

            searchInput.addEventListener('focus', () => {
                searchInput.parentElement.classList.add('focused');
            });

            searchInput.addEventListener('blur', () => {
                searchInput.parentElement.classList.remove('focused');
            });
        }

        // Reset button
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetSelection());
        }

        // Help FAB
        const helpFab = document.querySelector('.fab-help');
        if (helpFab) {
            helpFab.addEventListener('click', () => this.showHelp());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Window resize handler
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    // Handle search functionality
    handleSearch(query) {
        const trimmedQuery = query.toLowerCase().trim();
        
        if (!trimmedQuery) {
            this.filteredPlatforms = [...platforms];
            this.hideNoResults();
        } else {
            const langData = languageManager.getCurrentLanguageData();
            this.filteredPlatforms = platforms.filter(platform => {
                const platformName = langData?.platforms?.[platform.name]?.toLowerCase() || platform.name;
                const category = categories[platform.category]?.[languageManager.getCurrentLanguage()]?.toLowerCase() || '';
                
                return platformName.includes(trimmedQuery) || 
                       category.includes(trimmedQuery) ||
                       platform.name.includes(trimmedQuery);
            });
        }

        this.renderPlatforms();
        this.updateStats();

        if (trimmedQuery && this.filteredPlatforms.length === 0) {
            this.showNoResults();
        } else {
            this.hideNoResults();
        }
    }

    // Render platforms grid
    renderPlatforms() {
        const platformsGrid = document.getElementById('platformsGrid');
        if (!platformsGrid) return;

        const langData = languageManager.getCurrentLanguageData();
        if (!langData) return;

        // Add fade out animation
        platformsGrid.style.opacity = '0';
        
        setTimeout(() => {
            platformsGrid.innerHTML = this.filteredPlatforms.map(platform => {
                const resourceCount = platform.resources ? platform.resources.length : 0;
                const isSelected = this.selectedPlatforms.includes(platform.id);
                const tooltipText = `${resourceCount} ${langData.statResources}`;
                
                return `
                    <div class="platform-card ${isSelected ? 'active' : ''} tooltip" 
                         data-id="${platform.id}" 
                         data-tooltip="${tooltipText}"
                         onclick="uiManager.selectPlatform('${platform.id}')"
                         style="animation-delay: ${Math.random() * 0.5}s">
                        <div class="platform-icon" style="color: ${platform.color}">
                            <i class="${platform.icon}"></i>
                        </div>
                        <h3 class="platform-name">${langData.platforms[platform.name] || platform.name}</h3>
                        <div class="platform-badge">
                            <span class="resource-count">${resourceCount}</span>
                        </div>
                    </div>
                `;
            }).join('');

            // Add fade in animation
            platformsGrid.style.opacity = '1';
            
            // Trigger entrance animations
            this.animateCardEntrance();
        }, 150);
    }

    // Select/deselect platform
    selectPlatform(platformId) {
        const platformCard = document.querySelector(`[data-id="${platformId}"]`);
        if (!platformCard) return;

        const isSelected = this.selectedPlatforms.includes(platformId);
        
        // Add click animation
        platformCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            platformCard.style.transform = '';
        }, 150);

        if (isSelected) {
            // Deselect
            platformCard.classList.remove('active');
            this.selectedPlatforms = this.selectedPlatforms.filter(id => id !== platformId);
        } else {
            // Select
            platformCard.classList.add('active');
            this.selectedPlatforms.push(platformId);
            
            // Add selection animation
            this.animateSelection(platformCard);
        }

        // Update UI
        this.updateResetButton();
        this.updateResourcesSection();
        this.updateStats();
        
        // Haptic feedback (if supported)
        this.triggerHapticFeedback();
    }

    // Update reset button visibility
    updateResetButton() {
        const resetBtn = document.getElementById('resetBtn');
        if (!resetBtn) return;

        if (this.selectedPlatforms.length > 0) {
            resetBtn.classList.add('show');
        } else {
            resetBtn.classList.remove('show');
        }
    }

    // Update resources section
    updateResourcesSection() {
        if (this.selectedPlatforms.length > 0) {
            this.showSelectedPlatformsResources();
        } else {
            this.hideResourcesSection();
        }
    }

    // Show resources for selected platforms
    showSelectedPlatformsResources() {
        const resourcesSection = document.getElementById('resourcesSection');
        const resourcesGrid = document.getElementById('resourcesGrid');
        
        if (!resourcesSection || !resourcesGrid) return;

        const selectedPlatformData = platforms.filter(p => this.selectedPlatforms.includes(p.id));
        const allResources = [];
        const langData = languageManager.getCurrentLanguageData();

        selectedPlatformData.forEach(platform => {
            if (platform.resources) {
                platform.resources.forEach(resource => {
                    allResources.push({
                        ...resource,
                        platformName: langData?.platforms?.[platform.name] || platform.name,
                        platformColor: platform.color,
                        platformIcon: platform.icon,
                        resourceType: resourceTypes[resource.type] || resourceTypes.settings
                    });
                });
            }
        });

        if (allResources.length === 0) {
            this.showNoResults();
            return;
        }

        this.hideNoResults();

        // Group resources by type for better organization
        const groupedResources = this.groupResourcesByType(allResources);
        
        resourcesGrid.innerHTML = Object.entries(groupedResources).map(([type, resources]) => {
            const typeInfo = resourceTypes[type] || resourceTypes.settings;
            
            return `
                <div class="resource-type-section">
                    <h4 class="resource-type-title" style="color: ${typeInfo.color}">
                        <i class="${typeInfo.icon}"></i>
                        ${typeInfo[languageManager.getCurrentLanguage()] || type}
                    </h4>
                    <div class="resource-cards">
                        ${resources.map(resource => `
                            <div class="resource-card" style="border-left-color: ${resource.resourceType.color}">
                                <a href="${resource.url}" target="_blank" class="resource-link" rel="noopener noreferrer">
                                    <h5 class="resource-title">
                                        <i class="${resource.resourceType.icon}" style="color: ${resource.resourceType.color}"></i>
                                        ${resource.title[languageManager.getCurrentLanguage()]}
                                        <small class="platform-indicator" style="color: ${resource.platformColor}">
                                            <i class="${resource.platformIcon}"></i>
                                            ${resource.platformName}
                                        </small>
                                    </h5>
                                    <p class="resource-description">
                                        <i class="fas fa-external-link-alt"></i>
                                        ${langData?.accessResource || 'Click to access resource'}
                                    </p>
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');

        resourcesSection.classList.add('show');
        this.animateResourceCards();
    }

    // Group resources by type
    groupResourcesByType(resources) {
        return resources.reduce((groups, resource) => {
            const type = resource.type || 'settings';
            if (!groups[type]) {
                groups[type] = [];
            }
            groups[type].push(resource);
            return groups;
        }, {});
    }

    // Hide resources section
    hideResourcesSection() {
        const resourcesSection = document.getElementById('resourcesSection');
        if (resourcesSection) {
            resourcesSection.classList.remove('show');
        }
    }

    // Reset all selections
    resetSelection() {
        // Add reset animation
        document.querySelectorAll('.platform-card.active').forEach((card, index) => {
            setTimeout(() => {
                card.classList.remove('active');
                card.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 200);
            }, index * 50);
        });

        this.selectedPlatforms = [];
        this.updateResetButton();
        this.hideResourcesSection();
        this.hideNoResults();
        this.updateStats();

        // Clear search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
            this.filteredPlatforms = [...platforms];
            this.renderPlatforms();
        }
    }

    // Show no results message
    showNoResults() {
        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.classList.add('show');
            this.hideResourcesSection();
        }
    }

    // Hide no results message
    hideNoResults() {
        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.classList.remove('show');
        }
    }

    // Update statistics
    updateStats() {
        const platformCount = document.getElementById('platformCount');
        const resourceCount = document.getElementById('resourceCount');
        const selectedCount = document.getElementById('selectedCount');
        // Hero duplicates
        const platformCountHero = document.getElementById('platformCountHero');
        const resourceCountHero = document.getElementById('resourceCountHero');
        const selectedCountHero = document.getElementById('selectedCountHero');

        if (platformCount) {
            this.animateNumber(platformCount, this.filteredPlatforms.length);
        }
        if (platformCountHero) {
            this.animateNumber(platformCountHero, this.filteredPlatforms.length);
        }

        if (resourceCount) {
            const totalResources = this.filteredPlatforms.reduce((total, platform) => {
                return total + (platform.resources ? platform.resources.length : 0);
            }, 0);
            this.animateNumber(resourceCount, totalResources);
            if (resourceCountHero) {
                this.animateNumber(resourceCountHero, totalResources);
            }
        }

        if (selectedCount) {
            this.animateNumber(selectedCount, this.selectedPlatforms.length);
        }
        if (selectedCountHero) {
            this.animateNumber(selectedCountHero, this.selectedPlatforms.length);
        }
    }

    // Animate number changes
    animateNumber(element, targetNumber) {
        const currentNumber = parseInt(element.textContent) || 0;
        const difference = targetNumber - currentNumber;
        const steps = 10;
        const stepValue = difference / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const newValue = Math.round(currentNumber + (stepValue * currentStep));
            element.textContent = languageManager.formatNumber(newValue);

            if (currentStep >= steps) {
                element.textContent = languageManager.formatNumber(targetNumber);
                clearInterval(interval);
            }
        }, 30);
    }

    // Show help dialog
    showHelp() {
        const helpText = languageManager.getText('helpText', 'This guide helps you delete your social media accounts.');
        
        // Create custom help modal instead of alert
        this.showModal({
            title: languageManager.getText('help', 'Help'),
            content: helpText,
            type: 'info'
        });
    }

    // Show custom modal
    showModal({ title, content, type = 'info', actions = [] }) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('customModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'customModal';
            modal.className = 'custom-modal';
            modal.innerHTML = `
                <div class="modal-backdrop"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title"></h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer"></div>
                </div>
            `;
            document.body.appendChild(modal);

            // Setup close handlers
            modal.querySelector('.modal-close').addEventListener('click', () => this.hideModal());
            modal.querySelector('.modal-backdrop').addEventListener('click', () => this.hideModal());
        }

        // Update content
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-body').innerHTML = content;
        
        // Update footer with actions
        const footer = modal.querySelector('.modal-footer');
        if (actions.length > 0) {
            footer.innerHTML = actions.map(action => 
                `<button class="btn btn-${action.type || 'primary'}" onclick="${action.onclick}">${action.text}</button>`
            ).join('');
        } else {
            footer.innerHTML = `<button class="btn btn-primary" onclick="uiManager.hideModal()">${languageManager.getText('close', 'Close')}</button>`;
        }

        // Show modal
        modal.classList.add('show');
        document.body.classList.add('modal-open');
    }

    // Hide modal
    hideModal() {
        const modal = document.getElementById('customModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.classList.remove('modal-open');
        }
    }

    // Handle keyboard shortcuts
    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'f':
                    e.preventDefault();
                    const searchInput = document.getElementById('searchInput');
                    if (searchInput) {
                        searchInput.focus();
                        searchInput.select();
                    }
                    break;
                case 'r':
                    e.preventDefault();
                    this.resetSelection();
                    break;
            }
        } else if (e.key === 'Escape') {
            this.hideModal();
        }
    }

    // Handle window resize
    handleResize() {
        // Recalculate layouts if needed
        this.updateCardSizes();
    }

    // Animation helpers
    animateCardEntrance() {
        const cards = document.querySelectorAll('.platform-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    animateSelection(card) {
        card.style.transform = 'scale(1.1)';
        setTimeout(() => {
            card.style.transform = '';
        }, 300);
    }

    animateResourceCards() {
        const cards = document.querySelectorAll('.resource-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, index * 50);
        });
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    triggerHapticFeedback() {
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    updateCardSizes() {
        // Ensure consistent card heights
        const cards = document.querySelectorAll('.platform-card, .resource-card');
        if (cards.length === 0) return;

        // Reset heights
        cards.forEach(card => card.style.height = 'auto');

        // Group by rows and equalize heights
        setTimeout(() => {
            const rows = {};
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const row = Math.round(rect.top / 10) * 10;
                if (!rows[row]) rows[row] = [];
                rows[row].push(card);
            });

            Object.values(rows).forEach(rowCards => {
                if (rowCards.length > 1) {
                    const maxHeight = Math.max(...rowCards.map(card => card.offsetHeight));
                    rowCards.forEach(card => card.style.height = maxHeight + 'px');
                }
            });
        }, 100);
    }

    initializeTooltips() {
        // Initialize tooltips (could be extended with a tooltip library)
        document.addEventListener('mouseover', (e) => {
            const tooltip = e.target.closest('[data-tooltip]');
            if (tooltip) {
                this.showTooltip(tooltip, tooltip.getAttribute('data-tooltip'));
            }
        });

        document.addEventListener('mouseout', (e) => {
            const tooltip = e.target.closest('[data-tooltip]');
            if (tooltip) {
                this.hideTooltip();
            }
        });
    }

    showTooltip(element, text) {
        // Simple tooltip implementation
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        tooltip.style.opacity = '1';
    }

    hideTooltip() {
        const tooltip = document.querySelector('.custom-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    setupAnimations() {
        // Setup intersection observer for scroll animations
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1
            });

            // Observe elements that should animate on scroll
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        }
    }
}

// Create global UI manager instance
const uiManager = new UIManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIManager;
}