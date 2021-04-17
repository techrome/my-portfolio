//import * as fs from "fs/promises";

// Just to prevent next.js errors
const DummyComponent = () => {
  return null;
};

export const getServerSideProps = async (context) => {
  //console.log("context", context);

  if (context && context.res) {
    const { res } = context;

    // Set header
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

    // Write the sitemap context to resonse
    res.write(`${Math.random()} / DYNAMIC`);

    // End response
    res.end();
  }

  return {
    props: {}
  };
};

export default DummyComponent;
