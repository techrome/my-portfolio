import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSnackbar } from "notistack";
import useTranslation from "next-translate/useTranslation";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

import * as c from "@/constants";
import appKeys from "@/constants/localeKeys/app";
import createQueryKey from "./createQueryKey";

const defaultUseQuery = (key, options = {}) => {
  const { isFetching, isIdle, data } = useQuery(createQueryKey(["/spaces/me"]));
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { t } = useTranslation("common");

  const modifiedKey = createQueryKey(key, {
    cacheTimestamp: data?.data?.[c.space]?.[c.version]
  });

  const queryResult = useQuery(modifiedKey, {
    ...options,
    enabled:
      !isFetching &&
      !isIdle &&
      (options.hasOwnProperty("enabled") ? options.enabled : true)
  });

  useEffect(() => {
    if (queryResult.error && queryResult.isError) {
      const err = queryResult.error;
      const errorMessage =
        err?.message && !err?.response
          ? err.message
          : err?.response?.data?.error || t(appKeys.errorDefault);

      enqueueSnackbar(errorMessage, {
        action: (myKey) => (
          <IconButton onClick={() => closeSnackbar(myKey)}>
            <Close fontSize="small" style={{ color: "#fff" }} />
          </IconButton>
        ),
        variant: "error"
      });
    }
  }, [queryResult.error, queryResult.isError]);

  return queryResult;
};

export default defaultUseQuery;
