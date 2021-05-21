import { useRouter } from "next/router";

import { defaultLocale } from "@/config";

const useApiLocalePrefix = () => {
  const { locale } = useRouter();

  return locale !== defaultLocale ? `${locale}/` : "";
};
export default useApiLocalePrefix;
