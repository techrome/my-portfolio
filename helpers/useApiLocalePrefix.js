import { useRouter } from "next/router";

const useApiLocalePrefix = () => {
  const { locale } = useRouter();

  return locale !== "en" ? `${locale}/` : "";
};
export default useApiLocalePrefix;
