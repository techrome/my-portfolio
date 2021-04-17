const { prodUrl } = require("@/config/index");

module.exports = {
  siteUrl: prodUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/get-dynamic-sitemap"],
  robotsTxtOptions: {
    additionalSitemaps: [`${prodUrl}/get-dynamic-sitemap`]
  }
};
