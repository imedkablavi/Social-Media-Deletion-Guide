# Search Console and indexing operations

Production origin: `https://imedkablavi.github.io/Social-Media-Deletion-Guide/`

## What the repository enforces automatically

The production build and CI validate:

- one HTTPS self-canonical per sitemap URL;
- `index,follow` on every sitemap page;
- a complete `en` / `ar` / `fr` / `tr` / `x-default` hreflang set on localized pages;
- reciprocal hreflang links between language equivalents;
- every hreflang target is present in the sitemap;
- `x-default` points to the English equivalent;
- parseable schema.org JSON-LD that identifies the canonical page URL;
- no duplicate or off-origin URLs in `sitemap.xml`;
- `robots.txt` allows crawling and points to the production sitemap;
- the 404 page remains `noindex` and is excluded from the sitemap;
- all generated service pages and topic hubs are present in the sitemap;
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
2. Inspect the homepage and a small set of representative high-intent service/topic URLs first.
3. Confirm the selected canonical shown by Google matches the repository canonical.
4. Confirm localized equivalents are discovered; repository CI proves the markup graph, not Google's indexing decision.
5. Use Search Performance data to decide future editorial work; do not create one page per wording variation.

## Monitoring cadence

### Weekly: search acquisition

Review Search Performance for the last 28 days and compare it with the preceding 28-day period. Record actual Search Console values; do not estimate missing data.

Track at minimum:

- total clicks
- total impressions
- CTR
- average position
- top queries by clicks and impressions
- top pages by clicks and impressions
- country and device changes when they explain a meaningful shift

For growth decisions, look for combinations such as:

- a service page receiving impressions for a deletion intent but weak CTR: review title/description against the provider terminology and the actual query before changing copy;
- a service receiving repeated deletion-intent impressions without a useful dedicated page: verify provider evidence, then add the service to `data/search-intents.json` rather than creating duplicate keyword variants;
- a topic hub attracting queries unrelated to its intent: narrow copy/internal links rather than multiplying near-duplicate hubs.

Do not report a ranking, traffic gain, or conversion lift unless it appears in Search Console or another named analytics source.

### Weekly: indexing health

Check the Pages/Indexing report and sitemap status for:

- sudden growth in `Not indexed` URLs;
- duplicate/canonicalized pages where Google selected a different canonical;
- soft-404 classifications;
- blocked-by-robots or `noindex` surprises;
- server/redirect errors;
- sitemap fetch or processing errors.

Use URL Inspection on representative examples before changing templates. CI can prove the repository output is internally consistent; it cannot prove Google has crawled or indexed a URL.

### Monthly: intent and content review

For each target in `data/search-intents.json`:

1. confirm the query is still relevant in Search Console or current search-result wording;
2. confirm the landing page still matches the provider's terminology and real deletion flow;
3. confirm the provider source in the intent record still supports the page claim;
4. refresh editorial copy only when the evidence changed or actual query data shows a mismatch;
5. avoid adding a second page for a synonym when the existing canonical already satisfies that intent.

### After a material catalog/provider change

When a provider moves its account flow, changes a waiting period, or changes destructive scope:

1. update the exact service resource and manual `verified` date using the structured contribution workflow;
2. run the resource audit;
3. rebuild the service page;
4. run canonical/hreflang/schema/sitemap validation;
5. inspect the changed production URL in Search Console after deployment when necessary.

## Suggested monitoring record

Keep a dated record in an issue, release note, or external ops log using actual values from Search Console:

```text
Period: YYYY-MM-DD .. YYYY-MM-DD
Comparison period: YYYY-MM-DD .. YYYY-MM-DD
Clicks: <actual>
Impressions: <actual>
CTR: <actual>
Average position: <actual>
Indexed-page anomalies: <actual observations>
Top changed query/page pairs: <actual observations>
Actions taken: <links to issues/PRs>
```

Do not commit invented placeholder metrics as though they were production measurements.

## Search-intent source of truth

`data/search-intents.json` records the reviewed high-intent query phrase and provider-owned source used for search-acquisition work. It deliberately does not invent search-volume numbers, rankings, clicks, or conversion estimates.

New targets must map to a distinct useful service landing page and an evidence-backed provider source. Current CI rejects duplicate service targets and duplicate query strings and checks that each target's landing page exists with the expected canonical.

## What PASS does and does not prove

A passing repository indexing check proves that the generated files are internally consistent at build time: sitemap membership, canonical uniqueness, hreflang reciprocity, schema syntax/context, robots directives, and expected routes.

It does **not** prove that:

- Google has crawled a page;
- Google has indexed a page;
- Google will select the declared canonical;
- a page ranks for its target query;
- the page receives impressions or clicks;
- a ranking or traffic change was caused by a repository change.

Those claims require Search Console or other production evidence.
