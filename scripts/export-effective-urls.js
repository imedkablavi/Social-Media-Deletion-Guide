#!/usr/bin/env node
/** Export the URLs users actually see after every catalog maintenance layer runs. */
const { loadCatalog } = require('./load-catalog.js');
const { platforms } = loadCatalog();

const urls = [...new Set(
    platforms.flatMap(platform => (platform.resources || []).map(resource => resource.url))
        .filter(url => typeof url === 'string' && /^https:\/\//.test(url))
)].sort();

if (urls.length < 100) {
    console.error(`Effective catalog unexpectedly contains only ${urls.length} URLs.`);
    process.exit(1);
}

process.stdout.write(`${urls.join('\n')}\n`);
