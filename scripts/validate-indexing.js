#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const BASE = 'https://imedkablavi.github.io/Social-Media-Deletion-Guide/';
const MIN_URLS = 305;
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

function htmlForUrl(url) {
  if (url === BASE) return read('index.html');
  if (!url.startsWith(BASE)) fail(`sitemap URL is outside production origin: ${url}`);
  const relative = url.slice(BASE.length).replace(/\/$/, '');
  return read(`${relative}/index.html`);
}

function canonicalFor(html) {
  return [...html.matchAll(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/gi)].map(match => match[1]);
}

function alternatesFor(html) {
  return [...html.matchAll(/<link\s+rel=["']alternate["']\s+hreflang=["']([^"']+)["']\s+href=["']([^"']+)["']/gi)]
    .map(match => ({ lang: match[1], href: match[2] }));
}

function parseJsonLd(html, url) {
  const blocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (!blocks.length) fail(`missing JSON-LD on ${url}`);
  return blocks.map((block, index) => {
    try {
      return JSON.parse(block[1]);
    } catch (error) {
      fail(`invalid JSON-LD block ${index + 1} on ${url}: ${error.message}`);
    }
  });
}

function schemaContainsPageUrl(value, url) {
  if (value === url) return true;
  if (Array.isArray(value)) return value.some(item => schemaContainsPageUrl(item, url));
  if (value && typeof value === 'object') return Object.values(value).some(item => schemaContainsPageUrl(item, url));
  return false;
}

const robots = read('robots.txt');
if (!/^User-agent:\s*\*/m.test(robots)) fail('robots.txt is missing User-agent: *');
if (!/^Allow:\s*\/$/m.test(robots)) fail('robots.txt must explicitly allow crawling from /');
if (!robots.includes(`Sitemap: ${BASE}sitemap.xml`)) fail('robots.txt is missing the production sitemap URL');
if (/Disallow:\s*\//i.test(robots)) fail('robots.txt blocks the production site');

const sitemap = read('sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
if (urls.length < MIN_URLS) fail(`expected at least ${MIN_URLS} sitemap URLs, got ${urls.length}`);
if (new Set(urls).size !== urls.length) fail('sitemap contains duplicate URLs');
if (!urls.includes(BASE)) fail('sitemap is missing the homepage');
if (urls.some(url => !url.startsWith('https://'))) fail('sitemap contains a non-HTTPS URL');
if (urls.some(url => !url.startsWith(BASE))) fail('sitemap contains an off-origin URL');
if (urls.some(url => url.includes('404'))) fail('sitemap must not contain the 404 page');

const required = [
  `${BASE}en/services/twitter/`,
  `${BASE}ar/services/linkedin/`,
  `${BASE}fr/services/paypal/`,
  `${BASE}tr/services/dropbox/`,
  `${BASE}en/topics/deactivate-vs-delete-social-accounts/`,
  `${BASE}ar/topics/delete-work-and-cloud-accounts/`,
  `${BASE}fr/topics/delete-payment-and-marketplace-accounts/`,
  `${BASE}tr/topics/cancel-streaming-before-deleting/`
];
for (const url of required) if (!urls.includes(url)) fail(`sitemap is missing growth URL: ${url}`);

const urlSet = new Set(urls);
const htmlMap = new Map(urls.map(url => [url, htmlForUrl(url)]));
const canonicalOwners = new Map();

for (const url of urls) {
  const html = htmlMap.get(url);
  if (/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) fail(`indexable sitemap URL has noindex: ${url}`);
  if (!/name=["']robots["'][^>]*content=["'][^"']*index/i.test(html)) fail(`indexable page is missing an index robots directive: ${url}`);

  const canonicals = canonicalFor(html);
  if (canonicals.length !== 1) fail(`expected exactly one canonical on ${url}, found ${canonicals.length}`);
  if (canonicals[0] !== url) fail(`self-canonical mismatch on ${url}: ${canonicals[0]}`);
  if (canonicalOwners.has(canonicals[0])) fail(`duplicate canonical target used by ${url} and ${canonicalOwners.get(canonicals[0])}`);
  canonicalOwners.set(canonicals[0], url);

  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() || '';
  if (title.length < 12 || title.length > 120) fail(`unhealthy title length (${title.length}) on ${url}`);
  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1]?.trim() || '';
  if (description.length < 50 || description.length > 220) fail(`unhealthy meta description length (${description.length}) on ${url}`);

  const jsonLd = parseJsonLd(html, url);
  if (!jsonLd.some(block => block?.['@context'] === 'https://schema.org')) fail(`JSON-LD on ${url} is missing https://schema.org context`);
  if (!jsonLd.some(block => schemaContainsPageUrl(block, url))) fail(`JSON-LD on ${url} does not identify the canonical page URL`);

  if (url !== BASE) {
    const alternates = alternatesFor(html);
    if (alternates.length !== 5) fail(`expected exactly five hreflang alternates on ${url}, found ${alternates.length}`);
    const byLang = new Map(alternates.map(item => [item.lang, item.href]));
    if (byLang.size !== 5) fail(`duplicate hreflang language on ${url}`);
    for (const lang of [...LANGS, 'x-default']) if (!byLang.has(lang)) fail(`missing hreflang ${lang} on ${url}`);
    for (const item of alternates) {
      if (!urlSet.has(item.href)) fail(`hreflang target is not in sitemap on ${url}: ${item.lang} -> ${item.href}`);
    }
    if (byLang.get('x-default') !== byLang.get('en')) fail(`x-default must point to the English equivalent on ${url}`);

    const sourceLang = url.slice(BASE.length).split('/')[0];
    if (!LANGS.includes(sourceLang)) fail(`localized sitemap URL has unsupported language segment: ${url}`);
    for (const [targetLang, targetUrl] of byLang.entries()) {
      if (targetLang === 'x-default') continue;
      const targetHtml = htmlMap.get(targetUrl);
      const targetAlternates = new Map(alternatesFor(targetHtml).map(item => [item.lang, item.href]));
      if (targetAlternates.get(sourceLang) !== url) {
        fail(`hreflang is not reciprocal: ${url} -> ${targetLang} ${targetUrl}`);
      }
    }
  }
}

const notFound = read('404.html');
if (!/name=["']robots["']\s+content=["']noindex/i.test(notFound)) fail('404.html must remain noindex');
if (canonicalFor(notFound).some(canonical => urlSet.has(canonical))) fail('404.html must not canonicalize to an indexable sitemap URL');

const verification = String(process.env.GOOGLE_SITE_VERIFICATION || '').trim();
if (verification) {
  const home = read('index.html');
  const escaped = verification.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (!new RegExp(`<meta\\s+name=["']google-site-verification["']\\s+content=["']${escaped}["']`).test(home)) {
    fail('GOOGLE_SITE_VERIFICATION was provided but not injected into the production homepage');
  }
}

console.log(`Indexing readiness passed: ${urls.length} unique HTTPS self-canonicals, reciprocal hreflang, schema.org JSON-LD, sitemap and robots validated.`);
