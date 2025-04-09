const enterpriseDocumentationCookie = 'cfdoctype=enterprise'
const ARGOHUB_MAIN_PATH = `/${SITE_GITOPS_COLLECTION}/`;
const enterpriseDocTypeLockKey = 'enterpriseDocTypeLock';

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
  handleEnterpriseDocTypeLock()

  if (shouldSkipRedirect()) return;

  const argoHubRedirectURL = await getArgoHubRedirectURL(location.pathname);
  if (!argoHubRedirectURL) return;

  location.href = argoHubRedirectURL;
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

function handleEnterpriseDocTypeLock() {
  const queryParams = new URLSearchParams(location.search);
  if (!queryParams.has('ent')) return;

  sessionStorage.setItem(enterpriseDocTypeLockKey, 'true');
}


function isEnterpriseLockPresent(){
  const enterpriseDocTypeLock = sessionStorage.getItem(enterpriseDocTypeLockKey)
  return !!enterpriseDocTypeLock

}

function shouldSkipRedirect() {
  return (
    isEnterpriseLockPresent() ||
    SITE_IS_GITOPS_COLLECTION ||
    checkIfEnterpriseDocumentationCookieSet()
  );
}

handleRedirect();
