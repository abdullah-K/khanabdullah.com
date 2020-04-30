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

function scrollTo() {
  const links = document.querySelectorAll('.smooth-scroll')
  links.forEach(each => (each.onclick = scrollAnchors))
}

document.addEventListener("DOMContentLoaded", () => {
   if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  document.querySelector(".fallback-bg").classList.remove("fallback-bg")
  scrollTo()
  setTimeout(() => {
    effect.setOptions({
      zoom: 0.7,
    })
  }, 1000)
})
