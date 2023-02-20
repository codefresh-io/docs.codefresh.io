// (function ($) {
//   'use strict'

//   function getDocTypeCookie() {
//     return document.cookie.split(';').find(function (item) {
//       return item.trim().startsWith('doctype')
//     })
//   }

//   function isLastlyVisitedCsdp(docTypeCookie) {
//     var docType = docTypeCookie.split('=').pop()

//     return docType === 'ArgoPlatform'
//   }

//   function isLastlyVisitedClassic(docTypeCookie) {
//     var docType = docTypeCookie.split('=').pop()

//     return docType === 'Classic'
//   }

//   function isRedirectedFromClassicDocs(docTypeCookie) {
//     var redirectFromUrl = localStorage.getItem('redirectFrom')

//     return isLastlyVisitedCsdp(docTypeCookie) && redirectFromUrl && redirectFromUrl.startsWith(window.location.origin)
//   }

//   function setDocumentationCookie() {
//     document.cookie = 'doctype=Classic; SameSite=Lax; Secure; Domain=.codefresh.io; Max-age=2592000; Path=/'
//   }

//   function handleNavigateBackToClassic() {
//     setDocumentationCookie()
//     $('#redirectModal').modal('hide')
//   }

//   $(function () {
//     if (window.location.hostname === 'localhost' || localStorage.getItem('ignoreRedirect')) {
//       return
//     }

//     $('a[href*="codefresh.io/docs').each(function () {
//       $(this).on('click', function () {
//         setDocumentationCookie()
//         localStorage.removeItem('redirectFrom')
//         if (typeof window.ga === 'function') {
//           window.ga('send', 'event', 'Navbar', 'Docs links', 'Open CF Classic Docs')
//         }
//       })
//     })

//     try {
//       var docTypeCookie = getDocTypeCookie()
//       if (docTypeCookie) {
//         if (isLastlyVisitedClassic(docTypeCookie)) {
//           localStorage.setItem('redirectFrom', window.location.href)
//           window.location.href = 'https://codefresh.io/docs/'
//         } else if (isRedirectedFromClassicDocs(docTypeCookie)) {
//           $('#redirectModal').modal({
//             backdrop: false,
//             show: true
//           })
//           $('#redirectModal').on('hide.bs.modal', function () {
//             localStorage.removeItem('redirectFrom')
//           })
//           var redirectFromUrl = localStorage.getItem('redirectFrom')
//           $('#redirectModal .redirect-popup__footer-link').attr('href', redirectFromUrl)
//           $('#redirectModal .redirect-popup__footer-link').on('click', handleNavigateBackToClassic)
//         }
//       }
//     } catch (error) {
//       console.error(error)
//     }
//   })
// }(jQuery))
