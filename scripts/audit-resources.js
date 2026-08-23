#!/usr/bin/env node
/**
 * Produce an evidence-oriented resource audit.
 *
 * Manual review freshness and automated HTTP reachability are intentionally kept
 * separate. A successful HTTP request never changes `verified`, and a blocked
 * automated request is not called a dead link unless the provider actually returns
 * a terminal missing response outside an explicit bot-block policy.
 */
const fs = require('fs');
const path = require('path');
const { loadCatalog } = require('./load-catalog.js');

const ROOT = path.resolve(__dirname, '..');
const freshnessPolicy = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/freshness-policy.json'), 'utf8'));
const linkPolicy = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/link-policy.json'), 'utf8'));
const { platforms } = loadCatalog();

const args = new Set(process.argv.slice(2));
const online = args.has('--online');
const strictMetadata = args.has('--strict-metadata');
const outputArg = process.argv.slice(2).find(arg => arg.startsWith('--output-dir='));
const outputDir = path.resolve(ROOT, outputArg ? outputArg.slice('--output-dir='.length) : 'reports/resource-audit');
const auditNow = new Date(process.env.AUDIT_DATE || new Date().toISOString());
const DAY = 24 * 60 * 60 * 1000;

function compilePolicies() {
    return (linkPolicy.entries || []).map(entry => ({ ...entry, regex: new RegExp(entry.pattern) }));
}
const compiledPolicies = compilePolicies();

function policyFor(url) {
    return compiledPolicies.find(entry => entry.regex.test(url)) || null;
}

function reviewState(value) {
    if (!value) return { status: 'unverified', ageDays: null, date: null };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return { status: 'invalid', ageDays: null, date: value };
    const date = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) return { status: 'invalid', ageDays: null, date: value };
    const ageDays = Math.floor((auditNow.getTime() - date.getTime()) / DAY);
    if (ageDays < -1) return { status: 'future', ageDays, date: value };
    if (ageDays <= freshnessPolicy.freshDays) return { status: 'fresh', ageDays, date: value };
    if (ageDays <= freshnessPolicy.reviewDueDays) return { status: 'review-due', ageDays, date: value };
    return { status: 'stale', ageDays, date: value };
}

function serviceFreshness(resources) {
    const states = resources.map(resource => reviewState(resource.verified));
    if (states.some(item => item.status === 'invalid' || item.status === 'future')) return 'invalid';
    if (states.some(item => item.status === 'unverified')) return 'unverified';
    if (states.some(item => item.status === 'stale')) return 'stale';
    if (states.some(item => item.status === 'review-due')) return 'review-due';
    return 'fresh';
}

function classifyHttp(httpStatus, policy) {
    if (policy?.expected === 'bot-blocked' && [403, 404, 429, 503].includes(httpStatus)) return 'bot-blocked';
    if (policy?.expected === 'auth-required' && httpStatus >= 200 && httpStatus < 404) return 'auth-required';
    if (httpStatus >= 200 && httpStatus < 400) return 'live';
    if (httpStatus === 401) return 'auth-required';
    if (httpStatus === 403 || httpStatus === 429) return 'bot-blocked';
    if (httpStatus === 404 || httpStatus === 410) return 'dead';
    if (httpStatus === 405) return 'method-restricted';
    if (httpStatus >= 500) return 'transient';
    return 'unknown';
}

async function requestOnce(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow',
            signal: controller.signal,
            headers: {
                'user-agent': 'Social-Media-Deletion-Guide trust-audit/1.0 (+https://github.com/imedkablavi/Social-Media-Deletion-Guide)',
                'accept': 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.5'
            }
        });
        return { httpStatus: response.status, finalUrl: response.url || url, error: null };
    } catch (error) {
        return { httpStatus: null, finalUrl: url, error: error?.name === 'AbortError' ? 'timeout' : String(error?.message || error) };
    } finally {
        clearTimeout(timer);
    }
}

async function probe(url) {
    const policy = policyFor(url);
    let last = null;
    for (let attempt = 1; attempt <= 2; attempt += 1) {
        last = await requestOnce(url);
        if (last.httpStatus !== null) {
            const state = classifyHttp(last.httpStatus, policy);
            if (state !== 'transient') return { ...last, state, attempts: attempt, policy: policy?.expected || null, policyReason: policy?.reason || null };
        }
        if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 750 * attempt));
    }
    return {
        ...last,
        state: last?.httpStatus ? classifyHttp(last.httpStatus, policy) : 'transient',
        attempts: 2,
        policy: policy?.expected || null,
        policyReason: policy?.reason || null
    };
}

async function mapLimit(items, limit, worker) {
    const output = new Array(items.length);
    let cursor = 0;
    async function run() {
        while (cursor < items.length) {
            const index = cursor++;
            output[index] = await worker(items[index], index);
        }
    }
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
    return output;
}

function md(value) {
    return String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
}

