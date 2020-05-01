let mouseX = window.innerWidth / 2,
  mouseY = window.innerHeight / 2

let circle = {
  el: document.getElementById("circle-cursor"),
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}

// don't show circle on touch screen devices
if ("ontouchstart" in document.documentElement) {
  circle.el.style.display = "none"
} else {
  document.body.style.cursor = "none"
  document.querySelectorAll(".no-cursor").forEach((el) => el.style.cursor = "none")
  circle.el.style.display = "flex"
}

circle.w = 15
circle.h = 15

circle.update = () => {
  l = circle.x - circle.w / 2
  t = circle.y - circle.h / 2
  circle.el.style.transform = "translate3d(" + l + "px, " + t + "px, 0)"
}

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

document.addEventListener("DOMContentLoaded", () => {
  setInterval(move, 500 / 60)
})

function move() {
  circle.x = lerp(circle.x, mouseX, 0.1)
  circle.y = lerp(circle.y, mouseY, 0.1)
  circle.update()
}

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end
}
