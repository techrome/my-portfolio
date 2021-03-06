import React, { Fragment, useState, useRef, useEffect } from "react";
import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import toNumber from "lodash/toNumber";

import Project, { Skeleton } from "./project";
import * as c from "@/constants";
import Drawer from "@/components/Drawer";
import EmptyData from "@/components/EmptyData";
import { listItemsPerPage, apiProjectsListPart } from "@/config";
import useQuery from "@/helpers/useQuery";
import useApiLocalePrefix from "@/helpers/useApiLocalePrefix";

const emptySkeletons = [...new Array(listItemsPerPage)];

const useStyles = makeStyles(
  (theme) => ({
    divider: {
      margin: theme.spacing(3, 0)
    },
    pagination: {
      marginTop: theme.spacing(2),
      "& .MuiPagination-root": {
        display: "flex",
        justifyContent: "center"
      }
    }
  }),
  { index: 1 }
);

const SkeletonList = ({ ...props }) => {
  const cls = useStyles();

  return (
    <>
      {emptySkeletons.map((empty, index) => (
        <Fragment key={index}>
          <Skeleton />
          {index < emptySkeletons.length - 1 && (
            <Divider className={cls.divider} />
          )}
        </Fragment>
      ))}
    </>
  );
};

const ProjectList = ({ ...props }) => {
  const cls = useStyles();
  const [drawerInfo, setDrawerInfo] = useState({
    header: "",
    content: null,
    open: false
  });
  const [page, setPage] = useState(1);
  const [showPreviosData, setShowPreviosData] = useState(false);
  const previousDataTimeoutRef = useRef(null);
  const localePrefix = useApiLocalePrefix();
  const queryData = useQuery(
    [
      `/stories`,
      {
        params: {
          [c.starts_with]: `${localePrefix}${apiProjectsListPart}/`,
          [c.per_page]: listItemsPerPage,
          [c.page]: page
        }
      }
    ],
    { keepPreviousData: true }
  );
  const { data, isLoading, isSuccess, isFetching, isPreviousData } = queryData;
  const projects = data?.data?.[c.stories];
  const totalPages = Math.ceil(
    toNumber(data?.headers?.[c.total]) / listItemsPerPage
  );

  useEffect(() => {
    return () => {
      clearTimeout(previousDataTimeoutRef.current);
    };
  }, []);

  const closeDrawer = () => {
    setDrawerInfo({ header: "", content: null, open: false });
  };

  const onPageChange = (e, value) => {
    clearTimeout(previousDataTimeoutRef.current);

    setPage(value);

    // show previous page data on page change, but only for 300ms, if it takes
    // longer than that only then show loading state (just for the sake of better UX)
    setShowPreviosData(true);
    previousDataTimeoutRef.current = setTimeout(() => {
      setShowPreviosData(false);
    }, 300);
  };

  const loading = isLoading || (isFetching && !showPreviosData);
  const success = isSuccess || isPreviousData;
  const hasProjects = projects?.length > 0;
  return (
    <>
      <Drawer
        open={drawerInfo.open}
        header={drawerInfo.header}
        onClose={closeDrawer}
      >
        {drawerInfo.content}
      </Drawer>
      {loading ? (
        <SkeletonList />
      ) : success && hasProjects ? (
        projects.map((el, index) => (
          <Fragment key={el?.[c.id]}>
            <Project data={el?.[c.content]} setDrawerInfo={setDrawerInfo} />
            {index < projects.length - 1 && <Divider className={cls.divider} />}
          </Fragment>
        ))
      ) : (
        <EmptyData />
      )}
      {!loading && success && (
        <div className={cls.pagination}>
          <Pagination
            color="primary"
            page={page}
            count={totalPages}
            onChange={onPageChange}
            size="large"
          />
        </div>
      )}
    </>
  );
};

export default ProjectList;
