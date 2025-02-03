const ARGOHUB_DOC_COOKIE_NAME = "argohubdoc";
const ARGOHUB_MAIN_PATH = `/${SITE_GITOPS_COLLECTION}/`;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

async function getArgoHubRedirectURL(currentPath) {
  const redirectMap = await fetchRedirectMap();

  console.log("SITE_BASE_URL", SITE_BASE_URL);
  currentPath = currentPath.replace(SITE_BASE_URL, "");

  console.log(currentPath);
  console.log(redirectMap);

  const newPath = redirectMap[currentPath];
  console.log(newPath);
  if (!newPath) return null;

  const newURL = location.href.replace(currentPath, newPath);

  return newURL;
}

async function handleRedirect() {
  const currentPath = location.pathname;

  if (currentPath.includes(ARGOHUB_MAIN_PATH)) return;

  const redirectCookie = getCookie(ARGOHUB_DOC_COOKIE_NAME);
  // if (!redirectCookie) return;

  const argoHubRedirectURL = await getArgoHubRedirectURL(currentPath);
  if (!argoHubRedirectURL) return;

  window.location.href = argoHubRedirectURL;
}

async function fetchRedirectMap() {
  const response = await fetch(
    `${SITE_BASE_URL}/assets/js/src/argohub-redirect-mapping.json`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch the collections redirect map.");
  }
  return response.json();
}

handleRedirect();
