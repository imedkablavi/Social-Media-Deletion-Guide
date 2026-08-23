const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const LOCALES = [
  { code: 'en', dir: 'ltr' },
  { code: 'ar', dir: 'rtl' },
  { code: 'fr', dir: 'ltr' },
  { code: 'tr', dir: 'ltr' }
];

async function axeViolations(page) {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  return result.violations.map(violation => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    nodes: violation.nodes.map(node => node.target)
  }));
}

async function expectNoHorizontalOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scroll: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)
  }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.viewport + 1);
}

for (const locale of LOCALES) {
  test(`mobile homepage is accessible and contained in ${locale.code}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect.poll(() => page.locator('.platform-card').count()).toBeGreaterThan(50);

    if (locale.code !== 'en') {
      await page.locator('#languageBtn').click();
      await page.locator(`.language-option[data-lang="${locale.code}"]`).click();
    }

    await expect(page.locator('html')).toHaveAttribute('lang', locale.code);
    await expect(page.locator('html')).toHaveAttribute('dir', locale.dir);
    await expectNoHorizontalOverflow(page);
    expect(await axeViolations(page)).toEqual([]);

    const firstCard = page.locator('.platform-card').first();
    await expect(firstCard).toBeVisible();
    const box = await firstCard.boundingBox();
    expect(box).not.toBeNull();
    expect(box.width).toBeLessThanOrEqual(390);
  });

  test(`crawlable service page is accessible on mobile in ${locale.code}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${locale.code}/services/twitter/`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', locale.code);
    await expect(page.locator('html')).toHaveAttribute('dir', locale.dir);
    await expectNoHorizontalOverflow(page);
    expect(await axeViolations(page)).toEqual([]);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe(`https://imedkablavi.github.io/Social-Media-Deletion-Guide/${locale.code}/services/twitter/`);
  });
}
