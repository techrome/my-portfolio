import React, { useState, useMemo, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Close, Search, FilterList } from "@material-ui/icons";
import {
  Typography,
  InputAdornment,
  IconButton,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useTranslation from "next-translate/useTranslation";
import { dehydrate } from "react-query/hydration";
import qs from "query-string";
import {
  format as formatDate,
  parse as parseDate,
  isValid as isValidDate
} from "date-fns";
import toNumber from "lodash/toNumber";
import debounce from "lodash/debounce";

import WithLayout from "@/components/WithLayout";
import Container from "@/components/Container";
import FlexList from "@/components/FlexList";
import Input from "@/components/Fields/input";
import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import FormBuilder from "@/components/FormBuilder";
import TextEllipsis from "@/components/TextEllipsis";
import EmptyData from "@/components/EmptyData";
import useQuery from "@/helpers/api/useQuery";
import useApiLocalePrefix from "@/helpers/api/useApiLocalePrefix";
import createQueryClient from "@/helpers/api/createQueryClient";
import createQueryKey from "@/helpers/api/createQueryKey";
import prepareGlobalData from "@/helpers/api/prepareGlobalData";
import transformQuery from "@/helpers/transformQuery";
import stripQueryFromArrays from "@/helpers/stripQueryFromArrays";
import {
  revalidatePageSeconds,
  apiBlogListPart,
  listItemsPerPage,
  siteName,
  defaultLocale,
  dateTimeFormat
} from "@/config";
import * as c from "@/constants";

const queryMapping = {
  // for client : for server
  [c.search]: {
    name: `${c.filter_query}[${c.title}][${c.like}]`,
    modifyValue: (value) => `*${value}*`
  },
  [c.date_before]: c.first_published_at_lt,
  [c.date_after]: c.first_published_at_gt,
  [c.sort]: c.sort_by,
  [c.page]: c.page
};

const filtersFormConfig = {
  namespace: "blog",
  fields: [
    {
      name: c.date_after,
      fieldType: "dateTime",
      emptyValue: null,
      placeholder: "after"
    },
    {
      name: c.date_before,
      fieldType: "dateTime",
      emptyValue: null,
      placeholder: "before"
    },
    {
      name: c.sort,
      fieldType: "select",
      emptyValue: null,
      placeholder: "sort by"
    }
  ]
};

const useStyles = makeStyles(
  (theme) => ({
    main: {
      padding: theme.spacing(3, 0)
    },
    controlsWrapper: {
      margin: theme.spacing(3, 0)
    },
    controls: {
      alignItems: "center"
    },
    searchWrapper: {
      width: "400px",
      [theme.breakpoints.down("md")]: {
        width: "100%"
      }
    },
    filtersButtonWrapper: {
      alignItems: "center"
    }
  }),
  { index: 1 }
);

const initialFilters = {
  [c.page]: 1,
  [c.search]: "",
  [c.date_after]: null,
  [c.date_before]: null,
  [c.sort]: null
};

const convertAdvancedFilters = (filters) => {
  const dateAfter = filters[c.date_after]
    ? formatDate(filters[c.date_after], dateTimeFormat)
    : initialFilters[c.date_after];
  const dateBefore = filters[c.date_before]
    ? formatDate(filters[c.date_before], dateTimeFormat)
    : initialFilters[c.date_before];
  const sortValue = filters[c.sort]
    ? filters[c.sort].value
    : initialFilters[c.sort];

  return {
    ...filters,
    [c.date_after]: dateAfter,
    [c.date_before]: dateBefore,
    [c.sort]: sortValue
  };
};

const Blog = ({ ...props }) => {
  const { t } = useTranslation("blog");
  const cls = useStyles();
  const localePrefix = useApiLocalePrefix();
  const router = useRouter();
  const [filters, setFilters] = useState(initialFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const hasAdvancedFilters =
    !!filters[c.date_after] || !!filters[c.date_before] || !!filters[c.sort];

  const sortOptions = useMemo(
    () => [
      {
        title: t("title_asc"),
        value: `${c.content}.${c.title}:${c.asc}`
      },
      {
        title: t("title_desc"),
        value: `${c.content}.${c.title}:${c.desc}`
      }
    ],
    []
  );

  const queryParams = useMemo(() => {
    let resultServerQuery = {
      [c.page]: filters[c.page]
    };
    let resultFilters = {
      ...filters
    };

    if (!router.isReady) {
      return resultServerQuery;
    }

    const cleanQuery = stripQueryFromArrays(router.query);
    const convertedQuery = transformQuery({
      queryObj: cleanQuery,
      queryMapping,
      isForServer: true
    });

    // kill me
    resultFilters[c.page] = cleanQuery[c.page] || initialFilters[c.page];
    resultFilters[c.search] = cleanQuery[c.search] || initialFilters[c.search];

    resultFilters[c.date_after] = cleanQuery[c.date_after]
      ? parseDate(cleanQuery[c.date_after], dateTimeFormat, new Date())
      : initialFilters[c.date_after];

    resultFilters[c.date_before] = cleanQuery[c.date_before]
      ? parseDate(cleanQuery[c.date_before], dateTimeFormat, new Date())
      : initialFilters[c.date_before];

    resultFilters[c.sort] = cleanQuery[c.sort]
      ? sortOptions.find((el) => el.value === cleanQuery[c.sort])
      : initialFilters[c.sort];

    setFilters(resultFilters);

    resultServerQuery = {
      ...resultServerQuery,
      ...convertedQuery
    };

    console.log("converted query", convertedQuery);
    console.log("resultServerQuery", resultServerQuery);
    return resultServerQuery;
  }, [router.query, router.isReady]);

  const pushQuery = useCallback((query) => {
    router.push({ path: "/blog", query }, undefined, { shallow: true });
  }, []);

  const debouncedPushQuery = useCallback(debounce(pushQuery, 400), []);

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const onSearchChange = (val) => {
    const updatedFilters = {
      ...filters,
      [c.search]: val
    };
    const filtersForQuery = convertAdvancedFilters(updatedFilters);
    setFilters(updatedFilters);
    debouncedPushQuery(filtersForQuery);
  };

  const queryData = useQuery(
    [
      `/stories`,
      {
        params: {
          [c.starts_with]: `${localePrefix}${apiBlogListPart}/`,
          [c.per_page]: listItemsPerPage,
          ...queryParams
        }
      }
    ],
    { keepPreviousData: true }
  );

  return (
    <div className={cls.main}>
      <Head>
        <title>
          {t("common:blog")} | {siteName}
        </title>
        <meta
          property="og:title"
          content={`${t("common:blog")} | ${siteName}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={t("blogDescription")} />
        <meta name="description" content={t("blogDescription")} />
      </Head>
      <Container>
        <Drawer
          open={drawerOpen}
          header={t("filters")}
          onClose={closeDrawer}
          maxWidth="500px"
        >
          <FormBuilder
            defaultValues={{
              [c.date_after]: filters[c.date_after],
              [c.date_before]: filters[c.date_before],
              [c.sort]: filters[c.sort]
            }}
            config={filtersFormConfig}
            fieldProps={{
              [c.sort]: {
                options: sortOptions
              }
            }}
            afterFieldsRender={(formstate) => (
              <>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={() => {
                      const convertedFilters = convertAdvancedFilters(
                        formstate.values
                      );

                      pushQuery({
                        ...filters,
                        ...convertedFilters
                      });
                      closeDrawer();
                    }}
                  >
                    {t("common:ok")}
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => {
                      closeDrawer();
                    }}
                  >
                    {t("common:cancel")}
                  </Button>
                </Grid>
              </>
            )}
          />
        </Drawer>
        <Typography variant="h1">{t("common:blog")}</Typography>
        <div className={cls.controlsWrapper}>
          <FlexList spacing={2} className={cls.controls}>
            <div className={cls.searchWrapper}>
              <Input
                value={filters[c.search]}
                onChange={onSearchChange}
                placeholder={t("search")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  ...(!!filters[c.search] && {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            onSearchChange("");
                          }}
                        >
                          <Close />
                        </IconButton>
                      </InputAdornment>
                    )
                  })
                }}
              />
            </div>
            <div>
              <FlexList spacing={1} className={cls.filtersButtonWrapper}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<FilterList />}
                  onClick={() => {
                    setDrawerOpen(true);
                  }}
                >
                  Filters
                </Button>
                {hasAdvancedFilters && (
                  <IconButton
                    onClick={() => {
                      pushQuery({
                        ...initialFilters,
                        [c.page]: filters[c.page],
                        [c.search]: filters[c.search]
                      });
                    }}
                  >
                    <Close />
                  </IconButton>
                )}
              </FlexList>
            </div>
          </FlexList>
        </div>
        <Typography>
          {t("foundPosts", {
            count: queryData?.data?.data?.[c.stories]?.length || 0
          })}
        </Typography>
        <pre>{JSON.stringify(queryData, 0, 2)}</pre>
      </Container>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  const queryClient = createQueryClient();
  const { cacheTimestamp } = await prepareGlobalData({ queryClient });
  const localePrefix = locale !== defaultLocale ? `${locale}/` : "";

  await queryClient.prefetchQuery(
    createQueryKey(
      [
        `/stories`,
        {
          params: {
            [c.starts_with]: `${localePrefix}${apiBlogListPart}/`,
            [c.per_page]: listItemsPerPage,
            [c.page]: initialFilters[c.page]
          }
        }
      ],
      { cacheTimestamp }
    )
  );

  return {
    revalidate: revalidatePageSeconds,
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

export default WithLayout(Blog);
