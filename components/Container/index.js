import React from "react";
import { Container as MuiContainer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const createStyles = makeStyles(
  (theme) => ({
    container: {
      padding: theme.spacing(0, 3)
    }
  }),
  { index: 1 }
);

const Container = (props) => {
  const cls = createStyles();
  return (
    <MuiContainer
      maxWidth="lg"
      className={clsx(cls.container, props.className)}
    >
      {props.children}
    </MuiContainer>
  );
};

export default Container;