async function main() {
    const resourceRows = [];
    for (const platform of platforms) {
        (platform.resources || []).forEach((resource, index) => {
            const review = reviewState(resource.verified);
            resourceRows.push({
                service: platform.id || platform.name,
                serviceName: platform.displayName || platform.name || platform.id,
                index,
                type: resource.type || 'unknown',
                url: resource.url,
                official: resource.official === true,
                provenance: resource.provenance || (resource.official === true ? 'provider-reviewed' : 'unverified'),
                verified: resource.verified || null,
                reviewStatus: review.status,
                reviewAgeDays: review.ageDays,
                linkStatus: online ? 'pending' : 'not-checked',
                httpStatus: null,
                finalUrl: null,
                expectedAccess: policyFor(resource.url)?.expected || null,
                policyReason: policyFor(resource.url)?.reason || null
            });
        });
    }

    if (online) {
        const probes = await mapLimit(resourceRows, 6, row => probe(row.url));
        probes.forEach((probeResult, index) => {
            Object.assign(resourceRows[index], {
                linkStatus: probeResult.state,
                httpStatus: probeResult.httpStatus,
                finalUrl: probeResult.finalUrl,
                attempts: probeResult.attempts,
                expectedAccess: probeResult.policy,
                policyReason: probeResult.policyReason,
                networkError: probeResult.error
            });
        });
    }

    const serviceRows = platforms.map(platform => {
        const resources = resourceRows.filter(row => row.service === (platform.id || platform.name));
        const dated = resources.filter(row => row.verified).map(row => row.verified).sort();
        const linkCounts = resources.reduce((acc, row) => {
            acc[row.linkStatus] = (acc[row.linkStatus] || 0) + 1;
            return acc;
        }, {});
        return {
            service: platform.id || platform.name,
            name: platform.displayName || platform.name || platform.id,
            resources: resources.length,
            providerReviewed: resources.filter(row => row.official).length,
            reviewedResources: resources.filter(row => row.verified).length,
            freshness: serviceFreshness(resources),
            oldestVerified: dated[0] || null,
            newestVerified: dated.at(-1) || null,
            linkCounts
        };
    });

    const metadataErrors = [];
    for (const row of resourceRows) {
        if (!/^https:\/\//.test(String(row.url || ''))) metadataErrors.push(`${row.service}: non-HTTPS or invalid resource URL: ${row.url}`);
        if (row.reviewStatus === 'invalid' || row.reviewStatus === 'future') metadataErrors.push(`${row.service}: invalid review date ${row.verified} for ${row.url}`);
        if (row.official && !row.verified) metadataErrors.push(`${row.service}: first-party claim lacks an evidence-backed review date: ${row.url}`);
    }

    const dead = resourceRows.filter(row => row.linkStatus === 'dead');
    const summary = {
        generatedAt: auditNow.toISOString(),
        online,
        services: serviceRows.length,
        resources: resourceRows.length,
        providerReviewedResources: resourceRows.filter(row => row.official).length,
        unverifiedResources: resourceRows.filter(row => row.reviewStatus === 'unverified').length,
        reviewDueResources: resourceRows.filter(row => row.reviewStatus === 'review-due').length,
        staleResources: resourceRows.filter(row => row.reviewStatus === 'stale').length,
        confirmedDead: dead.length,
        authRequired: resourceRows.filter(row => row.linkStatus === 'auth-required').length,
        botBlocked: resourceRows.filter(row => row.linkStatus === 'bot-blocked').length,
        transient: resourceRows.filter(row => row.linkStatus === 'transient').length,
        metadataErrors: metadataErrors.length
    };

    const markdown = [
        '# Resource freshness and reachability audit',
        '',
        `Generated: ${summary.generatedAt}`,
        '',
        '## What this report proves',
        '',
        '- Manual freshness is derived only from explicit `verified` dates in the effective catalog.',
        '- Automated reachability is a separate observation and never refreshes manual verification metadata.',
        '- `auth-required` and `bot-blocked` are not counted as dead links.',
        '- `dead` is reserved for terminal missing responses (404/410) outside an explicit bot-block policy.',
        '',
        '## Summary',
        '',
        '| Metric | Count |',
        '| --- | ---: |',
        `| Services | ${summary.services} |`,
        `| Resources | ${summary.resources} |`,
        `| Provider-reviewed resources | ${summary.providerReviewedResources} |`,
        `| Missing manual review date | ${summary.unverifiedResources} |`,
        `| Review due | ${summary.reviewDueResources} |`,
        `| Stale | ${summary.staleResources} |`,
        `| Confirmed dead | ${summary.confirmedDead} |`,
        `| Auth required | ${summary.authRequired} |`,
        `| Bot blocked / rate limited | ${summary.botBlocked} |`,
        `| Transient / network | ${summary.transient} |`,
        `| Metadata errors | ${summary.metadataErrors} |`,
        '',
        '## Service freshness',
        '',
        '| Service | Resources | Provider-reviewed | Dated reviews | Freshness | Newest review |',
        '| --- | ---: | ---: | ---: | --- | --- |',
        ...serviceRows.map(row => `| ${md(row.name)} | ${row.resources} | ${row.providerReviewed} | ${row.reviewedResources} | ${row.freshness} | ${row.newestVerified || '—'} |`),
        '',
        '## Resources needing attention',
        '',
        '| Service | Type | Manual freshness | HTTP state | HTTP | Expected access | URL |',
        '| --- | --- | --- | --- | ---: | --- | --- |',
        ...resourceRows
            .filter(row => row.reviewStatus !== 'fresh' || (online && row.linkStatus !== 'live'))
            .map(row => `| ${md(row.serviceName)} | ${md(row.type)} | ${row.reviewStatus} | ${row.linkStatus} | ${row.httpStatus ?? '—'} | ${row.expectedAccess || '—'} | ${md(row.url)} |`),
        '',
        '## Metadata errors',
        '',
        ...(metadataErrors.length ? metadataErrors.map(item => `- ${item}`) : ['- None.']),
        ''
    ].join('\n');

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'resource-audit.json'), `${JSON.stringify({ summary, services: serviceRows, resources: resourceRows, metadataErrors }, null, 2)}\n`, 'utf8');
    fs.writeFileSync(path.join(outputDir, 'resource-audit.md'), markdown, 'utf8');
    console.log(markdown);

    if (dead.length > 0 || metadataErrors.some(error => !error.includes('first-party claim lacks'))) process.exitCode = 1;
    if (strictMetadata && metadataErrors.length > 0) process.exitCode = 1;
}

main().catch(error => {
    console.error(error?.stack || error);
    process.exitCode = 1;
});
