#!/usr/bin/env node
const fs = require('fs');

function patch(path, replacements) {
  let text = fs.readFileSync(path, 'utf8');
  for (const [from, to] of replacements) {
    if (!text.includes(from)) throw new Error(`${path}: patch anchor not found: ${from.slice(0, 120)}`);
    text = text.replace(from, to);
  }
  fs.writeFileSync(path, text, 'utf8');
}

patch('scripts/build-site.js', [
  [
    "const { GUIDE_CONTENT_BATCH2, TOPIC_PAGES_BATCH2 } = require('./growth-batch-2.js');\nconst GUIDE_CONTENT = { ...GUIDE_CONTENT_BASE, ...GUIDE_CONTENT_BATCH2 };\nconst TOPIC_PAGES = { ...TOPIC_PAGES_BASE, ...TOPIC_PAGES_BATCH2 };",
    "const { GUIDE_CONTENT_BATCH2, TOPIC_PAGES_BATCH2 } = require('./growth-batch-2.js');\nconst { GUIDE_CONTENT_BATCH3, TOPIC_PAGES_BATCH3 } = require('./growth-batch-3.js');\nconst GUIDE_CONTENT = { ...GUIDE_CONTENT_BASE, ...GUIDE_CONTENT_BATCH2, ...GUIDE_CONTENT_BATCH3 };\nconst TOPIC_PAGES = { ...TOPIC_PAGES_BASE, ...TOPIC_PAGES_BATCH2, ...TOPIC_PAGES_BATCH3 };"
  ],
  [
    "const BASE_URL = 'https://imedkablavi.github.io/Social-Media-Deletion-Guide/';",
    "const BASE_URL = 'https://imedkablavi.github.io/Social-Media-Deletion-Guide/';\nconst GOOGLE_SITE_VERIFICATION = String(process.env.GOOGLE_SITE_VERIFICATION || '').trim();"
  ],
  [
    "    <meta name=\"robots\" content=\"index,follow,max-snippet:-1,max-image-preview:large\">",
    "    <meta name=\"robots\" content=\"index,follow,max-snippet:-1,max-image-preview:large\">\n    ${GOOGLE_SITE_VERIFICATION ? `<meta name=\"google-site-verification\" content=\"${escapeHtml(GOOGLE_SITE_VERIFICATION)}\">` : ''}"
  ],
  [
    "function enrichHomepage() {\n    let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');",
    "function enrichHomepage() {\n    let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');\n    if (GOOGLE_SITE_VERIFICATION && !html.includes('name=\"google-site-verification\"')) {\n        html = html.replace('</head>', `    <meta name=\"google-site-verification\" content=\"${escapeHtml(GOOGLE_SITE_VERIFICATION)}\">\\n</head>`);\n    }"
  ]
]);

