const { test, expect } = require('@playwright/test');

const REVIEWED = ['spotify', 'apple', 'adobe', 'dropbox', 'ebay', 'slack', 'zoom'];

test('provider review batch 3 preserves deletion scope and evidence metadata', async ({ page }) => {
  await page.goto('/');
  await expect.poll(() => page.locator('.platform-card').count()).toBeGreaterThan(50);

  const snapshot = await page.evaluate(ids => {
    return Object.fromEntries(ids.map(id => {
      const platform = platforms.find(item => item.id === id);
      return [id, (platform?.resources || []).map(resource => ({
        url: resource.url,
        type: resource.type,
        official: resource.official,
        verified: resource.verified,
        evidenceSource: resource.evidenceSource
      }))];
    }));
  }, REVIEWED);

  for (const id of REVIEWED) {
    const reviewedResource = snapshot[id].find(resource => resource.verified === '2026-08-24');
    expect(reviewedResource, `${id} must expose a manually reviewed resource`).toBeTruthy();
    expect(reviewedResource.official).toBe(true);
    expect(reviewedResource.evidenceSource).toBeTruthy();
  }

  expect(snapshot.spotify.some(resource => resource.type === 'delete' && resource.url.includes('support.spotify.com/'))).toBe(true);
  expect(snapshot.apple.some(resource => resource.type === 'delete' && resource.url === 'https://privacy.apple.com/')).toBe(true);
  expect(snapshot.adobe.some(resource => resource.type === 'delete' && resource.url.includes('delete-adobe-account.html'))).toBe(true);
  expect(snapshot.dropbox.some(resource => resource.type === 'delete' && resource.url === 'https://help.dropbox.com/account-access/delete-account')).toBe(true);

  expect(snapshot.ebay.some(resource => resource.type === 'delete' && resource.url.endsWith('closing-account?id=4199'))).toBe(true);
  expect(snapshot.ebay.some(resource => resource.url.includes('id=4190'))).toBe(false);

  // Slack documents workspace deactivation plus separate profile-information deletion.
  // Never regress this provider action back into a permanent account-deletion label.
  expect(snapshot.slack.some(resource => resource.type === 'delete')).toBe(false);
  expect(snapshot.slack.some(resource => resource.type === 'disable' && resource.url.includes('203953146-Deactivate-your-Slack-account'))).toBe(true);

  expect(snapshot.zoom.some(resource => resource.type === 'delete' && resource.url.includes('KB0067341'))).toBe(true);
});

test('Netflix keeps membership cancellation separate from permanent account deletion', async ({ page }) => {
  await page.goto('/');
  const resources = await page.evaluate(() => platforms.find(item => item.id === 'netflix').resources.map(resource => ({ url: resource.url, type: resource.type })));

  expect(resources).toContainEqual({ url: 'https://help.netflix.com/en/node/126558', type: 'delete' });
  expect(resources).toContainEqual({ url: 'https://www.netflix.com/cancelplan', type: 'disable' });
});
