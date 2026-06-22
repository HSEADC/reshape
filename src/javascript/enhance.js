// ─────────────────────────────────────────────────────────────
// enhance.js — progressive 3D/motion enhancement for detail pages
// Runs on every page (bundled in index.js) but only acts on the
// tutorial and journal layouts. No markup assumptions beyond the
// existing classes; everything degrades gracefully without JS.
// ─────────────────────────────────────────────────────────────

;(function () {
  var body = document.body
  if (!body) return

  var isTutorial = body.classList.contains('tutorial-page')
  var isArt = body.classList.contains('art')
  var isMusic = body.classList.contains('music')
  var isShowcase = body.classList.contains('showcase')
  if (!isTutorial && !isArt && !isMusic && !isShowcase) return

  var reduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  body.classList.add('js-enhanced')

  // pick the blocks that fade/rise into view, per layout
  var selector
  if (isTutorial) {
    selector = '.header6, .duration, .text, .image, .steps .step, .tip, .backj'
  } else if (isArt) {
    selector =
      '.header6, .text, .image, .ps, .lolik, .lolik1, .lolik2, .header2, .base, .backj'
  } else if (isShowcase) {
    selector = '.header6, .meta, .text, .specs, .download, .backj'
  } else {
    selector = '.header6, .text, .cards .card, .backj'
  }

  var revealEls = Array.prototype.slice.call(document.querySelectorAll(selector))
  revealEls.forEach(function (el, i) {
    el.classList.add('reveal')
    // light stagger so neighbours cascade in rather than snap together
    el.style.transitionDelay = (i % 6) * 60 + 'ms'
  })

  // ---- scroll reveal ----
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    revealEls.forEach(function (el) {
      io.observe(el)
    })
  } else {
    // no observer support: just show everything
    revealEls.forEach(function (el) {
      el.classList.add('is-visible')
    })
  }

  // ---- reading progress bar ----
  var bar = document.createElement('div')
  bar.className = 'reading-progress'
  body.appendChild(bar)

  // ---- hero parallax (tutorial & showcase use a real <img>) ----
  var heroImg =
    isTutorial || isShowcase ? document.querySelector('.back-img') : null
  if (heroImg && !reduced) {
    heroImg.style.willChange = 'transform'
  }

  var ticking = false
  function onScroll() {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(function () {
      var st = window.pageYOffset || document.documentElement.scrollTop
      var docH =
        document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = docH > 0 ? (st / docH) * 100 + '%' : '0%'

      if (heroImg && !reduced) {
        var offset = Math.min(st * 0.15, 40)
        heroImg.style.transform = 'scale(1.18) translateY(' + offset + 'px)'
      }
      ticking = false
    })
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})()