patch('scripts/validate-growth.js', [
  [
    "const { GUIDE_CONTENT_BATCH2, TOPIC_PAGES_BATCH2 } = require('./growth-batch-2.js');\nconst GUIDE_CONTENT = { ...GUIDE_CONTENT_BASE, ...GUIDE_CONTENT_BATCH2 };\nconst TOPIC_PAGES = { ...TOPIC_PAGES_BASE, ...TOPIC_PAGES_BATCH2 };\nconst BATCH2_GUIDES = ['facebook', 'whatsapp', 'discord', 'telegram', 'microsoft', 'apple', 'snapchat', 'spotify', 'steam', 'amazon'];\nconst BATCH2_TOPICS = ['delete-gaming-accounts', 'cancel-subscriptions-before-deleting', 'protect-cloud-data-before-deletion', 'account-deletion-grace-periods'];",
    "const { GUIDE_CONTENT_BATCH2, TOPIC_PAGES_BATCH2 } = require('./growth-batch-2.js');\nconst { GUIDE_CONTENT_BATCH3, TOPIC_PAGES_BATCH3 } = require('./growth-batch-3.js');\nconst GUIDE_CONTENT = { ...GUIDE_CONTENT_BASE, ...GUIDE_CONTENT_BATCH2, ...GUIDE_CONTENT_BATCH3 };\nconst TOPIC_PAGES = { ...TOPIC_PAGES_BASE, ...TOPIC_PAGES_BATCH2, ...TOPIC_PAGES_BATCH3 };\nconst BATCH2_GUIDES = ['facebook', 'whatsapp', 'discord', 'telegram', 'microsoft', 'apple', 'snapchat', 'spotify', 'steam', 'amazon'];\nconst BATCH2_TOPICS = ['delete-gaming-accounts', 'cancel-subscriptions-before-deleting', 'protect-cloud-data-before-deletion', 'account-deletion-grace-periods'];\nconst BATCH3_GUIDES = ['twitter', 'linkedin', 'paypal', 'netflix', 'dropbox', 'adobe', 'slack', 'zoom', 'pinterest', 'ebay'];\nconst BATCH3_TOPICS = ['deactivate-vs-delete-social-accounts', 'delete-work-and-cloud-accounts', 'delete-payment-and-marketplace-accounts', 'cancel-streaming-before-deleting'];\nconst SEARCH_INTENTS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'search-intents.json'), 'utf8'));"
  ],
  [
    "if (report.curatedGuides < 16) fail(`expected at least 16 curated guides, got ${report.curatedGuides}`);",
    "if (report.curatedGuides < 26) fail(`expected at least 26 curated guides, got ${report.curatedGuides}`);"
  ],
  [
    "if (report.sitemapUrls < 289) fail(`sitemap should contain batch 2 growth hubs; got only ${report.sitemapUrls} URLs`);\nfor (const id of BATCH2_GUIDES) if (!GUIDE_CONTENT[id]) fail(`missing batch 2 guide: ${id}`);\nfor (const slug of BATCH2_TOPICS) if (!TOPIC_PAGES[slug]) fail(`missing batch 2 topic: ${slug}`);",
    "if (report.sitemapUrls < 305) fail(`sitemap should contain batch 3 growth hubs; got only ${report.sitemapUrls} URLs`);\nfor (const id of BATCH2_GUIDES) if (!GUIDE_CONTENT[id]) fail(`missing batch 2 guide: ${id}`);\nfor (const slug of BATCH2_TOPICS) if (!TOPIC_PAGES[slug]) fail(`missing batch 2 topic: ${slug}`);\nfor (const id of BATCH3_GUIDES) if (!GUIDE_CONTENT[id]) fail(`missing batch 3 guide: ${id}`);\nfor (const slug of BATCH3_TOPICS) if (!TOPIC_PAGES[slug]) fail(`missing batch 3 topic: ${slug}`);\nif (!Array.isArray(SEARCH_INTENTS.targets) || SEARCH_INTENTS.targets.length !== BATCH3_GUIDES.length) fail('search-intents.json must describe every batch 3 service');\nconst intentIds = new Set(SEARCH_INTENTS.targets.map(item => item.service));\nfor (const id of BATCH3_GUIDES) if (!intentIds.has(id)) fail(`search-intents.json missing batch 3 service ${id}`);\nfor (const item of SEARCH_INTENTS.targets) {\n  if (!item.query || !/^https:\\/\\//.test(item.officialSource || '')) fail(`invalid search intent record for ${item.service}`);\n}"
  ],
  [
    "for (const id of ['google', 'microsoft', 'amazon']) if (gamingEn.includes(`/en/services/${id}/`)) fail(`gaming topic incorrectly includes ${id}`);",
    "for (const id of ['google', 'microsoft', 'amazon']) if (gamingEn.includes(`/en/services/${id}/`)) fail(`gaming topic incorrectly includes ${id}`);\nconst arX = read('ar/services/twitter/index.html');\nif (!arX.includes('30 يوماً') || arX.includes('Delete X (Twitter)')) fail('Arabic X curated content is missing or leaked English');\nconst trAdobe = read('tr/services/adobe/index.html');\nif (!trAdobe.includes('27 gün') || trAdobe.includes('Delete Adobe Account')) fail('Turkish Adobe curated content is missing or leaked English');\nconst frEbay = read('fr/services/ebay/index.html');\nif (!frEbay.includes('14 jours') || !frEbay.includes('60 jours')) fail('French eBay timing content is missing');\nconst workHub = read('en/topics/delete-work-and-cloud-accounts/index.html');\nfor (const id of ['linkedin', 'slack', 'zoom', 'adobe', 'dropbox', 'github', 'microsoft']) if (!workHub.includes(`/en/services/${id}/`)) fail(`work/cloud topic missing ${id}`);\nconst paymentsHub = read('en/topics/delete-payment-and-marketplace-accounts/index.html');\nfor (const id of ['paypal', 'ebay', 'amazon']) if (!paymentsHub.includes(`/en/services/${id}/`)) fail(`payments topic missing ${id}`);"
  ]
]);

