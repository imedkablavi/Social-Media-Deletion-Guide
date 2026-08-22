# Search Console and indexing operations

Production origin: `https://imedkablavi.github.io/Social-Media-Deletion-Guide/`

## What the repository now enforces automatically

The production build and CI validate:

- one HTTPS self-canonical per sitemap URL;
- `index,follow` on every sitemap page;
- a complete `en` / `ar` / `fr` / `tr` / `x-default` hreflang set on localized pages;
- no duplicate URLs in `sitemap.xml`;
- `robots.txt` allows crawling and points to the production sitemap;
- the 404 page remains `noindex` and is excluded from the sitemap;
- all growth service pages and topic hubs are present in the sitemap;
- Google site-verification injection works when a token is supplied.

Run locally after `npm run build`:

```bash
node scripts/validate-indexing.js
```

To test the verification hook locally:

```bash
GOOGLE_SITE_VERIFICATION=your-token npm run build
GOOGLE_SITE_VERIFICATION=your-token node scripts/validate-indexing.js
```

## Google Search Console verification

The Pages workflow reads a GitHub Actions repository variable named:

```text
GOOGLE_SITE_VERIFICATION
```

Put only the verification token value in that variable, not the complete `<meta>` tag. The next Pages deployment injects the correct `google-site-verification` meta element into the generated production site.

After verification in Search Console:

1. Submit `https://imedkablavi.github.io/Social-Media-Deletion-Guide/sitemap.xml`.
2. Inspect the homepage and a small set of high-intent service/topic URLs first.
3. Use Search Performance query data to choose future editorial batches; do not create one page per wording variation.
4. Refresh service content when provider behavior changes and keep its editorial review date current.

## Search-intent source of truth

`data/search-intents.json` records the reviewed high-intent query phrase and provider-owned source used for the current search-acquisition batch. It deliberately does not invent search-volume numbers.
