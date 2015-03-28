module.exports = findGlobals;

// TODO: find implicit globals via assignment without var
// TODO: var statements in for(...) initializers
function findGlobals(ast) {

    var out = {};

    function makeRecord(name) {
        if (!(name in out)) {
            out[name] = {
                name: name,
                type: null,
                ast: null,
                isFunction: null,
                count: 0
            };
        }
        return out[name];
    }

    function scanBody(body) {

        if (body.type === 'BlockStatement') {
            body = body.body;
        }

        for (var i = 0; i < body.length; ++i) {
            var stmt = body[i];
            switch (stmt.type) {
                // var foo = ...
                case 'VariableDeclaration':
                    stmt.declarations.forEach(function(decl) {
                        var record = makeRecord(decl.id.name);
                        record.type = 'var';
                        record.ast = decl;
                        if (decl.init && decl.init.type === 'FunctionExpression') {
                            record.isFunction = true;
                        } else {
                            record.isFunction = false;
                        }
                        record.count++;
                    });
                    break;
                // function foo() { ... }
                case 'FunctionDeclaration':
                    var record = makeRecord(stmt.id.name);
                    record.type = 'function';
                    record.ast = stmt;
                    record.isFunction = true;
                    record.count++;
                    break;
                case 'WhileStatement':
                case 'ForStatement':
                case 'DoWhileStatement':
                case 'ForInStatement':
                    scanBody(stmt.body);
                    break;
                default:
                    console.log(stmt.type);
                    break;
            }
        }
    }

    scanBody(ast.body);

    return out;

}
