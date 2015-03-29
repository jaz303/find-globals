# find-globals

Walks an Esprima AST syntax tree and returns a collection representing all of the global variables.

Caveats: `find-globals` does not identify globals created implicitly, i.e. it only detects those symbols created with `var` or `function` in the outermost scope. Support for this is significantly more involved, but likely to be added at a later date.

## Installation

Get it:

    $ npm install --save find-globals

Require it:

	var findGlobals = require('find-globals');

## API

#### `var globals = findGlobals(ast)`

Find and return all globals defined in `ast`, an Esprima-compatible AST, typically created with `esprima.parse()`.

Returns an object mapping names of global variables to some metadata about each. Each metadata entry itself has keys:

  * `name`: variable name, same as the key in the outer object
  * `count`: number of times this symbol was declared
  * `type`: `var` or `function`
  * `isFunction`: `true` if the last declaration of this symbol was either function declaration of the form `function foo() { ... }` or a simple variable assignment of a function expression e.g. `var foo = function() { ... }`.
  * `ast`: the AST node denoting the creation of this symbol.

If a symbol is declared more than once, the values for keys `type`, `isFunction` and `ast` will reflect the last observed declaration.

## Copyright &amp; License

&copy; 2015 Jason Frame [ [@jaz303](http://twitter.com/jaz303) / [jason@onehackoranother.com](mailto:jason@onehackoranother.com) ]

Released under the ISC license.
