import * as fs from "fs/promises";

export const getStaticProps = async ({ locale }) => {
  try {
    await fs.writeFile("public/dynamic-sitemaps/1.xml", "DYNAMIC DATAAAA");
  } catch (err) {
    console.error("Error while writing file", err);
  }

  return {
    revalidate: 30,
    redirect: {
      destination: "/robots.txt",
      permanent: false
    }
  };
};

// Just to prevent next.js errors
const DummyComponent = () => {
  return null;
};

export default DummyComponent;
