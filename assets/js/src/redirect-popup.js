/* eslint-disable compat/compat */
(function ($) {
  'use strict'

  function getDocTypeCookie() {
    return document.cookie.split(';').find(function (item) {
      return item.trim().startsWith('doctype')
    })
  }

  function isLastlyVisitedCSDP(docTypeCookie) {
    var docType = docTypeCookie.split('=').pop()

    return docType === 'ArgoPlatform'
  }

  function isLastlyVisitedClassic(docTypeCookie) {
    var docType = docTypeCookie.split('=').pop()

    return docType === 'Classic'
  }

  function setDocumentationCookie() {
    document.cookie = 'doctype=ArgoPlatform; SameSite=Lax; Secure; Domain=localhost; Max-age=2592000; Path=/'
  }

  $(function () {
    // if (window.location.hostname === 'localhost') {
    //   return
    // }

    try {
      var docTypeCookie = getDocTypeCookie()
      if (docTypeCookie) {
        var url = new URL(window.location)
        var seachParams = new URLSearchParams(url.search)
        if (isLastlyVisitedCSDP(docTypeCookie)) {
          window.location.href = 'https://codefresh.io/csdp-docs/'
        } else if (isLastlyVisitedClassic(docTypeCookie) && seachParams.has('redirectFrom')) {
          $('#redirectModal').modal('show')
          $('#redirectModal .redirect-popup__footer-link').attr('href', seachParams.get('redirectFrom'))
          $('#redirectModal .redirect-popup__footer-link').on('click', setDocumentationCookie)
        }
      }
    } catch (error) {
      console.error(error)
    }
  })
}(jQuery))
