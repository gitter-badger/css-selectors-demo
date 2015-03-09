MarkerView = (marker, index) ->
	nxt.Element 'div',
		nxt.Class 'marker'
		nxt.Binding marker.switchedOn, (switchedOn) ->
			if switchedOn
				nxt.Class 'switched-on'
		nxt.Binding marker.highlightConfig, ->
			{classList} = marker
			if classList.length
					nxt.Class classList
		nxt.Attr 'style', "top: #{index * 1.5}em"

module.exports = MarkerView
