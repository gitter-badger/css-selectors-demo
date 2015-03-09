MarkerView = require './marker-view.coffee'
HTMRendererView = require '../../htm-renderer/views/htm-renderer-view.coffee'

require '../style/main.styl'

MatchRendererView = (vm) ->
	nxt.Element 'div',
		nxt.Class 'match-renderer hljs'
		nxt.Element 'div',
			nxt.Class 'match-markers'
			nxt.Collection vm.markers, MarkerView
		HTMRendererView vm

module.exports = MatchRendererView
