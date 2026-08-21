# Contributing

Thanks for helping keep the Account Deletion & Privacy Guide accurate.

## What belongs in this repository

Good contributions include:

- new account-deletion or privacy resources from first-party providers
- corrections for moved or misleading links
- clearer separation between account deletion, deactivation, subscription cancellation, history deletion, and data export
- accessibility, responsive-layout, localization, and performance improvements
- tests and maintenance automation

## Source quality rules

1. Prefer the provider's own help center, account settings, privacy portal, or legal privacy page.
2. Do not add third-party "how to delete" blogs when an official destination exists.
3. Never label subscription cancellation as account deletion.
4. For ecosystem products such as Gemini or Copilot, state clearly when an action affects the entire Google or Microsoft account.
5. Set `official: true` only for first-party destinations.
6. Add or update the `verified` date after manually reviewing the resource.

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

Use `easy`, `medium`, or `hard` for `difficulty`. This is a usability signal, not a judgment of the company.

## Resource types

Use the narrowest accurate type:

- `delete` — permanent account deletion
- `disable` — reversible deactivation or cancellation
- `activity` — AI/chat/activity history deletion
- `backup` — export or portability
- `privacy` — privacy controls or privacy portal
- `security` — recovery/authentication/security
- `settings` — general account settings
- `manage` — other account management

## Local validation

Serve the project locally:

```bash
python -m http.server 8000
```

Run static validation:

```bash
python scripts/validate.py
```

Check JavaScript syntax:

```bash
for file in js/*.js; do node --check "$file"; done
```

GitHub Actions runs the same quality checks and also checks external links.

## Pull requests

Keep PRs focused. In the description, include:

- what changed
- why the old behavior/link was wrong or incomplete
- the official source used for verification
- screenshots for substantial visual changes

Do not include credentials, API keys, personal account data, or screenshots containing private information.
