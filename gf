#!/usr/bin/env node
//'use strict'

var ohm = require ('ohm-js');
var fs = require ('fs');
const path = require('path');
var fmtcompiler = require ('./fmt-js.js');
var transpiler = require ('./transpile.js');

function main (srcFilename, grammarName, grammarsFilename, fmtspecFilename) {
    var result;

    var fmtspec = fs.readFileSync (path.resolve(__dirname, fmtspecFilename), 'UTF-8');
    var fmt = fmtcompiler.compilefmt (fmtspec, ohm);

    var src = fs.readFileSync (path.resolve(__dirname, srcFilename), 'UTF-8');

    var grammars = fs.readFileSync (path.resolve(__dirname, grammarsFilename), 'UTF-8');
    
    var success;
    var transpiled;
    var errormessage;
    
    [success, transpiled, errormessage] = transpiler.transpile (src, grammarName, grammars, fmtspec, ohm, fmtcompiler.compilefmt);
    console.log (success);
    console.log (transpiled);
    console.log (errormessage);
}

var av = process.argv;
argv = require('yargs/yargs')(process.argv.slice(2)).argv;
main (argv._[0], argv._[1], argv._[2], argv._[3]);
