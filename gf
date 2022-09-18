#!/usr/bin/env node
//'use strict'

var ohm = require ('ohm-js');
var transpiler = require ('./fmt-js.js');

function main (src, ohmspec, fmtspec) {
    var result;
    var fmt = transpiler.compilefmt (fmtspec, ohm);
    console.log ('OK');
    //console.log (result);
}

argv = require('yargs/yargs')(process.argv.slice(2)).argv;
main (argv._[0], argv._[1], argv._[2]);
