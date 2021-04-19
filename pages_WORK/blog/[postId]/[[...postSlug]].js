import axios from "axios";

const Dummy = ({ rand }) => {
  return <h1>YEAH - {rand}</h1>;
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getStaticProps = async (data) => {
  console.log("GSP Data", data);
  let res = null;
  try {
    res = await axios.get(
      "https://test-6b737-default-rtdb.firebaseio.com/title.json"
    );
    await sleep(2000);
  } catch (err) {}

  if (
    data.params?.postSlug?.[0] === res?.data &&
    data.params?.postSlug?.length === 1
  ) {
    return { revalidate: 40, props: { rand: res?.data } };
  }

  return {
    revalidate: 20,
    redirect: {
      destination: `${
        data.locale === data.defaultLocale ? "" : `/${data.locale}`
      }/blog/${data.params.postId}/${res?.data}`,
      permanent: false
    }
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking"
  };
};

export default Dummy;
