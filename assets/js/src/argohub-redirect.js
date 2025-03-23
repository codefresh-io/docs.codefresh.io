const enterpriseDocumentationCookie = 'cfdoctype=enterprise'
const ARGOHUB_MAIN_PATH = `/${SITE_GITOPS_COLLECTION}/`;


function checkIfEnterpriseDocumentationCookieSet() {
  return document.cookie.includes(enterpriseDocumentationCookie)
}

async function getArgoHubRedirectURL(currentPath) {
  currentPath = currentPath.replace(SITE_BASE_URL, "");

  const redirectMap = await fetchRedirectMap();

  const newPath = redirectMap[currentPath];
  if (!newPath) return null;

  const newURL =
    newPath === ARGOHUB_MAIN_PATH
      ? `${location.href}${SITE_GITOPS_COLLECTION}`
      : location.href.replace(currentPath, newPath);

  return newURL;
}

async function handleRedirect() {
  const currentPath = location.pathname;

  if (currentPath.includes(ARGOHUB_MAIN_PATH)) return;

  const isEnterpriseDocumentationCookieSet = checkIfEnterpriseDocumentationCookieSet()
  if (isEnterpriseDocumentationCookieSet) return;

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
