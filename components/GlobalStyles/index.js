import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { iconGlobalClassName } from "@/config";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      transition: "background-color 0.2s"
    },
    a: {
      color: theme.palette.primary.main
    },
    [`.${iconGlobalClassName}`]: {
      transition: "0.2s"
    },
    ".MuiSkeleton-root": {
      transition: "background-color 0.2s"
    }
  }
}));

const GlobalStyles = ({ ...props }) => {
  useStyles();

  return null;
};

export default GlobalStyles;
