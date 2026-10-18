const { test, expect } = require('@playwright/test');

const EXPECTED = {
  facebook: [
    ['disable', 'https://www.facebook.com/help/173842726002516/list/'],
    ['security', 'https://www.facebook.com/help/1216349518398524/'],
    ['settings', 'https://www.facebook.com/help/193677450678703/']
  ],
  steam: [
    ['security', 'https://help.steampowered.com/en/faqs/view/6891-E071-C9D9-0134']
  ],
  quora: [
    ['delete', 'https://help.quora.com/hc/en-us/articles/115004250866-How-do-I-delete-my-Quora-account-'],
    ['backup', 'https://help.quora.com/hc/en-us/articles/360000839503-Can-I-get-a-copy-of-my-data']
  ],
  medium: [
    ['delete', 'https://help.medium.com/hc/en-us/articles/115004914748-Delete-or-deactivate-your-account'],
    ['backup', 'https://help.medium.com/hc/en-us/articles/115004745787-Export-your-account-data']
  ]
};

const MUST_REMAIN_UNVERIFIED = {
  facebook: ['https://www.facebook.com/dyi'],
  steam: ['https://help.steampowered.com/en/accountdata'],
  quora: ['https://www.quora.com/settings']
};

test('provider review batch 9 exposes eight exact reviewed first-party resources', async ({ page }) => {
  await page.goto('/');
  await expect.poll(() => page.locator('.platform-card').count()).toBeGreaterThan(50);

  const state = await page.evaluate(ids => Object.fromEntries(ids.map(id => {
    const platform = platforms.find(item => item.id === id);
    return [id, (platform?.resources || []).map(resource => ({
      url: resource.url,
      type: resource.type,
      official: resource.official,
      verified: resource.verified || null,
      evidenceSource: resource.evidenceSource || null,
      provenance: resource.provenance,
      freshness: resource.freshness
    }))];
  })), Object.keys(EXPECTED));

  for (const [id, expectedResources] of Object.entries(EXPECTED)) {
    for (const [type, url] of expectedResources) {
      const resource = state[id].find(item => item.type === type && item.url === url);
      expect(resource, `${id}/${type} must expose ${url}`).toBeTruthy();
      expect(resource.official).toBe(true);
      expect(resource.verified).toBe('2026-08-24');
      expect(resource.evidenceSource).toBe('provider-support');
      expect(resource.provenance).toBe('provider-reviewed');
      expect(resource.freshness).toBe('dated-review');
    }
  }
});

test('batch 9 does not blanket-verify still-authenticated or unreviewed routes', async ({ page }) => {
  await page.goto('/');
  const state = await page.evaluate(ids => Object.fromEntries(ids.map(id => {
    const platform = platforms.find(item => item.id === id);
    return [id, (platform?.resources || []).map(resource => ({
      url: resource.url,
      official: resource.official,
      verified: resource.verified || null,
      provenance: resource.provenance
    }))];
  })), Object.keys(MUST_REMAIN_UNVERIFIED));

  for (const [id, urls] of Object.entries(MUST_REMAIN_UNVERIFIED)) {
    for (const url of urls) {
      const resource = state[id].find(item => item.url === url);
      expect(resource, `${id} should retain ${url}`).toBeTruthy();
      expect(resource.official).not.toBe(true);
      expect(resource.verified).toBeNull();
      expect(resource.provenance).toBe('unverified');
    }
  }
});

test('batch 9 keeps duplicate legacy slots separated by resource type', async ({ page }) => {
  await page.goto('/');
  const state = await page.evaluate(() => Object.fromEntries(['quora', 'medium'].map(id => {
    const platform = platforms.find(item => item.id === id);
    return [id, (platform?.resources || []).map(resource => ({ type: resource.type, url: resource.url }))];
  })));

  expect(state.quora.filter(item => item.type === 'delete')).toHaveLength(1);
  expect(state.quora.filter(item => item.type === 'backup')).toHaveLength(1);
  expect(state.medium.filter(item => item.type === 'delete')).toHaveLength(1);
  expect(state.medium.filter(item => item.type === 'backup')).toHaveLength(1);
  expect(state.quora.find(item => item.type === 'delete').url).not.toBe(state.quora.find(item => item.type === 'backup').url);
  expect(state.medium.find(item => item.type === 'delete').url).not.toBe(state.medium.find(item => item.type === 'backup').url);
});

test('batch 9 preserves documented deletion and export semantics', async ({ page }) => {
  await page.goto('/');
  const notes = await page.evaluate(() => Object.fromEntries(['quora', 'medium'].map(id => {
    const platform = platforms.find(item => item.id === id);
    return [id, platform?.note?.en || ''];
  })));

  expect(notes.quora).toContain('14-day');
  expect(notes.quora).toContain('Community-owned questions');
  expect(notes.medium).toContain('ZIP archive');
  expect(notes.medium).toContain('reversible account deactivation');
});
