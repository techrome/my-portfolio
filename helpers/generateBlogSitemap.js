import { promises as fs } from "fs";
import path from "path";
import toNumber from "lodash/toNumber";

import { locales } from "@/i18n.json";
import defaultQueryFn from "@/helpers/defaultQueryFn";
import createQueryKey from "@/helpers/createQueryKey";
import splitArrayIntoChunks from "@/helpers/splitArrayIntoChunks";
import buildSitemapXML from "@/helpers/buildSitemapXML";
import sleep from "@/helpers/sleep";
import {
  apiBlogListPart,
  maxQueryListItems,
  maxSitemapUrls,
  prodUrl
} from "@/config";
import * as c from "@/constants";

const getBlogPosts = async ({ page, cacheTimestamp }) => {
  const res = await defaultQueryFn({
    queryKey: createQueryKey(
      [
        `/stories`,
        {
          params: {
            [c.starts_with]: `${apiBlogListPart}/`,
            [c.per_page]: maxQueryListItems,
            [c.page]: page
          }
        }
      ],
      { cacheTimestamp }
    )
  });
  return res;
};

const generateBlogSitemap = async ({ cacheTimestamp }) => {
  // intentionally not using try/catch here to propagate errors to the caller function

  const firstPage = 1;
  const firstRes = await getBlogPosts({ page: firstPage, cacheTimestamp });

  const totalPages = Math.ceil(
    toNumber(firstRes?.headers?.[c.total]) / maxQueryListItems
  );

  let relativeUrls = [
    ...firstRes.data[c.stories].map(
      (story) => `/blog/${story[c.id]}/${story[c.slug]}`
    )
  ];

  for (let page = firstPage + 1; page <= totalPages; page++) {
    let res = null;

    try {
      res = await getBlogPosts({ page, cacheTimestamp });
    } catch (err) {
      // in case of too many requests, we can wait before making another request.
      // if that also fails, then fail everything

      await sleep(2000);
      try {
        res = await getBlogPosts({ page, cacheTimestamp });
      } catch (err2) {
        throw err2;
      }
    }

    relativeUrls.push(
      ...res.data[c.stories].map(
        (story) => `/blog/${story[c.id]}/${story[c.slug]}`
      )
    );
  }

  const allFields = relativeUrls.flatMap((url) =>
    locales.map((locale) => ({
      loc: `${prodUrl}/${locale}${url}`
    }))
  );
  const splittedFields = splitArrayIntoChunks(allFields, maxSitemapUrls);
  const readySitemaps = splittedFields.map((arr) => buildSitemapXML(arr));

  const blogSitemapsFolder = path.join(
    process.cwd(),
    "public",
    "dynamic-sitemaps",
    "blog"
  );
  await fs.rmdir(blogSitemapsFolder, { recursive: true, maxRetries: 1 });
  await fs.mkdir(blogSitemapsFolder);

  let sitemapPathsWeb = [];

  for (let i = 0; i < readySitemaps.length; i++) {
    const fileName = `${i + 1}.xml`;
    const sitemapFilePath = path.join(
      process.cwd(),
      "public",
      "dynamic-sitemaps",
      "blog",
      fileName
    );
    await fs.writeFile(sitemapFilePath, readySitemaps[i]);
    sitemapPathsWeb.push(`${prodUrl}/dynamic-sitemaps/blog/${fileName}`);
  }

  return sitemapPathsWeb;
};

export default generateBlogSitemap;
