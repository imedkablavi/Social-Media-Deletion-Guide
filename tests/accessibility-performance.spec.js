const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

async function waitForCatalog(page) {
  await expect.poll(() => page.locator('.platform-card').count()).toBeGreaterThan(50);
}

async function wcagViolations(page) {
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

test('default and interactive states have no WCAG A/AA violations', async ({ page }) => {
  await page.goto('/');
  await waitForCatalog(page);

  expect(await wcagViolations(page)).toEqual([]);

  await page.locator('.platform-card').filter({ hasText: 'OpenAI / ChatGPT' }).first().click();
  await expect(page.locator('#resourcesSection')).toHaveClass(/show/);
  expect(await wcagViolations(page)).toEqual([]);
});

test('Arabic RTL state has no WCAG A/AA violations', async ({ page }) => {
  await page.goto('/');
  await waitForCatalog(page);
  await page.locator('#languageBtn').click();
  await page.locator('.language-option[data-lang="ar"]').click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  expect(await wcagViolations(page)).toEqual([]);
});

test('critical render path stays intentionally lean', async ({ page }) => {
  await page.goto('/');
  await waitForCatalog(page);

  const audit = await page.evaluate(() => {
    const resourceNames = performance.getEntriesByType('resource').map(entry => entry.name);
    return {
      blockingScripts: document.querySelectorAll('script[src]:not([defer]):not([async])').length,
      legacyCss: resourceNames.filter(url => /components\.css|bootstrap|fonts\.googleapis|fonts\.gstatic/i.test(url)),
      heroImages: document.querySelectorAll('.hero-section img').length,
      localStylesheets: [...document.querySelectorAll('link[rel="stylesheet"]')]
        .map(link => link.getAttribute('href'))
        .filter(href => href && !/^https?:/.test(href)),
      domReady: performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd || 0
    };
  });

  expect(audit.blockingScripts).toBe(0);
  expect(audit.legacyCss).toEqual([]);
  expect(audit.heroImages).toBe(0);
  expect(audit.localStylesheets).toEqual(expect.arrayContaining([
    expect.stringContaining('css/professional.css'),
    expect.stringContaining('css/a11y.css')
  ]));
  expect(audit.domReady).toBeLessThan(5000);
});
