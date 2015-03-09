Colors = require '../models/colors.coffee'

class Marker
	@getClassList = (config) ->
		classList = [
			Marker.colorClassMap[config.color]
		]

		if config.solid
			classList.push 'marker-solid'

		classList.join ' '

	@colorClassMap = {}
	@colorClassMap[Colors.RED] = 'marker-red'
	@colorClassMap[Colors.GREEN] = 'marker-green'

	constructor: ->
		@switchedOn = new nx.Cell value:no
		@classList = ''

		@highlightConfig = new nx.Cell action: (config) =>
			if config
				@classList = Marker.getClassList config
			else
				@classList = ''

	switchOn: (highlightConfig) ->
		@switchedOn.value = yes
		@highlightConfig.value = highlightConfig

	switchOff: ->
		@switchOn.value = no
		@highlightConfig.value = null

module.exports = Marker
