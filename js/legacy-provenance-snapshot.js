/**
 * Capture which legacy resource trust fields were absent before maintained overlays run.
 *
 * The legacy catalog predates explicit `official` / `verified` metadata. A later
 * compatibility layer historically filled those fields for every legacy URL. That
 * is useful for UI compatibility, but it must not be treated as evidence that the
 * exact URL was reviewed. These non-enumerable markers let the trust layer remove
 * only synthetic defaults while preserving resources that are replaced by a
 * maintained, explicitly reviewed entry.
 */
(() => {
    const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);

    platforms.forEach(platform => {
        (platform.resources || []).forEach(resource => {
            if (!own(resource, 'verified')) {
                Object.defineProperty(resource, '__verifiedWasMissing', {
                    value: true,
                    configurable: true,
                    enumerable: false
                });
            }
            if (!own(resource, 'official')) {
                Object.defineProperty(resource, '__officialWasMissing', {
                    value: true,
                    configurable: true,
                    enumerable: false
                });
            }
        });
    });
})();
