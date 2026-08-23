## What changed

Describe the focused change and why it is needed.

## Service/resource evidence

Complete this section for every catalog URL added, replaced, relabeled, or manually re-verified. Use `N/A` only when the PR does not change service resources.

- Service:
- Resource type/action:
- Previous URL (if any):
- Effective provider URL:
- First-party provenance: help center / account portal / privacy or legal portal / provider docs / unconfirmed
- Manual review date (`YYYY-MM-DD`):
- Access behavior: public / auth-required / bot-blocked or rate-limited / unknown
- Region/account-state caveats:
- What the provider page actually proves:

## Trust checklist

- [ ] I did not guess or construct a deletion URL.
- [ ] A successful HTTP response was not used as a substitute for manual verification.
- [ ] `official: true` is used only when first-party provenance is confirmed.
- [ ] `verified` reflects review of the exact effective URL and action label.
- [ ] Account deletion is not confused with subscription cancellation, deactivation, history deletion, or data export.
- [ ] Destructive parent-account scope is disclosed where relevant.
- [ ] No credentials, tokens, private screenshots, or personal account data are included.

## QA

- [ ] `npm run build`
- [ ] `python scripts/validate.py`
- [ ] `node scripts/validate-indexing.js`
- [ ] `node scripts/audit-resources.js --strict-metadata`
- [ ] Browser/mobile tests when UI or generated pages changed
- [ ] Lighthouse checked when performance-sensitive code changed
