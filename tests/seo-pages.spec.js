const { test, expect } = require('@playwright/test');

test('service index exposes crawlable links for the full catalog', async ({ page }) => {
  await page.goto('/en/services/');
  await expect(page.locator('h1')).toContainText('Account Deletion Guides');
  await expect.poll(() => page.locator('.service-index a').count()).toBeGreaterThan(50);

  const hrefs = await page.locator('.service-index a').evaluateAll(links => links.map(link => link.href));
  expect(hrefs.every(href => /\/en\/services\/[^/]+\/$/.test(href))).toBeTruthy();
  await expect(page.locator('a[href$="/en/topics/"]')).toBeVisible();
});

test('service pages have canonical, hreflang, structured data and official resources', async ({ page }) => {
  await page.goto('/en/services/openai/');
  await expect(page.locator('h1')).toContainText('OpenAI');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://imedkablavi.github.io/Social-Media-Deletion-Guide/en/services/openai/');
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(5);
  await expect.poll(() => page.locator('.resource-card a').count()).toBeGreaterThan(1);
  await expect(page.locator('script[src]')).toHaveCount(0);

  const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
  const parsed = JSON.parse(jsonLd);
  expect(parsed['@graph'].some(node => node['@type'] === 'BreadcrumbList')).toBeTruthy();
  expect(parsed['@graph'].some(node => node['@type'] === 'ItemList')).toBeTruthy();
});

test('reviewed high-intent service pages contain useful editorial depth', async ({ page }) => {
  await page.goto('/en/services/openai/');
  await expect(page).toHaveTitle(/Delete ChatGPT \/ OpenAI Account/);
  await expect(page.locator('.guide-insight')).toBeVisible();
  await expect(page.locator('.guide-insight .insight-list li')).toHaveCount(3);
  await expect(page.locator('.editorial-review time')).toHaveAttribute('datetime', '2026-08-22');
  await expect(page.locator('a[href$="/en/topics/delete-ai-accounts/"]')).toBeVisible();

  await page.goto('/en/services/reddit/');
  await expect(page.locator('.guide-insight')).toContainText('posts and comments remain');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /does not automatically remove every post or comment/i);

  await page.goto('/en/services/google/');
  await expect(page.locator('.guide-insight')).toContainText('Google Takeout');
  await expect(page.locator('h1')).toContainText('Google Account');
});

test('localized curated content stays in the selected language', async ({ page }) => {
  await page.goto('/ar/services/openai/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('.guide-insight')).toContainText('حذف الحساب نهائي');
  await expect(page.locator('.guide-insight')).not.toContainText('Important things to know');

  await page.goto('/tr/services/tiktok/');
  await expect(page.locator('.guide-insight')).toContainText('devre dışı');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/tr\/services\/tiktok\/$/);

  await page.goto('/fr/services/github/');
  await expect(page.locator('.guide-insight')).toContainText('dépôts');
});

test('localized service pages preserve language and RTL metadata', async ({ page }) => {
  await page.goto('/ar/services/openai/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('h1')).toContainText('OpenAI');

  await page.goto('/tr/services/instagram/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/tr\/services\/instagram\/$/);
});

test('topic index exposes focused crawlable growth hubs', async ({ page }) => {
  await page.goto('/en/topics/');
  await expect(page.locator('h1')).toContainText('Deletion topics');
  await expect(page.locator('.topic-index a')).toHaveCount(4);
  await expect(page.locator('a[href$="/en/topics/delete-ai-accounts/"]')).toBeVisible();
  await expect(page.locator('a[href$="/en/topics/delete-social-media-accounts/"]')).toBeVisible();
  await expect(page.locator('a[href$="/en/topics/export-account-data/"]')).toBeVisible();
});

test('topic pages provide unique copy, service links and search metadata', async ({ page }) => {
  await page.goto('/en/topics/delete-ai-accounts/');
  await expect(page).toHaveTitle(/Delete AI Accounts/);
  await expect(page.locator('.topic-copy')).toHaveCount(2);
  await expect.poll(() => page.locator('.topic-service-index a').count()).toBeGreaterThan(5);
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(5);
  await expect(page.locator('script[src]')).toHaveCount(0);

  const jsonLd = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  expect(jsonLd['@type']).toBe('CollectionPage');
  expect(jsonLd.mainEntity['@type']).toBe('ItemList');

  await page.goto('/ar/topics/delete-social-media-accounts/');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('h1')).toContainText('حذف حسابات التواصل الاجتماعي');
});

test('production sitemap discovers localized service and topic URLs', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  expect(locations.length).toBeGreaterThan(270);
  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/en/services/openai/');
  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/ar/services/openai/');
  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/tr/services/instagram/');
  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/fr/services/google/');
  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/en/topics/delete-ai-accounts/');
  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/ar/topics/delete-social-media-accounts/');
  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/tr/topics/export-account-data/');
});
