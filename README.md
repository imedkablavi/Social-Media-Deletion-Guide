<div align="center">

# Account Deletion & Privacy Guide

**Find the right first-party path to delete an account, export your data, manage privacy, or remove AI activity - in English, Arabic, French, and Turkish.**

[![Quality](https://img.shields.io/github/actions/workflow/status/imedkablavi/Social-Media-Deletion-Guide/quality.yml?label=quality)](https://github.com/imedkablavi/Social-Media-Deletion-Guide/actions/workflows/quality.yml)
[![Resource audit](https://img.shields.io/github/actions/workflow/status/imedkablavi/Social-Media-Deletion-Guide/link-check.yml?label=resource%20audit)](https://github.com/imedkablavi/Social-Media-Deletion-Guide/actions/workflows/link-check.yml)
[![Browser QA](https://img.shields.io/github/actions/workflow/status/imedkablavi/Social-Media-Deletion-Guide/e2e.yml?label=browser%20QA)](https://github.com/imedkablavi/Social-Media-Deletion-Guide/actions/workflows/e2e.yml)
[![Pages](https://img.shields.io/github/actions/workflow/status/imedkablavi/Social-Media-Deletion-Guide/static.yml?label=pages)](https://github.com/imedkablavi/Social-Media-Deletion-Guide/actions/workflows/static.yml)
[![License](https://img.shields.io/badge/license-MIT-0f172a)](LICENSE)

[**Try the live guide**](https://imedkablavi.github.io/Social-Media-Deletion-Guide/) · [**Report or update a service link**](https://github.com/imedkablavi/Social-Media-Deletion-Guide/issues/new?template=service-link-update.yml) · [Contribute](CONTRIBUTING.md) · [Security](SECURITY.md)

If this directory saves you time, consider starring the repository so more people can find it.

</div>

---

## Why this project exists

Deleting an online account is often harder than creating one. Providers may place deletion behind authenticated settings, privacy portals, subscription controls, mobile-only flows, or support documentation. AI products add another layer: deleting a conversation, deleting AI activity, and deleting the parent account can be three different actions.

This project keeps those actions separate and prefers first-party provider destinations when they can be supported by evidence.

## What you can do with it

- Find account deletion and deactivation paths.
- Find data export and portability controls.
- Find privacy, security, session, and recovery controls.
- Find AI history/activity controls without confusing them with parent-account deletion.
- Search by service name, category, or resource title.
- Filter by category and deletion difficulty.
- Use the directory in English, Arabic, French, or Turkish; Arabic has RTL support.
- Open crawlable service guides that work without depending on client-side JavaScript.

The catalog covers 60+ services across social media, messaging, AI, developer tools, productivity, cloud, streaming, gaming, marketplaces, email, payments, and privacy/security products.

## Trust model

A successful HTTP response is **not** proof that a page actually deletes an account. The project tracks three separate concepts:

1. **Provenance** - whether a destination is known to be first-party/provider-owned.
2. **Manual freshness** - when the exact effective URL and its purpose were last reviewed by a maintainer.
3. **Automated reachability** - whether CI can currently reach the destination and how the provider responds to automation.

A resource can therefore be provider-owned but still need a fresh manual review. Automated checks never silently refresh a manual verification date.

### Reachability states

The scheduled resource audit distinguishes:

- `live` - the automated request reached a usable response.
- `auth-required` - the destination is intentionally behind sign-in/account state.
- `bot-blocked` - the provider rejects or rate-limits automation.
- `method-restricted` - the endpoint rejects the automated request method.
- `transient` - timeout, network, or temporary server failure.
- `dead` - confirmed 404/410 outside an explicit restricted-access policy.
- `unknown` - not enough evidence to classify safely.

This avoids calling a real deletion page “dead” just because it requires authentication or blocks CI runners.

## Data-quality rules

Contributions must follow these rules:

- Never guess or construct a deletion URL.
- Prefer provider-owned documentation, account settings, and privacy portals.
- Do not label cancellation, deactivation, history deletion, or data export as account deletion.
- Set `official: true` only when first-party provenance is supported.
- Set `verified` only after manually reviewing the exact effective URL and action.
- Do not treat a `200` response as proof of destructive scope.
- Do not include credentials, personal investigation data, or private provider responses in issues or PRs.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full evidence requirements and the structured service-link workflow.

## Supported resource types

| Type | Meaning |
| --- | --- |
| `delete` | Permanent account deletion |
| `disable` | Reversible deactivation or subscription-related disable/cancel action |
| `activity` | AI/chat/activity-history deletion |
| `backup` | Data export and portability |
| `privacy` | Privacy portal or privacy controls |
| `security` | Recovery, sessions, authentication, or security controls |
| `settings` | General account settings |
| `manage` | Other account-management actions |
| `guide` / `tools` | Supporting reference or privacy/security utilities |

## AI privacy directory

The directory separates AI activity/history controls from parent-account deletion. Examples include:

| Service | Account deletion | AI/history controls | Data/privacy controls |
| --- | --- | --- | --- |
| OpenAI / ChatGPT | Yes | Data controls | Privacy portal |
| Claude | Yes | Account settings/provider help | Provider help |
| Google Gemini | Via Google Account | Gemini Apps Activity | Google privacy/Takeout |
| Perplexity | Yes | Session/history controls | Export/privacy |
| Microsoft Copilot | Via Microsoft Account | Copilot activity history | Microsoft privacy dashboard |
| Mistral AI | Yes | Data-governance controls | Privacy/data governance |
| Character.AI | Yes | Account/data settings | Provider help |
| ElevenLabs | Yes | Settings | Provider help |
| Poe | Yes | Chat/history deletion | Account settings |

The UI does not assume every AI product owns an independent identity system.

## Crawlable SEO guides

The production build generates localized service pages and topic hubs in all four languages. High-intent targets are maintained in [`data/search-intents.json`](data/search-intents.json) from real service data rather than fabricated search-volume or ranking claims.

Examples:

- [Delete X (Twitter) account](https://imedkablavi.github.io/Social-Media-Deletion-Guide/en/services/twitter/)
- [Delete Discord account](https://imedkablavi.github.io/Social-Media-Deletion-Guide/en/services/discord/)
- [Delete Telegram account](https://imedkablavi.github.io/Social-Media-Deletion-Guide/en/services/telegram/)
- [Delete GitHub account](https://imedkablavi.github.io/Social-Media-Deletion-Guide/en/services/github/)
- [Delete LinkedIn account](https://imedkablavi.github.io/Social-Media-Deletion-Guide/en/services/linkedin/)
- [Delete PayPal account and personal data](https://imedkablavi.github.io/Social-Media-Deletion-Guide/en/services/paypal/)
- [Delete Netflix account vs cancel membership](https://imedkablavi.github.io/Social-Media-Deletion-Guide/en/services/netflix/)

SEO validation checks self-canonicals, reciprocal EN/AR/FR/TR hreflang, `x-default`, sitemap membership, robots rules, and schema.org JSON-LD. Search Console setup and monitoring are documented in [`docs/SEARCH_CONSOLE.md`](docs/SEARCH_CONSOLE.md).

## Automated QA

Four GitHub Actions workflows protect production behavior.

### 1. Quality checks - `.github/workflows/quality.yml`

- audits four-language localization integrity
- builds the production site
- runs static source/catalog validation
- validates curated growth pages and topic hubs
- validates canonical, reciprocal hreflang, schema.org JSON-LD, sitemap, robots, and Search Console verification injection
- validates trust metadata in strict mode
- checks effective user-visible URL volume
- checks JavaScript syntax
- uploads the trust metadata report

### 2. Resource freshness and reachability - `.github/workflows/link-check.yml`

- runs on pull requests and pushes to `main`
- runs weekly
- audits the effective user-visible catalog
- keeps manual freshness separate from network status
- classifies auth-required, bot-blocked, transient, and dead resources separately
- uploads JSON/Markdown resource-audit artifacts

### 3. Browser, accessibility, and Lighthouse QA - `.github/workflows/e2e.yml`

- builds the production site
- runs Playwright browser journeys
- tests English, Arabic, French, and Turkish on mobile
- checks RTL behavior for Arabic
- checks horizontal overflow and key navigation behavior
- runs axe WCAG A/AA checks
- runs Lighthouse mobile regression gates for performance, accessibility, best practices, SEO, CLS, LCP, and TBT
- uploads Lighthouse reports and failure traces

### 4. GitHub Pages deployment - `.github/workflows/static.yml`

- builds `dist/` from `main`
- injects `GOOGLE_SITE_VERIFICATION` from the repository variable when configured
- uploads only the production artifact
- deploys through GitHub Pages with OIDC/page permissions

See [QA.md](QA.md) for the release qualification checklist.

## Local development

Requirements:

- Node.js 22+
- npm
- Python 3.12+ for static validation / local serving

```bash
git clone https://github.com/imedkablavi/Social-Media-Deletion-Guide.git
cd Social-Media-Deletion-Guide
npm install
npm run build
```

Serve the production build:

```bash
cd dist
python3 -m http.server 8000
```

Open `http://127.0.0.1:8000/`.

Run the main checks:

```bash
npm run test:static
npm run test:trust
npm run test:e2e
npm run test:lighthouse
```

For a live reachability audit:

```bash
node scripts/audit-resources.js --online --output-dir=reports/resource-audit
```

## Project structure

```text
/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── broken-link.yml
│   │   └── service-link-update.yml
│   ├── pull_request_template.md
│   └── workflows/
│       ├── e2e.yml
│       ├── link-check.yml
│       ├── quality.yml
│       └── static.yml
├── assets/
├── css/
├── data/
│   ├── freshness-policy.json
│   ├── link-policy.json
│   └── search-intents.json
├── docs/
│   └── SEARCH_CONSOLE.md
├── js/
│   ├── platforms.js
│   ├── catalog-updates.js
│   ├── ai-catalog.js
│   ├── catalog-maintenance.js
│   ├── growth-trust-catalog.js
│   ├── legacy-provenance-snapshot.js
│   ├── trust-metadata.js
│   └── trust-copy.js
├── scripts/
│   ├── audit-resources.js
│   ├── build-site.js
│   ├── postbuild-trust.js
│   ├── validate-growth.js
│   └── validate-indexing.js
├── tests/
├── CONTRIBUTING.md
├── QA.md
├── SECURITY.md
├── package.json
└── README.md
```

## Release and versioning

The project uses semantic-style version numbers for public release milestones. `package.json` is the source for the current application version, while release notes document trust, catalog, SEO, QA, and deployment changes.

See [CHANGELOG.md](CHANGELOG.md) for release history.

## Contributing

Provider flows change frequently. A good contribution is often a verified link update rather than a new feature.

Use the structured [service-link update form](https://github.com/imedkablavi/Social-Media-Deletion-Guide/issues/new?template=service-link-update.yml) and include the exact provider URL, provenance, review date, access behavior, and what the provider page actually proves.

Before opening a PR, read [CONTRIBUTING.md](CONTRIBUTING.md).

## Security and privacy

This project is a static directory. It does not require user credentials and should not collect account passwords, provider tokens, deletion confirmations, or personal investigation data.

For security reports, see [SECURITY.md](SECURITY.md).

## License

MIT - see [LICENSE](LICENSE).
