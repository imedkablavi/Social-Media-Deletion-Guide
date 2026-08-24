const { test, expect } = require('@playwright/test');

const REVIEWED = {
  discord: ['https://support.discord.com/hc/en-us/articles/360004027692-Requesting-a-Copy-of-your-Data'],
  slack: ['https://slack.com/help/articles/201658943-Export-your-workspace-data'],
  ebay: [
    'https://www.ebay.com/help/requesting-personal-data/account/requesting-personal-data?id=5089',
    'https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872'
  ],
  playstation: [
    'https://www.playstation.com/en-us/support/account/data-request/',
    'https://www.playstation.com/en-us/support/account/security-best-practice/'
  ],
  notion: ['https://www.notion.com/help/export-your-content'],
  protonmail: ['https://proton.me/support/proton-mail-export-tool'],
  stackoverflow: ['https://policies.stackoverflow.co/data-request/'],
  telegram: ['https://telegram.org/faq#q-my-phone-was-stolen-what-do-i-do']
};

async function snapshot(page, ids) {
  await page.goto('/');
  await expect.poll(() => page.locator('.platform-card').count()).toBeGreaterThan(50);
  return page.evaluate(platformIds => Object.fromEntries(platformIds.map(id => {
    const platform = platforms.find(item => item.id === id);
    return [id, (platform?.resources || []).map(resource => ({
      url: resource.url,
      type: resource.type,
      title: resource.title?.en || '',
      official: resource.official,
      verified: resource.verified || null,
      evidenceSource: resource.evidenceSource || null,
      provenance: resource.provenance,
      freshness: resource.freshness
    }))];
  })), ids);
}

test('provider review batch 6 marks only exact public provider resources reviewed', async ({ page }) => {
  const state = await snapshot(page, Object.keys(REVIEWED));

  for (const [id, urls] of Object.entries(REVIEWED)) {
    for (const url of urls) {
      const resource = state[id].find(item => item.url === url);
      expect(resource, `${id} must expose ${url}`).toBeTruthy();
      expect(resource.official).toBe(true);
      expect(resource.verified).toBe('2026-08-24');
      expect(resource.evidenceSource).toBe('provider-support');
      expect(resource.provenance).toBe('provider-reviewed');
      expect(resource.freshness).toBe('dated-review');
    }
  }
});

test('batch 6 replaces superseded or overly broad public resource routes', async ({ page }) => {
  const state = await snapshot(page, ['discord', 'ebay', 'protonmail', 'stackoverflow', 'telegram']);
  const urls = Object.values(state).flatMap(resources => resources.map(resource => resource.url));

  expect(urls).not.toContain('https://support.discord.com/hc/en-us/articles/360004957991-Requesting-a-Copy-of-your-Data');
  expect(urls).not.toContain('https://www.ebay.com/help/account/requesting-personal-data/requesting-personal-data?id=5089');
  expect(urls).not.toContain('https://www.ebay.com/help/account/protecting-account/keeping-your-account-secure?id=4191');
  expect(urls).not.toContain('https://proton.me/support/account/migrate');
  expect(urls).not.toContain('https://stackoverflow.com/legal/gdpr/request');
  expect(urls).not.toContain('https://telegram.org/faq#q-how-do-i-log-out');

  expect(state.protonmail.find(resource => resource.url.includes('proton-mail-export-tool')).type).toBe('backup');
  expect(state.telegram.find(resource => resource.url.includes('q-my-phone-was-stolen')).type).toBe('security');
});

test('batch 6 leaves authenticated settings resources unverified', async ({ page }) => {
  const state = await snapshot(page, ['discord', 'slack', 'telegram']);

  const discordSettings = state.discord.filter(resource => resource.url.startsWith('https://discord.com/settings/'));
  expect(discordSettings.length).toBeGreaterThan(0);
  for (const resource of discordSettings) {
    expect(resource.verified).toBeNull();
    expect(resource.provenance).toBe('unverified');
  }

  const slackSettings = state.slack.find(resource => resource.url === 'https://my.slack.com/account/settings');
  expect(slackSettings.verified).toBeNull();
  expect(slackSettings.provenance).toBe('unverified');

  const telegramPortal = state.telegram.find(resource => resource.url === 'https://my.telegram.org/');
  expect(telegramPortal.verified).toBeNull();
  expect(telegramPortal.provenance).toBe('unverified');
});
