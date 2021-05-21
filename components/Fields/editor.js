import React, { useState } from "react";
import { FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import clsx from "clsx";

import Label from "./_defaultLabel";

Quill.register(Quill.import("attributors/style/align"));

// default Quill selectors for colors
const colorSelector = `.ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar button:focus, .ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item.ql-selected`;
const strokeSelector = `.ql-snow.ql-toolbar button:hover .ql-stroke, .ql-snow .ql-toolbar button:hover .ql-stroke, .ql-snow.ql-toolbar button:focus .ql-stroke, .ql-snow .ql-toolbar button:focus .ql-stroke, .ql-snow.ql-toolbar button.ql-active .ql-stroke, .ql-snow .ql-toolbar button.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow.ql-toolbar button:hover .ql-stroke-miter, .ql-snow .ql-toolbar button:hover .ql-stroke-miter, .ql-snow.ql-toolbar button:focus .ql-stroke-miter, .ql-snow .ql-toolbar button:focus .ql-stroke-miter, .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter`;
const fillSelector = `.ql-snow.ql-toolbar button:hover .ql-fill, .ql-snow .ql-toolbar button:hover .ql-fill, .ql-snow.ql-toolbar button:focus .ql-fill, .ql-snow .ql-toolbar button:focus .ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill`;

const useStyles = makeStyles((theme) => ({
  main: {
    "&&": {
      position: "relative",
      "&:hover > fieldset": {
        borderColor: theme.palette.text.primary
      },
      "& .ql-toolbar, .ql-container": {
        border: "none"
      },
      "& .ql-editor": {
        minHeight: "300px",
        maxHeight: "500px"
      },
      "& .ql-stroke": {
        stroke: (props) =>
          props.disabled
            ? theme.palette.action.disabled
            : theme.palette.text.primary
      },
      "& .ql-fill": {
        fill: (props) =>
          props.disabled
            ? theme.palette.action.disabled
            : theme.palette.text.primary
      },
      "& .ql-picker": {
        color: (props) =>
          props.disabled
            ? theme.palette.action.disabled
            : theme.palette.text.primary
      },
      "& .ql-picker-label": {
        color: (props) =>
          props.disabled
            ? theme.palette.action.disabled
            : theme.palette.text.primary
      },
      "& .ql-picker-options": {
        backgroundColor: theme.palette.background.default
      },
      [`& ${colorSelector}`]: {
        color: (props) =>
          props.disabled
            ? theme.palette.action.disabled
            : theme.palette.primary.main
      },
      [`& ${strokeSelector}`]: {
        stroke: (props) =>
          props.disabled
            ? theme.palette.action.disabled
            : theme.palette.primary.main
      },
      [`& ${fillSelector}`]: {
        fill: (props) =>
          props.disabled
            ? theme.palette.action.disabled
            : theme.palette.primary.main
      }
    }
  },
  border: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    margin: "0",
    padding: "0",
    borderRadius: theme.spacing(0.5),
    border: `1px solid ${theme.palette.divider}`,
    zIndex: "-1"
  },
  active: {
    border: `2px solid ${theme.palette.primary.main} !important`
  },
  error: {
    borderColor: `${theme.palette.error.main} !important`
  },
  disabled: {
    "& .ql-toolbar": {
      pointerEvents: "none"
    },
    "& > fieldset, &:hover > fieldset": {
      border: `1px solid ${theme.palette.action.disabled}`
    }
  }
}));

const DefaultEditor = ({
  value,
  onChange,
  disabled,
  error,
  label,
  onBlur,
  onFocus,
  name,
  placeholder,
  toolbarOptions,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const cls = useStyles({ disabled });

  return (
    <div>
      {!!label && <Label disabled={disabled}>{label}</Label>}
      <div
        className={clsx(cls.main, disabled && cls.disabled)}
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur?.();
        }}
      >
        <fieldset
          className={clsx(
            cls.border,
            isFocused && cls.active,
            !!error && cls.error
          )}
        />
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          readOnly={disabled}
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline", "link"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              ["clean"],
              ...(toolbarOptions ? toolbarOptions : [])
            ]
          }}
          placeholder={placeholder}
          {...props}
        />
      </div>
      <FormHelperText variant="filled" error={!!error}>
        {error}
      </FormHelperText>
    </div>
  );
};

export default DefaultEditor;
