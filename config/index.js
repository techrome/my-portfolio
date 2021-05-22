import { defaultLocale as defaultLocaleMain } from "@/i18n.json";

export const isdev = process.env.NODE_ENV !== "production";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
export const apiInfoPart = process.env.NEXT_PUBLIC_API_INFO_PART;
export const apiProjectsListPart =
  process.env.NEXT_PUBLIC_API_PROJECTS_LIST_PART;
export const apiBlogListPart = process.env.NEXT_PUBLIC_API_BLOG_LIST_PART;

export const prodUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
export const siteName = process.env.NEXT_PUBLIC_WEBSITE_NAME;

export const defaultOgImageUrl = process.env.NEXT_PUBLIC_DEFAULT_OG_IMAGE_URL;

export const defaultLocale = defaultLocaleMain;

export const iconGlobalClassName = "default-icon";

export const langClientSide =
  typeof document === "undefined"
    ? defaultLocale
    : document.documentElement.lang || defaultLocale;

export const listItemsPerPage = 10;
export const revalidatePageSeconds = 60 * 60 * 24;
export const queryStaleTimeMs = 1000 * revalidatePageSeconds;
export const queryCacheTimeMs = 1000 * revalidatePageSeconds;

export const maxSitemapUrls = 10000;
export const maxQueryListItems = 100;

export const showPreviosDataTimeMs = 300;

export const dateFormat = "yyyy-MM-dd";
export const timeFormat = "HH:mm";
export const dateTimeFormat = `${dateFormat} ${timeFormat}`;
