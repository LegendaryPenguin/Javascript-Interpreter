const acorn = require("acorn");

// Parse code into an Abstract Syntax Tree (AST)
function parseCode(code) {
  return acorn.parse(code, { ecmaVersion: 2020 });
}

// Interpret and execute the AST
function interpretNode(node) {
  switch (node.type) {
    case 'Literal':
      return node.value;
    case 'BinaryExpression':
      const left = interpretNode(node.left);
      const right = interpretNode(node.right);
      switch (node.operator) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return left / right;
      }
      break;
    default:
      console.log(`Unsupported node type: ${node.type}`);
      return null;
  }
}

// Interpret the parsed code and return the result
function interpret(code) {
  const ast = parseCode(code);
  return ast.body.map(statement => interpretNode(statement.expression))[0];
}

// Example usage:
console.log(interpret('2 + 3 * 4'));  // This should now output the computed result
