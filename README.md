<div align="center">

# Account Deletion & Privacy Guide

**A maintained, multilingual directory for official account deletion, AI activity deletion, data export, privacy, and security controls.**

[![Platforms](https://img.shields.io/badge/services-60%2B-7c3aed)](#coverage)
[![AI services](https://img.shields.io/badge/AI%20services-9-0891b2)](#ai-privacy-directory)
[![Languages](https://img.shields.io/badge/languages-AR%20%7C%20EN%20%7C%20FR%20%7C%20TR-10b981)](#languages)
[![Quality](https://img.shields.io/github/actions/workflow/status/imedkablavi/Social-Media-Deletion-Guide/quality.yml?label=quality)](https://github.com/imedkablavi/Social-Media-Deletion-Guide/actions/workflows/quality.yml)
[![Link checks](https://img.shields.io/github/actions/workflow/status/imedkablavi/Social-Media-Deletion-Guide/link-check.yml?label=link%20checks)](https://github.com/imedkablavi/Social-Media-Deletion-Guide/actions/workflows/link-check.yml)
[![Pages](https://img.shields.io/github/actions/workflow/status/imedkablavi/Social-Media-Deletion-Guide/static.yml?label=pages)](https://github.com/imedkablavi/Social-Media-Deletion-Guide/actions/workflows/static.yml)
[![License](https://img.shields.io/badge/license-MIT-0f172a)](LICENSE)

[**Live Guide**](https://imedkablavi.github.io/Social-Media-Deletion-Guide/) · [Report a broken link](https://github.com/imedkablavi/Social-Media-Deletion-Guide/issues/new?template=broken-link.yml) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md)

</div>

---

## Why this exists

Deleting an online account is often harder than creating one. Providers may hide deletion behind account settings, subscription cancellation, privacy portals, mobile-only flows, or support articles. AI products make this even more confusing because **deleting an AI conversation, deleting AI activity, and deleting the parent Google/Microsoft account are different actions**.

This project makes those distinctions explicit and routes users to first-party destinations whenever possible.

## What makes this directory different

- **Official-first data model** — provider-owned help centers, privacy portals, and authenticated settings are preferred.
- **Deletion difficulty** — `easy`, `medium`, and `hard` signals inspired by established account-deletion directories, presented as usability metadata rather than a blacklist.
- **AI-aware privacy actions** — account deletion is separated from AI/chat/activity deletion.
- **Verified metadata** — maintained resources carry an `official` flag and review date.
- **Category and difficulty filters** — users can quickly narrow the directory instead of scanning a giant card wall.
- **Search across names, categories, and resource titles**.
- **Scope warnings** — destructive links can warn when an action affects an entire Google or Microsoft account.
- **Four UI languages** — English, Arabic, French, and Turkish with RTL support for Arabic.
- **Automated quality checks** — HTML structure, local assets, catalog sanity, and JavaScript syntax are validated in CI.
- **Scheduled external-link monitoring** — broken provider URLs are detected before the directory quietly rots.
- **Static deployment** — no database, backend, or credential collection.

## AI privacy directory

The AI catalog currently includes dedicated entries for:

| Service | Account deletion | AI/history controls | Data/privacy controls |
| --- | --- | --- | --- |
| OpenAI / ChatGPT | Yes | Data controls | Privacy Portal |
| Claude | Yes | Account settings | Provider help |
| Google Gemini | Via Google Account | Gemini Apps Activity | Google Takeout / privacy |
| Perplexity | Yes | Sessions/history deletion | Account export/privacy |
| Microsoft Copilot | Via Microsoft Account | Copilot activity history | Microsoft privacy dashboard |
| Mistral AI | Yes | Data-governance controls | Privacy/data governance |
| Character.AI | Yes | Account/data settings | Provider help |
| ElevenLabs | Yes | Settings | Provider help |
| Poe | Yes | Chat/history deletion | Account settings |

The important design rule is that the UI does **not** pretend every AI product owns a standalone identity system. Gemini and Copilot, for example, can expose history deletion independently from deleting the parent account.

## Coverage

The broader directory covers social media, messaging, developer tools, productivity services, streaming, gaming, marketplaces, cloud services, email providers, and privacy/security utilities.

Examples include X, Instagram, Facebook, Threads, Bluesky, Mastodon, Tumblr, TikTok, Snapchat, Reddit, LinkedIn, Pinterest, WhatsApp, Telegram, Signal, Discord, Viber, LINE, Google, Microsoft, Apple, GitHub, GitLab, Atlassian, Figma, Dropbox, Notion, Adobe, Amazon, eBay, PayPal, Netflix, Spotify, Twitch, Steam, Epic Games, PlayStation, Nintendo, Roblox, EA, Ubisoft, Riot Games, Battle.net, Airbnb, Uber, Yahoo, Proton, OpenAI, Claude, Gemini, Perplexity, Copilot, Mistral, Character.AI, ElevenLabs, Poe, and more.

The live JavaScript catalog is the source of truth, so the exact count can grow without manually rewriting this section.

## Resource types

The project avoids collapsing unrelated actions into one generic "delete" button.

- `delete` — permanent account deletion
- `disable` — reversible deactivation or subscription cancellation
- `activity` — AI/chat/activity-history deletion
- `backup` — data export and portability
- `privacy` — privacy portal or data controls
- `security` — account recovery, sessions, authentication
- `settings` — general account settings
- `manage` — other account-management actions
- `guide` / `tools` — reference or privacy/security utilities

## Project structure

```text
/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── broken-link.yml
│   └── workflows/
│       ├── link-check.yml       # scheduled external-link monitoring
│       ├── quality.yml          # static validation + JS syntax checks
│       └── static.yml           # GitHub Pages deployment
├── css/
│   ├── components.css           # original visual foundation
│   └── professional.css         # professional directory design layer
├── js/
│   ├── translations.js
│   ├── translations-updates.js
│   ├── platforms.js             # legacy/base catalog
│   ├── catalog-updates.js       # maintained corrections/additions
│   ├── ai-catalog.js            # dedicated AI privacy/account catalog
│   ├── language-manager.js
│   ├── ui-manager.js
│   ├── pro-ui.js                # filtering, metadata, resource UI
│   └── app.js
├── scripts/
│   └── validate.py
├── CONTRIBUTING.md
├── SECURITY.md
├── index.html
└── README.md
```

## Data model

A maintained platform can carry UI and maintenance metadata:

```js
{
  id: 'service-id',
  name: 'service-id',
  displayName: 'Service Name',
  category: 'ai',
  difficulty: 'easy',
  loginRequired: true,
  note: 'Short factual caveat.',
  resources: [
    {
      url: 'https://provider.example/account/delete',
      title: { en: 'Delete account', ar: '...', fr: '...', tr: '...' },
      type: 'delete',
      official: true,
      verified: '2026-08-21'
    }
  ]
}
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for source-quality rules and contribution requirements.

## Quality and maintenance

Three GitHub Actions workflows protect the project:

### Quality checks

`.github/workflows/quality.yml`

- validates duplicate HTML IDs
- checks required SEO metadata
- verifies referenced local assets exist
- detects placeholder/insecure catalog URLs
- checks all JavaScript files with `node --check`

### External link checks

`.github/workflows/link-check.yml`

- runs on pull requests and pushes to `main`
- runs on a schedule
- checks external destinations with Lychee
- excludes known authenticated pages that intentionally reject automated clients

### Static deployment

`.github/workflows/static.yml`

- checks out `main`
- configures GitHub Pages
- uploads the static repository artifact
- deploys the site through `actions/deploy-pages`

## Local development

No package manager or build tool is required.

```bash
git clone https://github.com/imedkablavi/Social-Media-Deletion-Guide.git
cd Social-Media-Deletion-Guide
python -m http.server 8000
```

Open:

```text
http://127.0.0.1:8000/
```

Run validation:

```bash
python scripts/validate.py
for file in js/*.js; do node --check "$file"; done
```

## Languages

```text
English / Arabic / French / Turkish
```

English is the first-visit default. Arabic switches the document to RTL automatically.

## Privacy and security model

This is a navigation directory, not an account-deletion proxy. It does **not** request or store passwords, authentication tokens, recovery codes, or account data. Users perform destructive actions on the provider's own domain.

See [SECURITY.md](SECURITY.md) for the trust model and security-reporting guidance.

## Inspiration

The project borrows the useful concept of deletion difficulty from long-running account-deletion directories such as JustDeleteMe and AccountKiller, while using its own interface, catalog format, verification metadata, multilingual support, AI-specific privacy distinctions, and automated maintenance workflows.

## License

MIT License © [Imed Kablavi](https://github.com/imedkablavi)

## Support

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/imed_kablavi)
