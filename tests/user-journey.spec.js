const { test, expect } = require('@playwright/test');

function watchRuntimeErrors(page) {
  const errors = [];
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', message => {
    if (message.type() === 'error' && /(?:ReferenceError|TypeError|SyntaxError|Uncaught)/i.test(message.text())) {
      errors.push(`console: ${message.text()}`);
    }
  });
  return errors;
}

async function waitForCatalog(page) {
  await expect.poll(() => page.locator('.platform-card').count()).toBeGreaterThan(50);
}

async function chooseLanguage(page, lang) {
  const button = page.locator('#languageBtn');
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await page.locator(`.language-option[data-lang="${lang}"]`).click();
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
  await expect(button).toHaveAttribute('aria-expanded', 'false');
}

test('primary directory journey works without runtime errors', async ({ page }) => {
  const runtimeErrors = watchRuntimeErrors(page);
  await page.goto('/');

  await expect(page).toHaveTitle(/Account Deletion|Delete Accounts/);
  await expect(page.locator('h1')).toBeVisible();
  await waitForCatalog(page);

  const initialCount = await page.locator('.platform-card').count();
  expect(initialCount).toBeGreaterThan(50);
  await expect(page.locator('#platformCountHero')).not.toHaveText('0');
  await expect(page.locator('#resourceCountHero')).not.toHaveText('0');

  const search = page.locator('#searchInput');
  await search.fill('ChatGPT');
  await expect.poll(() => page.locator('.platform-card').count()).toBeGreaterThan(0);
  await expect(page.locator('.platform-card').filter({ hasText: 'OpenAI / ChatGPT' })).toBeVisible();

  await search.fill('');
  await waitForCatalog(page);
  await page.locator('[data-category-filter="ai"]').click();
  const aiCards = page.locator('.platform-card');
  await expect.poll(() => aiCards.count()).toBeGreaterThan(5);
  await expect(aiCards.filter({ hasText: 'Claude' })).toBeVisible();
  await expect(aiCards.filter({ hasText: 'Google Gemini' })).toBeVisible();

  await page.locator('[data-category-filter="all"]').click();
  await page.locator('#difficultyFilter').selectOption('hard');
  await expect.poll(() => page.locator('.platform-card').count()).toBeGreaterThan(0);
  await expect(page.locator('.platform-card .difficulty-hard').first()).toBeVisible();

  await page.locator('#difficultyFilter').selectOption('all');
  const openAI = page.locator('.platform-card').filter({ hasText: 'OpenAI / ChatGPT' }).first();
  await openAI.click();
  await expect(page.locator('#resourcesSection')).toHaveClass(/show/);
  await expect(page.locator('.resource-card')).toHaveCount(3);

  const resourceLinks = page.locator('.resource-link');
  for (let i = 0; i < await resourceLinks.count(); i++) {
    const link = resourceLinks.nth(i);
    expect(await link.getAttribute('href')).toMatch(/^https:\/\//);
    await expect(link).toHaveAttribute('target', '_blank');
    expect(await link.getAttribute('rel')).toContain('noopener');
    expect(await link.getAttribute('rel')).toContain('noreferrer');
  }

  await expect(page.locator('#resetBtn')).toBeVisible();
  await page.locator('#resetBtn').click();
  await expect(page.locator('#resourcesSection')).not.toHaveClass(/show/);
  await expect(search).toHaveValue('');
  await expect(page.locator('#difficultyFilter')).toHaveValue('all');
  await waitForCatalog(page);

  await search.fill('this-service-does-not-exist-qa');
  await expect(page.locator('#noResults')).toHaveClass(/show/);
  await expect(page.locator('.platform-card')).toHaveCount(0);
  await search.fill('');
  await waitForCatalog(page);

  await page.locator('body').click({ position: { x: 5, y: 5 } });
  await page.keyboard.press('/');
  await expect(search).toBeFocused();

  expect(runtimeErrors).toEqual([]);
});

test('language, RTL and menu accessibility work in all supported languages', async ({ page }) => {
  const runtimeErrors = watchRuntimeErrors(page);
  await page.goto('/');
  await waitForCatalog(page);

  await expect(page.locator('.language-option')).toHaveCount(4);
  for (const option of await page.locator('.language-option').all()) {
    await expect(option).toHaveJSProperty('tagName', 'BUTTON');
  }

  await chooseLanguage(page, 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('h1')).toContainText('دليل');
  await expect(page.locator('#resultCount')).toContainText('خدمة');
  await expect(page.locator('[data-category-filter="all"]')).toHaveText('الكل');

  await chooseLanguage(page, 'fr');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.locator('#findService, .directory-intro h2')).toContainText('Trouver');
  await expect(page.locator('[data-category-filter="all"]')).toHaveText('Tous');

  await chooseLanguage(page, 'tr');
  await expect(page.locator('[data-category-filter="all"]')).toHaveText('Tümü');
  await expect(page.locator('#resultCount')).toContainText('hizmet');

  await chooseLanguage(page, 'en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.locator('[data-category-filter="all"]')).toHaveText('All');

  expect(runtimeErrors).toEqual([]);
});

test('brand marks always have a usable logo or fallback', async ({ page }) => {
  const runtimeErrors = watchRuntimeErrors(page);
  await page.goto('/');
  await waitForCatalog(page);

  const cards = page.locator('.platform-card');
  const marks = page.locator('.platform-card .brand-mark-wrap');
  expect(await marks.count()).toBe(await cards.count());

  await page.locator('.brand-logo').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
  await page.waitForTimeout(1500);

  const invalid = await marks.evaluateAll(elements => elements.filter(element => {
    const image = element.querySelector('.brand-logo');
    const fallback = element.querySelector('.brand-fallback');
    if (!fallback || !fallback.textContent.trim()) return true;
    if (!image) return false;
    return image.complete && image.naturalWidth === 0 && !element.classList.contains('brand-failed');
  }).length);
  expect(invalid).toBe(0);
  expect(runtimeErrors).toEqual([]);
});

test('mobile layout has no page-level horizontal overflow', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile-only layout assertion');
  const runtimeErrors = watchRuntimeErrors(page);
  await page.goto('/');
  await waitForCatalog(page);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.locator('.site-nav')).toBeVisible();
  await expect(page.locator('#languageBtn')).toBeVisible();

  await page.locator('#searchInput').fill('Discord');
  await expect(page.locator('.platform-card').filter({ hasText: 'Discord' })).toBeVisible();
  expect(runtimeErrors).toEqual([]);
});
