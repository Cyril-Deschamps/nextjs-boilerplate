/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */


const { i18n } = require('./next-i18next.config.js');
const withTranslateRoutes = require('next-translate-routes/plugin')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(withTranslateRoutes({
  output: 'standalone',
  reactStrictMode: true,
  i18n,
  sassOptions: {
    fiber: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      }, {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  env: {
    REACT_APP_API_HOST: process.env.REACT_APP_API_HOST,
    REACT_APP_HOST: process.env.REACT_APP_HOST,
    REACT_APP_GA_MEASUREMENT_ID: process.env.REACT_APP_GA_MEASUREMENT_ID,
    REACT_APP_WEBHOOK_SECRET: process.env.REACT_APP_WEBHOOK_SECRET,
  }
}));
