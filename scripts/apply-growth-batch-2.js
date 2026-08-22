#!/usr/bin/env node
const fs = require('fs');

function patch(path, replacements) {
  let text = fs.readFileSync(path, 'utf8');
  for (const [from, to] of replacements) {
    if (!text.includes(from)) throw new Error(`${path}: patch anchor not found: ${from.slice(0, 100)}`);
    text = text.replace(from, to);
  }
  fs.writeFileSync(path, text, 'utf8');
}

patch('scripts/build-site.js', [
  [
    "const { GUIDE_CONTENT, TOPIC_PAGES } = require('./growth-content.js');",
    "const { GUIDE_CONTENT: GUIDE_CONTENT_BASE, TOPIC_PAGES: TOPIC_PAGES_BASE } = require('./growth-content.js');\nconst { GUIDE_CONTENT_BATCH2, TOPIC_PAGES_BATCH2 } = require('./growth-batch-2.js');\nconst GUIDE_CONTENT = { ...GUIDE_CONTENT_BASE, ...GUIDE_CONTENT_BATCH2 };\nconst TOPIC_PAGES = { ...TOPIC_PAGES_BASE, ...TOPIC_PAGES_BATCH2 };"
  ],
  [
    "    if (topic.kind === 'resourceType') return (platform.resources || []).some(resource => resource.type === topic.value);\n    return false;",
    "    if (topic.kind === 'resourceType') return (platform.resources || []).some(resource => resource.type === topic.value);\n    if (topic.kind === 'ids') return Array.isArray(topic.value) && topic.value.includes(platform.id);\n    return false;"
  ]
]);

patch('scripts/validate-growth.js', [
  [
    "const { GUIDE_CONTENT, TOPIC_PAGES } = require('./growth-content.js');",
    "const { GUIDE_CONTENT: GUIDE_CONTENT_BASE, TOPIC_PAGES: TOPIC_PAGES_BASE } = require('./growth-content.js');\nconst { GUIDE_CONTENT_BATCH2, TOPIC_PAGES_BATCH2 } = require('./growth-batch-2.js');\nconst GUIDE_CONTENT = { ...GUIDE_CONTENT_BASE, ...GUIDE_CONTENT_BATCH2 };\nconst TOPIC_PAGES = { ...TOPIC_PAGES_BASE, ...TOPIC_PAGES_BATCH2 };\nconst BATCH2_GUIDES = ['facebook', 'whatsapp', 'discord', 'telegram', 'microsoft', 'apple', 'snapchat', 'spotify', 'steam', 'amazon'];\nconst BATCH2_TOPICS = ['delete-gaming-accounts', 'cancel-subscriptions-before-deleting', 'protect-cloud-data-before-deletion', 'account-deletion-grace-periods'];"
  ],
  [
    "if (report.curatedGuides < 6) fail(`expected at least 6 curated guides, got ${report.curatedGuides}`);",
    "if (report.curatedGuides < 16) fail(`expected at least 16 curated guides, got ${report.curatedGuides}`);"
  ],
  [
    "if (report.sitemapUrls < 270) fail(`sitemap should contain growth hubs; got only ${report.sitemapUrls} URLs`);",
    "if (report.sitemapUrls < 289) fail(`sitemap should contain batch 2 growth hubs; got only ${report.sitemapUrls} URLs`);\nfor (const id of BATCH2_GUIDES) if (!GUIDE_CONTENT[id]) fail(`missing batch 2 guide: ${id}`);\nfor (const slug of BATCH2_TOPICS) if (!TOPIC_PAGES[slug]) fail(`missing batch 2 topic: ${slug}`);"
  ],
  [
    "    if (!html.includes(`/${lang}/services/`)) fail(`topic ${lang}/${slug} has no service links`);",
    "    if (!html.includes(`/${lang}/services/`)) fail(`topic ${lang}/${slug} has no service links`);\n    if (topic.kind === 'ids') {\n      const expectedIds = topic.value.filter(id => fs.existsSync(path.join(DIST, `${lang}/services/${id}/index.html`)));\n      for (const id of expectedIds) {\n        if (!html.includes(`/${lang}/services/${id}/`)) fail(`topic ${lang}/${slug} missing targeted service ${id}`);\n      }\n    }"
  ],
  [
    "const arOpenAI = read('ar/services/openai/index.html');\nif (arOpenAI.includes('Important things to know') || arOpenAI.includes('Delete ChatGPT / OpenAI Account')) fail('Arabic OpenAI growth content leaked English UI copy');",
    "const arOpenAI = read('ar/services/openai/index.html');\nif (arOpenAI.includes('Important things to know') || arOpenAI.includes('Delete ChatGPT / OpenAI Account')) fail('Arabic OpenAI growth content leaked English UI copy');\nconst arFacebook = read('ar/services/facebook/index.html');\nif (arFacebook.includes('Delete Facebook permanently') || !arFacebook.includes('نافذة الإلغاء')) fail('Arabic Facebook curated content is missing or leaked English');\nconst trSpotify = read('tr/services/spotify/index.html');\nif (trSpotify.includes('Delete Spotify only') || !trSpotify.includes('7 gün')) fail('Turkish Spotify curated content is missing or leaked English');\nconst gamingEn = read('en/topics/delete-gaming-accounts/index.html');\nfor (const id of ['steam', 'epicgames', 'playstation']) if (!gamingEn.includes(`/en/services/${id}/`)) fail(`gaming topic missing ${id}`);\nfor (const id of ['google', 'microsoft', 'amazon']) if (gamingEn.includes(`/en/services/${id}/`)) fail(`gaming topic incorrectly includes ${id}`);"
  ]
]);

