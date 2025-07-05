/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [240, 360, 420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
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
  transpilePackages: ['@mui/x-charts', '@mui/material'],
  // i18n: {
  //   locales: ['uk'],
  //   defaultLocale: 'uk',
  //   localeDetection: false,
  // },
}

module.exports = nextConfig
