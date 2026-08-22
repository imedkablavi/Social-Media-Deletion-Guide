#!/usr/bin/env node
/** Fail release QA when any user-visible catalog/UI string is incomplete. */
const fs = require('fs');
const path = require('path');
const { loadCatalog } = require('./load-catalog.js');

const ROOT = path.resolve(__dirname, '..');
const LANGS = ['ar', 'en', 'fr', 'tr'];
const { platforms, categories, resourceTypes, translations } = loadCatalog();
const errors = [];

const missing = value => typeof value !== 'string' || !value.trim();
const fail = message => errors.push(message);

for (const platform of platforms) {
    for (const [index, resource] of (platform.resources || []).entries()) {
        for (const lang of LANGS) {
            if (missing(resource?.title?.[lang])) {
                fail(`${platform.id} resource #${index + 1} (${resource.url}) missing title.${lang}`);
            }
        }
        if (!missing(resource?.title?.tr) && !missing(resource?.title?.en) && resource.title.tr.trim() === resource.title.en.trim()) {
            fail(`${platform.id} resource #${index + 1} still uses English as Turkish fallback: ${resource.title.en}`);
        }
    }

    if (platform.note) {
        if (typeof platform.note !== 'object' || Array.isArray(platform.note)) {
            fail(`${platform.id} note must be a localized object, not a single-language string`);
        } else {
            for (const lang of LANGS) {
                if (missing(platform.note[lang])) fail(`${platform.id} note missing ${lang}`);
            }
        }
    }
}

for (const [category, labels] of Object.entries(categories)) {
    for (const lang of LANGS) {
        if (missing(labels?.[lang])) fail(`category ${category} missing ${lang}`);
    }
}

for (const [type, labels] of Object.entries(resourceTypes)) {
    for (const lang of LANGS) {
        if (missing(labels?.[lang])) fail(`resource type ${type} missing ${lang}`);
    }
}

const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const attrPatterns = [
    /data-key="([^"]+)"/g,
    /data-key-placeholder="([^"]+)"/g,
    /data-key-aria-label="([^"]+)"/g,
    /data-tooltip-key="([^"]+)"/g
];
const homepageKeys = new Set();
for (const pattern of attrPatterns) {
    for (const match of indexHtml.matchAll(pattern)) homepageKeys.add(match[1]);
}

const runtimeKeys = [
    'help', 'close', 'modalCloseLabel', 'connectionRestored', 'offlineNotice',
    'unexpectedError', 'networkError', 'initErrorTitle', 'initErrorText',
    'reloadPage', 'technicalDetails', 'githubRepositoryLabel', 'resourcesCountLabel',
    'scopeGoogleAccount', 'scopeMicrosoftAccount', 'serviceGuidesTitle', 'serviceGuidesLead',
    'popularSupportedList'
];
for (const key of runtimeKeys) homepageKeys.add(key);

for (const lang of LANGS) {
    if (!translations[lang]) {
        fail(`translation dictionary missing ${lang}`);
        continue;
    }
    for (const key of homepageKeys) {
        if (missing(translations[lang][key])) fail(`translations.${lang}.${key} is missing`);
    }
}

if (errors.length) {
    console.error(`Localization audit failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
}

const resourceCount = platforms.reduce((total, platform) => total + (platform.resources || []).length, 0);
console.log(`Localization audit passed: ${platforms.length} services, ${resourceCount} resources, ${homepageKeys.size} UI keys, 4 languages.`);
