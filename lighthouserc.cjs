module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      numberOfRuns: 2,
      url: [
        'http://localhost/',
        'http://localhost/en/services/twitter/',
        'http://localhost/ar/services/instagram/'
      ],
      settings: {
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          disabled: false
        },
        throttlingMethod: 'simulate'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8, aggregationMethod: 'median-run' }],
        'categories:accessibility': ['error', { minScore: 0.95, aggregationMethod: 'median-run' }],
        'categories:best-practices': ['error', { minScore: 0.9, aggregationMethod: 'median-run' }],
        'categories:seo': ['error', { minScore: 0.95, aggregationMethod: 'median-run' }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 3500, aggregationMethod: 'median-run' }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1, aggregationMethod: 'median-run' }],
        'total-blocking-time': ['warn', { maxNumericValue: 500, aggregationMethod: 'median-run' }]
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './reports/lighthouse'
    }
  }
};
