import createQueryClient from "@/helpers/createQueryClient";
import prepareGlobalData from "@/helpers/prepareGlobalData";
import generateBlogSitemap from "@/helpers/generateBlogSitemap";
import buildSitemapXML from "@/helpers/buildSitemapXML";
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

  const blogSitemapFields = await (
    await generateBlogSitemap({ cacheTimestamp })
  ).map((path) => ({
    loc: path
  }));

  if (context && context.res) {
    const { res } = context;

    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", `s-maxage=${60}, stale-while-revalidate`);
    res.write(buildSitemapXML(blogSitemapFields, true));
    res.end();
  }

  return {
    props: {}
  };
};

export default DummyComponent;
