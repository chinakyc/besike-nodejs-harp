module.exports = makeJade;
var jade = require('jade');
var path = require('path');
var fs = require('fs');

function _render(pt, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", 'text/html; charset=UTF-8');
    if (path.extname(pt) == '.html') {
        fs.readFile(pt, {encoding : "UTF-8"},function (err, data) {
            res.setHeader("Content-Length", data.length);
            res.end(data);
        });
    }
    else{
        data = jade.renderFile(pt, options);
        res.setHeader("Content-Length", data.length);
        res.end(data);
    }
}

function makeJade(root) {
    return function(req, res, next) {
        if (path.extname(req.url) == '.html') {
            options = {
                'filename' : req.url,
                'debug' : true,
                'complieDebuf' : true,
                };
            pt = root + req.url;
            if (fs.existsSync(pt)) {
                return _render(pt, res);
            }
            pt = root + req.url.replace('html', 'jade');
            if (fs.existsSync(pt)) {
                return _render(pt, res);
            }
        }
        next();
    };
}
