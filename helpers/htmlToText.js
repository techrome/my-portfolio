import DOMpurify from "dompurify";

const htmlToText = (html) => {
  return new DOMParser().parseFromString(DOMpurify.sanitize(html), "text/html")
    .documentElement.textContent;
};

export default htmlToText;
