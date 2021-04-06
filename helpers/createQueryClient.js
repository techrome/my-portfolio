import { queryStaleTimeMs, queryCacheTimeMs } from "@/config";
import { QueryClient } from "react-query";
import defaultQueryFn from "./defaultQueryFn";

const createQueryQlient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: queryStaleTimeMs,
        cacheTime: queryCacheTimeMs,
        queryFn: defaultQueryFn,
        retry: 1,
        retryDelay: 1000,
        refetchOnWindowFocus: false
      }
    }
  });
};

export default createQueryQlient;
