import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { locales } from "@/i18n.json";
import { prodUrl } from "@/config";
import removeQueryHashFromUrl from "@/helpers/removeQueryHashFromUrl";

const CommonHead = ({ ...props }) => {
  const router = useRouter();
  const cleanPath = removeQueryHashFromUrl(router.asPath);

  return (
    <Head>
      <link rel="canonical" href={`${prodUrl}/${router.locale}${cleanPath}`} />
      <link
        rel="alternate"
        href={`${prodUrl}${cleanPath}`}
        hrefLang="x-default"
      />
      <>
        {locales.map((loc, index) => (
          <link
            key={index}
            rel="alternate"
            href={`${prodUrl}/${loc}${cleanPath}`}
            hrefLang={loc}
          />
        ))}
      </>
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
      <meta key="og:url" property="og:url" content={`${prodUrl}${cleanPath}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default CommonHead;
