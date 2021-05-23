import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Typography } from "@material-ui/core";
import { Skeleton as MuiSkeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import {
  Schedule as ScheduleIcon,
  Update as UpdateIcon
} from "@material-ui/icons";
import dayjs from "dayjs";
import clsx from "clsx";

import { dateFormatPretty } from "@/config";
import * as c from "@/constants";
import FlexList from "@/components/FlexList";
import useTranslation from "next-translate/useTranslation";
import TextEllipsis from "../TextEllipsis";

const stopPropagation = (e) => {
  e.stopPropagation();
};

const useStyles = makeStyles(
  (theme) => ({
    main: {
      border: `1px solid ${theme.palette.divider}`,
      transition: "0.2s",
      padding: theme.spacing(2),
      cursor: "pointer",
      borderRadius: theme.spacing(0.5),
      wordBreak: "break-word",
      "&:hover": {
        boxShadow: theme.shadows[4],
        ...(theme.palette.type === "dark"
          ? {
              backgroundColor: theme.palette.background.paper
            }
          : {})
      }
    },
    top: {
      display: "flex",
      marginBottom: theme.spacing(2)
    },
    image: {
      marginRight: theme.spacing(2),
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.spacing(0.5),
      transition: "0.2s",
      objectFit: "cover",
      width: "80px",
      height: "80px",
      [theme.breakpoints.up("md")]: {
        width: "120px",
        height: "120px"
      }
    },
    noBorder: {
      border: "none"
    },
    title: {
      marginBottom: theme.spacing(1),
      "&:hover": {
        textDecoration: "underline"
      }
    },
    titleSkeleton: {
      marginBottom: theme.spacing(1)
    },
    bottom: {
      marginTop: theme.spacing(2)
    },
    timeWrapper: {
      display: "flex",
      alignItems: "center"
    },
    timeIcon: {
      marginRight: theme.spacing(1)
    }
  }),
  { index: 1 }
);

export const Skeleton = ({ ...props }) => {
  const cls = useStyles();

  return (
    <div>
      <div className={cls.top}>
        <MuiSkeleton variant="rect" className={clsx(cls.image, cls.noBorder)} />
        <div style={{ flex: 1 }}>
          <Typography variant="h4" className={cls.titleSkeleton}>
            <MuiSkeleton />
          </Typography>
          <Typography variant="body2">
            <MuiSkeleton />
          </Typography>
        </div>
      </div>
      <div className={cls.bottom}>
        <MuiSkeleton />
      </div>
    </div>
  );
};

const BlogPost = ({ data, ...props }) => {
  const cls = useStyles();
  const { t } = useTranslation("blog");
  const router = useRouter();
  const content = data[c.content];

  const postLink = `/blog/${data[c.id]}/${data[c.slug]}`;

  return (
    <div
      className={cls.main}
      onClick={() => {
        router.push(postLink);
      }}
    >
      <div className={cls.top}>
        {!!content[c.image][c.filename] && (
          <img
            className={cls.image}
            alt={content[c.title]}
            src={content[c.image][c.filename]}
          />
        )}
        <div>
          <Link href={postLink}>
            <a onClick={stopPropagation}>
              <Typography variant="h4" className={cls.title}>
                {content[c.title]}
              </Typography>
            </a>
          </Link>
          <TextEllipsis rows={3}>
            <Typography variant="body2" color="textSecondary">
              {content[c.description]}
            </Typography>
          </TextEllipsis>
        </div>
      </div>
      <div className={cls.bottom}>
        <FlexList spacing={2}>
          <div className={cls.timeWrapper}>
            <ScheduleIcon fontSize="small" className={cls.timeIcon} />
            <Typography variant="overline" color="textSecondary">
              {`${t("created")}: ${dayjs(data[c.first_published_at]).format(
                dateFormatPretty
              )}`}
            </Typography>
          </div>
          <div className={cls.timeWrapper}>
            <UpdateIcon fontSize="small" className={cls.timeIcon} />
            <Typography variant="overline" color="textSecondary">
              {`${t("updated")}: ${dayjs(data[c.published_at]).format(
                dateFormatPretty
              )}`}
            </Typography>
          </div>
        </FlexList>
      </div>
    </div>
  );
};

export default BlogPost;
