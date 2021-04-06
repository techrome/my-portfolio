import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useTranslation from "next-translate/useTranslation";

const useStyles = makeStyles((theme) => ({
  main: {
    "& .MuiTabs-indicator": {
      borderTopLeftRadius: "5px",
      borderTopRightRadius: "5px",
      height: theme.spacing(0.5)
    },
    "& .MuiButtonBase-root": {
      maxWidth: "unset",
      minWidth: "auto",
      fontSize: "16px",
      transition: "0.2s",
      "&:hover": {
        backgroundColor: theme.palette.action.hover
      }
    }
  }
}));

const TabsComponent = ({ list, value, onChange, ...props }) => {
  const cls = useStyles();
  const { t } = useTranslation("common");

  return (
    <div className={cls.main}>
      <Tabs
        value={value}
        onChange={onChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {list.map((el, index) => (
          <Tab key={index} value={el.value} label={t(el.title)} />
        ))}
      </Tabs>
    </div>
  );
};

export default TabsComponent;
