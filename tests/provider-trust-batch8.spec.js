const { test, expect } = require('@playwright/test');

const EXPECTED = {
  linkedin: [
    ['backup', 'https://www.linkedin.com/help/linkedin/answer/a1339364', 'provider-support'],
    ['settings', 'https://www.linkedin.com/help/linkedin/answer/a1337839', 'provider-support'],
    ['security', 'https://www.linkedin.com/help/linkedin/answer/a1375084', 'provider-support']
  ],
  github: [
    ['security', 'https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication', 'provider-documentation'],
    ['settings', 'https://docs.github.com/en/account-and-profile/how-tos/account-settings', 'provider-documentation']
  ],
  adobe: [
    ['security', 'https://helpx.adobe.com/account/individual/sign-in-and-security/security-and-recovery/set-up-two-step-verification.html', 'provider-support']
  ],
  dropbox: [
    ['security', 'https://help.dropbox.com/account-access/enable-2-factor-authentication', 'provider-support']
  ],
  twitch: [
    ['disable', 'https://help.twitch.tv/s/article/twitch-account-settings', 'provider-support'],
    ['security', 'https://help.twitch.tv/s/article/two-factor-authentication', 'provider-support']
  ],
  epicgames: [
    ['delete', 'https://www.epicgames.com/help/c-202300000001645/c-202300000001756/how-do-i-delete-my-epic-games-account-a202300000013730', 'provider-support'],
    ['security', 'https://www.epicgames.com/help/c-202300000001639/a202300000016452?lang=en-US', 'provider-support']
  ]
};

const SUPERSEDED = [
  'https://www.linkedin.com/psettings/member-data',
  'https://www.linkedin.com/psettings/',
  'https://www.linkedin.com/psettings/email',
  'https://github.com/settings/security',
  'https://github.com/settings/profile',
  'https://account.adobe.com/security',
  'https://www.dropbox.com/account/security',
  'https://www.twitch.tv/user/disable-account',
  'https://www.twitch.tv/settings/security',
  'https://www.epicgames.com/account/personal',
  'https://www.epicgames.com/account/password'
];

test('provider review batch 8 exposes only exact reviewed first-party guidance', async ({ page }) => {
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

test('batch 8 removes superseded authenticated/direct settings routes', async ({ page }) => {
  await page.goto('/');
  const urls = await page.evaluate(() => platforms.flatMap(platform => (platform.resources || []).map(resource => resource.url)));
  for (const url of SUPERSEDED) {
    expect(urls, `superseded route must be absent: ${url}`).not.toContain(url);
  }
});

test('batch 8 preserves Twitch disable scope and Epic deletion timing', async ({ page }) => {
  await page.goto('/');
  const snapshot = await page.evaluate(() => {
    const twitch = platforms.find(item => item.id === 'twitch');
    const epic = platforms.find(item => item.id === 'epicgames');
    return {
      twitch: (twitch?.resources || []).map(resource => ({ url: resource.url, type: resource.type })),
      epicNote: epic?.note?.en || ''
    };
  });

  expect(snapshot.twitch).toContainEqual({
    url: 'https://help.twitch.tv/s/article/twitch-account-settings',
    type: 'disable'
  });
  expect(snapshot.twitch).toContainEqual({
    url: 'https://help.twitch.tv/s/article/delete-twitch-account',
    type: 'delete'
  });
  expect(snapshot.epicNote).toContain('14-day');
  expect(snapshot.epicNote).toContain('30 days');
});

test('third-party helper tools are not mislabeled as provider-reviewed', async ({ page }) => {
  await page.goto('/');
  const external = await page.evaluate(() => {
    const platform = platforms.find(item => item.id === 'other');
    return (platform?.resources || []).map(resource => ({
      url: resource.url,
      official: resource.official,
      provenance: resource.provenance,
      verified: resource.verified || null
    }));
  });

  expect(external.length).toBeGreaterThanOrEqual(5);
  for (const resource of external) {
    expect(resource.official).not.toBe(true);
    expect(resource.provenance).toBe('unverified');
    expect(resource.verified).toBeNull();
  }
});
