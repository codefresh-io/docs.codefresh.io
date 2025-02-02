import { redirectMap } from "./argohub-redirect-mapping.js";

const ARGOHUB_DOC_COOKIE_NAME = "argohubdoc";
const ARGOHUB_MAIN_PATH = "/argohub/";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function getArgoHubRedirectURL(currentPath) {
  if (currentPath.includes("/docs/docs/")) {
    currentPath = currentPath.replace("/docs/docs/", "/docs/");
  }

  const newPath = redirectMap[currentPath];
  if (!newPath) return null;

  const lastMatchRegex = new RegExp(`${currentPath}(?=[^${currentPath}]*$)`);
  const newURL = location.href.replace(lastMatchRegex, newPath);

  return newURL;
}

function handleRedirect() {
  const currentPath = location.pathname;

  if (currentPath.includes(ARGOHUB_MAIN_PATH)) return;

  const redirectCookie = getCookie(ARGOHUB_DOC_COOKIE_NAME);
  if (!redirectCookie) return;

  const argoHubRedirectURL = getArgoHubRedirectURL(currentPath);
  if (!argoHubRedirectURL) return;

  window.location.href = argoHubRedirectURL;
}

handleRedirect();
