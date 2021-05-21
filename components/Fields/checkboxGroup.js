import React from "react";
import {
  FormControlLabel,
  FormHelperText,
  FormGroup,
  Checkbox
} from "@material-ui/core";

import Label from "./_defaultLabel";

const DefaultCheckboxGroup = ({
  value, // value must be an array
  onChange,
  disabled,
  error,
  label,
  options,
  ...props
}) => {
  const handleChange = (val) => {
    const valIndex = value.indexOf(val);
    const valueCopy = [...value];

    if (~valIndex) {
      valueCopy.splice(valIndex, 1);
    } else {
      valueCopy.push(val);
    }

    onChange(valueCopy);
  };

  return (
    <div>
      {!!label && <Label disabled={disabled}>{label}</Label>}
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                color="primary"
                checked={value.includes(option.value)}
                onChange={() => handleChange(option.value)}
              />
            }
            disabled={disabled}
            label={option.title}
          />
        ))}
      </FormGroup>
      <FormHelperText variant="filled" error={!!error}>
        {error}
      </FormHelperText>
    </div>
  );
};

export default DefaultCheckboxGroup;
