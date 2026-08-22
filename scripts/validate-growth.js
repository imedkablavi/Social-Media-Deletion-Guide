#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { GUIDE_CONTENT: GUIDE_CONTENT_BASE, TOPIC_PAGES: TOPIC_PAGES_BASE } = require('./growth-content.js');
const { GUIDE_CONTENT_BATCH2, TOPIC_PAGES_BATCH2 } = require('./growth-batch-2.js');
const GUIDE_CONTENT = { ...GUIDE_CONTENT_BASE, ...GUIDE_CONTENT_BATCH2 };
const TOPIC_PAGES = { ...TOPIC_PAGES_BASE, ...TOPIC_PAGES_BATCH2 };
const BATCH2_GUIDES = ['facebook', 'whatsapp', 'discord', 'telegram', 'microsoft', 'apple', 'snapchat', 'spotify', 'steam', 'amazon'];
const BATCH2_TOPICS = ['delete-gaming-accounts', 'cancel-subscriptions-before-deleting', 'protect-cloud-data-before-deletion', 'account-deletion-grace-periods'];

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
if (report.curatedGuides < 16) fail(`expected at least 16 curated guides, got ${report.curatedGuides}`);
if (report.topicPages !== Object.keys(TOPIC_PAGES).length * LANGS.length) fail(`unexpected topic page count: ${report.topicPages}`);
if (report.topicIndexes !== LANGS.length) fail(`unexpected topic index count: ${report.topicIndexes}`);
if (report.sitemapUrls < 289) fail(`sitemap should contain batch 2 growth hubs; got only ${report.sitemapUrls} URLs`);
for (const id of BATCH2_GUIDES) if (!GUIDE_CONTENT[id]) fail(`missing batch 2 guide: ${id}`);
for (const slug of BATCH2_TOPICS) if (!TOPIC_PAGES[slug]) fail(`missing batch 2 topic: ${slug}`);

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
    if (topic.kind === 'ids') {
      const expectedIds = topic.value.filter(id => fs.existsSync(path.join(DIST, `${lang}/services/${id}/index.html`)));
      for (const id of expectedIds) {
        if (!html.includes(`/${lang}/services/${id}/`)) fail(`topic ${lang}/${slug} missing targeted service ${id}`);
      }
    }
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
const arFacebook = read('ar/services/facebook/index.html');
if (arFacebook.includes('Delete Facebook permanently') || !arFacebook.includes('نافذة الإلغاء')) fail('Arabic Facebook curated content is missing or leaked English');
const trSpotify = read('tr/services/spotify/index.html');
if (trSpotify.includes('Delete Spotify only') || !trSpotify.includes('7 gün')) fail('Turkish Spotify curated content is missing or leaked English');
const gamingEn = read('en/topics/delete-gaming-accounts/index.html');
for (const id of ['steam', 'epicgames', 'playstation']) if (!gamingEn.includes(`/en/services/${id}/`)) fail(`gaming topic missing ${id}`);
for (const id of ['google', 'microsoft', 'amazon']) if (gamingEn.includes(`/en/services/${id}/`)) fail(`gaming topic incorrectly includes ${id}`);

console.log(`Growth validation passed: ${report.curatedGuides} curated guides, ${report.topicPages} topic pages, ${report.sitemapUrls} sitemap URLs.`);
