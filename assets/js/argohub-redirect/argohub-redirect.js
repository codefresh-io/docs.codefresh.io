/* eslint-disable no-implicit-globals, strict */
/* global SITE_BASE_URL, SITE_GITOPS_COLLECTION, SITE_IS_GITOPS_COLLECTION */

const GITOPS_DOC_COOKIE = 'cfdoctype=gitops'
const IS_GITOPS_DOC_COOKIE_SET = document.cookie.includes(GITOPS_DOC_COOKIE)

handleRedirect()

async function getArgoHubRedirectURL(currentPath) {
  currentPath = currentPath.replace(SITE_BASE_URL, '')

  const redirectMap = await fetchRedirectMap()
  const newPath = redirectMap[currentPath]
  if (!newPath) {
    return null
  }

  const newURL =
    newPath === `/${SITE_GITOPS_COLLECTION}/`
      ? `${location.href}${SITE_GITOPS_COLLECTION}`
      : location.href.replace(currentPath, newPath)

  return newURL
}

async function handleRedirect() {
  if (SITE_IS_GITOPS_COLLECTION || !IS_GITOPS_DOC_COOKIE_SET) {
    return
  }

  const argoHubRedirectURL = await getArgoHubRedirectURL(location.pathname)
  if (!argoHubRedirectURL) {
    return
  }

  location.href = argoHubRedirectURL
}

async function fetchRedirectMap() {
  const response = await fetch(`${SITE_BASE_URL}/assets/js/argohub-redirect/argohub-redirect-mapping.json`)
  if (!response.ok) {
    throw new Error('Failed to fetch the collections redirect map.')
  }
  return response.json()
}

function setGitOpsDocumentationCookie() {
  const maxAge = 2592000
  configureGitOpsDocumentationCookie(maxAge)
}

function removeGitOpsDocumentationCookie() {
  configureGitOpsDocumentationCookie(0)
}

function configureGitOpsDocumentationCookie(maxAge) {
  let cookie = `${GITOPS_DOC_COOKIE}; Max-Age=${maxAge}; Path=/; SameSite=Strict`

  if (location.protocol === 'https:') {
    cookie += '; Secure'
  }

  if (location.hostname === 'codefresh.io') {
    cookie += '; Domain=.codefresh.io'
  }

  document.cookie = cookie
}

function toggleSegmentDropdown() {
  const select = document.querySelector('.custom-select')
  select.classList.toggle('open')
}

// eslint-disable-next-line no-unused-vars
function handleDropdownKeydown(event) {
  const select = document.querySelector('.custom-select')
  const options = select.querySelectorAll('.option')
  const isOpen = select.classList.contains('open')

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      toggleSegmentDropdown()
      break
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen) {
        toggleSegmentDropdown()
      }
      options[0].focus()
      break
    case 'Escape':
      if (isOpen) {
        toggleSegmentDropdown()
      }
      break
    default:
      break
  }
}

async function selectSegmentOption(option, selectedValue) {
  const selectDisplay = document.querySelector('.select-display')
  selectDisplay.textContent = option.textContent

  const redirectMap = await fetchRedirectMap()
  const pathname = window.location.pathname
  const currentPath = pathname.replace(SITE_BASE_URL, '')

  if (selectedValue === 'enterprise') {
    removeGitOpsDocumentationCookie()

    const enterprisePath = Object.keys(redirectMap).find(key => redirectMap[key] === currentPath)

    if (enterprisePath) {
      window.location.href = `${SITE_BASE_URL}${enterprisePath}`
    } else {
      window.location.href = `${SITE_BASE_URL}/`
    }
  } else if (selectedValue === 'gitops') {
    setGitOpsDocumentationCookie()

    const gitOpsPath = redirectMap[currentPath]

    if (gitOpsPath) {
      window.location.href = `${SITE_BASE_URL}${gitOpsPath}`
    } else {
      window.location.href = `${SITE_BASE_URL}/${SITE_GITOPS_COLLECTION}/`
    }
  }
}

// eslint-disable-next-line no-unused-vars
function handleOptionKeydown(event, option, selectedValue) {
  const select = document.querySelector('.custom-select')
  const options = select.querySelectorAll('.option')
  const currentIndex = Array.from(options).indexOf(option)

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      selectSegmentOption(option, selectedValue)
      break
    case 'ArrowDown':
      event.preventDefault()
      if (currentIndex < options.length - 1) {
        options[currentIndex + 1].focus()
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (currentIndex > 0) {
        options[currentIndex - 1].focus()
      }
      break
    case 'Escape':
      select.classList.remove('open')
      select.querySelector('.select-display').focus()
      break
    default:
      break
  }
}

document.addEventListener('click', e => {
  const select = document.querySelector('.custom-select')
  if (!select.contains(e.target)) {
    select.classList.remove('open')
  }
})