patch('tests/seo-pages.spec.js', [
  ["await expect(page.locator('.topic-index a')).toHaveCount(8);", "await expect(page.locator('.topic-index a')).toHaveCount(12);"],
  ["expect(locations.length).toBeGreaterThan(288);", "expect(locations.length).toBeGreaterThan(304);"],
  [
    "test('production sitemap discovers localized service and topic URLs', async ({ request }) => {",
    `test('third growth batch targets reviewed high-intent deletion queries', async ({ page }) => {\n  await page.goto('/en/services/twitter/');\n  await expect(page).toHaveTitle(/Delete X \\(Twitter\\) Account/);\n  await expect(page.locator('.guide-insight')).toContainText('30-day');\n  await expect(page.locator('.guide-insight')).toContainText('third-party');\n\n  await page.goto('/ar/services/linkedin/');\n  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');\n  await expect(page.locator('.guide-insight')).toContainText('30 يوماً');\n  await expect(page.locator('.guide-insight')).toContainText('24 ساعة');\n\n  await page.goto('/tr/services/adobe/');\n  await expect(page.locator('.guide-insight')).toContainText('27 gün');\n\n  await page.goto('/fr/services/ebay/');\n  await expect(page.locator('.guide-insight')).toContainText('14 jours');\n  await expect(page.locator('.guide-insight')).toContainText('60 jours');\n});\n\ntest('batch 3 intent hubs expose only targeted account clusters', async ({ page }) => {\n  await page.goto('/en/topics/delete-payment-and-marketplace-accounts/');\n  for (const id of ['paypal', 'ebay', 'amazon']) {\n    await expect(page.locator(\`a[href$=\"/en/services/\${id}/\"]\`)).toBeVisible();\n  }\n  await expect(page.locator('a[href$=\"/en/services/netflix/\"]')).toHaveCount(0);\n\n  await page.goto('/ar/topics/delete-work-and-cloud-accounts/');\n  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');\n  for (const id of ['linkedin', 'slack', 'zoom', 'adobe', 'dropbox', 'github', 'microsoft']) {\n    await expect(page.locator(\`a[href$=\"/ar/services/\${id}/\"]\`)).toBeVisible();\n  }\n});\n\ntest('production sitemap discovers localized service and topic URLs', async ({ request }) => {`
  ],
  [
    "  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/fr/topics/cancel-subscriptions-before-deleting/');",
    "  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/fr/topics/cancel-subscriptions-before-deleting/');\n  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/en/services/twitter/');\n  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/ar/services/linkedin/');\n  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/en/topics/deactivate-vs-delete-social-accounts/');\n  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/ar/topics/delete-work-and-cloud-accounts/');\n  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/fr/topics/delete-payment-and-marketplace-accounts/');\n  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/tr/topics/cancel-streaming-before-deleting/');"
  ]
]);

fs.rmSync('scripts/apply-growth-batch-3.js', { force: true });
fs.rmSync('.github/workflows/apply-growth-batch-3.yml', { force: true });
console.log('Growth batch 3 source migration applied.');
