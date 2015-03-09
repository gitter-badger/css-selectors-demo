AttrView = (attr) ->
	nxt.Element 'span',
		nxt.Element 'span',
			nxt.Class 'hljs-attribute'
			nxt.Text " #{attr.name}"
		nxt.Fragment(
			nxt.If attr.value,
				nxt.Text('='),
				nxt.Element 'span',
					nxt.Class 'hljs-value'
						nxt.Text "\"#{attr.value}\""
		)...

module.exports = AttrView
