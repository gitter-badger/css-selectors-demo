MatchRendererView = require '../../match-renderer/views/match-renderer-view.coffee'

AppView = (vm) ->
  nxt.Element 'main',
    nxt.Element 'div',
      nxt.Class 'selector-input'
      nxt.Element 'input',
        nxt.Attr 'type', 'text'
        nxt.Attr 'placeholder', 'Type Your CSS Selector'
        nxt.ValueBinding vm.selector

    MatchRendererView vm.matchRendererVM

module.exports = AppView
