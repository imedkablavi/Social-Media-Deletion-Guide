#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { GUIDE_CONTENT, TOPIC_PAGES } = require('./growth-content.js');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const BASE = 'https://imedkablavi.github.io/Social-Media-Deletion-Guide/';
const LANGS = ['en', 'ar', 'fr', 'tr'];

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function read(relative) {
  const target = path.join(DIST, relative);
  if (!fs.existsSync(target)) fail(`missing generated file: ${relative}`);
  return fs.readFileSync(target, 'utf8');
}

const report = JSON.parse(read('build-report.json'));
if (report.curatedGuides < 6) fail(`expected at least 6 curated guides, got ${report.curatedGuides}`);
if (report.topicPages !== Object.keys(TOPIC_PAGES).length * LANGS.length) fail(`unexpected topic page count: ${report.topicPages}`);
if (report.topicIndexes !== LANGS.length) fail(`unexpected topic index count: ${report.topicIndexes}`);
if (report.sitemapUrls < 270) fail(`sitemap should contain growth hubs; got only ${report.sitemapUrls} URLs`);

for (const [serviceId, guide] of Object.entries(GUIDE_CONTENT)) {
  if (!guide.reviewed) fail(`${serviceId} curated guide is missing reviewed date`);
  for (const lang of LANGS) {
    if (!guide[lang]?.title || !guide[lang]?.description || !guide[lang]?.heading || !guide[lang]?.overview) {
      fail(`${serviceId} curated guide is incomplete for ${lang}`);
    }
    if (!Array.isArray(guide[lang].points) || guide[lang].points.length < 3) fail(`${serviceId} needs at least 3 reviewed points for ${lang}`);
    const html = read(`${lang}/services/${serviceId}/index.html`);
    if (!html.includes('class="guide-insight"')) fail(`${serviceId}/${lang} did not render curated insight`);
    if (!html.includes(`datetime="${guide.reviewed}"`)) fail(`${serviceId}/${lang} is missing editorial review date`);
    if (!html.includes(guide[lang].title.replaceAll('&', '&amp;'))) fail(`${serviceId}/${lang} did not use its curated SEO title`);
    if (!html.includes(`/${lang}/topics/`)) fail(`${serviceId}/${lang} does not link into topic architecture`);
  }
}

for (const lang of LANGS) {
  const index = read(`${lang}/topics/index.html`);
  if (!index.includes(`<link rel="canonical" href="${BASE}${lang}/topics/">`)) fail(`wrong canonical on ${lang} topic index`);
  const topicLinks = [...index.matchAll(new RegExp(`href="${BASE}${lang}/topics/([^/]+)/"`, 'g'))];
  if (new Set(topicLinks.map(match => match[1])).size < Object.keys(TOPIC_PAGES).length) fail(`${lang} topic index is missing topic links`);

  for (const [slug, topic] of Object.entries(TOPIC_PAGES)) {
    const html = read(`${lang}/topics/${slug}/index.html`);
    const canonical = `${BASE}${lang}/topics/${slug}/`;
    if (!html.includes(`<link rel="canonical" href="${canonical}">`)) fail(`wrong canonical on ${lang}/${slug}`);
    if ((html.match(/rel="alternate" hreflang=/g) || []).length < 5) fail(`incomplete hreflang on ${lang}/${slug}`);
    if (!html.includes('CollectionPage') || !html.includes('ItemList')) fail(`structured data missing on ${lang}/${slug}`);
    if (/<script\s+(?:defer\s+)?src=/i.test(html)) fail(`topic page unexpectedly needs runtime JavaScript: ${lang}/${slug}`);
    const content = topic[lang] || topic.en;
    if (!html.includes(content.heading)) fail(`localized topic heading missing on ${lang}/${slug}`);
    if (!html.includes(`/${lang}/services/`)) fail(`topic ${lang}/${slug} has no service links`);
  }
}

const sitemap = read('sitemap.xml');
for (const lang of LANGS) {
  if (!sitemap.includes(`<loc>${BASE}${lang}/topics/</loc>`)) fail(`sitemap missing ${lang} topic index`);
  for (const slug of Object.keys(TOPIC_PAGES)) {
    if (!sitemap.includes(`<loc>${BASE}${lang}/topics/${slug}/</loc>`)) fail(`sitemap missing ${lang}/${slug}`);
  }
}

const arOpenAI = read('ar/services/openai/index.html');
if (arOpenAI.includes('Important things to know') || arOpenAI.includes('Delete ChatGPT / OpenAI Account')) fail('Arabic OpenAI growth content leaked English UI copy');

console.log(`Growth validation passed: ${report.curatedGuides} curated guides, ${report.topicPages} topic pages, ${report.sitemapUrls} sitemap URLs.`);
