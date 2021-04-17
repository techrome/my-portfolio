const { locales, defaultLocale } = require("./i18n.json");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

module.exports = withBundleAnalyzer({
  i18n: { locales, defaultLocale },
  compress: false
});
