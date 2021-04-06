import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import pt from "prop-types";
import { ReactSVG } from "react-svg";
import clsx from "clsx";

import { isdev, iconGlobalClassName } from "@/config";

const useStyles = makeStyles((theme) => ({
  main: {
    "& svg": {
      display: "block"
    }
  }
}));

const Loading = (props) => <div className={iconGlobalClassName} />;

const SvgIcon = ({ iconName, customSrc, className, ...props }) => {
  const cls = useStyles();

  const afterInjection = useCallback((error, svg) => {
    if (error) {
      isdev && console.error(error);
      return;
    }
  }, []); // to avoid remounting the react-svg on rerender
  const beforeInjection = useCallback((svg) => {
    svg.classList.add(iconGlobalClassName);
  }, []); // to avoid remounting the react-svg on rerender

  return (
    <div className={clsx(cls.main, className)}>
      <ReactSVG
        afterInjection={afterInjection}
        beforeInjection={beforeInjection}
        src={customSrc || `/img/icons/${iconName}.svg`}
        loading={Loading}
        {...props}
      />
    </div>
  );
};

SvgIcon.propTypes = {
  iconName: pt.string,
  customSrc: pt.string,
  className: pt.string
};

SvgIcon.defaultProps = {};

export default SvgIcon;
