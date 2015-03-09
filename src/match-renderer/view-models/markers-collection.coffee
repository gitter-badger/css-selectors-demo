Marker = require './marker.coffee'

class MarkersCollection extends nx.Collection
	constructor: (length) ->
		super items: for [0..length - 1]
			new Marker

	switchOn: (index, highlightConfig) ->
		@items[index].switchOn highlightConfig

	switchOff: (index) ->
		if not index and index isnt 0
			@items.forEach (marker) ->
				marker.switchOff()
		else
			@items[index].switchOff()

	switchedOn: ->
		@items.filter (marker) ->
			marker.switchedOn()

module.exports = MarkersCollection
