import React from "react";
import { Button, Typography } from "@material-ui/core";
import { Skeleton as MuiSkeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { Link as LinkIcon, Code, InfoOutlined } from "@material-ui/icons";
import domPurify from "dompurify";

import * as c from "@/constants";
import FlexList from "@/components/FlexList";
import HTMLContent from "@/components/HTMLContent";
import useTranslation from "next-translate/useTranslation";

const useStyles = makeStyles(
  (theme) => ({
    main: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        alignItems: "center"
      }
    },
    image: {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.spacing(0.5),
      transition: "border 0.2s",
      objectFit: "cover",
      width: "80px",
      height: "80px",
      [theme.breakpoints.up("md")]: {
        width: "120px",
        height: "120px"
      }
    },
    info: {
      marginLeft: theme.spacing(2),
      flex: 1
    },
    title: {
      marginBottom: theme.spacing(1)
    },
    desktopOnly: {
      [theme.breakpoints.down("md")]: {
        display: "none"
      }
    },
    mobileOnly: {
      marginTop: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    }
  }),
  { index: 1 }
);

const Buttons = ({ data, onDetailsClick, ...props }) => {
  const cls = useStyles();
  const { t } = useTranslation("common");

  return (
    <FlexList spacing={2}>
      {!!data?.[c.url]?.[c.url] && (
        <a
          href={data?.[c.url]?.[c.url]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="contained" color="primary" startIcon={<LinkIcon />}>
            {t("visit website")}
          </Button>
        </a>
      )}
      {!!data?.[c.code_url]?.[c.url] && (
        <a
          href={data?.[c.code_url]?.[c.url]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="contained" color="secondary" startIcon={<Code />}>
            {t("source code")}
          </Button>
        </a>
      )}
      {!!data?.[c.details]?.[c.content] && (
        <Button
          onClick={onDetailsClick}
          variant="contained"
          startIcon={<InfoOutlined />}
        >
          {t("details")}
        </Button>
      )}
    </FlexList>
  );
};

export const Skeleton = ({ ...props }) => {
  const cls = useStyles();

  return (
    <div>
      <div className={cls.main}>
        <MuiSkeleton variant="rect">
          <img className={cls.image} />
        </MuiSkeleton>
        <div className={cls.info}>
          <Typography variant="h4" className={cls.title}>
            <MuiSkeleton />
          </Typography>
          <div className={cls.desktopOnly}>
            <MuiSkeleton variant="rect" height="40px" />
          </div>
        </div>
      </div>
      <div className={cls.mobileOnly}>
        <MuiSkeleton variant="rect" height="40px" />
      </div>
    </div>
  );
};

const Project = ({ data, setDrawerInfo, ...props }) => {
  const cls = useStyles();

  const handleDetailsClick = () => {
    setDrawerInfo({
      header: data?.[c.title],
      content: (
        <HTMLContent
          innerHTML={domPurify.sanitize(data?.[c.details]?.[c.content])}
        />
      ),
      open: true
    });
  };

  const hasButtons = !!(
    data?.[c.url]?.[c.url] ||
    data?.[c.code_url]?.[c.url] ||
    data?.[c.details]?.[c.content]
  );

  return (
    <div>
      <div className={cls.main}>
        <img
          className={cls.image}
          alt={data?.[c.title]}
          src={data?.[c.image]?.[c.filename]}
        />
        <div className={cls.info}>
          <Typography variant="h4" className={cls.title}>
            {data?.[c.title]}
          </Typography>
          {hasButtons && (
            <div className={cls.desktopOnly}>
              <Buttons data={data} onDetailsClick={handleDetailsClick} />
            </div>
          )}
        </div>
      </div>
      {hasButtons && (
        <div className={cls.mobileOnly}>
          <Buttons data={data} onDetailsClick={handleDetailsClick} />
        </div>
      )}
    </div>
  );
};

export default Project;
