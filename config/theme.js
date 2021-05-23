import { createMuiTheme } from "@material-ui/core/styles";
import { ruRU } from "@material-ui/core/locale";

import muiLocaleKa from "./muiLocaleKa";
import { defaultLocale } from "@/config";

export const lightThemePalette = {
  primary: {
    main: "#2D78AE"
  },
  secondary: {
    main: "#D8356F"
  },
  text: {
    primary: "#000",
    secondary: "#333"
  },
  background: {
    default: "#fff",
    paper: "#F5F5F5"
  },
  action: {
    disabled: "rgba(180, 180, 180)"
  },
  linkVisited: "#8A46CE",
  divider: "#C4C4C4",
  tonalOffset: 0.1
};
export const darkThemePalette = {
  primary: {
    main: "#90caf9"
  },
  secondary: {
    main: "#F48FB1"
  },
  text: {
    primary: "#fff",
    secondary: "#fff"
  },
  background: {
    default: "#212121",
    paper: "#333333"
  },
  action: {
    disabled: "rgba(100, 100, 100)"
  },
  linkVisited: "#cb97ff",
  divider: "#6D6D6D",
  tonalOffset: 0.1
};

const theme = createMuiTheme({
  typography: {
    fontFamily: `Noto Sans, Noto Sans Georgian, -apple-system, BlinkMacSystemFont, 
    Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, sans-serif`
  },
  breakpoints: {
    values: {
      xl: 1366,
      lg: 1024,
      md: 768,
      sm: 375,
      xs: 1
    }
  }
});

theme.overrides.MuiTypography = {
  root: {
    transition: "color 0.2s"
  }
};
theme.overrides.MuiPaper = {
  root: {
    transition: "background-color 0.2s"
  }
};
theme.overrides.MuiDivider = {
  root: {
    transition: "background-color 0.2s"
  }
};
theme.overrides.MuiButton = {
  root: {
    transition: "0.2s"
  }
};

theme.typography.h1 = {
  fontSize: "28px",
  fontWeight: 600,
  [theme.breakpoints.up("md")]: {
    fontSize: "42px"
  }
};
theme.typography.h2 = {
  fontSize: "24px",
  fontWeight: 600,
  [theme.breakpoints.up("md")]: {
    fontSize: "36px"
  }
};
theme.typography.h3 = {
  fontSize: "20px",
  fontWeight: 600,
  [theme.breakpoints.up("md")]: {
    fontSize: "30px"
  }
};
theme.typography.h4 = {
  fontSize: "16px",
  fontWeight: 600,
  [theme.breakpoints.up("md")]: {
    fontSize: "24px"
  }
};
theme.typography.h5 = {
  fontSize: "16px",
  fontWeight: 600,
  [theme.breakpoints.up("md")]: {
    fontSize: "18px"
  }
};
theme.typography.h6 = {
  fontSize: "16px",
  fontWeight: 600
};
theme.typography.body1 = {
  fontSize: "16px",
  fontWeight: 600
};
theme.typography.body2 = {
  fontSize: "14px",
  fontWeight: 400
};
theme.typography.subtitle1 = {
  fontSize: "16px",
  fontWeight: 600,
  fontFeatureSettings: "'case' on",
  textTransform: "uppercase"
};
theme.typography.subtitle2 = {
  fontSize: "14px",
  fontWeight: 400,
  fontFeatureSettings: "'case' on",
  textTransform: "uppercase"
};
theme.typography.button = {
  fontSize: "14px",
  fontWeight: 600,
  fontFeatureSettings: "'case' on",
  textTransform: "uppercase"
};
theme.typography.overline = {
  fontSize: "12px",
  fontWeight: 400,
  lineHeight: 1.5,
  textTransform: "none"
};
theme.typography.caption = {
  fontSize: "10px",
  fontWeight: 400
};

export const themeLocalesProps = {
  [defaultLocale]: theme.props,
  ru: ruRU.props,
  ka: muiLocaleKa.props
};

// WARNING: This will be always in English! Do not use it for translations!
export default theme;
