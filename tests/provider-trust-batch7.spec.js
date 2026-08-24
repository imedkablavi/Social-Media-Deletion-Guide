const { test, expect } = require('@playwright/test');

const EXPECTED = {
  reddit: [
    ['backup', 'https://support.reddithelp.com/hc/en-us/articles/360043048352-How-do-I-request-a-copy-of-my-Reddit-data-and-information', 'provider-support'],
    ['settings', 'https://support.reddithelp.com/hc/en-us/articles/360043047952-How-can-I-control-how-Reddit-uses-my-information', 'provider-support'],
    ['manage', 'https://support.reddithelp.com/hc/en-us/articles/360043483511-Where-and-how-can-I-access-my-Reddit-data-and-information', 'provider-support']
  ],
  pinterest: [
    ['backup', 'https://help.pinterest.com/en/article/download-your-pinterest-data', 'provider-support'],
    ['settings', 'https://help.pinterest.com/en/article/your-privacy-and-data-settings', 'provider-support']
  ],
  spotify: [
    ['backup', 'https://support.spotify.com/us/article/data-rights-and-privacy-settings/', 'provider-support'],
    ['security', 'https://support.spotify.com/us/article/protect-your-account/', 'provider-support']
  ],
  yahoo: [
    ['backup', 'https://legal.yahoo.com/xw/en/yahoo/privacy/dashboard/index.html', 'provider-privacy-portal']
  ],
  zoom: [
    ['backup', 'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0057736', 'provider-support'],
    ['security', 'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0061483', 'provider-support']
  ]
};

const SUPERSEDED = [
  'https://www.reddit.com/settings/data-request',
  'https://www.reddit.com/settings/privacy',
  'https://www.reddit.com/settings/',
  'https://www.pinterest.com/settings/privacy-and-data',
  'https://www.pinterest.com/settings/account-settings',
  'https://www.spotify.com/account/privacy/',
  'https://www.spotify.com/account/change-password/',
  'https://support.zoom.us/hc/en-us/articles/201363003',
  'https://zoom.us/profile/password'
];

test('provider review batch 7 exposes exact reviewed public privacy resources', async ({ page }) => {
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
    for (const [type, url, evidenceSource] of expectedResources) {
      const resource = state[id].find(item => item.url === url);
      expect(resource, `${id} must expose ${url}`).toBeTruthy();
      expect(resource.type).toBe(type);
      expect(resource.official).toBe(true);
      expect(resource.verified).toBe('2026-08-24');
      expect(resource.evidenceSource).toBe(evidenceSource);
      expect(resource.provenance).toBe('provider-reviewed');
      expect(resource.freshness).toBe('dated-review');
    }
  }
});

test('batch 7 removes superseded direct-setting and semantically wrong routes', async ({ page }) => {
  await page.goto('/');
  const urls = await page.evaluate(() => platforms.flatMap(platform => (platform.resources || []).map(resource => resource.url)));

  for (const url of SUPERSEDED) {
    expect(urls, `superseded route must be absent: ${url}`).not.toContain(url);
  }
});

test('batch 7 keeps Zoom export and password guidance in separate scopes', async ({ page }) => {
  await page.goto('/');
  const zoom = await page.evaluate(() => {
    const platform = platforms.find(item => item.id === 'zoom');
    return (platform?.resources || []).map(resource => ({ url: resource.url, type: resource.type }));
  });

  expect(zoom).toContainEqual({
    url: 'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0057736',
    type: 'backup'
  });
  expect(zoom).toContainEqual({
    url: 'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0061483',
    type: 'security'
  });
});
