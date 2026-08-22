#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const BASE = 'https://imedkablavi.github.io/Social-Media-Deletion-Guide/';
const MIN_URLS = 305;

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

const canonicalOwners = new Map();
for (const url of urls) {
  const html = htmlForUrl(url);
  if (/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) fail(`indexable sitemap URL has noindex: ${url}`);
  if (!/name=["']robots["'][^>]*content=["'][^"']*index/i.test(html)) fail(`indexable page is missing an index robots directive: ${url}`);

  const canonicals = [...html.matchAll(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/gi)].map(match => match[1]);
  if (canonicals.length !== 1) fail(`expected exactly one canonical on ${url}, found ${canonicals.length}`);
  if (canonicals[0] !== url) fail(`self-canonical mismatch on ${url}: ${canonicals[0]}`);
  if (canonicalOwners.has(canonicals[0])) fail(`duplicate canonical target used by ${url} and ${canonicalOwners.get(canonicals[0])}`);
  canonicalOwners.set(canonicals[0], url);

  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() || '';
  if (title.length < 12 || title.length > 120) fail(`unhealthy title length (${title.length}) on ${url}`);
  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1]?.trim() || '';
  if (description.length < 50 || description.length > 220) fail(`unhealthy meta description length (${description.length}) on ${url}`);

  if (url !== BASE) {
    const alternates = [...html.matchAll(/rel=["']alternate["']\s+hreflang=["']([^"']+)["']\s+href=["']([^"']+)["']/gi)];
    if (alternates.length < 5) fail(`localized page has incomplete hreflang set: ${url}`);
    const langs = new Set(alternates.map(match => match[1]));
    for (const lang of ['en', 'ar', 'fr', 'tr', 'x-default']) if (!langs.has(lang)) fail(`missing hreflang ${lang} on ${url}`);
  }
}

const notFound = read('404.html');
if (!/name=["']robots["']\s+content=["']noindex/i.test(notFound)) fail('404.html must remain noindex');

const verification = String(process.env.GOOGLE_SITE_VERIFICATION || '').trim();
if (verification) {
  const home = read('index.html');
  const escaped = verification.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (!new RegExp(`<meta\\s+name=["']google-site-verification["']\\s+content=["']${escaped}["']`).test(home)) {
    fail('GOOGLE_SITE_VERIFICATION was provided but not injected into the production homepage');
  }
}

console.log(`Indexing readiness passed: ${urls.length} unique self-canonical HTTPS URLs, robots.txt and hreflang validated.`);
