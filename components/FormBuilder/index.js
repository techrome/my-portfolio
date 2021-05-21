import React, {
  useState,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback
} from "react";
import dynamic from "next/dynamic";
import { Grid, FormLabel, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useTranslation from "next-translate/useTranslation";
import isString from "lodash/isString";
import isFunction from "lodash/isFunction";

const importedFields = {
  input: dynamic(() => import("@/components/Fields/input")),
  checkbox: dynamic(() => import("@/components/Fields/checkbox")),
  checkboxGroup: dynamic(() => import("@/components/Fields/checkboxGroup")),
  date: dynamic(() => import("@/components/Fields/date")),
  dateTime: dynamic(() => import("@/components/Fields/dateTime")),
  time: dynamic(() => import("@/components/Fields/time")),
  radio: dynamic(() => import("@/components/Fields/radio")),
  select: dynamic(() => import("@/components/Fields/select")),
  file: dynamic(() => import("@/components/Fields/file")),
  editor: dynamic(() => import("@/components/Fields/editor"), { ssr: false })
};

const useStyles = makeStyles((theme) => ({
  labelWrapper: {
    marginBottom: theme.spacing(1)
  }
}));

const FormBuilder = forwardRef(
  (
    {
      config,
      defaultValues = {},
      onFieldChange,
      onFieldBlur,
      disabled,
      loading,
      fieldProps,
      afterFieldsRender,
      onSubmit,
      onUnmount,
      grid,
      ...props
    },
    ref
  ) => {
    // "config" and "defaultValues" should be prepared before
    // component mounts because they will be memoized
    const memoizedConfig = useMemo(() => config, []);
    const memoizedDefaultValues = useMemo(() => defaultValues, []);

    const { t } = useTranslation(memoizedConfig.namespace || "common");
    const cls = useStyles();

    const fieldWrapperRefs = useRef({});
    const shouldScrollToFirstError = useRef(false);

    const defaultConfig = useMemo(() => {
      return {
        values: memoizedConfig.fields.reduce((acc, curr) => {
          return {
            ...acc,
            [curr.name]:
              memoizedDefaultValues[curr.name] ||
              (curr.hasOwnProperty("emptyValue") ? curr.emptyValue : "")
          };
        }, {}),
        disabledFields: memoizedConfig.fields.reduce((acc, curr) => {
          return {
            ...acc,
            [curr.name]: !!curr.disabled
          };
        }, {}),
        hiddenFields: memoizedConfig.fields.reduce((acc, curr) => {
          return {
            ...acc,
            [curr.name]: !!curr.hidden
          };
        }, {}),
        errors: memoizedConfig.fields.reduce((acc, curr) => {
          return {
            ...acc,
            [curr.name]: ""
          };
        }, {})
      };
    }, []);
    const emptyValues = useMemo(
      () =>
        memoizedConfig.fields.reduce((acc, curr) => {
          return {
            ...acc,
            [curr.name]: curr.hasOwnProperty("emptyValue")
              ? curr.emptyValue
              : ""
          };
        }, {}),
      []
    );

    const [values, setValues] = useState(defaultConfig.values);
    const [disabledFields, setDisabledFields] = useState(
      defaultConfig.disabledFields
    );
    const [hiddenFields, setHiddenFields] = useState(
      defaultConfig.hiddenFields
    );
    const [errors, setErrors] = useState(defaultConfig.errors);

    // these functions will be created only on first render
    const clearValues = useCallback(() => {
      setValues(emptyValues);
    }, []);
    const clearErrors = useCallback(() => {
      setErrors(defaultConfig.errors);
    }, []);
    const resetValues = useCallback(() => {
      setValues(defaultConfig.values);
    }, []);
    const resetForm = useCallback(() => {
      setValues(defaultConfig.values);
      setDisabledFields(defaultConfig.disabledFields);
      setHiddenFields(defaultConfig.hiddenFields);
      setErrors(defaultConfig.errors);
    }, []);
    const scrollToFirstError = useCallback(() => {
      shouldScrollToFirstError.current = true;
    }, []);

    const formState = {
      values,
      setValues,
      disabledFields,
      setDisabledFields,
      hiddenFields,
      setHiddenFields,
      errors,
      setErrors,
      clearValues,
      clearErrors,
      resetValues,
      resetForm,
      scrollToFirstError
    };

    // use "ref" only when really necessary
    useImperativeHandle(ref, () => ({
      defaultConfigValues: defaultConfig.values,
      defaultConfigDisabled: defaultConfig.disabledFields,
      defaultConfigHidden: defaultConfig.hiddenFields,
      emptyValues,
      ...formState
    }));

    useEffect(() => {
      if (shouldScrollToFirstError.current) {
        for (let field of memoizedConfig.fields) {
          if (errors[field.name]) {
            if (fieldWrapperRefs.current[field.name]) {
              fieldWrapperRefs.current[field.name].scrollIntoView();
            }
            break;
          }
        }
        shouldScrollToFirstError.current = false;
      }
    }, [errors]);

    useEffect(() => {
      return () => {
        onUnmount?.();
      };
    }, []);

    const gridSpacing = grid?.spacing || memoizedConfig.grid?.spacing || 2;
    const defaultGridWidths = grid?.widths || memoizedConfig.grid?.widths || {};

    return (
      <Grid container spacing={gridSpacing}>
        {memoizedConfig.fields.map((field, index) => {
          const FieldComponent =
            field.fieldComponent || importedFields[field.fieldType];

          const gridWidths = grid?.fields?.[field.name] || defaultGridWidths;

          return (
            <Grid
              key={field.name}
              item
              xs={12}
              {...gridWidths}
              style={{
                display: hiddenFields[field.name] ? "none" : "block"
              }}
              ref={(el) => {
                fieldWrapperRefs.current[field.name] = el;
              }}
            >
              <FieldComponent
                value={values[field.name]}
                onChange={(value) => {
                  setValues((prev) => ({ ...prev, [field.name]: value }));
                  onFieldChange?.({ ...formState, field, value });
                }}
                onBlur={() => {
                  onFieldBlur?.({ ...formState, field });
                }}
                disabled={disabledFields[field.name]}
                error={errors[field.name]}
                label={
                  field.label && isString(field.label) ? t(field.label) : ""
                }
                placeholder={field.placeholder ? t(field.placeholder) : ""}
                name={field.name}
                {...(field.props || {})}
                {...(isFunction(fieldProps?.[field.name])
                  ? fieldProps[field.name]({ ...formState, field })
                  : fieldProps?.[field.name] || {})}
              />
            </Grid>
          );
        })}
        {afterFieldsRender?.(formState)}
      </Grid>
    );
  }
);

export default FormBuilder;