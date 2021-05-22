import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@/components/Button";
import { defaultLocale } from "@/config";

const useStyles = makeStyles(
  (theme) => ({
    main: {
      height: "100vh",
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      padding: "100px 30px"
    },
    error: {
      marginBottom: "30px"
    }
  }),
  { index: 1 }
);

const locales = {
  [defaultLocale]: {
    description:
      "An unexpected error occured. We are sorry for the inconvenience. Error:",
    button: "Recover page"
  },
  ka: {
    description: "დაფიქსირდა შეცდომა. ბოდიშს გიხდით შეფერხებისთვის. შეცდომა:",
    button: "გვერდის აღდგენა"
  },
  ru: {
    description:
      "Произошла непридвиденная ошибка. Приносим свои извинения. Описание ошибки:",
    button: "Восстановить страницу"
  }
};

const ErrorBoundaryFallback = ({ error, resetErrorBoundary, ...props }) => {
  const cls = useStyles();
  const [lang] = useState(
    typeof document === "undefined"
      ? defaultLocale
      : document?.documentElement?.lang || defaultLocale
  );
  return (
    <div className={cls.main}>
      <ErrorIcon style={{ fontSize: "50px" }} color="error" />
      <Typography variant="h3" gutterBottom>
        {locales[lang]
          ? locales[lang].description
          : locales[defaultLocale].description}
      </Typography>
      <Typography color="error" variant="h5" className={cls.error}>
        {error?.message || "No error description"}
      </Typography>
      <Button
        variant="contained"
        color="default"
        size="large"
        onClick={resetErrorBoundary}
      >
        {locales[lang] ? locales[lang].button : locales[defaultLocale].button}
      </Button>
    </div>
  );
};

export default ErrorBoundaryFallback;
