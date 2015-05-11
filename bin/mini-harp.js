#!/usr/bin/env node
var miniHarp = require("..")
var argv = require("minimist")(process.argv.slice(2))
port = argv['port'] || 4000;
path = argv['_'][0] || process.cwd();

var app = miniHarp(path);

console.log("Starting mini-harp on http://localhost:" + port);
app.listen(port);
