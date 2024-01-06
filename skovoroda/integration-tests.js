// Require Cypress
const cypress = require('cypress')
// Get command line arguments
const argv = process.argv.slice(2)
// Determine the device type
const device = argv.includes('--mobile')
    ? 'mobile'
    : argv.includes('--tablet')
    ? 'tablet'
    : 'desktop'
const cypressOptions = {
    // Expose the device type as Cypress environment variables
    env: {
        isMobile: device === 'mobile',
        isTablet: device === 'tablet',
        isDesktop: device === 'desktop'
    },
    config: {
        baseUrl: `http://localhost:3000`,
        // Mobile: emulate iPhone 5
        ...(device === 'mobile' && {
            userAgent:
                'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
            viewportWidth: 320,
            viewportHeight: 568
        }),
        // Tablet: emulate iPad in landscape mode
        ...(device === 'tablet' && {
            userAgent:
                'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
            viewportWidth: 1024,
            viewportHeight: 768
        }),
        // Desktop: use default browser user agent
        ...(device === 'desktop' && {
            viewportWidth: 1440,
            viewportHeight: 900
        })
    }
}
function runCypress() {
    // Use --open to open the Cypress UI instead of running
    // the tests in headless mode from the command line
    if (argv.includes('--open')) {
        return cypress.open(cypressOptions)
    }
    return cypress.run(cypressOptions)
}
runCypress()
    .then(results => {
        if (results.totalFailed > 0 || results.failures > 0) {
            // Make sure to exit with an error code if tests failed
            process.exit(1)
        }
    })
    .catch(err => {
        console.error(err.stack || err)
        process.exit(1)
    })