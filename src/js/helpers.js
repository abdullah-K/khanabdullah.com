// https://codepen.io/maxxheth/pen/oVYRdm
function scrollAnchors(e, respond = null) {
	function distanceToTop(el) {
		return Math.floor(el.getBoundingClientRect().bottom)
	}
	e.preventDefault()
	var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href')
	var targetAnchor = document.querySelector(targetID)
	if (!targetAnchor) return
	var originalTop = distanceToTop(targetAnchor)
	window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' })
	var checkIfDone = setInterval(() => {
		var atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2
		if (distanceToTop(targetAnchor) === 0 || atBottom) {
			targetAnchor.tabIndex = '-1'
			targetAnchor.focus()
			if ('history' in window) {
				window.history.pushState('', '', targetID)
			} else {
				window.location = targetID
			}
			clearInterval(checkIfDone)
		}
	}, 100)
}
