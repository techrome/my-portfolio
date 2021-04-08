import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { prodUrl } from "@/config";

const CommonHead = ({ ...props }) => {
  const router = useRouter();

  return (
    <Head>
      <link rel="canonical" href={`${prodUrl}/en${router.pathname}`} />
      <link
        rel="alternate"
        href={`${prodUrl}/ka${router.pathname}`}
        hrefLang="ka"
      />
      <link
        rel="alternate"
        href={`${prodUrl}/ru${router.pathname}`}
        hrefLang="ru"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <meta property="og:url" content={`${prodUrl}${router.pathname}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default CommonHead;
