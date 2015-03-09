HTMRendererViewModel = require '../../htm-renderer/view-models/htm-renderer-viewmodel.coffee'
MarkersCollection    = require './markers-collection.coffee'

class MatchRendererViewModel extends HTMRendererViewModel
	constructor: ->
		super
		@markers = new MarkersCollection

	mark: (markers) ->
		for id, highlightConfig of markers
			@markers.switchOn @markers.map[id], highlightConfig

	render: (nodeList) ->
		ids = nodeList
			.filter (node) ->
				node.type is 'opening' or not node.childless and node.type is 'closing'
			.map (node) ->
				node.id

		{items} = new MarkersCollection ids.length

		@markers.map = {}

		for id, index in ids
			@markers.map[id] = index

		@markers.reset items

		super nodeList
		@

module.exports = MatchRendererViewModel
