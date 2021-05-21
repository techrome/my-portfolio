import React, { useState, useCallback } from "react";
import Head from "next/head";
import { Paper, Divider, Grid, Tooltip, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { Help } from "@material-ui/icons";
import useTranslation from "next-translate/useTranslation";
import debounce from "lodash/debounce";

import Button from "@/components/Button";
import WithLayout from "@/components/WithLayout";
import Container from "@/components/Container";
import FormBuilder from "@/components/FormBuilder";
import htmlToText from "@/helpers/htmlToText";

const config = {
  fields: [
    {
      name: "username",
      fieldType: "input",
      label: "choose file"
    },
    {
      name: "filters",
      fieldType: "checkboxGroup",
      emptyValue: [],
      label: "choose file",
      props: {
        options: [
          {
            title: "Junior dev",
            value: "1"
          },
          {
            title: "Middle dev",
            value: "2"
          },
          {
            title: "Senior dev",
            value: "3"
          }
        ]
      }
    },
    {
      name: "hobbies",
      fieldType: "select",
      emptyValue: [],
      label: "choose file",
      props: {
        multiple: true,
        options: [
          {
            title: "Swimming",
            value: "swim"
          },
          {
            title: "Drawing",
            value: "draw"
          },
          {
            title: "Hiking",
            value: "hike"
          },
          {
            title: "Hiking 2",
            value: "hike2"
          }
        ]
      }
    },
    {
      name: "files",
      fieldType: "file",
      emptyValue: [],
      label: "choose file",
      props: {
        multiple: true
      }
    },
    {
      name: "content",
      fieldType: "editor",
      label: "choose file",
      props: {
        // multiple: true
      }
    },
    {
      name: "password",
      fieldType: "input",
      label: "choose file",
      props: {
        type: "password"
      }
    },
    {
      name: "date",
      fieldType: "date",
      emptyValue: null,
      label: "choose file"
    },
    {
      name: "time",
      fieldType: "time",
      emptyValue: null,
      placeholder: "choose file"
    },
    {
      name: "dateTime",
      fieldType: "dateTime",
      emptyValue: null,
      label: "choose file"
    },
    {
      name: "seniority",
      fieldType: "radio",
      label: "choose file",
      props: {
        options: [
          {
            value: "1",
            title: "Junior Developer"
          },
          {
            value: "2",
            title: "Middle Developer"
          },
          {
            value: "3",
            title: "Senior Developer"
          }
        ]
      }
    },
    {
      name: "remember_me",
      fieldType: "checkbox",
      emptyValue: false
      //label: "Remember me"
    }
  ]
};

const useStyles = makeStyles((theme) => ({
  tabContent: {
    margin: theme.spacing(4, 0)
  }
}));

const Fields = ({ ...props }) => {
  const { t } = useTranslation("common");

  const formRef = React.useRef();

  const debouncedError = useCallback(
    debounce(({ field, setErrors, value }) => {
      switch (field.name) {
        case "password": {
          setErrors((prev) => ({
            ...prev,
            password: value.length < 5 ? "Password length too short" : ""
          }));
        }
      }
    }, 500),
    []
  );

  return (
    <main>
      <Container>
        <h1>YEAHHHH</h1>
        <FormBuilder
          ref={formRef}
          config={config}
          fieldProps={{
            remember_me: {
              label: (
                <span>
                  I agree to the{" "}
                  <a href="https://google.com" target="_blank">
                    Terms and Conditions
                  </a>
                </span>
              )
            }
          }}
          onFieldChange={({
            setValues,
            values,
            value,
            errors,
            setErrors,
            field
          }) => {
            if (errors[field.name]) {
              setErrors((prev) => ({
                ...prev,
                [field.name]: ""
              }));
            }
            console.log("CHANGE!");
            //debouncedError({ value, setErrors, field });
            // switch (field.name) {
            //   case "username": {
            //     setErrors((prev) => ({
            //       ...prev,
            //       username: value.length > 5 ? "OOPSIE" : ""
            //     }));
            //     break;
            //   }
            //   case "password": {
            //     setErrors((prev) => ({
            //       ...prev,
            //       username: value.length > 5 ? "OOPSIE" : ""
            //     }));
            //     break;
            //   }
            // }
          }}
          // onFieldBlur={({ field, setErrors }) => {
          //   setErrors((prev) => ({
          //     ...prev,
          //     [field.name]: "You left this field empty"
          //   }));
          // }}
          onFieldBlur={({ setValues, values, errors, setErrors, field }) => {
            if (!values[field.name]) {
              setErrors((prev) => ({
                ...prev,
                [field.name]: "Required!"
              }));
            }
          }}
          afterFieldsRender={(formState) => (
            <Grid item xs={12}>
              <Tooltip
                arrow
                title={
                  !formState.values.remember_me
                    ? "Please agree to the terms to continue"
                    : ""
                }
              >
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    disabled={!formState.values.remember_me}
                    onClick={() => {
                      // alert(JSON.stringify(formState, 0, 2));
                    }}
                  >
                    Register
                  </Button>
                </div>
              </Tooltip>
            </Grid>
          )}
          onUnmount={() => {
            console.log("UNMOUNTED!");
            debouncedError.cancel();
          }}
        />
      </Container>
    </main>
  );
};

export const getStaticProps = async ({ locale }) => {
  return { props: {} };
};

export default WithLayout(Fields);
