const { test, expect } = require('@playwright/test');

test('service index exposes crawlable links for the full catalog', async ({ page }) => {
  await page.goto('/en/services/');
  await expect(page.locator('h1')).toContainText('Account Deletion Guides');
  await expect.poll(() => page.locator('.service-index a').count()).toBeGreaterThan(50);

  const hrefs = await page.locator('.service-index a').evaluateAll(links => links.map(link => link.href));
  expect(hrefs.every(href => /\/en\/services\/[^/]+\/$/.test(href))).toBeTruthy();
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

test('localized service pages preserve language and RTL metadata', async ({ page }) => {
  await page.goto('/ar/services/openai/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('h1')).toContainText('OpenAI');

  await page.goto('/tr/services/instagram/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/tr\/services\/instagram\/$/);
});

test('production sitemap discovers localized service URLs', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  expect(locations.length).toBeGreaterThan(200);
  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/en/services/openai/');
  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/ar/services/openai/');
  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/tr/services/instagram/');
  expect(locations).toContain('https://imedkablavi.github.io/Social-Media-Deletion-Guide/fr/services/google/');
});
