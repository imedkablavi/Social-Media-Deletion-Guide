const { test, expect } = require('@playwright/test');

async function waitForCatalog(page) {
  await expect.poll(() => page.locator('.platform-card').count()).toBeGreaterThan(50);
}

async function chooseLanguage(page, lang) {
  const button = page.locator('#languageBtn');
  await button.click();
  await page.locator(`.language-option[data-lang="${lang}"]`).click();
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
}

async function resetDirectory(page) {
  if (await page.locator('#resetBtn').isVisible()) await page.locator('#resetBtn').click();
  await expect.poll(() => page.locator('.platform-card').count()).toBeGreaterThan(50);
}

test('Arabic homepage and dynamic resources do not leak English UI text', async ({ page }) => {
  await page.goto('/');
  await waitForCatalog(page);
  await chooseLanguage(page, 'ar');

  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('#searchInput')).toHaveAttribute('aria-label', 'البحث في الخدمات والمصادر');
  await expect(page.locator('.supported-services')).toContainText('وغيرها');
  await expect(page.locator('.supported-services')).not.toContainText('and more');
  await expect(page.locator('#service-guide-index')).toHaveText('أدلة حذف الحسابات لكل خدمة');
  await expect(page.locator('#service-guide-index + p')).toContainText('متاحة باللغات');

  await page.locator('.platform-card').filter({ hasText: 'OpenAI / ChatGPT' }).first().click();
  await expect(page.locator('.resource-note').first()).toContainText('حذف حساب ChatGPT نهائي');
  await expect(page.locator('.resource-note').first()).not.toContainText('account deletion is permanent');

  await resetDirectory(page);
  await page.locator('.platform-card').filter({ hasText: 'Google Gemini' }).first().click();
  await expect(page.locator('.scope-warning')).toContainText('الحساب بالكامل: حساب Google');
  await expect(page.locator('.scope-warning')).not.toContainText('google account');
});

test('French AI notes and homepage tail are localized', async ({ page }) => {
  await page.goto('/');
  await waitForCatalog(page);
  await chooseLanguage(page, 'fr');

  await expect(page.locator('.supported-services')).toContainText('et d’autres');
  await expect(page.locator('.supported-services')).not.toContainText('and more');
  await page.locator('.platform-card').filter({ hasText: 'OpenAI / ChatGPT' }).first().click();
  await expect(page.locator('.resource-note').first()).toContainText('suppression du compte ChatGPT');
  await expect(page.locator('.resource-note').first()).not.toContainText('account deletion is permanent');
});

test('Turkish legacy resource titles are real translations, not English fallbacks', async ({ page }) => {
  await page.goto('/');
  await waitForCatalog(page);
  await chooseLanguage(page, 'tr');

  await page.locator('.platform-card').filter({ hasText: 'Facebook' }).first().click();
  const titles = page.locator('.resource-title');
  await expect(titles.filter({ hasText: 'Facebook hesabını kalıcı olarak sil' })).toBeVisible();
  await expect(titles.filter({ hasText: 'How to permanently delete Facebook account' })).toHaveCount(0);
  await expect(page.locator('.supported-services')).toContainText('ve daha fazlası');
});

test('generated localized SEO pages preserve language-specific content', async ({ page }) => {
  await page.goto('/ar/services/openai/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('.note')).toContainText('حذف حساب ChatGPT نهائي');
  await expect(page.locator('.note')).not.toContainText('account deletion is permanent');
  await expect(page.locator('.breadcrumbs')).toHaveAttribute('aria-label', 'مسار التنقل');

  await page.goto('/tr/services/facebook/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
  await expect(page.locator('.resource-card')).toContainText('Facebook hesabını kalıcı olarak sil');
  await expect(page.locator('body')).not.toContainText('How to permanently delete Facebook account');

  await page.goto('/fr/services/');
  await expect(page.locator('.language-links')).toHaveAttribute('aria-label', 'Langues');
  await expect(page.locator('footer')).toContainText('services');

  await page.goto('/ar/services/');
  await expect(page.locator('.language-links')).toHaveAttribute('aria-label', 'اللغات');
  await expect(page.locator('footer')).toContainText('خدمة');
  await expect(page.locator('footer')).not.toContainText('services');
});
