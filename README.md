<div align="center">

# Account Deletion & Privacy Guide

**Find the official place to delete an account, export your data, secure access, or review privacy settings.**

[![Platforms](https://img.shields.io/badge/platforms-50%2B-6366f1)](#platform-coverage)
[![Languages](https://img.shields.io/badge/languages-AR%20%7C%20EN%20%7C%20FR%20%7C%20TR-10b981)](#languages)
[![Link checks](https://img.shields.io/github/actions/workflow/status/imedkablavi/Social-Media-Deletion-Guide/link-check.yml?label=link%20checks)](https://github.com/imedkablavi/Social-Media-Deletion-Guide/actions/workflows/link-check.yml)
[![License](https://img.shields.io/badge/license-MIT-0f172a)](LICENSE)

[Live Guide](https://imedkablavi.github.io/Social-Media-Deletion-Guide/) · [Report a broken link](https://github.com/imedkablavi/Social-Media-Deletion-Guide/issues/new?template=broken-link.yml)

</div>

---

## What this project is

Account deletion pages are often buried behind settings screens, help-center articles, regional redirects, or login walls. This project keeps those destinations in one searchable directory and separates different actions instead of treating everything as "delete account".

Resources are grouped by purpose:

- **Delete** — permanent account deletion or the provider's official deletion process
- **Disable** — deactivation, cancellation, or temporary closure when it is different from deletion
- **Backup** — data export, archive, portability, or account-data requests
- **Security** — recovery, compromised-account help, passwords, sessions, and authentication
- **Settings / Manage** — official account and privacy controls

The guide prefers first-party provider pages. Some actions only become visible after signing in, and some services use different flows by country or account type.

## Highlights

- 50+ platforms and online services
- Arabic, English, French, and Turkish UI
- RTL layout for Arabic
- Searchable platform directory
- Resource grouping by action type
- Official-source and maintenance metadata in the catalog
- Dynamic platform/resource counters instead of hard-coded totals
- Weekly automated external-link checks with GitHub Actions
- Dedicated broken-link issue form
- Static deployment with GitHub Pages
- No build step or backend required

## Platform coverage

The directory covers a mix of social networks, messaging apps, developer services, gaming accounts, productivity products, streaming services, marketplaces, and privacy tools.

Examples include X, Instagram, Facebook, Threads, Bluesky, Mastodon, Tumblr, TikTok, Snapchat, Reddit, LinkedIn, Pinterest, WhatsApp, Telegram, Signal, Discord, Viber, LINE, Google, Microsoft, Apple, GitHub, GitLab, Atlassian, Figma, OpenAI, Dropbox, Notion, Adobe, Amazon, eBay, PayPal, Netflix, Spotify, Twitch, Steam, Epic Games, PlayStation, Nintendo, Roblox, EA, Ubisoft, Riot Games, Battle.net, Airbnb, Uber, Yahoo, Proton, and more.

The source of truth is the JavaScript catalog rather than this README, so the live count can grow without requiring a manual badge update every time.

## Link maintenance

A directory like this becomes unreliable if links are only checked manually. The repository includes a scheduled link-check workflow:

```text
.github/workflows/link-check.yml
```

It runs on pull requests, pushes to `main`, manual dispatch, and every Monday. Authentication-only URLs that reject automated clients are explicitly excluded from HTTP validation and remain reviewable through the issue system.

If a provider changes a deletion flow, open the **Broken or outdated link** issue form and include the new official URL when available.

## Languages

Supported UI languages:

```text
Arabic / English / French / Turkish
```

The legacy dataset remains compatible with the original translation files. `js/translations-updates.js` adds maintained copy and names for newer platforms, while `js/catalog-updates.js` fills missing Turkish resource labels so older entries do not render as `undefined`.

## Project structure

```text
/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── broken-link.yml
│   └── workflows/
│       ├── link-check.yml
│       └── static.yml
├── css/
│   └── components.css
├── js/
│   ├── translations.js
│   ├── translations-updates.js
│   ├── platforms.js
│   ├── catalog-updates.js
│   ├── language-manager.js
│   ├── ui-manager.js
│   └── app.js
├── index.html
└── README.md
```

### Where to edit things

- Add a new maintained platform in `js/catalog-updates.js`
- Update older catalog entries in `js/platforms.js` only when a full cleanup is intended
- Add platform names or copy in `js/translations-updates.js`
- Change layout and animations in `css/components.css`
- Change rendering behavior in `js/ui-manager.js`

## Adding a platform

Prefer an official provider URL. A deletion entry should not point to a generic homepage when a specific help article or account setting exists.

A maintained resource can include verification metadata:

```js
{
  url: "https://provider.example/help/delete-account",
  title: {
    ar: "حذف الحساب",
    en: "Delete account",
    fr: "Supprimer le compte",
    tr: "Hesabı sil"
  },
  type: "delete",
  official: true,
  verified: "2026-08-21"
}
```

Useful resource types are `delete`, `disable`, `backup`, `security`, `settings`, `manage`, `guide`, and `tools`.

## Local development

No package manager is required.

```bash
git clone https://github.com/imedkablavi/Social-Media-Deletion-Guide.git
cd Social-Media-Deletion-Guide
python -m http.server 8000
```

Then open `http://127.0.0.1:8000/`.

Opening `index.html` directly also works in modern browsers, but a local HTTP server is preferable when testing behavior consistently.

## Deployment

The repository deploys the static site to GitHub Pages through `.github/workflows/static.yml`.

The canonical production URL is:

```text
https://imedkablavi.github.io/Social-Media-Deletion-Guide/
```

## Contributing

Useful contributions include:

- replacing an outdated provider URL with the current official one
- adding a missing platform with first-party deletion/privacy documentation
- documenting account-vs-subscription differences
- improving Arabic, English, French, or Turkish wording
- reporting region-specific behavior
- accessibility and keyboard-navigation fixes

When changing a link, prefer a provider help center, privacy portal, or authenticated account-settings destination over third-party deletion directories.

## Important note

This project is a navigation directory, not a deletion service. It does not ask for account passwords, tokens, personal data, or provider credentials. Account deletion is performed on the provider's own website or application.

## License

MIT License © [Imed Kablavi](https://github.com/imedkablavi)

## Support

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/imed_kablavi)
