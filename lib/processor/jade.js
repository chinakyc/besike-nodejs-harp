module.exports = makeJade;
var jade = require('jade')
var path = require('path')
var fs = require('fs')

function makeJade(root) {
    return function(req, res, next) {
        if (path.extname(req.url) == '.html') {
            options = {
                'filename' : req.url,
                'debug' : true,
                'complieDebuf' : true,
                };
            function _render(pt) {
                if (fs.existsSync(pt)){
                res.end(jade.renderFile(pt, options));
                return true;
                    };
                return false;
                };
            pt = root + req.url;
            if (_render(pt)) { return; };
            pt = root + req.url.replace('html', 'jade');
            if (_render(pt)) { return; };
        };
        next()
    };
};
