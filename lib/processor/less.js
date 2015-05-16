module.exports = makeLess;
var less = require('less');
var fs = require('fs');
var path = require('path');

function _rendercss(pt, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", 'text/css; charset=UTF-8');
    if (path.extname(pt) == '.css') {
        fs.readFile(pt, {encoding : "UTF-8"},function (err, data) {
            if (err) {throw err;}
            res.setHeader("Content-Length", data.length);
            res.end(data);
        });
    }
    else{
        fs.readFile(pt, { encoding: 'utf-8' }, function(err, data) {
            if (err) {throw err;}
            less.render(data, function(err, output){
                if (err) {throw err;}
                res.setHeader("Content-Length", output.length);
                res.end(output);
            });
        });
    }
}

function makeLess(root) {
    return function(req, res, next) {
        if (path.extname(req.url) == '.css') {
            pt = root + req.url;
            if (fs.existsSync(pt)) {
                return _rendercss(pt, res);
            }
            pt = root + req.url.replace('css', 'less');
            if (fs.existsSync(pt)) {
                return _rendercss(pt, res);
            }
        }
        next();
    };
}
