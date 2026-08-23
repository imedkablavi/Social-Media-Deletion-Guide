/**
 * Normalize trust metadata after every catalog maintenance layer has run.
 *
 * `verified` means the exact effective URL was manually reviewed on that date.
 * Automated reachability checks never write this field. Legacy compatibility
 * defaults are removed when the original resource had no evidence-bearing field.
 */
(() => {
    const LEGACY_DEFAULT_DATE = '2026-08-21';

    platforms.forEach(platform => {
        (platform.resources || []).forEach(resource => {
            if (resource.__verifiedWasMissing && resource.verified === LEGACY_DEFAULT_DATE) {
                delete resource.verified;
            }

            if (resource.__officialWasMissing && resource.official === true) {
                // `false` here means first-party provenance is not confirmed by the
                // maintained metadata; it does not assert that the URL is third-party.
                resource.official = false;
            }

            resource.provenance = resource.official === true ? 'provider-reviewed' : 'unverified';
            resource.freshness = resource.verified ? 'dated-review' : 'unverified';

            try { delete resource.__verifiedWasMissing; } catch (_) {}
            try { delete resource.__officialWasMissing; } catch (_) {}
        });
    });
})();
