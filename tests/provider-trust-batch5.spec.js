const { test, expect } = require('@playwright/test');

const REVIEWED = {
  google: [
    'https://takeout.google.com/',
    'https://myaccount.google.com/',
    'https://support.google.com/accounts/answer/6294825',
    'https://support.google.com/youtube/answer/55759'
  ],
  whatsapp: [
    'https://faq.whatsapp.com/1180414079177245',
    'https://faq.whatsapp.com/1131652977717250',
    'https://faq.whatsapp.com/3307102709559968'
  ],
  snapchat: [
    'https://help.snapchat.com/hc/en-us/articles/7012305371156-How-do-I-download-my-data-from-Snapchat',
    'https://help.snapchat.com/hc/en-us/articles/7012305621908-My-account-is-compromised',
    'https://accounts.snapchat.com/'
  ],
  tiktok: [
    'https://support.tiktok.com/en/account-and-privacy/personalized-ads-and-data/requesting-your-data',
    'https://support.tiktok.com/en/safety-hc/account-and-user-safety/account-safety',
    'https://support.tiktok.com/en/privacy-safety/account-privacy-settings'
  ],
  microsoft: [
    'https://account.microsoft.com/privacy/download-data',
    'https://account.live.com/acsr',
    'https://account.microsoft.com/privacy'
  ],
  amazon: ['https://pay.amazon.com/help/201754750']
};

async function catalogSnapshot(page, ids) {
  await page.goto('/');
  await expect.poll(() => page.locator('.platform-card').count()).toBeGreaterThan(50);
  return page.evaluate(platformIds => Object.fromEntries(platformIds.map(id => {
    const platform = platforms.find(item => item.id === id);
    return [id, {
      note: platform?.note?.en || '',
      resources: (platform?.resources || []).map(resource => ({
        url: resource.url,
        type: resource.type,
        title: resource.title?.en || '',
        official: resource.official,
        verified: resource.verified || null,
        evidenceSource: resource.evidenceSource || null,
        provenance: resource.provenance
      }))
    }];
  })), ids);
}

test('provider review batch 5 exposes exact reviewed provider resources', async ({ page }) => {
  const snapshot = await catalogSnapshot(page, Object.keys(REVIEWED));

  for (const [id, urls] of Object.entries(REVIEWED)) {
    for (const url of urls) {
      const resource = snapshot[id].resources.find(item => item.url === url);
      expect(resource, `${id} must expose ${url}`).toBeTruthy();
      expect(resource.official, `${url} must be provider-reviewed`).toBe(true);
      expect(resource.verified).toBe('2026-08-24');
      expect(resource.evidenceSource).toBeTruthy();
      expect(resource.provenance).toBe('provider-reviewed');
    }
  }

  expect(snapshot.google.note).toContain('does not delete the parent Google Account');
  expect(snapshot.tiktok.note).toContain('two-step verification');
  expect(snapshot.microsoft.note).toContain('requires sign-in');
});

test('batch 5 removes stale or semantically wrong provider routes', async ({ page }) => {
  const snapshot = await catalogSnapshot(page, ['google', 'whatsapp', 'snapchat', 'tiktok']);
  const urls = Object.values(snapshot).flatMap(platform => platform.resources.map(resource => resource.url));

  expect(urls).not.toContain('https://support.google.com/youtube/answer/55770');
  expect(urls).not.toContain('https://faq.whatsapp.com/539178204879377');
  expect(urls).not.toContain('https://faq.whatsapp.com/1061611991749160');
  expect(urls).not.toContain('https://support.snapchat.com/en-US/a/download-my-data');
  expect(urls).not.toContain('https://support.snapchat.com/en-US/a/hacked-howto');
  expect(urls).not.toContain('https://support.tiktok.com/en/safety-hc/account-and-user-safety');

  const youtubeChannel = snapshot.google.resources.find(resource => resource.url.endsWith('/55759'));
  expect(youtubeChannel.type).toBe('delete');
  expect(youtubeChannel.title).toContain('YouTube channel');

  const whatsappPrivacy = snapshot.whatsapp.resources.find(resource => resource.url.endsWith('/3307102709559968'));
  expect(whatsappPrivacy.type).toBe('settings');
  expect(whatsappPrivacy.title).toContain('privacy settings');
});

test('batch 5 keeps blocked or unaudited scopes unverified unless a later review has evidence', async ({ page }) => {
  const snapshot = await catalogSnapshot(page, ['facebook', 'amazon']);

  const facebookSecondaries = snapshot.facebook.resources.filter(resource => resource.type !== 'delete');
  expect(facebookSecondaries.length).toBeGreaterThan(0);
  for (const resource of facebookSecondaries) {
    if (resource.verified) {
      expect(resource.verified).toBe('2026-08-24');
      expect(resource.official).toBe(true);
      expect(resource.evidenceSource).toBeTruthy();
      expect(resource.provenance).toBe('provider-reviewed');
    } else {
      expect(resource.provenance).toBe('unverified');
    }
  }

  const facebookBackup = snapshot.facebook.resources.find(resource => resource.url === 'https://www.facebook.com/dyi');
  expect(facebookBackup).toBeTruthy();
  expect(facebookBackup.verified).toBeNull();
  expect(facebookBackup.provenance).toBe('unverified');

  const amazonDelete = snapshot.amazon.resources.find(resource => resource.type === 'delete');
  const amazonBackup = snapshot.amazon.resources.find(resource => resource.type === 'backup');
  const amazonSecurity = snapshot.amazon.resources.find(resource => resource.url === 'https://pay.amazon.com/help/201754750');

  expect(amazonDelete.verified).toBeNull();
  expect(amazonDelete.provenance).toBe('unverified');
  expect(amazonBackup.verified).toBeNull();
  expect(amazonBackup.provenance).toBe('unverified');
  expect(amazonSecurity.verified).toBe('2026-08-24');
  expect(amazonSecurity.provenance).toBe('provider-reviewed');
});
