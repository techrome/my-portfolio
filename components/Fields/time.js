import React from "react";
import {
  FormHelperText,
  TextField,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { Event, Close } from "@material-ui/icons";
import DayjsUtils from "@date-io/dayjs";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import useTranslation from "next-translate/useTranslation";

import { timeFormat } from "@/config";
import Label from "./_defaultLabel";

const DefaultTime = ({
  value,
  onChange,
  disabled,
  error,
  label,
  onBlur,
  name,
  placeholder,
  ...props
}) => {
  const { t } = useTranslation("common");

  return (
    <div>
      {!!label && <Label disabled={disabled}>{label}</Label>}
      <div>
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <TimePicker
            value={value}
            onChange={onChange}
            name={name}
            onBlur={onBlur}
            disabled={disabled}
            format={timeFormat}
            ampm={false}
            inputVariant="outlined"
            fullWidth
            invalidDateMessage={t("dateErrorInvalid")}
            maxDateMessage={t("dateErrorMax")}
            minDateMessage={t("dateErrorMin")}
            variant="dialog"
            okLabel={t("ok")}
            cancelLabel={t("cancel")}
            clearable={true}
            clearLabel={t("clear")}
            showTodayButton={true}
            todayLabel={t("today")}
            TextFieldComponent={(_props) => (
              <TextField
                {..._props}
                label={placeholder}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Event />
                    </InputAdornment>
                  ),
                  ...(!!value && {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            onChange(null);
                          }}
                        >
                          <Close />
                        </IconButton>
                      </InputAdornment>
                    )
                  })
                }}
              />
            )}
            {...(error ? { error: !!error } : {})}
            {...props}
          />
          <FormHelperText variant="filled" error={!!error}>
            {error}
          </FormHelperText>
        </MuiPickersUtilsProvider>
      </div>
    </div>
  );
};

export default DefaultTime;
