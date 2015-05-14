module.exports = makeLess;
var less = require('less')
var fs = require('fs')
var path = require('path')

function makeLess(root) {
    return function(req, res, next) {
        if (path.extname(req.url) == '.css') {
            function _rendercss(pt) {
		if (fs.existsSync(pt)) {
		    /*
                    fs.readFile(pt, { encoding: 'utf-8' }, function(err, data) {
                        if (err) {throw err;}
                        less.render(data, function(err, output){
                            if (err) {throw err;}
                            res.end(output)
			    return true;
                        });
                    });
		    */
		    less.render(fs.readFileSync(pt, {encoding:'utf-8'}), function(err, output) {
			if (err) {throw err;};
			res.end(output)
			return true;
		    });
                 };
		 return false;
	    };
            pt = root + req.url;
            if (_rendercss(pt)) {return};
            pt = root + req.url.replace('css', 'less')
            if (_rendercss(pt)) {return};
        };
        next();
    };
};
