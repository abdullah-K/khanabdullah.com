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

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    effect.setOptions({
      zoom: 0.7,
    });
  }, 1000);
})
