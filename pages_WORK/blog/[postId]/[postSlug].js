import axios from "axios";

import sleep from "@/helpers/sleep";

const Dummy = ({ rand }) => {
  return <h1>YEAH - {rand}</h1>;
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

  if (data.params?.postSlug === res?.data) {
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
