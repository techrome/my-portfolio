import React, { useRef } from "react";
import { AttachFile, Close, Info } from "@material-ui/icons";
import {
  FormHelperText,
  Typography,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useTranslation from "next-translate/useTranslation";
import clsx from "clsx";

import Button from "@/components/Button";
import Label from "./_defaultLabel";

const useStyles = makeStyles(
  (theme) => ({
    main: {
      border: (props) =>
        `1px solid ${
          props.disabled ? theme.palette.action.disabled : theme.palette.divider
        }`,
      borderRadius: theme.spacing(0.5),
      padding: theme.spacing(2),
      "&:hover": {
        borderColor: (props) =>
          props.disabled
            ? theme.palette.action.disabled
            : theme.palette.text.primary
      }
    },
    error: {
      borderColor: `${theme.palette.error.main} !important`
    },
    fileButton: {
      display: "flex",
      width: "100%",
      alignItems: "center"
    },
    clearButton: {
      marginLeft: theme.spacing(1)
    },
    files: {
      marginTop: theme.spacing(1),
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    infoIcon: {
      marginLeft: theme.spacing(1),
      color: theme.palette.text.secondary
    },
    fileList: {
      padding: theme.spacing(1, 3),
      maxHeight: "300px",
      overflowY: "auto",
      "& > li": {
        fontSize: "13px"
      }
    },
    flexlist: {
      alignItems: "center"
    },
    disabled: {
      pointerEvents: "none"
    }
  }),
  { index: 1 }
);

const DefaultFileUpload = ({
  value,
  error,
  fullWidth,
  onChange,
  disabled,
  placeholder,
  label,
  multiple,
  accept,
  emptyValue,
  ...props
}) => {
  const cls = useStyles({ disabled });
  const { t } = useTranslation("common");
  const fileRef = useRef();

  const hasFiles = value.length > 0;

  return (
    <div>
      {!!label && <Label disabled={disabled}>{label}</Label>}
      <div className={clsx(cls.main, !!error && cls.error)}>
        <input
          type="file"
          hidden
          onChange={(e) => {
            onChange([...e.target.files]);
          }}
          onClick={(e) => {
            // simple hack to remove value
            e.target.value = "";
          }}
          ref={fileRef}
          multiple={multiple}
          accept={accept}
        />
        <div className={cls.fileButton}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              fileRef.current && fileRef.current.click();
            }}
            disabled={disabled}
          >
            {placeholder || t("choose file")}
            <AttachFile />
          </Button>
        </div>
        {hasFiles && (
          <div className={clsx(cls.files, disabled && cls.disabled)}>
            {value.length === 1 ? (
              <Typography variant="body1" noWrap>
                {value[0].name}
              </Typography>
            ) : (
              <>
                <Typography variant="body1" noWrap>
                  {`${value.length} ${t("fileUploadCount")}`}
                </Typography>
                <Tooltip
                  title={
                    <ul className={cls.fileList}>
                      {value.map((el, index) => (
                        <li key={`${index}.${el.name}`}>{el.name}</li>
                      ))}
                    </ul>
                  }
                  arrow
                  interactive
                >
                  <Info className={cls.infoIcon} />
                </Tooltip>
              </>
            )}
            <div className={cls.clearButton}>
              <IconButton
                onClick={() => {
                  onChange(emptyValue || []);
                }}
              >
                <Close />
              </IconButton>
            </div>
          </div>
        )}
      </div>
      <FormHelperText variant="filled" error={!!error}>
        {error}
      </FormHelperText>
    </div>
  );
};

export default DefaultFileUpload;
