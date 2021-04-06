import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Inbox } from "@material-ui/icons";

import SvgIcon from "@/components/SvgIcon";
import { iconGlobalClassName } from "@/config";

const useStyles = makeStyles(
  (theme) => ({
    main: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      [`& .${iconGlobalClassName}`]: {
        minWidth: theme.spacing(10),
        minHeight: theme.spacing(10),
        width: theme.spacing(10),
        height: theme.spacing(10),
        fill: theme.palette.text.primary
      }
    },
    text: {
      marginTop: theme.spacing(2)
    }
  }),
  { index: 1 }
);

const EmptyData = ({ ...props }) => {
  const cls = useStyles();
  const { t } = useTranslation("common");

  return (
    <div className={cls.main}>
      <SvgIcon iconName="empty-box" />
      <Typography variant="h5" className={cls.text}>
        {t("data not found")}
      </Typography>
    </div>
  );
};

export default EmptyData;
