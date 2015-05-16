module.exports = _connect;
var connect = require('connect');
var path = require('path');
var serverStatic = require('serve-static');
var makeJade = require('./lib/processor/jade');
var makeLess = require('./lib/processor/less');

function _connect(dir) {
    var app = connect();

    app
        .use(function (req, res, next) {
            extname = path.extname(req.url);
            if (extname == '.jade' || extname == '.less') {
                res.writeHead(404, {"Content-Type": 'text/plain'});
                res.end();
            }
            next();
        })
        .use(function (req, res, next) {
            if (req.url === '/') {
                req.url = '/index.html';
            }
            next();
        })
        .use(makeLess(dir))
        .use(makeJade(dir))
        .use(serverStatic(dir));
    return app;
}