patch('tests/seo-pages.spec.js', [
  ["await expect(page.locator('.topic-index a')).toHaveCount(4);", "await expect(page.locator('.topic-index a')).toHaveCount(8);"],
  ["expect(locations.length).toBeGreaterThan(270);", "expect(locations.length).toBeGreaterThan(288);"],
  [
    "test('production sitemap discovers localized service and topic URLs', async ({ request }) => {",
    `test('second growth batch adds reviewed high-intent service guidance', async ({ page }) => {\n  await page.goto('/en/services/discord/');\n  await expect(page).toHaveTitle(/Delete Discord Account/);\n  await expect(page.locator('.guide-insight')).toContainText('15 days');\n  await expect(page.locator('.guide-insight')).toContainText('transfer ownership');\n\n  await page.goto('/ar/services/microsoft/');\n  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');\n  await expect(page.locator('.guide-insight')).toContainText('30 أو 60');\n\n  await page.goto('/tr/services/spotify/');\n  await expect(page.locator('.guide-insight')).toContainText('7 gün');\n\n  await page.goto('/fr/services/steam/');\n  await expect(page.locator('.guide-insight')).toContainText('preuve');\n});\n\ntest('id-targeted growth hubs include intended services only', async ({ page }) => {\n  await page.goto('/en/topics/delete-gaming-accounts/');\n  for (const id of ['steam', 'epicgames', 'playstation']) {\n    await expect(page.locator(\`a[href$=\"/en/services/\${id}/\"]\`)).toBeVisible();\n  }\n  for (const id of ['google', 'microsoft', 'amazon']) {\n    await expect(page.locator(\`a[href$=\"/en/services/\${id}/\"]\`)).toHaveCount(0);\n  }\n\n  await page.goto('/ar/topics/account-deletion-grace-periods/');\n  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');\n  for (const id of ['facebook', 'discord', 'microsoft', 'snapchat', 'spotify']) {\n    await expect(page.locator(\`a[href$=\"/ar/services/\${id}/\"]\`)).toBeVisible();\n  }\n});\n\ntest('production sitemap discovers localized service and topic URLs', async ({ request }) => {`
  ],
  [
    "  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/tr/topics/export-account-data/');",
    "  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/tr/topics/export-account-data/');\n  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/en/topics/delete-gaming-accounts/');\n  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/ar/topics/account-deletion-grace-periods/');\n  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/fr/topics/cancel-subscriptions-before-deleting/');"
  ]
]);

fs.rmSync('scripts/apply-growth-batch-2.js', { force: true });
fs.rmSync('.github/workflows/apply-growth-batch-2.yml', { force: true });
console.log('Growth batch 2 source migration applied.');
