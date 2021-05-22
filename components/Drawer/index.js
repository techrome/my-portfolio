import React from "react";
import {
  Typography,
  SwipeableDrawer,
  IconButton,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  drawer: {
    "& .MuiPaper-root": {
      width: "100%",
      [theme.breakpoints.up("md")]: {
        maxWidth: (props) => props.maxWidth || "700px"
      }
    }
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1, 2, 1, 3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    transition: "border 0.2s"
  },
  drawerHeaderLeft: {
    marginRight: theme.spacing(2)
  },
  drawerBody: {
    overflowY: "auto",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4)
    }
  }
}));

const DrawerComponent = ({
  anchor = "right",
  open,
  onClose,
  onOpen,
  className,
  header,
  maxWidth,
  ...props
}) => {
  const cls = useStyles({ maxWidth });

  return (
    <SwipeableDrawer
      disableSwipeToOpen
      onOpen={(e) => {
        onOpen?.(e);
      }}
      anchor="right"
      open={open}
      onClose={onClose}
      className={clsx(cls.drawer, className)}
      {...props}
    >
      <Paper elevation={0} style={{ height: "100%" }} square>
        <div className={cls.drawerHeader}>
          <div className={cls.drawerHeaderLeft}>
            <Typography variant="h5">{header}</Typography>
          </div>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
        <div className={cls.drawerBody}>{props.children}</div>
      </Paper>
    </SwipeableDrawer>
  );
};

export default DrawerComponent;
