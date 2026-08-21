# Release QA checklist

This checklist describes the automated and manual release gates for the static directory.

## Browser journeys

- Desktop Chromium and mobile Chromium render more than 50 services.
- Search finds ChatGPT/OpenAI and handles zero-result queries.
- Category and deletion-difficulty filters update the catalog.
- Selecting a service reveals official resources; reset clears selection and filters.
- Resource links are HTTPS and open with `noopener noreferrer`.
- English, Arabic, French and Turkish switch without runtime errors; Arabic uses RTL.
- Every service card contains a brand logo or an explicit fallback mark.
- Mobile pages do not introduce document-level horizontal overflow.
- `/` focuses directory search without overriding browser-standard Ctrl/Cmd shortcuts.

## Static and release gates

- HTML IDs are unique and local assets exist.
- App scripts are deferred and loaded in the required catalog/UI order.
- JSON-LD parses and canonical metadata is consistent.
- `robots.txt` advertises the root sitemap and the sitemap contains the canonical page.
- The effective catalog is built after every maintenance layer and contains 100+ unique HTTPS destinations.
- Known stale provider URLs are rejected by static validation.
- External-link CI checks the effective user-visible catalog instead of obsolete legacy URLs.
- JavaScript syntax is checked for runtime, QA, and browser-test files.

See `.github/workflows/quality.yml`, `.github/workflows/link-check.yml`, and `.github/workflows/e2e.yml` for the executable checks.
