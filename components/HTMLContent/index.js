import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    transition: "color 0.2s",
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "underline",
      "&:hover": {
        textDecoration: "none"
      },
      "&:visited": {
        color: theme.palette.linkVisited
      }
    },
    "& img": {
      maxWidth: "100%"
    }
  }
}));

const HTMLContent = ({ innerHTML, ...props }) => {
  const cls = useStyles();

  return (
    <div className={cls.main} dangerouslySetInnerHTML={{ __html: innerHTML }} />
  );
};

export default HTMLContent;
