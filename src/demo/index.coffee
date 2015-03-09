AppView = require './views/app.view.coffee'
AppVM   = require './view-models/app.vm.coffee'

app = new AppVM

{node} = AppView(app).data
document.body.appendChild node
