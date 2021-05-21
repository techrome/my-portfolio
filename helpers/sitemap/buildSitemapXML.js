// taken from next-sitemap https://github.com/iamvishnusankar/next-sitemap

const withXMLTemplate = (content, isSitemapList) => {
  return isSitemapList
    ? `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.google.com/schemas/sitemap/0.84">\n${content}</sitemapindex>`
    : `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${content}</urlset>`;
};

const buildSitemapXml = (fields, isSitemapList) => {
  const content = fields.reduce((prev, curr) => {
    let field = "";

    // Iterate all object keys and key value pair to field-set
    for (const key of Object.keys(curr)) {
      if (curr[key]) {
        field += `<${key}>${curr[key]}</${key}>`;
      }
    }

    // Append previous value and return
    return isSitemapList
      ? `${prev}<sitemap>${field}</sitemap>\n`
      : `${prev}<url>${field}</url>\n`;
  }, "");

  return withXMLTemplate(content, isSitemapList);
};

export default buildSitemapXml;
