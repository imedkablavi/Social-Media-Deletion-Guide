# Release QA checklist

This checklist describes the automated and manual release gates for the directory and its generated production site.

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
- Generated service indexes expose crawlable `<a href>` links to the catalog.
- Generated service pages expose canonical URLs, complete hreflang sets and official resource links without depending on runtime JavaScript.

## Static and release gates

- `npm run build` creates the production `dist/` artifact used by GitHub Pages.
- HTML IDs are unique and local assets exist.
- App scripts are deferred and loaded in the required catalog/UI order.
- JSON-LD parses and canonical metadata is consistent.
- The production build contains 200+ localized service pages across EN / AR / FR / TR.
- Each sampled service page contains `BreadcrumbList` and `ItemList` structured data.
- Each sampled localized service page has its own canonical plus EN / AR / FR / TR / x-default hreflang links.
- The generated sitemap contains 200+ unique discoverable URLs and all language indexes.
- `robots.txt` advertises the generated root sitemap.
- The homepage links visibly to each crawlable language service index.
- The production social preview is a local 1200×630 PNG; the favicon and web manifest must be present and valid.
- A generated `404.html` exists with `noindex`.
- The effective catalog is built after every maintenance layer and contains 100+ unique HTTPS destinations.
- Known stale provider URLs are rejected by static validation.
- External-link CI checks the effective user-visible catalog instead of obsolete legacy URLs.
- JavaScript syntax is checked for runtime, build, QA and browser-test files.

## Deployment rule

GitHub Pages uploads only `dist/`, never the repository source tree. The production build therefore becomes the single deployment artifact for the interactive homepage, localized service guides, sitemap, robots file, manifest and 404 page.

See `.github/workflows/quality.yml`, `.github/workflows/link-check.yml`, `.github/workflows/e2e.yml`, and `.github/workflows/static.yml` for the executable checks and deployment pipeline.
