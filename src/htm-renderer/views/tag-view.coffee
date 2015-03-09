IndentView = require './indent-view.coffee'
AttrView   = require './attr-view.coffee'

TagView = (node) ->
	nxt.Element 'span',
		nxt.Class 'hljs-tag'
		(
			if node.childless
				nxt.Class 'childless'
		),
		nxt.If node.type is 'opening',
			IndentView node.indent
			nxt.Text '<'
			nxt.Element 'span',
				nxt.Class 'hljs-title'
				nxt.Text "#{node.tagName}"

			(do ->
				for attr in node.attrs
					AttrView attr
			)...

			do ->
				if node.type is 'selfclosing'
					nxt.Text '/>'
				else
					nxt.Text '>'
			(
				if not node.childless
					nxt.Text '\n'
			)

		nxt.If node.type is 'closing',
			nxt.Fragment \
				(
					if not node.childless
						IndentView node.indent
				),
				nxt.Class('closing'),
				nxt.Text('</'),
				nxt.Element('span',
					nxt.Class 'hljs-title'
						nxt.Text "#{node.tagName}"
				),
				nxt.Text '>\n'

module.exports = TagView
