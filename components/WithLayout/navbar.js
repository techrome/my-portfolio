import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Typography,
  IconButton,
  Paper,
  Tooltip,
  Menu,
  MenuItem,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Brightness4,
  Brightness7,
  Translate,
  ExpandMore,
  Menu as MenuIcon
} from "@material-ui/icons";
import { connect } from "react-redux";
import useTranslation from "next-translate/useTranslation";

import Button from "@/components/Button";
import Container from "@/components/Container";
import FlexList from "@/components/FlexList";
import { darkModeSet } from "@/redux/actions/app";
import { siteName, defaultLocale } from "@/config";
import Drawer from "@/components/Drawer";

const languages = [
  { title: "_english", value: defaultLocale },
  { title: "_russian", value: "ru" },
  { title: "_georgian", value: "ka" }
];

const navbarLinks = [
  {
    title: "blog",
    value: "/blog"
  }
];

const useStyles = makeStyles(
  (theme) => ({
    main: {
      position: "sticky",
      top: "0",
      zIndex: 2
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(1, 0)
    },
    leftSide: {
      display: "flex",
      alignItems: "center"
    },
    navLinksDesktop: {
      display: "flex",
      margin: theme.spacing(0, 2),
      paddingLeft: theme.spacing(2),
      borderLeft: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.down("md")]: {
        display: "none"
      }
    },
    link: {
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline"
      }
    },
    controlsDesktop: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        display: "none"
      }
    },
    controlsMobile: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end"
    },
    language: {
      margin: theme.spacing(0, 0.5, 0, 1)
    },
    onlyMobile: {
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    mobileDivider: {
      margin: theme.spacing(2, 0)
    }
  }),
  { index: 1 }
);

const LanguageSwitcher = ({ ...props }) => {
  const cls = useStyles();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const { t } = useTranslation("common");
  const router = useRouter();

  const openLanguageMenu = (e) => {
    setMenuAnchor(e.currentTarget);
  };
  const closeLanguageMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <>
      <Tooltip title={t("change language")} enterDelay={300}>
        <Button
          aria-owns={menuAnchor ? "language-menu" : undefined}
          aria-haspopup="true"
          onClick={openLanguageMenu}
        >
          <Translate />
          <span className={cls.language}>
            {t(languages.find((lang) => lang.value === router.locale)?.title)}
          </span>
          <ExpandMore />
        </Button>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={closeLanguageMenu}
      >
        {languages.map((lang, index) => (
          <MenuItem
            component="a"
            href={
              lang.value === defaultLocale
                ? router.asPath
                : `/${lang.value}${router.asPath}`
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
    </>
  );
};

const _MobileMenuContent = ({ isDarkMode, setIsDarkMode, ...props }) => {
  const cls = useStyles();
  const { t } = useTranslation("common");

  const toggleColorTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <FlexList h={4} v={1}>
        {navbarLinks.map((el, index) => (
          <Link key={index} href={el.value}>
            <a className={cls.link}>
              <Typography variant="h2" color="primary">
                {t(el.title)}
              </Typography>
            </a>
          </Link>
        ))}
      </FlexList>
      <Divider className={cls.mobileDivider} />
      <div className={cls.controlsMobile}>
        <LanguageSwitcher />
        <Tooltip title={t("toggle color theme")} enterDelay={300}>
          <IconButton color="inherit" onClick={toggleColorTheme}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

const mapStateMobileMenuContent = (state) => ({
  isDarkMode: state.app.isDarkMode
});
const mapDispatchMobileMenuContent = {
  setIsDarkMode: darkModeSet
};
const MobileMenuContent = connect(
  mapStateMobileMenuContent,
  mapDispatchMobileMenuContent
)(_MobileMenuContent);

const MobileMenu = ({ ...props }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { t } = useTranslation("common");

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const openDrawer = () => {
    setDrawerVisible(true);
  };

  return (
    <>
      <Drawer open={drawerVisible} header={t("menu")} onClose={closeDrawer}>
        <MobileMenuContent />
      </Drawer>
      <IconButton color="inherit" onClick={openDrawer}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

const Navbar = ({ isDarkMode, setIsDarkMode, ...props }) => {
  const cls = useStyles();
  const { t } = useTranslation("common");
  const router = useRouter();

  const toggleColorTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className={cls.main}>
      <Paper elevation={3} square>
        <Container>
          <div className={cls.content}>
            <div className={cls.leftSide}>
              <Link href="/">
                <a className={cls.link}>
                  <Typography variant="h4" color="primary">
                    {siteName}
                  </Typography>
                </a>
              </Link>
              <div className={cls.navLinksDesktop}>
                <FlexList h={2} v={1}>
                  {navbarLinks.map((el, index) => (
                    <Link key={index} href={el.value}>
                      <a className={cls.link}>
                        <Typography variant="h6" color="primary">
                          {t(el.title)}
                        </Typography>
                      </a>
                    </Link>
                  ))}
                </FlexList>
              </div>
            </div>
            <div className={cls.controlsDesktop}>
              <LanguageSwitcher />
              <Tooltip title={t("toggle color theme")} enterDelay={300}>
                <IconButton color="inherit" onClick={toggleColorTheme}>
                  {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>
            </div>
            <div className={cls.onlyMobile}>
              <MobileMenu />
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
