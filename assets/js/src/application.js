/* global Clipboard: false, anchors: false, Holder: false */

(function ($) {
  'use strict'

  $(function () {
    // Tooltip and popover demos
    $('.tooltip-demo').tooltip({
      selector: '[data-toggle="tooltip"]',
      container: 'body'
    })

    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
      event.preventDefault()
      $(this).ekkoLightbox()
    })

    $('[data-toggle="popover"]').popover()

    // Demos within modals
    $('.tooltip-test').tooltip()
    $('.popover-test').popover()

    // Indeterminate checkbox example
    $('.bd-example-indeterminate [type="checkbox"]').prop('indeterminate', true)

    // Disable empty links in docs examples
    $('.bd-content [href="#"]').click(function (e) {
      e.preventDefault()
    })

    // Modal relatedTarget demo
    $('#exampleModal').on('show.bs.modal', function (event) {
      var $button = $(event.relatedTarget)      // Button that triggered the modal
      var recipient = $button.data('whatever')  // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var $modal = $(this)
      $modal.find('.modal-title').text('New message to ' + recipient)
      $modal.find('.modal-body input').val(recipient)
    })

    // Activate animated progress bar
    $('.bd-toggle-animated-progress').on('click', function () {
      $(this).siblings('.progress').find('.progress-bar-striped').toggleClass('progress-bar-animated')
    })

    // Insert copy to clipboard button before .highlight
    $('figure.highlight, div.highlight').each(function () {
      var btnHtml = '<div class="bd-clipboard"><button class="btn-clipboard" title="Copy to clipboard">Copy</button></div>'
      $(this).before(btnHtml)
      $('.btn-clipboard')
        .tooltip()
        .on('mouseleave', function () {
          // Explicitly hide tooltip, since after clicking it remains
          // focused (as it's a button), so tooltip would otherwise
          // remain visible until focus is moved away
          $(this).tooltip('hide')
        })
    })

    var clipboard = new Clipboard('.btn-clipboard', {
      target: function (trigger) {
        return trigger.parentNode.nextElementSibling
      }
    })

    clipboard.on('success', function (e) {
      $(e.trigger)
        .attr('title', 'Copied!')
        .tooltip('_fixTitle')
        .tooltip('show')
        .attr('title', 'Copy to clipboard')
        .tooltip('_fixTitle')

      e.clearSelection()
    })

    clipboard.on('error', function (e) {
      var modifierKey = /Mac/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl-'
      var fallbackMsg = 'Press ' + modifierKey + 'C to copy'

      $(e.trigger)
        .attr('title', fallbackMsg)
        .tooltip('_fixTitle')
        .tooltip('show')
        .attr('title', 'Copy to clipboard')
        .tooltip('_fixTitle')
    })

    // eslint-disable-next-line no-unused-vars
    var sidebarMenuList = $('#bd-docs-nav-list').navgoco({
      caretHtml: '<i class="fa fa-cf-arrow"></i>',
      accordion: true,
      openClass: 'opened',
      save: true,
      storageType: 'local',
      cookie: {
        name: 'codefresh-menu',
        expires: false,
        path: '/'
      },
      slide: {
        duration: 10,
        easing: 'linear'
      },

      onInitAfter: function (initial) {
        var bdDocsNav = $('#bd-docs-nav')
        var bdDocsNavActiveList = $('#bd-docs-nav li.active')
        if (bdDocsNavActiveList.length > 0) {
          var scrollTo = bdDocsNav.scrollTop() + (bdDocsNavActiveList.last().offset().top - (window.localStorage.getItem('scrollto') || bdDocsNav.height() / 2))
          scrollTo = scrollTo.toFixed()
          setTimeout(function () {
            bdDocsNav.animate({
              scrollTop: scrollTo
            }, {
              duration: 0,
              easing: 'linear',
              complete: function () {
                window.localStorage.removeItem('scrollto')
              }
            })
          }, 0)
        }
      },

      onClickAfter: function (event, submenu) {
        window.localStorage.setItem('scrollto', $(event.currentTarget).offset().top)
      }
    })

    anchors.options = {
      icon: '#'
    }
    anchors.add('.bd-content-inner > h2, .bd-content-inner > h3, .bd-content-inner > h4, .bd-content-inner > h5')
    $('.bd-content-inner > h2, .bd-content-inner > h3, .bd-content-inner > h4, .bd-content-inner > h5').wrapInner('<div></div>')

    $('a').smoothScroll({
      offset: 0
    })

    $('.section-nav')
      .on('click', 'a', function () {
        window.location.hash = $(this).attr('href')
        return false
      })

    // Search
    if (window.docsearch) {
      // Please read info about docsearch
      // https://github.com/algolia/docsearch-configs/blob/master/configs/codefresh.json
      var docSearch = window.docsearch({
        apiKey: '3d145052b8422fa173d681e9a761f81e',
        indexName: 'codefresh',
        inputSelector: '.doc-search-input',
        handleSelected: function (input, event, suggestion) {
          var url = suggestion.url
          url = suggestion.isLvl1 ? url.split('#')[0] : url
          // If it's a title we remove the anchor so it does not jump.
          window.location.href = url
        },
        algoliaOptions: {
          hitsPerPage: 6
        },

        transformData: function (hits) {
          return hits.map(function (hit) {
            if (location.href.match(/(192.168|127.0.|localhost).*:19001/)) {
              hit.url = hit.url.replace('https://vmechkauskas-codefresh.github.io/', '/')
            }
            return hit
          })
        },

        debug: false // Set debug to true if you want to inspect the dropdown
      })

      // docSearch.autocomplete.on('autocomplete:opened', function (event) {
      // console.log(event)
      // Do something when the dropdown menu is opened
      // })

      var searchInputTrigger = {

        getUrlParameter: function getUrlParameter(name) {
          name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
          var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
          var results = regex.exec(location.search)
          return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
        },

        triggerSearch: function triggerSearch(docSearch) {
          var value = this.getUrlParameter('q')
          if (value.length > 0 && docSearch && docSearch.input) {
            var input = $(docSearch.input[0])
            input.focus().trigger('input').trigger('keypress')
            docSearch.input.autocomplete.setVal(value)
            setTimeout(function () {
              docSearch.input.autocomplete.open()
            }, 500)
          }
        }

      }

      searchInputTrigger.triggerSearch(docSearch)
    }

    // Holder
    Holder.addTheme('gray', {
      bg: '#777',
      fg: 'rgba(255,255,255,.75)',
      font: 'Helvetica',
      fontweight: 'normal'
    })
  })
}(jQuery))
