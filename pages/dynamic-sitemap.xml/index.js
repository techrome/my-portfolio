import createQueryClient from "@/helpers/api/createQueryClient";
import prepareGlobalData from "@/helpers/api/prepareGlobalData";
import generateBlogSitemap from "@/helpers/sitemap/generateBlogSitemap";
import buildSitemapXML from "@/helpers/sitemap/buildSitemapXML";
import { revalidatePageSeconds } from "@/config";

// Just to prevent next.js errors
const DummyComponent = () => {
  return null;
};

export const getServerSideProps = async (context) => {
  // this queryClient doesn't matter, it's just a quick way to get cacheTimeStamp without
  // manually calling axios and all that stuff
  const queryClient = createQueryClient();
  const { cacheTimestamp } = await prepareGlobalData({ queryClient });

  const blogSitemapFields = (await generateBlogSitemap({ cacheTimestamp })).map(
    (path) => ({
      loc: path
    })
  );

  const allSitemapFields = [...blogSitemapFields];

  if (context && context.res) {
    const { res } = context;

    res.setHeader("Content-Type", "application/xml");
    res.setHeader(
      "Cache-Control",
      `s-maxage=${revalidatePageSeconds}, stale-while-revalidate=${revalidatePageSeconds}`
    );
    res.write(buildSitemapXML(allSitemapFields, true));
    res.end();
  }

  return {
    props: {}
  };
};

export default DummyComponent;
