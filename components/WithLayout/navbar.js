import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Typography,
  IconButton,
  Paper,
  Tooltip,
  Button,
  Menu,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Brightness4,
  Brightness7,
  Translate,
  ExpandMore
} from "@material-ui/icons";
import { connect } from "react-redux";
import useTranslation from "next-translate/useTranslation";

import Container from "@/components/Container";
import { darkModeSet } from "@/redux/actions/app";
import { siteName } from "@/config";

const languages = [
  { title: "_english", value: "en" },
  { title: "_russian", value: "ru" },
  { title: "_georgian", value: "ka" }
];

const useStyles = makeStyles((theme) => ({
  main: {
    position: "sticky",
    top: "0",
    zIndex: 1
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1, 0)
  },
  logo: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  controls: {
    display: "flex",
    alignItems: "center"
  },
  language: {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block"
    }
  }
}));

const Navbar = ({ isDarkMode, setIsDarkMode, ...props }) => {
  const cls = useStyles();
  const { t } = useTranslation("common");
  const router = useRouter();
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);

  const toggleColorTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openLanguageMenu = (e) => {
    setLanguageMenuAnchor(e.currentTarget);
  };
  const closeLanguageMenu = () => {
    setLanguageMenuAnchor(null);
  };

  return (
    <header className={cls.main}>
      <Paper elevation={3} square>
        <Container>
          <div className={cls.content}>
            <Link href="/">
              <a className={cls.logo}>
                <Typography variant="h4" color="primary">
                  {siteName}
                </Typography>
              </a>
            </Link>
            <div className={cls.controls}>
              <Tooltip title={t("change language")} enterDelay={300}>
                <Button
                  aria-owns={languageMenuAnchor ? "language-menu" : undefined}
                  aria-haspopup="true"
                  onClick={openLanguageMenu}
                >
                  <Translate />
                  <span className={cls.language}>
                    {t(
                      languages.find((lang) => lang.value === router.locale)
                        ?.title
                    )}
                  </span>
                  <ExpandMore />
                </Button>
              </Tooltip>
              <Menu
                id="language-menu"
                anchorEl={languageMenuAnchor}
                open={!!languageMenuAnchor}
                onClose={closeLanguageMenu}
              >
                {languages.map((lang, index) => (
                  <MenuItem
                    component="a"
                    href={
                      lang.value === "en"
                        ? router.pathname
                        : `/${lang.value}${router.pathname}`
                    }
                    key={index}
                    selected={router.locale === lang.value}
                    onClick={closeLanguageMenu}
                    lang={lang.value}
                    hrefLang={lang.value}
                  >
                    {t(lang.title)}
                  </MenuItem>
                ))}
              </Menu>
              <Tooltip title={t("toggle color theme")} enterDelay={300}>
                <IconButton color="inherit" onClick={toggleColorTheme}>
                  {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </Container>
      </Paper>
    </header>
  );
};

const mapState = (state) => ({
  isDarkMode: state.app.isDarkMode
});

const mapDispatch = {
  setIsDarkMode: darkModeSet
};

export default connect(mapState, mapDispatch)(Navbar);
