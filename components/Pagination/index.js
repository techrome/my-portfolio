import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination as MuiPagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: theme.spacing(2),
    "& .MuiPagination-root": {
      display: "flex",
      justifyContent: "center"
    }
  }
}));

const Pagination = ({ color, page, count, onChange, size, ...props }) => {
  const cls = useStyles();

  return (
    <div className={cls.pagination}>
      <MuiPagination
        color={color}
        page={page}
        count={count}
        onChange={onChange}
        size={size}
        {...props}
      />
    </div>
  );
};

export default Pagination;
