import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Paper, Divider } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import useTranslation from "next-translate/useTranslation";
import { dehydrate } from "react-query/hydration";
import domPurify from "dompurify";

import WithLayout from "@/components/WithLayout";
import Container from "@/components/Container";
import MainInfo from "@/components/MainInfo";
import Tabs from "@/components/Tabs";
import ProjectList from "@/components/ProjectList";
import HTMLContent from "@/components/HTMLContent";
import EmptyData from "@/components/EmptyData";
import useQuery from "@/helpers/useQuery";
import useApiLocalePrefix from "@/helpers/useApiLocalePrefix";
import createQueryClient from "@/helpers/createQueryClient";
import createQueryKey from "@/helpers/createQueryKey";
import prepareGlobalData from "@/helpers/prepareGlobalData";
import {
  revalidatePageSeconds,
  apiInfoPart,
  apiProjectsListPart,
  listItemsPerPage,
  siteName,
  defaultLocale
} from "@/config";
import * as c from "@/constants";

const useStyles = makeStyles((theme) => ({
  tabContent: {
    margin: theme.spacing(4, 0)
  }
}));

const tabsInfo = [
  { value: "1", title: "my projects" },
  { value: "2", title: "about me" }
];

const Home = ({ ...props }) => {
  const { t } = useTranslation("common");
  const cls = useStyles();
  const localePrefix = useApiLocalePrefix();
  const [activeTab, setActiveTab] = useState(tabsInfo[0].value);
  const infoQueryData = useQuery([`/stories/${localePrefix}${apiInfoPart}`]);

  const mainInfo = infoQueryData.data?.data?.[c.story]?.[c.content];

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case tabsInfo[0].value: {
        return <ProjectList />;
      }
      case tabsInfo[1].value: {
        return mainInfo?.[c.about_me]?.[c.content] ? (
          <HTMLContent
            innerHTML={domPurify.sanitize(mainInfo?.[c.about_me]?.[c.content])}
          />
        ) : (
          <EmptyData />
        );
      }
      default: {
        return null;
      }
    }
  };

  return (
    <main>
      <Head>
        <title>
          {mainInfo?.[c.full_name]} | {siteName}
        </title>
        <meta
          property="og:title"
          content={`${mainInfo?.[c.full_name]} | ${siteName}`}
        />
        <meta
          property="og:image"
          content={mainInfo?.[c.avatar]?.[c.filename]}
        />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={mainInfo?.[c.description]} />
        <meta name="description" content={mainInfo?.[c.description]} />
      </Head>
      <Container>
        <MainInfo />
      </Container>
      <Divider />
      <Paper elevation={3} square>
        <Container>
          <Tabs list={tabsInfo} value={activeTab} onChange={handleChange} />
        </Container>
      </Paper>
      <Container>
        <section className={cls.tabContent}>{renderTabContent()}</section>
      </Container>
      <Link href="/blog/a">
        <a>TO BLOG!!!</a>
      </Link>
    </main>
  );
};

export const getStaticProps = async ({ locale }) => {
  const queryClient = createQueryClient();
  const { cacheTimestamp } = await prepareGlobalData({ queryClient });
  const localePrefix = locale !== defaultLocale ? `${locale}/` : "";

  await queryClient.prefetchQuery(
    createQueryKey([`/stories/${localePrefix}${apiInfoPart}`], {
      cacheTimestamp
    })
  );
  await queryClient.prefetchQuery(
    createQueryKey(
      [
        `/stories`,
        {
          params: {
            [c.starts_with]: `${localePrefix}${apiProjectsListPart}/`,
            [c.per_page]: listItemsPerPage,
            [c.page]: 1
          }
        }
      ],
      { cacheTimestamp }
    )
  );

  return {
    revalidate: revalidatePageSeconds,
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

export default WithLayout(Home);
