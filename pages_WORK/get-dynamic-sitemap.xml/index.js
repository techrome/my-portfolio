//import * as fs from "fs/promises";
//import { revalidatePageSeconds } from "@/config";
import axios from "axios";

// Just to prevent next.js errors
const DummyComponent = () => {
  return null;
};

export const getServerSideProps = async (context) => {
  const rand = Math.random();
  let res = {};
  if (context && context.res) {
    const { res } = context;

    try {
      res = await axios.post("https://reqres.in/api/users", {
        title: `test-${rand}`
      });
    } catch (err) {}

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", `s-maxage=${60}, stale-while-revalidate`);

    res.write(`${res.data} / ${rand} / DYNAMIC`);

    res.end();
  }

  return {
    props: {}
  };
};

export default DummyComponent;
