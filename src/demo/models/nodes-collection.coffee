class NodesCollection
  @createRoot: ->
    df = document.createDocumentFragment()
    body = document.createElement 'body'
    df.appendChild body
    body

  @fromHTML: (html) ->
    root = @createRoot()
    root.innerHTML = html
    root.__level = -1
    root.__id = 0
    nodesCollection = @map root
      .slice 1, -1
    nodesCollection

  @map: (element) ->
    nodes = []
    indent = element.__level + 1
    elementId = element.__id
    index = 0;

    nodes.push @mapElement element, 'opening'

    for child in element.children
      child.__level = indent
      child.__id = "#{elementId}.#{++index}"
      nodes = nodes.concat @map child

    element.__level = indent - 1
    element.__id = "x#{elementId}"

    nodes.push @mapElement element, 'closing'
    nodes

  @mapElement: (element, type) ->
    attrs =
      for index in [0...element.attributes.length]
        item = element.attributes.item index
        childless: element.children.length is 0
        name: item.name
        value: item.value

    tagName: do element.nodeName.toLowerCase
    id: element.__id
    attrs: attrs
    indent: element.__level
    type: type
    childless: element.children.length is 0

module.exports = NodesCollection
