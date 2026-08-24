#!/usr/bin/env node
/**
 * Load the same effective catalog used by the browser after every maintenance layer.
 * Build/QA tools use this module so generated SEO pages cannot drift from the UI data.
 */
function loadCatalog() {
    const base = require('../js/platforms.js');
    const i18n = require('../js/translations.js');

    global.platforms = structuredClone(base.platforms);
    global.categories = structuredClone(base.categories);
    global.resourceTypes = structuredClone(base.resourceTypes);
    global.translations = structuredClone(i18n.translations);

    require('../js/translations-updates.js');
    require('../js/trust-copy.js');

    // Snapshot legacy evidence before compatibility overlays add fallback metadata.
    require('../js/legacy-provenance-snapshot.js');
    require('../js/catalog-updates.js');
    require('../js/ai-catalog.js');
    require('../js/catalog-maintenance.js');
    require('../js/growth-trust-catalog.js');
    require('../js/provider-verification-batch2.js');

    // Normalize shared trust metadata, then apply independently reviewed later batches.
    require('../js/trust-metadata.js');
    require('../js/provider-verification-batch8.js');
    require('../js/localization-integrity.js');

    return {
        platforms: global.platforms,
        categories: global.categories,
        resourceTypes: global.resourceTypes,
        translations: global.translations
    };
}

module.exports = { loadCatalog };
