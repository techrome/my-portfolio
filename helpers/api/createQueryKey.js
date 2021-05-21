import * as c from "@/constants";
import { apiToken } from "@/config";

// "key" should be an array of at least one element
// (and sometimes a second element which should be an object!)
const createQueryKey = (key, { cacheTimestamp } = {}) => {
  const modifiedKey = [
    key[0],
    {
      ...(key[1] || {}),
      params: {
        [c.token]: apiToken,
        [c.version]: c.published,
        ...(cacheTimestamp ? { [c.cv]: cacheTimestamp } : {}),
        ...(key[1]?.params || {})
      }
    }
  ];

  return modifiedKey;
};

export default createQueryKey;
