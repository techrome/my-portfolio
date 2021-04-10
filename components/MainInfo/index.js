import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Skeleton as MuiSkeleton } from "@material-ui/lab";

import FlexList from "@/components/FlexList";
import SvgIcon from "@/components/SvgIcon";
import EmptyData from "@/components/EmptyData";
import * as c from "@/constants";
import { iconGlobalClassName, apiInfoPart } from "@/config";
import useApiLocalePrefix from "@/helpers/useApiLocalePrefix";
import useQuery from "@/helpers/useQuery";

const useStyles = makeStyles(
  (theme) => ({
    main: {
      margin: theme.spacing(3, 0)
    },
    profession: {
      fontWeight: "normal"
    },
    skillList: {
      margin: theme.spacing(2, 0)
    },
    skill: {
      padding: theme.spacing(0.5, 1.5),
      border: `1px solid ${theme.palette.text.primary}`,
      transition: "border 0.2s",
      borderRadius: theme.spacing(3)
    },
    contactWrapper: {
      display: "flex",
      alignItems: "center"
    },
    contactIcon: {
      marginRight: theme.spacing(0.5),
      [`& .${iconGlobalClassName}`]: {
        minWidth: theme.spacing(3),
        minHeight: theme.spacing(3),
        width: theme.spacing(3),
        height: theme.spacing(3),
        fill: theme.palette.primary.main
      }
    }
  }),
  { index: 1 }
);

const Skeleton = ({ ...props }) => {
  return (
    <>
      <Typography variant="h1">
        <MuiSkeleton />
      </Typography>
      <Typography variant="h2">
        <MuiSkeleton />
      </Typography>
      <MuiSkeleton />
      <MuiSkeleton />
    </>
  );
};

const Contact = ({ data, ...props }) => {
  const cls = useStyles();

  return (
    <a
      className={cls.contactWrapper}
      href={data?.[c.url]}
      target="_blank"
      rel="noopener noreferrer"
    >
      {!!data?.[c.icon]?.[c.filename] && (
        <div className={cls.contactIcon}>
          <SvgIcon customSrc={data[c.icon][c.filename]} />
        </div>
      )}
      <Typography variant="h5" color="primary">
        {data?.[c.title]}
      </Typography>
    </a>
  );
};

const Skill = ({ data, ...props }) => {
  const cls = useStyles();

  return (
    <div className={cls.skill}>
      <Typography variant="h5">{data}</Typography>
    </div>
  );
};

const MainInfo = ({ ...props }) => {
  const cls = useStyles();
  const localePrefix = useApiLocalePrefix();
  const queryData = useQuery([`/stories/${localePrefix}${apiInfoPart}`]);

  const { data, isLoading, isSuccess } = queryData;
  const mainInfo = data?.data?.[c.story]?.[c.content];

  return (
    <section className={cls.main}>
      {isLoading ? (
        <Skeleton />
      ) : isSuccess ? (
        <>
          <Typography variant="h1">{mainInfo?.[c.full_name]}</Typography>
          <Typography variant="h2" className={cls.profession}>
            {mainInfo?.[c.profession]}
          </Typography>
          {mainInfo?.[c.skills]?.length > 0 && mainInfo?.[c.skills_separator] && (
            <div className={cls.skillList}>
              <FlexList spacing={1}>
                {mainInfo[c.skills]
                  .split(mainInfo[c.skills_separator])
                  .map((el, index) => (
                    <Skill key={index} data={el} />
                  ))}
              </FlexList>
            </div>
          )}
          {mainInfo?.[c.contacts] && mainInfo?.[c.contacts].length > 0 && (
            <FlexList h={2} v={1}>
              {mainInfo[c.contacts].map((el, index) => (
                <Contact key={index} data={el} />
              ))}
            </FlexList>
          )}
        </>
      ) : (
        <EmptyData />
      )}
    </section>
  );
};

export default MainInfo;
