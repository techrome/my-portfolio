const prodUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

module.exports = {
  siteUrl: prodUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/get-dynamic-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [`${prodUrl}/get-dynamic-sitemap.xml`]
  }
};
