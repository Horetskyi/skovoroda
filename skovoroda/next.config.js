/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      cleanupIDs: false
                    }
                  }
                }
              ]
            }
          }
        }
      ]
    });
    return config;
  },
  // i18n: {
  //   locales: ['uk'],
  //   defaultLocale: 'uk',
  //   localeDetection: false,
  // },
}

module.exports = nextConfig
