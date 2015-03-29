var esprima = require('esprima');
var findGlobals = require('..');
var test = require('tape');
var fs = require('fs');

function check(file, expect) {
    var src = fs.readFileSync(__dirname + '/' + file + '.js.test', 'utf8');
    var ast = esprima.parse(src);
    var res = findGlobals(ast);
    for (var k in res) delete res[k].ast;
    test(function(assert) {
        assert.deepEquals(res, expect);
        assert.end();
    });
}

check('simple_vars', {
    a: {
        type: 'var',
        name: 'a',
        count: 2,
        isFunction: false
    },
    b: {
        type: 'var',
        name: 'b',
        count: 1,
        isFunction: false
    },
    c: {
        type: 'var',
        name: 'c',
        count: 1,
        isFunction: false
    },
    d: {
        type: 'var',
        name: 'd',
        count: 1,
        isFunction: false
    },
    e: {
        type: 'var',
        name: 'e',
        count: 1,
        isFunction: false
    }
});

check('functions', {
    foo: {
        type: 'function',
        name: 'foo',
        count: 2,
        isFunction: true
    },
    bar: {
        type: 'function',
        name: 'bar',
        count: 1,
        isFunction: true
    },
    baz: {
        type: 'var',
        name: 'baz',
        count: 3,
        isFunction: true
    }
});

check('blocks', {
    i: {
        type: 'var',
        name: 'i',
        count: 1,
        isFunction: false
    },
    k: {
        type: 'var',
        name: 'k',
        count: 1,
        isFunction: false
    },
    alpha: {
        type: 'var',
        name: 'alpha',
        count: 1,
        isFunction: false
    },
    beta: {
        type: 'var',
        name: 'beta',
        count: 1,
        isFunction: false
    },
    a: {
        type: 'var',
        name: 'a',
        count: 1,
        isFunction: false
    },
    b: {
        type: 'var',
        name: 'b',
        count: 1,
        isFunction: false
    }
});