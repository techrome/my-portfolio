import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import BlogPost, { Skeleton } from "./blogPost";
import EmptyData from "@/components/EmptyData";
import { listItemsPerPage } from "@/config";

const emptySkeletons = [...new Array(listItemsPerPage)];

const useStyles = makeStyles(
  (theme) => ({
    list: {
      margin: theme.spacing(2, 0),
      "& > * + *": {
        marginTop: theme.spacing(2)
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
        <Skeleton key={index} />
      ))}
    </>
  );
};

const BlogPostList = ({ loading, list, ...props }) => {
  const cls = useStyles();

  return (
    <div className={cls.list}>
      {loading ? (
        <SkeletonList />
      ) : list?.length > 0 ? (
        list.map((el, index) => <BlogPost key={index} data={el} />)
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default BlogPostList;
