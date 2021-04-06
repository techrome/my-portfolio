export const isdev = process.env.NODE_ENV !== "production";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
export const apiInfoPart = process.env.NEXT_PUBLIC_API_INFO_PART;
export const apiProjectsListPart =
  process.env.NEXT_PUBLIC_API_PROJECTS_LIST_PART;

export const prodUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
export const siteName = process.env.NEXT_PUBLIC_WEBSITE_NAME;

export const iconGlobalClassName = "default-icon";

export const langClientSide =
  typeof document === "undefined"
    ? "en"
    : document.documentElement.lang || "en";

export const listItemsPerPage = 10;
export const revalidatePageSeconds = 60 * 60 * 24;
export const queryStaleTimeMs = 1000 * revalidatePageSeconds;
export const queryCacheTimeMs = 1000 * revalidatePageSeconds;
