import createQueryKey from "./createQueryKey";
import * as c from "@/constants";
import { isdev } from "@/config";

const prepareGlobalData = async ({ queryClient } = {}) => {
  let res = null;
  try {
    res = await queryClient.fetchQuery(createQueryKey(["/spaces/me"]));
  } catch (err) {
    isdev &&
      console.error("Error response from loading /spaces/me", err?.response);
  }

  return { cacheTimestamp: res?.data?.[c.space]?.[c.version] };
};

export default prepareGlobalData;
