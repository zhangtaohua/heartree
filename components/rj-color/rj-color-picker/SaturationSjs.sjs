var lastTime = null

function clamp(value, min, max) {
	return min < max ?
		(value < min ? min : value > max ? max : value) :
		(value < max ? max : value > min ? min : value)
}

function touchstart(e, ins) {
	var containerWidth = ins.selectComponent('.rj-saturation').getBoundingClientRect().width
	var containerHeight = ins.selectComponent('.rj-saturation').getBoundingClientRect().height

	var xOffset = ins.selectComponent('.rj-saturation').getBoundingClientRect().left
	var yOffset = ins.selectComponent('.rj-saturation').getBoundingClientRect().top
	var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
	var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0)
	var left = clamp(pageX - xOffset, 0, containerWidth)
	var top = clamp(pageY - yOffset, 0, containerHeight)
	var saturation = left / containerWidth
	var bright = clamp(-(top / containerHeight) + 1, 0, 1)

	ins.selectComponent('.rj-saturation-pointer').setStyle({
		left: (saturation * 100) + '%',
		top: ((-(bright * 100) + 1) + 100) + '%'
	})
	var currentTime = Date.now()
	if (currentTime - lastTime >= 50) {
		ins.callMethod("onChangeWxs", {
			saturation,
			bright
		})
		lastTime = currentTime
	}
}

function touchmove(e, ins) {
	var containerWidth = ins.selectComponent('.rj-saturation').getBoundingClientRect().width
	var containerHeight = ins.selectComponent('.rj-saturation').getBoundingClientRect().height

	var xOffset = ins.selectComponent('.rj-saturation').getBoundingClientRect().left
	var yOffset = ins.selectComponent('.rj-saturation').getBoundingClientRect().top
	var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
	var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0)
	var left = clamp(pageX - xOffset, 0, containerWidth)
	var top = clamp(pageY - yOffset, 0, containerHeight)
	var saturation = left / containerWidth
	var bright = clamp(-(top / containerHeight) + 1, 0, 1)

	ins.selectComponent('.rj-saturation-pointer').setStyle({
		left: (saturation * 100) + '%',
		top: ((-(bright * 100) + 1) + 100) + '%'
	})
	var currentTime = Date.now()
	if (currentTime - lastTime >= 50) {
		ins.callMethod("onChangeWxs", {
			saturation,
			bright
		})
		lastTime = currentTime
	}
	e.preventDefault()
	e.stopPropagation()
}

export default {
	touchstart: touchstart,
	touchmove: touchmove
}
