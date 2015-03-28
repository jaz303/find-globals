var fs = require('fs');

var source = fs.readFileSync('./test/example.js.test', 'utf8');

var findGlobals = require('./index');

var esprima = require('esprima');

var ast = esprima.parse(source);

console.log(findGlobals(ast));
