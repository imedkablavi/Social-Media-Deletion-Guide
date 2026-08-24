const { test, expect } = require('@playwright/test');

const EXPECTED = {
  twitch: 'https://help.twitch.tv/s/article/delete-twitch-account',
  steam: 'https://help.steampowered.com/en/faqs/view/21A6-7C93-6CFE-100B',
  playstation: 'https://www.playstation.com/en-us/support/account/close-account/',
  notion: 'https://www.notion.com/help/delete-your-account',
  protonmail: 'https://proton.me/support/delete-account',
  stackoverflow: 'https://stackoverflow.com/help/deleting-account',
  yahoo: 'https://help.yahoo.com/kb/close-yahoo-account-sln2044.html'
};

test('provider review batch 4 exposes only evidence-backed deletion resources', async ({ page }) => {
  await page.goto('/');
  await expect.poll(() => page.locator('.platform-card').count()).toBeGreaterThan(50);

  const snapshot = await page.evaluate(ids => Object.fromEntries(ids.map(id => {
    const platform = platforms.find(item => item.id === id);
    return [id, {
      note: platform?.note?.en || '',
      resources: (platform?.resources || []).map(resource => ({
        url: resource.url,
        type: resource.type,
        official: resource.official,
        verified: resource.verified,
        evidenceSource: resource.evidenceSource,
        provenance: resource.provenance
      }))
    }];
  })), Object.keys(EXPECTED));

  for (const [id, url] of Object.entries(EXPECTED)) {
    const deletion = snapshot[id].resources.find(resource => resource.type === 'delete');
    expect(deletion, `${id} must have a deletion resource`).toBeTruthy();
    expect(deletion.url).toBe(url);
    expect(deletion.official).toBe(true);
    expect(deletion.verified).toBe('2026-08-24');
    expect(deletion.evidenceSource).toBe('provider-support');
    expect(deletion.provenance).toBe('provider-reviewed');
  }

  // Scope regressions that would be materially misleading to users.
  expect(snapshot.steam.note).toContain('30 days');
  expect(snapshot.stackoverflow.note).toContain('anonymized');
  expect(snapshot.protonmail.note).toContain('Proton Mail, Calendar, VPN, Pass, Drive and other Proton services');
  expect(snapshot.yahoo.note).toContain('region-dependent');
});

test('later reviews cannot turn unrelated resource types into evidence-free verified entries', async ({ page }) => {
  await page.goto('/');
  const state = await page.evaluate(ids => Object.fromEntries(ids.map(id => {
    const platform = platforms.find(item => item.id === id);
    return [id, (platform?.resources || []).filter(resource => resource.type !== 'delete').map(resource => ({
      url: resource.url,
      type: resource.type,
      official: resource.official,
      verified: resource.verified || null,
      evidenceSource: resource.evidenceSource || null,
      provenance: resource.provenance
    }))];
  })), Object.keys(EXPECTED));

  // Batch 4 originally left secondary resources unverified. Later batches may review
  // those exact resources independently, but a dated resource must then carry explicit
  // first-party evidence metadata. Anything without a review date must remain unverified.
  for (const [id, resources] of Object.entries(state)) {
    for (const resource of resources) {
      if (resource.verified) {
        expect(resource.official, `${id} ${resource.url} must be explicitly first-party`).toBe(true);
        expect(resource.evidenceSource, `${id} ${resource.url} must carry review evidence`).toBeTruthy();
        expect(resource.provenance, `${id} ${resource.url} must have reviewed provenance`).toBe('provider-reviewed');
      } else {
        expect(resource.provenance, `${id} ${resource.url} must remain unverified without a review date`).toBe('unverified');
      }
    }
  }
});
