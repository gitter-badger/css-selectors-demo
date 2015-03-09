class HTMRendererViewModel
	constructor: ->
		@nodeList = new nx.Collection

	render: (nodes) ->
		@nodeList.reset nodes

module.exports = HTMRendererViewModel
