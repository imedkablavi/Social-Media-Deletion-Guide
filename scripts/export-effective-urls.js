#!/usr/bin/env node
/** Export the URLs users actually see after every catalog maintenance layer runs. */
const base = require('../js/platforms.js');

global.platforms = base.platforms;
global.categories = base.categories;
global.resourceTypes = base.resourceTypes;
global.translations = {
    ar: { platforms: {} },
    en: { platforms: {} },
    fr: { platforms: {} },
    tr: { platforms: {} }
};

require('../js/catalog-updates.js');
require('../js/ai-catalog.js');
require('../js/catalog-maintenance.js');

const urls = [...new Set(
    global.platforms.flatMap(platform => (platform.resources || []).map(resource => resource.url))
        .filter(url => typeof url === 'string' && /^https:\/\//.test(url))
)].sort();

if (urls.length < 100) {
    console.error(`Effective catalog unexpectedly contains only ${urls.length} URLs.`);
    process.exit(1);
}

process.stdout.write(`${urls.join('\n')}\n`);
