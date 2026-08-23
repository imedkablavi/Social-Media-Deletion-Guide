# Contributing

Thanks for helping keep the Account Deletion & Privacy Guide accurate.

## What belongs in this repository

Good contributions include:

- new account-deletion or privacy resources from first-party providers
- corrections for moved or misleading links
- clearer separation between account deletion, deactivation, subscription cancellation, history deletion, and data export
- accessibility, responsive-layout, localization, SEO, and performance improvements
- tests and maintenance automation

## Trust model for service links

The project treats three questions separately:

1. **Provenance** — is the destination owned by the provider?
2. **Manual freshness** — when was the exact effective URL and action label last reviewed by a person?
3. **Automated reachability** — what did the latest HTTP check observe?

A successful HTTP response does **not** prove that a URL deletes an account, and automated checks never update a manual `verified` date.

Use these states conservatively:

- `official: true` only when first-party provenance is confirmed.
- `verified: YYYY-MM-DD` only after reviewing the exact effective URL and confirming that its label accurately describes the provider action.
- no `verified` value when that evidence is unavailable; do not invent a review date to make the catalog look fresh.
- `auth-required`, `bot-blocked`, `transient`, and `dead` are reachability observations. They are not interchangeable.

Freshness thresholds are maintained in `data/freshness-policy.json`. Expected automation behavior for narrow account portals or known bot-blocked routes is maintained in `data/link-policy.json`.

## Source quality rules

1. Prefer the provider's own help center, account settings, privacy portal, legal privacy page, or official product documentation.
2. Do not add third-party "how to delete" blogs when an official destination exists.
3. **Never guess or construct a deletion URL.** If the provider only exposes deletion after sign-in, link the real provider account/help route and mark the access requirement.
4. Never label subscription cancellation as account deletion.
5. Distinguish reversible deactivation from permanent deletion.
6. For ecosystem products such as Gemini or Copilot, state clearly when an action affects the entire Google or Microsoft account.
7. Set `official: true` only for first-party destinations whose provenance you can explain.
8. Add or update `verified` only after manually reviewing the exact effective resource URL and its action label.
9. Document region, account-state, waiting-period, or parent-account caveats when they materially change what the action does.

## Structured service-link workflow

For a new resource, replacement URL, or freshness review, prefer the **Service link update or verification** issue form. It asks for:

- service and action type
- current and candidate URLs
- first-party provenance
- manual review date
- authentication/bot behavior
- evidence about what the provider page actually does
- region or destructive-scope caveats

Pull requests that change catalog resources must complete the resource-evidence section in `.github/pull_request_template.md`.

## Adding a platform

New maintained entries should usually go in `js/catalog-updates.js` or, for AI products, `js/ai-catalog.js`.

A platform entry should include:

```js
{
  id: 'service-id',
  name: 'service-id',
  displayName: 'Service Name',
  icon: 'fas fa-link',
  color: '#000000',
  category: 'service',
  difficulty: 'easy',
  loginRequired: true,
  note: 'Short, factual caveat if needed.',
  resources: []
}
```

A maintained resource should normally look like:

```js
{
  url: 'https://provider.example/help/delete-account',
  title: {
    en: 'Delete account',
    ar: 'حذف الحساب',
    fr: 'Supprimer le compte',
    tr: 'Hesabı sil'
  },
  type: 'delete',
  official: true,
  verified: '2026-08-24'
}
```

Use `easy`, `medium`, or `hard` for `difficulty`. This is a usability signal, not a judgment of the company.

## Resource types

Use the narrowest accurate type:

- `delete` — permanent account deletion
- `disable` — reversible deactivation or cancellation; clarify which one in the title
- `activity` — AI/chat/activity history deletion
- `backup` — export or portability
- `privacy` — privacy controls or privacy portal
- `security` — recovery/authentication/security
- `settings` — general account settings
- `manage` — other account management

## Link-state classification

The scheduled resource audit deliberately distinguishes:

- `live` — successful public response
- `auth-required` — an account route or response requiring authentication
- `bot-blocked` — automated clients are blocked or rate-limited; manual/browser verification may still be required
- `method-restricted` — the endpoint rejects the audit request method
- `transient` — timeout, network failure, or temporary 5xx condition
- `dead` — confirmed terminal missing response such as 404/410 outside a narrowly documented bot-block policy

Do not add broad exclusions simply to make CI green. Update `data/link-policy.json` only when the behavior is narrow, explainable, and supported by manual evidence.

## Local validation

Build the production site:

```bash
npm run build
```

Run static validation:

```bash
python scripts/validate.py
```

Audit provenance/freshness metadata without making network requests:

```bash
node scripts/audit-resources.js --strict-metadata
```

Run the live reachability audit when network access is appropriate:

```bash
node scripts/audit-resources.js --online
```

Run browser/accessibility QA:

```bash
npm install
npx playwright install chromium
npm run test:e2e
```

Run Lighthouse regression checks after a production build:

```bash
npm run test:lighthouse
```

Check JavaScript syntax:

```bash
for file in js/*.js scripts/*.js tests/*.js; do node --check "$file"; done
```

GitHub Actions runs the same quality gates and publishes stale-resource/reachability and Lighthouse artifacts.

## Pull requests

Keep PRs focused. In the description, include:

- what changed
- why the old behavior/link was wrong or incomplete
- the provider-owned source and first-party provenance used for verification
- the manual review date for changed service resources
- access behavior (`public`, `auth-required`, or known `bot-blocked`)
- screenshots for substantial visual changes

Do not include credentials, API keys, personal account data, or screenshots containing private information.
