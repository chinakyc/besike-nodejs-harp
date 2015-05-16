module.exports = _connect;
var connect = require('connect');
var serverStatic = require('serve-static');
var makeJade = require('./lib/processor/jade');
var makeLess = require('./lib/processor/less');

function _connect(dir) {
    var app = connect();

    app
        //.use(serverStatic(dir))
        .use(function (req, res, next) {
            if (req.url === '/') {
                req.url = '/index.html';
            }
            next();
        })
        .use(makeLess(dir))
        .use(makeJade(dir));
    return app;
}
