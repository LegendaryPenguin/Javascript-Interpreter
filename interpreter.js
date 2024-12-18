const acorn = require("acorn");

// Parse code into an Abstract Syntax Tree (AST)
function parseCode(code) {
  return acorn.parse(code, { ecmaVersion: 2020 });
}

// Variable Environment
const environment = {};

// Interpret Function
function interpretNode(node) {
  switch (node.type) {
    case 'Literal': // Handle numeric/string literals
      return node.value;

    case 'BinaryExpression': // Handle binary operations
      const left = interpretNode(node.left);
      const right = interpretNode(node.right);
      switch (node.operator) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return left / right;
      }
      break;

    case 'Identifier': // Handle variable references
      if (node.name in environment) {
        return environment[node.name];
      } else {
        throw new Error(`Undefined variable: ${node.name}`);
      }

    case 'VariableDeclaration': // Handle variable declarations
      for (const declaration of node.declarations) {
        const varName = declaration.id.name;
        const value = interpretNode(declaration.init); // Initialize variable
        environment[varName] = value;
      }
      return null; // Variable declarations don't produce a result

    case 'ExpressionStatement': // Handle standalone expressions
      return interpretNode(node.expression);

    default: // Unsupported node types
      console.log(`Unsupported node type: ${node.type}`);
      return null;
  }
}

// Interpret the parsed code and return the result
function interpret(code) {
  const ast = parseCode(code);
  let result = null;

  for (const statement of ast.body) {
    result = interpretNode(statement); // Process each statement
  }

  return result;
}

// Sample Usage
console.log(interpret('2 + 3 * 4')); // Outputs: 14

// Variable usage
interpret('let x = 5;');
interpret('let y = 3;');
console.log(interpret('x + y * 2')); // Outputs: 11
