TagView = require './tag-view.coffee'

require '../../../bower_components/highlightjs/styles/monokai_sublime.css'

HTMRendererView = (vm) ->
	nxt.Element 'pre',
		nxt.Element 'code',
			nxt.Classes('hljs xml')...
			nxt.Collection vm.nodeList, TagView

module.exports = HTMRendererView
