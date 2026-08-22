const { test, expect } = require('@playwright/test');

async function waitForCatalog(page) {
  await expect.poll(() => page.locator('.platform-card').count()).toBeGreaterThan(50);
}

test('classic v2 visual hierarchy stays intact', async ({ page }) => {
  await page.goto('/');
  await waitForCatalog(page);

  const snapshot = await page.evaluate(() => {
    const style = selector => getComputedStyle(document.querySelector(selector));
    const hero = style('.hero-section');
    const title = style('.hero-title');
    const shell = style('.directory-shell');
    const card = style('.platform-card');
    const nav = style('.site-nav');

    return {
      heroBackground: hero.backgroundColor,
      heroTextAlign: hero.textAlign,
      titleColor: title.color,
      shellBackground: shell.backgroundColor,
      cardBackground: card.backgroundColor,
      navBackground: nav.backgroundColor,
      cardRadius: parseFloat(card.borderRadius),
      shellRadius: parseFloat(shell.borderRadius),
      bodyBackground: getComputedStyle(document.body).backgroundColor
    };
  });

  expect(snapshot.heroTextAlign).toBe('center');
  expect(snapshot.heroBackground).not.toBe(snapshot.shellBackground);
  expect(snapshot.navBackground).toBe(snapshot.heroBackground);
  expect(snapshot.cardBackground).toBe('rgb(255, 255, 255)');
  expect(snapshot.shellBackground).toBe('rgb(255, 255, 255)');
  expect(snapshot.bodyBackground).not.toBe(snapshot.heroBackground);
  expect(snapshot.cardRadius).toBeGreaterThanOrEqual(8);
  expect(snapshot.cardRadius).toBeLessThanOrEqual(14);
  expect(snapshot.shellRadius).toBeGreaterThanOrEqual(10);
});

test('classic v2 keeps the directory usable on mobile', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile-only assertion');
  await page.goto('/');
  await waitForCatalog(page);

  const metrics = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    heroWidth: document.querySelector('.hero-content').getBoundingClientRect().width,
    viewport: window.innerWidth
  }));

  expect(metrics.overflow).toBeLessThanOrEqual(1);
  expect(metrics.heroWidth).toBeLessThanOrEqual(metrics.viewport);

  await expect(page.locator('#searchInput')).toBeVisible();
  await expect(page.locator('.platform-card').first()).toBeVisible();
  await expect(page.locator('#languageBtn')).toBeVisible();
});
