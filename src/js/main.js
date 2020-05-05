const effect = VANTA.WAVES({
  el: ".waves",
  mouseControls: true,
  touchControls: true,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x0a2955,
  shininess: 5.0,
  waveHeight: 20,
  waveSpeed: 0.4,
  zoom: 1
})

document.addEventListener("DOMContentLoaded", () => {
  console.log('%c Hey there! You can look at this website\'s source code on https://github.com/abdullah-K/khanabdullah.com', 'background: #1B498C; color: #fff;')

  // section height adjustment for mobile
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    let vh = window.matchMedia("(orientation: landscape)").matches ? window.innerHeight * 0.015 : window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      })
    })
  })

  // remove fallback background to show waves background
  document.querySelector(".fallback-bg").classList.remove("fallback-bg")

  // zoom out animation for waves
  setTimeout(() => {
    effect.setOptions({
      zoom: 0.7,
    })
  }, 100)

  let languageLinks = document.querySelectorAll(".language-link"),
      languageSelector = document.querySelector(".language-selector")
  if(languageLinks) {
    languageLinks.forEach((link) => {
      link.onclick = (e) => {
        if(window.location.pathname.includes("fr")) {
          languageSelector.classList.remove("french")
          languageSelector.classList.add("english")
        }
        else {
          languageSelector.classList.remove("english")
          languageSelector.classList.add("french")
        }

        let body = document.querySelector("body")
        e.preventDefault()
        setTimeout(() => {
          if(body.classList.contains("fade-out")) {
            if(window.location.pathname.includes("fr")) {
              window.location = "/"
            }
            else {
              window.location = "/fr"
            }
          }
        }, 800);
        body.classList.add("fade-out")
      }
    })
  }
})
