import React, { useEffect, useMemo, useRef } from "react";
import { SnackbarProvider } from "notistack";
import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import isBoolean from "lodash/isBoolean";
import { QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { connect } from "react-redux";

import "@/styles/globals.css";
import defaultTheme, {
  themeLocalesProps,
  lightThemePalette,
  darkThemePalette
} from "@/config/theme";
import ErrorBoundaryFallback from "@/components/ErrorBoundaryFallback";
import CommonHead from "@/components/CommonHead";
import GlobalStyles from "@/components/GlobalStyles";
import createQueryClient from "@/helpers/createQueryClient";
import { wrapper } from "@/redux";
import { darkModeSet } from "@/redux/actions/app";

const ReactQueryDevtools = dynamic(
  () => import("react-query/devtools").then((mod) => mod.ReactQueryDevtools),
  {
    ssr: false
  }
);

function MyApp({ Component, pageProps, isDarkMode, setIsDarkMode, ...props }) {
  const router = useRouter();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isFirstRendered = useRef(false);

  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = createQueryClient();
  }

  const theme = useMemo(() => {
    const choseDarkMode = isBoolean(isDarkMode) ? isDarkMode : prefersDarkMode;
    return createMuiTheme({
      palette: {
        ...(choseDarkMode ? darkThemePalette : lightThemePalette),
        type: choseDarkMode ? "dark" : "light"
      },
      typography: {
        ...defaultTheme.typography
      },
      breakpoints: {
        ...defaultTheme.breakpoints,
        get down() {
          // max width till exact breakpoint, not including the whole range
          return (key) => `@media (max-width:${this.values[key] - 0.5}px)`;
        }
      },
      shadows: [...defaultTheme.shadows],
      overrides: {
        ...defaultTheme.overrides
      },
      props: {
        ...(themeLocalesProps[router.locale] || themeLocalesProps.en)
      }
    });
  }, [prefersDarkMode, isDarkMode]);

  useEffect(() => {
    if (isFirstRendered.current) {
      const choseDarkMode = isBoolean(isDarkMode)
        ? isDarkMode
        : prefersDarkMode;

      localStorage.setItem("colorTheme", choseDarkMode ? "dark" : "light");
    }
  }, [prefersDarkMode, isDarkMode]);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    const colorTheme = localStorage.getItem("colorTheme");
    const choseDarkMode =
      colorTheme === "light"
        ? false
        : colorTheme === "dark"
        ? true
        : prefersDarkMode;
    setIsDarkMode(choseDarkMode);

    isFirstRendered.current = true;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <QueryClientProvider client={queryClientRef.current}>
          <Hydrate state={pageProps.dehydratedState}>
            <SnackbarProvider
              anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
              maxSnack={4}
            >
              <CommonHead />
              <GlobalStyles />
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
            </SnackbarProvider>
          </Hydrate>
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

const mapState = (state) => ({
  isDarkMode: state.app.isDarkMode
});

const mapDispatch = {
  setIsDarkMode: darkModeSet
};

const WrappedApp = connect(mapState, mapDispatch)(MyApp);

export default wrapper.withRedux(WrappedApp);
