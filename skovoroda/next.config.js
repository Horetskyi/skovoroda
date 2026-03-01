/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  reactMaxHeadersLength: 12000, // default is 6000
  
  // Disable legacy browser polyfills for modern JavaScript features
  // This reduces bundle size by ~13 KiB by not transpiling ES6+ features
  experimental: {
    legacyBrowsers: false,
  },
  
  images: {
    deviceSizes: [240, 360, 420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 31536000 / 6, // 2 month cache for optimized images
  },
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  // },
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

module.exports = withBundleAnalyzer(nextConfig);
