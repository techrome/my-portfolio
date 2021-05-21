export default function removeQueryHashFromUrl(url) {
  return url.split(/[?#]/)[0];
}
