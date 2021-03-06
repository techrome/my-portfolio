import React, { useState } from "react";
import { Button } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";

import useStyles from "./styles";
import { defaultLocale } from "@/config";

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
      <p className={cls.description}>
        {locales[lang]
          ? locales[lang].description
          : locales[defaultLocale].description}
      </p>
      <p className={cls.error}>{error?.message || "No error description"}</p>
      <Button variant="contained" color="default" onClick={resetErrorBoundary}>
        {locales[lang] ? locales[lang].button : locales[defaultLocale].button}
      </Button>
    </div>
  );
};

export default ErrorBoundaryFallback;
