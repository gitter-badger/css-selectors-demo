MatchRendererVM = require '../../match-renderer/view-models/match-renderer-viewmodel.coffee'
NodesCollection = require '../models/nodes-collection.coffee'
Colors          = require '../../match-renderer/models/colors.coffee'
{expandAbbreviation} = require 'emmet'

class AppViewModel
  constructor: ->
    @matchRendererVM = new MatchRendererVM

    @nodesCollection = new nx.Cell action: (nodesCollection) =>
      @matchRendererVM.render nodesCollection

    @selector = new nx.Cell action: (selector) =>
      @matchRendererVM.markers.switchOff()
      nodes = @qsa(selector)
      markers = {}
      for node in nodes
        id = node.__id
        markers[id] =
          color: Colors.GREEN
          solid: yes

      @matchRendererVM.mark markers

    @update()
    window.onhashchange = @update.bind @

  render: (emmetString) ->
    unless emmetString
      return

    html = expandAbbreviation(emmetString)

    @nodesCollection.value = NodesCollection.fromHTML html
    @dom = buildTree @nodesCollection.value

  qsa: (selector) ->
    nodes = try
      @dom.querySelectorAll selector
    catch e
      []

  update: ->
    hash = window.location.hash.replace '#', ''
    @render decodeURI hash

buildTree = (nodes) ->
  root = document.createDocumentFragment()
  currentNode = root
  prevNode = null
  prevNodeIsClosing = no
  indent = 0

  for node in nodes
    if node.type is 'opening'
      prevNodeIsClosing = no
      _node = document.createElement node.tagName
      _node.__id = node.id

      for attr in node.attrs
        _node.setAttribute attr.name, attr.value

      if indent < node.indent
        currentNode = prevNode

      if indent > node.indent
        currentNode = currentNode.parentNode

      currentNode.appendChild _node
      indent = node.indent
      prevNode = _node
    else
      if prevNodeIsClosing
        indent--
        currentNode = currentNode.parentNode
      prevNodeIsClosing = yes

  root


module.exports = AppViewModel
