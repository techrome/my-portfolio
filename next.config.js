const { locales, defaultLocale } = require("./i18n.json");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const additionalLocales = [...locales];
additionalLocales.splice(locales.indexOf(defaultLocale), 1);

module.exports = withBundleAnalyzer({
  i18n: { locales, defaultLocale },
  compress: false,
  async rewrites() {
    return [
      {
        source: "/blog/:postId",
        destination: "/blog/:postId/no-slug"
      }
    ];
  },
  async redirects() {
    return [
      // just to avoid rendering the same page with different locales concurrently
      // because there're some file operations etc.
      ...(additionalLocales.length > 0
        ? [
            {
              source: `/(${additionalLocales.join("|")})/dynamic-sitemap.xml`,
              destination: "/dynamic-sitemap.xml",
              permanent: true,
              locale: false
            }
          ]
        : [])
    ];
  }
});
