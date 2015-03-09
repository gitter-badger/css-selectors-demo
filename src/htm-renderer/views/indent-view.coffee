INDENT_SYMBOL = '  '

IndentView = (indentSize) ->
	indent = ''
	if indentSize > 0
		for [0..indentSize]
			indent = "#{indent}#{INDENT_SYMBOL}"

	nxt.Text indent

module.exports = IndentView
