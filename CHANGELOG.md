# Changelog

All notable project changes are documented here. Dates use `YYYY-MM-DD`.

## [3.3.0] - 2026-08-24

### Trust and freshness

- Separated provider provenance, manual review freshness, and automated reachability.
- Removed synthetic legacy `official` / `verified` claims where the original resource had no evidence-bearing metadata.
- Added explicit freshness policy with `fresh`, `review-due`, `stale`, and `unverified` states.
- Added resource audit reporting with separate `live`, `auth-required`, `bot-blocked`, `method-restricted`, `transient`, `dead`, and `unknown` classifications.
- Added structured link-policy exceptions so authenticated or bot-blocked provider destinations are not mislabeled as dead.
- Refreshed evidence-backed first-party deletion/account-management resources for Discord, Telegram, and GitHub.

### SEO and growth

- Expanded the evidence-backed high-intent dataset from 10 to 13 service targets without inventing search-volume or ranking data.
- Added/validated crawlable localized landing pages for Discord, Telegram, and GitHub intents.
- Strengthened self-canonical, reciprocal hreflang, `x-default`, schema.org JSON-LD, sitemap, robots, and Search Console verification validation.
- Kept one canonical service page per intent instead of generating thin keyword/synonym duplicates.
- Softened generated trust copy where a service still contains legacy resources without manual verification evidence.
- Expanded Search Console documentation into an operational monitoring runbook with explicit repository-CI vs Google-indexing boundaries.

### Accessibility and performance

- Added four-language mobile Playwright coverage for English, Arabic, French, and Turkish.
- Added RTL/mobile overflow checks and axe WCAG A/AA accessibility tests.
- Added Lighthouse CI mobile regression gates for performance, accessibility, best practices, SEO, CLS, LCP, and TBT.
- Added report artifact retention for Lighthouse and trust/resource audits.

### Contribution workflow

- Added a structured service-link update issue form.
- Added PR evidence requirements for provider provenance, exact effective URL, manual review date, access behavior, and destructive scope.
- Documented that HTTP `200` alone does not prove account deletion behavior and that deletion URLs must never be guessed.

### CI and release engineering

- Upgraded `actions/upload-artifact` usage to v7 across browser QA, resource audit, and quality workflows.
- Updated README documentation to match the production trust, SEO, browser QA, Lighthouse, and GitHub Pages architecture.

### Validated 3.3.0 build snapshot

The 3.3.0 qualification run on 2026-08-24 produced:

- 62 catalog services
- 170 resource entries
- 73 manually provider-reviewed resources
- 97 intentionally unverified legacy resources awaiting evidence-backed review
- 248 localized service pages
- 48 localized topic pages
- 305 sitemap URLs
- 13 evidence-backed high-intent service targets
- 0 confirmed-dead resource URLs in the qualification audit

These counts describe that qualification snapshot and are not permanent product claims.

### Known follow-up work

- Continue manual provider-by-provider review of the 97 legacy resources still marked unverified.
- Recheck transient provider failures and manually validate bot-blocked/auth-required flows where automation cannot prove the destination behavior.
- Configure and operate real Google Search Console verification/monitoring; repository CI does not prove indexing, rankings, clicks, or traffic gains.
- Add current product screenshots/demo assets to improve GitHub conversion and onboarding.

## Pre-3.3.0

Earlier repository history predates the formal changelog. Git history and merged pull requests remain the authoritative record for those changes.
