import {Hypernum} from '../dist/index.js';

// Import the Hypernum library from the dist folder

// Create a new Hypernum instance with default configuration
const hypernum = new Hypernum();

// Perform some basic arithmetic operations
const a = 123456789012345678901234567890n;
const b = 987654321098765432109876543210n;

const sum = hypernum.add(a, b);
const difference = hypernum.subtract(a, b);
const product = hypernum.multiply(a, b);
const quotient = hypernum.divide(b, a);

console.log(`Sum: ${sum}`);
console.log(`Difference: ${difference}`);
console.log(`Product: ${product}`);
console.log(`Quotient: ${quotient}`);

// Perform some bitwise operations
const bitwiseAnd = hypernum.and(a, b);
const bitwiseOr = hypernum.or(a, b);
const bitwiseXor = hypernum.xor(a, b);
const bitwiseNot = hypernum.not(a);

console.log(`Bitwise AND: ${bitwiseAnd}`);
console.log(`Bitwise OR: ${bitwiseOr}`);
console.log(`Bitwise XOR: ${bitwiseXor}`);
console.log(`Bitwise NOT: ${bitwiseNot}`);

// Perform some power operations
const power = hypernum.power(a, 2n);
const sqrt = hypernum.sqrt(a);
const nthRoot = hypernum.nthRoot(a, 3n);

console.log(`Power: ${power}`);
console.log(`Square Root: ${sqrt}`);
console.log(`Nth Root: ${nthRoot}`);