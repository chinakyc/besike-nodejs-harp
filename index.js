var connect = require('connect')
var serverStatic = require('serve-static')

function _connect(dir) {
   var app = connect()
   app.use(serverStatic(dir))
   return app
}

module.exports = _connect
