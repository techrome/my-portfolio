import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "-webkit-box",
    overflow: "hidden",
    "-webkit-line-clamp": (props) => props.rows,
    "-webkit-box-orient": "vertical"
  }
}));

const TextEllipsis = ({ rows = 1, ...props }) => {
  const cls = useStyles({ rows });

  return <span className={cls.main}>{props.children}</span>;
};

export default TextEllipsis;
