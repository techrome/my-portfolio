import axios from "axios";
import { apiUrl } from "@/config";
import qs from "query-string";

const defaultQueryFn = async ({ queryKey }) => {
  const stringifiedQuery = qs.stringify(queryKey[1]?.params);
  const { data, headers } = await axios.get(
    `${apiUrl}${queryKey[0]}${stringifiedQuery ? `?${stringifiedQuery}` : ""}`
  );
  return { data, headers };
};

export default defaultQueryFn;
