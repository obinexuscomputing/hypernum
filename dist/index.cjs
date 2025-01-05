/**
 * @obinexuscomputing/hypernum v0.1.0
 * A JavaScript/TypeScript library for large number operations with BigInt compatibility
 * @license ISC
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Validation utilities for Hypernum library
 * Provides type checking and validation functions for large number operations
 */
// Custom error types for validation
let ValidationError$1 = class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
};
let OverflowError$1 = class OverflowError extends Error {
    constructor(message) {
        super(message);
        this.name = 'OverflowError';
    }
};
// Type guards
const isBigInt = (value) => {
    return typeof value === 'bigint';
};
const isValidNumberString = (value) => {
    return /^-?\d+$/.test(value);
};
const isValidNumber = (value) => {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
};
// Type conversions with validation
const toBigInt = (value) => {
    if (isBigInt(value)) {
        return value;
    }
    if (typeof value === 'string') {
        if (!isValidNumberString(value)) {
            throw new ValidationError$1(`Invalid number string: ${value}`);
        }
        return BigInt(value);
    }
    if (isValidNumber(value)) {
        if (!Number.isInteger(value)) {
            throw new ValidationError$1('Cannot convert non-integer number to BigInt');
        }
        return BigInt(value);
    }
    throw new ValidationError$1(`Cannot convert ${typeof value} to BigInt`);
};
// Operation safety checks
const checkAdditionOverflow = (a, b) => {
    // Check if addition would overflow
    if (b > 0 && a > BigInt(Number.MAX_SAFE_INTEGER) - b) {
        throw new OverflowError$1('Addition would overflow');
    }
    if (b < 0 && a < BigInt(Number.MIN_SAFE_INTEGER) - b) {
        throw new OverflowError$1('Addition would underflow');
    }
};
const checkMultiplicationOverflow = (a, b) => {
    // Check if multiplication would overflow
    if (a !== BigInt(0) && b !== BigInt(0)) {
        const maxValue = BigInt(Number.MAX_SAFE_INTEGER);
        const minValue = BigInt(Number.MIN_SAFE_INTEGER);
        if (a > maxValue / b || a < minValue / b) {
            throw new OverflowError$1('Multiplication would overflow');
        }
    }
};
const checkPowerOverflow = (base, exponent) => {
    // Basic overflow checks for exponentiation
    if (exponent < BigInt(0)) {
        throw new ValidationError$1('Negative exponents not supported for integers');
    }
    if (base === BigInt(0) && exponent === BigInt(0)) {
        throw new ValidationError$1('Zero raised to zero is undefined');
    }
    if (exponent > BigInt(1000)) {
        throw new OverflowError$1('Exponent too large, computation would overflow');
    }
};
const validatePositive = (value) => {
    if (value <= BigInt(0)) {
        throw new ValidationError$1('Value must be positive');
    }
};
const validateNonNegative = (value) => {
    if (value < BigInt(0)) {
        throw new ValidationError$1('Value must be non-negative');
    }
};

/**
 * Precision utilities for Hypernum library
 * Provides functions for handling decimal precision and rounding operations
 */
/**
 * Rounding modes for decimal operations
 */
exports.RoundingMode = void 0;
(function (RoundingMode) {
    RoundingMode["FLOOR"] = "FLOOR";
    RoundingMode["CEIL"] = "CEIL";
    RoundingMode["DOWN"] = "DOWN";
    RoundingMode["UP"] = "UP";
    RoundingMode["HALF_EVEN"] = "HALF_EVEN";
    RoundingMode["HALF_UP"] = "HALF_UP";
    RoundingMode["HALF_DOWN"] = "HALF_DOWN";
})(exports.RoundingMode || (exports.RoundingMode = {}));
/**
 * Scale a bigint by a power of 10
 */
const scaleByPowerOfTen = (value, power) => {
    if (power === 0)
        return value;
    if (power > 0) {
        return value * (BigInt(10) ** BigInt(power));
    }
    return value / (BigInt(10) ** BigInt(-power));
};
/**
 * Round a number according to specified mode and precision
 */
const round = (value, precision = 0, mode = exports.RoundingMode.HALF_EVEN) => {
    if (precision < 0) {
        throw new ValidationError$1('Precision must be non-negative');
    }
    if (precision === 0) {
        return value;
    }
    const scale = BigInt(10) ** BigInt(precision);
    const scaled = value / scale;
    const remainder = value % scale;
    switch (mode) {
        case exports.RoundingMode.FLOOR:
            return scaled * scale;
        case exports.RoundingMode.CEIL:
            return remainder > 0n ? (scaled + 1n) * scale : scaled * scale;
        case exports.RoundingMode.DOWN:
            return value >= 0n ? scaled * scale : (scaled - 1n) * scale;
        case exports.RoundingMode.UP:
            return value >= 0n ? (scaled + 1n) * scale : scaled * scale;
        case exports.RoundingMode.HALF_UP:
            return remainder >= scale / 2n ? (scaled + 1n) * scale : scaled * scale;
        case exports.RoundingMode.HALF_DOWN:
            return remainder > scale / 2n ? (scaled + 1n) * scale : scaled * scale;
        case exports.RoundingMode.HALF_EVEN:
            if (remainder === scale / 2n) {
                return scaled % 2n === 0n ? scaled * scale : (scaled + 1n) * scale;
            }
            return remainder > scale / 2n ? (scaled + 1n) * scale : scaled * scale;
        default:
            throw new ValidationError$1('Invalid rounding mode');
    }
};
/**
 * Calculate precision required to represent a number without loss
 */
const calculateRequiredPrecision = (value) => {
    if (value === 0n)
        return 0;
    const str = value.toString();
    const nonZeroIndex = str.split('').reverse().findIndex(char => char !== '0');
    return nonZeroIndex === -1 ? 0 : nonZeroIndex;
};
/**
 * Normalize two numbers to the same precision
 */
const normalizePrecision = (a, b, precisionA, precisionB) => {
    const targetPrecision = Math.max(precisionA, precisionB);
    const scaledA = scaleByPowerOfTen(a, targetPrecision - precisionA);
    const scaledB = scaleByPowerOfTen(b, targetPrecision - precisionB);
    return [scaledA, scaledB];
};
/**
 * Scale a division operation to achieve desired precision
 */
const scaledDivision = (numerator, denominator, precision, roundingMode = exports.RoundingMode.HALF_EVEN) => {
    if (denominator === 0n) {
        throw new ValidationError$1('Division by zero');
    }
    if (precision < 0) {
        throw new ValidationError$1('Precision must be non-negative');
    }
    // Scale up numerator to handle desired precision
    const scaledNumerator = scaleByPowerOfTen(numerator, precision);
    const quotient = scaledNumerator / denominator;
    return round(quotient, 0, roundingMode);
};
/**
 * Check if two numbers are equal within a specified precision
 */
const equalWithinPrecision = (a, b, precision) => {
    const diff = a - b;
    const tolerance = BigInt(10) ** BigInt(precision);
    return diff.toString().length <= tolerance.toString().length;
};

/**
 * Configuration type definitions for Hypernum library
 * Defines all configuration options and their default values
 */
/**
 * Default configuration values for basic config
 */
const DEFAULT_BASIC_CONFIG = {
    precision: 0,
    roundingMode: exports.RoundingMode.HALF_EVEN,
    checkOverflow: true,
    maxSteps: 1000,
    debug: false
};
/**
 * Full default configuration values
 */
const DEFAULT_FULL_CONFIG = {
    arithmetic: {
        defaultPrecision: 0,
        defaultRoundingMode: exports.RoundingMode.HALF_EVEN,
        checkOverflow: true,
        maxComputationSteps: 1000,
        autoPrecision: {
            enabled: true,
            maxPrecision: 100,
            minPrecision: 0
        },
        constants: {
            precision: 50,
            cache: true,
            algorithm: 'series'
        }
    },
    dataStructures: {
        array: {
            initialCapacity: 16,
            growthFactor: 2,
            maxSize: 1000000
        },
        tree: {
            maxDepth: 1000,
            autoBalance: true,
            nodeLimit: 1000000
        },
        heap: {
            initialCapacity: 16,
            growthPolicy: 'double',
            validatePropertyOnOperation: true
        },
        cache: {
            enabled: true,
            maxSize: 1000,
            ttl: 3600000, // 1 hour
            evictionPolicy: 'LRU',
            persistToDisk: false,
            compressionEnabled: false
        }
    },
    formatting: {
        notation: 'standard',
        precision: 0,
        grouping: true,
        groupSize: 3,
        decimalSeparator: '.',
        groupSeparator: ',',
        uppercase: false,
        scientific: {
            minExponent: 6,
            maxSignificantDigits: 6,
            exponentSeparator: 'e'
        },
        engineering: {
            useSIPrefixes: true
        },
        localization: {
            locale: 'en-US',
            useLocaleGrouping: false
        }
    },
    performance: {
        enableTracking: false,
        samplingRate: 0.1,
        thresholds: {
            warnThresholdMs: 100,
            errorThresholdMs: 1000,
            maxMemoryBytes: 1024 * 1024 * 1024 // 1GB
        },
        metrics: {
            timing: true,
            memory: true,
            cache: true
        }
    },
    debug: {
        verbose: false,
        trackPerformance: false,
        logLevel: 'error'
    },
    features: {
        experimentalFeatures: false,
        useWasm: false,
        workerThreads: false,
        sharedArrayBuffer: false,
        bigIntTypedArrays: true
    }
};
/**
 * Type guard to check if config is a full configuration
 */
function isFullConfig(config) {
    return 'arithmetic' in config && 'dataStructures' in config;
}
/**
 * Validates configuration values
 */
function validateConfig(config) {
    if (isFullConfig(config)) {
        validateFullConfig(config);
    }
    else {
        validateBasicConfig(config);
    }
}
/**
 * Validates basic configuration values
 */
function validateBasicConfig(config) {
    if (config.precision !== undefined && config.precision < 0) {
        throw new Error('Precision cannot be negative');
    }
    if (config.maxSteps !== undefined && config.maxSteps <= 0) {
        throw new Error('Maximum steps must be positive');
    }
    if (config.debug !== undefined && typeof config.debug !== 'boolean') {
        throw new Error('Debug flag must be a boolean');
    }
}
/**
 * Validates full configuration values
 */
function validateFullConfig(config) {
    if (config.arithmetic.defaultPrecision < 0) {
        throw new Error('Default precision cannot be negative');
    }
    if (config.arithmetic.maxComputationSteps <= 0) {
        throw new Error('Max computation steps must be positive');
    }
    if (config.dataStructures.array.initialCapacity <= 0) {
        throw new Error('Initial capacity must be positive');
    }
    if (config.dataStructures.array.growthFactor <= 1) {
        throw new Error('Growth factor must be greater than 1');
    }
    if (config.performance.samplingRate < 0 || config.performance.samplingRate > 1) {
        throw new Error('Sampling rate must be between 0 and 1');
    }
}
/**
 * Merges configuration with appropriate defaults
 */
function mergeConfig(custom = {}) {
    if (isFullConfig(custom)) {
        const fullConfig = custom;
        return {
            ...DEFAULT_FULL_CONFIG,
            ...fullConfig,
            arithmetic: { ...DEFAULT_FULL_CONFIG.arithmetic, ...fullConfig.arithmetic },
            dataStructures: { ...DEFAULT_FULL_CONFIG.dataStructures, ...fullConfig.dataStructures },
            formatting: { ...DEFAULT_FULL_CONFIG.formatting, ...fullConfig.formatting },
            performance: { ...DEFAULT_FULL_CONFIG.performance, ...fullConfig.performance },
            debug: { ...DEFAULT_FULL_CONFIG.debug, ...fullConfig.debug },
            features: { ...DEFAULT_FULL_CONFIG.features, ...fullConfig.features }
        };
    }
    const basicConfig = {
        precision: custom.precision ?? DEFAULT_BASIC_CONFIG.precision,
        roundingMode: custom.roundingMode ?? DEFAULT_BASIC_CONFIG.roundingMode,
        checkOverflow: custom.checkOverflow ?? DEFAULT_BASIC_CONFIG.checkOverflow,
        maxSteps: custom.maxSteps ?? DEFAULT_BASIC_CONFIG.maxSteps,
        debug: custom.debug ?? DEFAULT_BASIC_CONFIG.debug
    };
    return basicConfig;
}

/**
 * Core constants for Hypernum library
 * Defines fundamental values and limits used across the library
 */
// Numerical limits
const MAX_SAFE_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);
const MIN_SAFE_INTEGER = BigInt(Number.MIN_SAFE_INTEGER);
const MAX_PRECISION = 100;
const MAX_COMPUTATION_STEPS = 1000;
const MAX_BITS = 1024;
// Commonly used values
const ZERO = BigInt(0);
const ONE = BigInt(1);
const TWO = BigInt(2);
const TEN = BigInt(10);
const NEGATIVE_ONE = BigInt(-1);
// Power operation limits
const MAX_POWER_BASE = BigInt(2) ** BigInt(53);
const MAX_POWER_EXPONENT = BigInt(1000);
const MAX_TETRATION_HEIGHT = BigInt(4);
const MAX_FACTORIAL_INPUT = BigInt(1000);
// Tree and heap configuration
const DEFAULT_TREE_MAX_DEPTH = 1000;
const DEFAULT_HEAP_INITIAL_CAPACITY = 16;
const DEFAULT_ARRAY_GROWTH_FACTOR = 2;
const MIN_ARRAY_CAPACITY = 16;
// Formatting configuration
const DEFAULT_DECIMAL_SEPARATOR = '.';
const DEFAULT_GROUP_SEPARATOR = ',';
const DEFAULT_GROUP_SIZE = 3;
const MAX_GROUP_SIZE = 10;
// Roman numeral limits
const MIN_ROMAN_VALUE = 1;
const MAX_ROMAN_VALUE = 3999;
// Ackermann function limits
const MAX_ACKERMANN_M = 4;
const MAX_ACKERMANN_N = 1000;
// Cache configuration
const DEFAULT_CACHE_SIZE = 1000;
const MAX_CACHE_SIZE = 10000;
// Error messages
const ERROR_MESSAGES = {
    OVERFLOW: 'Operation would result in overflow',
    UNDERFLOW: 'Operation would result in underflow',
    NEGATIVE_ROOT: 'Cannot compute root of negative number',
    NEGATIVE_EXPONENT: 'Negative exponents not supported for integers',
    DIVISION_BY_ZERO: 'Division by zero',
    INVALID_PRECISION: 'Precision must be non-negative and not exceed MAX_PRECISION',
    INVALID_BASE: 'Base must be a positive integer',
    INVALID_ROMAN: 'Invalid Roman numeral',
    COMPUTATION_LIMIT: 'Computation exceeded maximum allowed steps',
    NEGATIVE_INDEX: 'Array index cannot be negative',
    TREE_DEPTH_EXCEEDED: 'Maximum tree depth exceeded',
    INVALID_HEAP_PROPERTY: 'Heap property violation detected'
};
// Feature flags for optional functionality
const FEATURES = {
    OVERFLOW_CHECKING: true,
    AUTOMATIC_PRECISION: true,
    MEMOIZATION: true,
    TREE_BALANCING: true,
    DEBUG_MODE: false
};
// Default options for various operations
const DEFAULT_OPTIONS$5 = {
    precision: 0,
    roundingMode: 'HALF_EVEN',
    checkOverflow: true,
    maxSteps: MAX_COMPUTATION_STEPS,
    grouping: true,
    uppercase: false,
    cache: true
};
// Units for number formatting (powers of 1000)
const NUMBER_UNITS = [
    { value: 1n, symbol: '' },
    { value: 1000n, symbol: 'K' },
    { value: 1000000n, symbol: 'M' },
    { value: 1000000000n, symbol: 'B' },
    { value: 1000000000000n, symbol: 'T' },
    { value: 1000000000000000n, symbol: 'Q' }
];
// Performance monitoring thresholds
const PERFORMANCE = {
    WARN_THRESHOLD_MS: 100,
    ERROR_THRESHOLD_MS: 1000,
    MAX_ARRAY_SIZE: 1000000,
    MAX_TREE_SIZE: 1000000
};

/**
 * Custom error types for Hypernum library
 * Provides specific error classes for different types of errors that can occur
 * during mathematical operations and data structure manipulations
 */
/**
 * Base error class for Hypernum library
 * All other error classes inherit from this
 */
class HypernumError extends Error {
    constructor(message) {
        super(message);
        this.name = 'HypernumError';
        Object.setPrototypeOf(this, HypernumError.prototype);
    }
}
/**
 * Error for validation failures
 */
class ValidationError extends HypernumError {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
/**
 * Error for arithmetic overflow conditions
 */
class OverflowError extends HypernumError {
    constructor(message = ERROR_MESSAGES.OVERFLOW) {
        super(message);
        this.name = 'OverflowError';
        Object.setPrototypeOf(this, OverflowError.prototype);
    }
}
/**
 * Error for arithmetic underflow conditions
 */
class UnderflowError extends HypernumError {
    constructor(message = ERROR_MESSAGES.UNDERFLOW) {
        super(message);
        this.name = 'UnderflowError';
        Object.setPrototypeOf(this, UnderflowError.prototype);
    }
}
/**
 * Error for division by zero
 */
class DivisionByZeroError extends HypernumError {
    constructor(message = ERROR_MESSAGES.DIVISION_BY_ZERO) {
        super(message);
        this.name = 'DivisionByZeroError';
        Object.setPrototypeOf(this, DivisionByZeroError.prototype);
    }
}
/**
 * Error for precision-related issues
 */
class PrecisionError extends HypernumError {
    constructor(message = ERROR_MESSAGES.INVALID_PRECISION) {
        super(message);
        this.name = 'PrecisionError';
        Object.setPrototypeOf(this, PrecisionError.prototype);
    }
}
/**
 * Error for computation limits exceeded
 */
class ComputationLimitError extends HypernumError {
    constructor(message = ERROR_MESSAGES.COMPUTATION_LIMIT) {
        super(message);
        this.name = 'ComputationLimitError';
        Object.setPrototypeOf(this, ComputationLimitError.prototype);
    }
}
/**
 * Error for invalid operations on data structures
 */
class DataStructureError extends HypernumError {
    constructor(message) {
        super(message);
        this.name = 'DataStructureError';
        Object.setPrototypeOf(this, DataStructureError.prototype);
    }
}
/**
 * Error for heap property violations
 */
class HeapPropertyError extends DataStructureError {
    constructor(message = ERROR_MESSAGES.INVALID_HEAP_PROPERTY) {
        super(message);
        this.name = 'HeapPropertyError';
        Object.setPrototypeOf(this, HeapPropertyError.prototype);
    }
}
/**
 * Error for tree-related issues
 */
class TreeError extends DataStructureError {
    constructor(message = ERROR_MESSAGES.TREE_DEPTH_EXCEEDED) {
        super(message);
        this.name = 'TreeError';
        Object.setPrototypeOf(this, TreeError.prototype);
    }
}
/**
 * Error for array index out of bounds
 */
class IndexError extends DataStructureError {
    constructor(message = ERROR_MESSAGES.NEGATIVE_INDEX) {
        super(message);
        this.name = 'IndexError';
        Object.setPrototypeOf(this, IndexError.prototype);
    }
}
/**
 * Error for invalid number format or conversion
 */
class FormatError extends HypernumError {
    constructor(message) {
        super(message);
        this.name = 'FormatError';
        Object.setPrototypeOf(this, FormatError.prototype);
    }
}
/**
 * Error for invalid Roman numeral operations
 */
class RomanNumeralError extends FormatError {
    constructor(message = ERROR_MESSAGES.INVALID_ROMAN) {
        super(message);
        this.name = 'RomanNumeralError';
        Object.setPrototypeOf(this, RomanNumeralError.prototype);
    }
}
/**
 * Type guard to check if an error is a Hypernum error
 */
function isHypernumError(error) {
    return error instanceof HypernumError;
}
/**
 * Helper function to wrap unknown errors into HypernumError
 */
function wrapError(error) {
    if (isHypernumError(error)) {
        return error;
    }
    if (error instanceof Error) {
        return new HypernumError(error.message);
    }
    return new HypernumError('An unknown error occurred');
}
/**
 * Helper function to create an appropriate error from a message and optional type
 */
function createError(message, type) {
    switch (type) {
        case 'validation':
            return new ValidationError(message);
        case 'overflow':
            return new OverflowError(message);
        case 'underflow':
            return new UnderflowError(message);
        case 'division':
            return new DivisionByZeroError(message);
        case 'precision':
            return new PrecisionError(message);
        case 'computation':
            return new ComputationLimitError(message);
        case 'heap':
            return new HeapPropertyError(message);
        case 'tree':
            return new TreeError(message);
        case 'index':
            return new IndexError(message);
        case 'format':
            return new FormatError(message);
        case 'roman':
            return new RomanNumeralError(message);
        default:
            return new HypernumError(message);
    }
}

/**
 * Arithmetic operations module for Hypernum library
 * Provides high-precision arithmetic operations with BigInt support
 */
const DEFAULT_OPTIONS$4 = {
    precision: 0,
    roundingMode: exports.RoundingMode.HALF_EVEN,
    checkOverflow: true
};
/**
 * Adds two numbers with optional precision and overflow checking
 */
function add(a, b, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$4, ...options };
    const bigA = toBigInt(a);
    const bigB = toBigInt(b);
    if (opts.checkOverflow) {
        checkAdditionOverflow(bigA, bigB);
    }
    if (opts.precision === 0) {
        return bigA + bigB;
    }
    const [scaledA, scaledB] = normalizePrecision(bigA, bigB, opts.precision, opts.precision);
    const result = scaledA + scaledB;
    return round(result, opts.precision, opts.roundingMode);
}
/**
 * Subtracts two numbers with optional precision and overflow checking
 */
function subtract(a, b, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$4, ...options };
    const bigA = toBigInt(a);
    const bigB = toBigInt(b);
    if (opts.checkOverflow) {
        checkAdditionOverflow(bigA, -bigB);
    }
    if (opts.precision === 0) {
        return bigA - bigB;
    }
    const [scaledA, scaledB] = normalizePrecision(bigA, bigB, opts.precision, opts.precision);
    const result = scaledA - scaledB;
    return round(result, opts.precision, opts.roundingMode);
}
/**
 * Multiplies two numbers with optional precision and overflow checking
 */
function multiply(a, b, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$4, ...options };
    const bigA = toBigInt(a);
    const bigB = toBigInt(b);
    if (opts.checkOverflow) {
        checkMultiplicationOverflow(bigA, bigB);
    }
    const result = bigA * bigB;
    if (opts.precision === 0) {
        return result;
    }
    return round(result, opts.precision, opts.roundingMode);
}
/**
 * Divides two numbers with specified precision and rounding
 */
function divide(numerator, denominator, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$4, ...options };
    const bigNumerator = toBigInt(numerator);
    const bigDenominator = toBigInt(denominator);
    if (bigDenominator === BigInt(0)) {
        throw new ValidationError$1('Division by zero');
    }
    return scaledDivision(bigNumerator, bigDenominator, opts.precision, opts.roundingMode);
}
/**
 * Calculates remainder with optional precision
 */
function remainder(a, b, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$4, ...options };
    const bigA = toBigInt(a);
    const bigB = toBigInt(b);
    if (bigB === BigInt(0)) {
        throw new ValidationError$1('Division by zero in remainder operation');
    }
    if (opts.precision === 0) {
        return bigA % bigB;
    }
    const [scaledA, scaledB] = normalizePrecision(bigA, bigB, opts.precision, opts.precision);
    const result = scaledA % scaledB;
    return round(result, opts.precision, opts.roundingMode);
}
/**
 * Raises a number to a power with optional precision
 */
function power$2(base, exponent, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$4, ...options };
    const bigBase = toBigInt(base);
    const bigExponent = toBigInt(exponent);
    if (opts.checkOverflow) {
        checkPowerOverflow(bigBase, bigExponent);
    }
    validateNonNegative(bigExponent);
    if (bigExponent === BigInt(0)) {
        return BigInt(1);
    }
    if (bigExponent === BigInt(1)) {
        return bigBase;
    }
    let result = bigBase;
    let remaining = bigExponent - BigInt(1);
    while (remaining > BigInt(0)) {
        if (opts.checkOverflow) {
            checkMultiplicationOverflow(result, bigBase);
        }
        result *= bigBase;
        remaining--;
    }
    if (opts.precision > 0) {
        return round(result, opts.precision, opts.roundingMode);
    }
    return result;
}
/**
 * Calculates the square root with specified precision
 */
function sqrt$1(value, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$4, ...options };
    const bigValue = toBigInt(value);
    validateNonNegative(bigValue);
    if (bigValue === BigInt(0)) {
        return BigInt(0);
    }
    // Scale up for precision
    const scaleFactor = BigInt(10) ** BigInt(opts.precision * 2);
    const scaled = bigValue * scaleFactor;
    // Newton's method for square root
    let x = scaled;
    let y = (x + scaled / x) >> BigInt(1);
    while (y < x) {
        x = y;
        y = (x + scaled / x) >> BigInt(1);
    }
    return round(x, opts.precision, opts.roundingMode);
}
/**
 * Calculates the absolute value
 */
function abs(value) {
    const bigValue = toBigInt(value);
    return bigValue < BigInt(0) ? -bigValue : bigValue;
}
/**
 * Returns the sign of a number (-1, 0, or 1)
 */
function sign(value) {
    const bigValue = toBigInt(value);
    if (bigValue < BigInt(0))
        return BigInt(-1);
    if (bigValue > BigInt(0))
        return BigInt(1);
    return BigInt(0);
}
/**
 * Calculates the greatest common divisor of two numbers
 */
function gcd(a, b) {
    let bigA = abs(toBigInt(a));
    let bigB = abs(toBigInt(b));
    while (bigB !== BigInt(0)) {
        const temp = bigB;
        bigB = bigA % bigB;
        bigA = temp;
    }
    return bigA;
}
/**
 * Calculates the least common multiple of two numbers
 */
function lcm(a, b) {
    const bigA = abs(toBigInt(a));
    const bigB = abs(toBigInt(b));
    if (bigA === BigInt(0) || bigB === BigInt(0)) {
        return BigInt(0);
    }
    return abs(bigA * bigB) / gcd(bigA, bigB);
}
// /**
//  * Calculates factorial of a number
//  */
// export function factorial(value: bigint | string | number): bigint {
//   const bigValue = toBigInt(value);
//   validateNonNegative(bigValue);
//   if (bigValue > BigInt(1000)) {
//     throw new OverflowError('Factorial input too large');
//   }
//   if (bigValue <= BigInt(1)) {
//     return BigInt(1);
//   }
//   let result = BigInt(1);
//   let current = BigInt(2);
//   while (current <= bigValue) {
//     result *= current;
//     current++;
//   }
//   return result;
// }
var arithmetic = {
    add,
    subtract,
    multiply,
    divide,
    remainder,
    power: power$2,
    sqrt: sqrt$1,
    abs,
    sign,
    gcd,
    lcm,
    // factorial
};

/**
 * Bitwise operations module for Hypernum library
 * Provides functions for bit-level manipulations of large numbers
 */
const DEFAULT_OPTIONS$3 = {
    maxBits: 1024,
    strict: true
};
/**
 * Validates shift amount is within reasonable bounds
 */
function validateShift(shift, options) {
    if (shift < 0n) {
        throw new ValidationError$1('Shift amount cannot be negative');
    }
    if (options.strict && shift >= BigInt(options.maxBits)) {
        throw new ValidationError$1(`Shift amount exceeds maximum of ${options.maxBits} bits`);
    }
}
/**
 * Performs bitwise AND operation
 */
function and(a, b) {
    const bigA = toBigInt(a);
    const bigB = toBigInt(b);
    return bigA & bigB;
}
/**
 * Performs bitwise OR operation
 */
function or(a, b) {
    const bigA = toBigInt(a);
    const bigB = toBigInt(b);
    return bigA | bigB;
}
/**
 * Performs bitwise XOR operation
 */
function xor(a, b) {
    const bigA = toBigInt(a);
    const bigB = toBigInt(b);
    return bigA ^ bigB;
}
/**
 * Performs bitwise NOT operation
 */
function not(value) {
    const bigValue = toBigInt(value);
    return ~bigValue;
}
/**
 * Performs left shift operation
 */
function leftShift(value, shift, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$3, ...options };
    const bigValue = toBigInt(value);
    const bigShift = toBigInt(shift);
    validateShift(bigShift, opts);
    return bigValue << bigShift;
}
/**
 * Performs right shift operation
 */
function rightShift(value, shift, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$3, ...options };
    const bigValue = toBigInt(value);
    const bigShift = toBigInt(shift);
    validateShift(bigShift, opts);
    return bigValue >> bigShift;
}
/**
 * Performs unsigned right shift operation
 * Note: BigInt doesn't have >>> operator, so we implement it manually
 */
function unsignedRightShift(value, shift, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$3, ...options };
    const bigValue = toBigInt(value);
    const bigShift = toBigInt(shift);
    validateShift(bigShift, opts);
    if (bigValue >= 0n) {
        return bigValue >> bigShift;
    }
    // Handle negative numbers by first converting to positive
    const mask = (1n << BigInt(opts.maxBits)) - 1n;
    return (bigValue & mask) >> bigShift;
}
/**
 * Rotates bits left by specified amount
 */
function rotateLeft(value, rotation, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$3, ...options };
    const bigValue = toBigInt(value);
    let bigRotation = toBigInt(rotation);
    validateNonNegative(bigRotation);
    // Normalize rotation to be within maxBits
    if (bigRotation >= BigInt(opts.maxBits)) {
        bigRotation = bigRotation % BigInt(opts.maxBits);
    }
    if (bigRotation === 0n) {
        return bigValue;
    }
    const leftPart = leftShift(bigValue, bigRotation, opts);
    const rightPart = unsignedRightShift(bigValue, BigInt(opts.maxBits) - bigRotation, opts);
    return leftPart | rightPart;
}
/**
 * Rotates bits right by specified amount
 */
function rotateRight(value, rotation, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$3, ...options };
    const bigValue = toBigInt(value);
    let bigRotation = toBigInt(rotation);
    validateNonNegative(bigRotation);
    // Normalize rotation to be within maxBits
    if (bigRotation >= BigInt(opts.maxBits)) {
        bigRotation = bigRotation % BigInt(opts.maxBits);
    }
    if (bigRotation === 0n) {
        return bigValue;
    }
    const rightPart = unsignedRightShift(bigValue, bigRotation, opts);
    const leftPart = leftShift(bigValue, BigInt(opts.maxBits) - bigRotation, opts);
    return leftPart | rightPart;
}
/**
 * Counts number of set bits (1s)
 */
function popCount(value, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$3, ...options };
    let bigValue = toBigInt(value);
    let count = 0n;
    while (bigValue !== 0n) {
        count += bigValue & 1n;
        bigValue = unsignedRightShift(bigValue, 1n, opts);
    }
    return count;
}
/**
 * Returns number of trailing zero bits
 */
function trailingZeros(value, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$3, ...options };
    let bigValue = toBigInt(value);
    if (bigValue === 0n) {
        return BigInt(opts.maxBits);
    }
    let count = 0n;
    while ((bigValue & 1n) === 0n) {
        count++;
        bigValue = unsignedRightShift(bigValue, 1n, opts);
    }
    return count;
}
/**
 * Returns number of leading zero bits
 */
function leadingZeros(value, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$3, ...options };
    let bigValue = toBigInt(value);
    if (bigValue === 0n) {
        return BigInt(opts.maxBits);
    }
    let count = 0n;
    const msb = 1n << BigInt(opts.maxBits - 1);
    while ((bigValue & msb) === 0n && count < BigInt(opts.maxBits)) {
        count++;
        bigValue = leftShift(bigValue, 1n, opts);
    }
    return count;
}
/**
 * Returns bit at specified position
 */
function getBit(value, position, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$3, ...options };
    const bigValue = toBigInt(value);
    const bigPosition = toBigInt(position);
    validateNonNegative(bigPosition);
    if (opts.strict && bigPosition >= BigInt(opts.maxBits)) {
        throw new ValidationError$1(`Bit position exceeds maximum of ${opts.maxBits} bits`);
    }
    return (bigValue & (1n << bigPosition)) !== 0n;
}
/**
 * Sets bit at specified position
 */
function setBit(value, position, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$3, ...options };
    const bigValue = toBigInt(value);
    const bigPosition = toBigInt(position);
    validateNonNegative(bigPosition);
    if (opts.strict && bigPosition >= BigInt(opts.maxBits)) {
        throw new ValidationError$1(`Bit position exceeds maximum of ${opts.maxBits} bits`);
    }
    return bigValue | (1n << bigPosition);
}
/**
 * Clears bit at specified position
 */
function clearBit(value, position, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$3, ...options };
    const bigValue = toBigInt(value);
    const bigPosition = toBigInt(position);
    validateNonNegative(bigPosition);
    if (opts.strict && bigPosition >= BigInt(opts.maxBits)) {
        throw new ValidationError$1(`Bit position exceeds maximum of ${opts.maxBits} bits`);
    }
    return bigValue & ~(1n << bigPosition);
}
/**
 * Toggles bit at specified position
 */
function toggleBit(value, position, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$3, ...options };
    const bigValue = toBigInt(value);
    const bigPosition = toBigInt(position);
    validateNonNegative(bigPosition);
    if (opts.strict && bigPosition >= BigInt(opts.maxBits)) {
        throw new ValidationError$1(`Bit position exceeds maximum of ${opts.maxBits} bits`);
    }
    return bigValue ^ (1n << bigPosition);
}
var bitwise = {
    and,
    or,
    xor,
    not,
    leftShift,
    rightShift,
    unsignedRightShift,
    rotateLeft,
    rotateRight,
    popCount,
    trailingZeros,
    leadingZeros,
    getBit,
    setBit,
    clearBit,
    toggleBit
};

/**
 * Power operations module for Hypernum library
 * Provides efficient implementations for exponentiation and related operations
 */
const DEFAULT_OPTIONS$2 = {
    precision: 0,
    roundingMode: exports.RoundingMode.HALF_EVEN,
    checkOverflow: true,
    maxSteps: 1000
};
/**
 * Raises a number to an integer power using binary exponentiation
 */
function power(baseValue, exponentValue, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$2, ...options };
    const bigBase = toBigInt(baseValue);
    const bigExponent = toBigInt(exponentValue);
    // Handle special cases
    if (bigExponent === 0n) {
        return 1n;
    }
    if (bigExponent === 1n) {
        return bigBase;
    }
    if (bigBase === 0n && bigExponent < 0n) {
        throw new ValidationError$1('Zero cannot be raised to a negative power');
    }
    if (bigBase === 0n) {
        return 0n;
    }
    if (bigBase === 1n) {
        return 1n;
    }
    if (bigBase === -1n) {
        return bigExponent % 2n === 0n ? 1n : -1n;
    }
    // Validate inputs
    if (bigExponent < 0n) {
        throw new ValidationError$1('Negative exponents not supported for integer power');
    }
    if (opts.checkOverflow) {
        checkPowerOverflow(bigBase, bigExponent);
    }
    // Binary exponentiation algorithm
    let result = 1n;
    let base = bigBase;
    let exponent = bigExponent;
    let steps = 0;
    while (exponent > 0n) {
        if (steps++ > opts.maxSteps) {
            throw new OverflowError$1('Power operation exceeded maximum computation steps');
        }
        if (exponent & 1n) {
            result *= base;
        }
        base *= base;
        exponent >>= 1n;
    }
    if (opts.precision > 0) {
        return round(result, opts.precision, opts.roundingMode);
    }
    return result;
}
/**
 * Calculates square root using Newton's method
 */
function sqrt(value, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$2, ...options };
    const bigValue = toBigInt(value);
    validateNonNegative(bigValue);
    if (bigValue === 0n) {
        return 0n;
    }
    if (bigValue === 1n) {
        return 1n;
    }
    // Newton's method for square root
    let guess = bigValue >> 1n;
    let lastGuess;
    let steps = 0;
    do {
        if (steps++ > opts.maxSteps) {
            throw new OverflowError$1('Square root operation exceeded maximum computation steps');
        }
        lastGuess = guess;
        guess = (guess + bigValue / guess) >> 1n;
    } while (guess < lastGuess);
    if (opts.precision > 0) {
        return round(lastGuess, opts.precision, opts.roundingMode);
    }
    return lastGuess;
}
/**
 * Calculates nth root using Newton's method
 */
function nthRoot(value, n, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$2, ...options };
    const bigValue = toBigInt(value);
    const bigN = toBigInt(n);
    validateNonNegative(bigValue);
    if (bigN <= 0n) {
        throw new ValidationError$1('Root index must be positive');
    }
    if (bigValue === 0n) {
        return 0n;
    }
    if (bigValue === 1n) {
        return 1n;
    }
    if (bigN === 1n) {
        return bigValue;
    }
    if (bigN === 2n) {
        return sqrt(bigValue, opts);
    }
    // Newton's method for nth root
    let guess = bigValue >> 1n;
    let lastGuess;
    let steps = 0;
    const nMinus1 = bigN - 1n;
    do {
        if (steps++ > opts.maxSteps) {
            throw new OverflowError$1('Nth root operation exceeded maximum computation steps');
        }
        lastGuess = guess;
        const powered = power(guess, nMinus1, opts);
        guess = ((nMinus1 * guess) + (bigValue / powered)) / bigN;
    } while (guess < lastGuess);
    if (opts.precision > 0) {
        return round(lastGuess, opts.precision, opts.roundingMode);
    }
    return lastGuess;
}
/**
 * Calculates tetration (repeated exponentiation)
 * a↑↑n = a^(a^(a^...)) (n times)
 */
function tetration(base, height, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$2, ...options };
    const bigBase = toBigInt(base);
    const bigHeight = toBigInt(height);
    validateNonNegative(bigHeight);
    if (bigHeight === 0n) {
        return 1n;
    }
    if (bigHeight === 1n) {
        return bigBase;
    }
    if (bigBase === 0n) {
        return bigHeight % 2n === 0n ? 1n : 0n;
    }
    if (bigBase === 1n) {
        return 1n;
    }
    if (bigBase === 2n && bigHeight > 4n) {
        throw new OverflowError$1('Tetration would overflow for base 2 and height > 4');
    }
    let result = bigBase;
    let steps = 0;
    for (let i = 1n; i < bigHeight; i++) {
        if (steps++ > opts.maxSteps) {
            throw new OverflowError$1('Tetration operation exceeded maximum computation steps');
        }
        result = power(bigBase, result, opts);
    }
    if (opts.precision > 0) {
        return round(result, opts.precision, opts.roundingMode);
    }
    return result;
}
/**
 * Calculates super-root (inverse tetration)
 * Finds x where x↑↑n = value
 */
function superRoot(value, height, options = {}) {
    const opts = { ...DEFAULT_OPTIONS$2, ...options };
    const bigValue = toBigInt(value);
    const bigHeight = toBigInt(height);
    validateNonNegative(bigHeight);
    if (bigHeight === 0n) {
        throw new ValidationError$1('Height cannot be zero for super-root');
    }
    if (bigValue < 1n) {
        throw new ValidationError$1('Value must be at least 1 for super-root');
    }
    if (bigValue === 1n) {
        return 1n;
    }
    if (bigHeight === 1n) {
        return bigValue;
    }
    // Binary search for super-root
    let left = 1n;
    let right = bigValue;
    let steps = 0;
    while (left <= right) {
        if (steps++ > opts.maxSteps) {
            throw new OverflowError$1('Super-root operation exceeded maximum computation steps');
        }
        const mid = (left + right) >> 1n;
        try {
            const test = tetration(mid, bigHeight, opts);
            if (test === bigValue) {
                return mid;
            }
            if (test < bigValue) {
                left = mid + 1n;
            }
            else {
                right = mid - 1n;
            }
        }
        catch (error) {
            right = mid - 1n;
        }
    }
    if (opts.precision > 0) {
        return round(right, opts.precision, opts.roundingMode);
    }
    return right;
}
var power$1 = {
    power,
    sqrt,
    nthRoot,
    tetration,
    superRoot
};

/**
 * Abstract base heap class implementing common heap operations
 */
class Heap {
    constructor(comparator) {
        this.heap = [];
        this.compare = comparator;
    }
    /**
     * Gets the size of the heap
     */
    size() {
        return this.heap.length;
    }
    /**
     * Checks if the heap is empty
     */
    isEmpty() {
        return this.heap.length === 0;
    }
    /**
     * Peeks at the root element without removing it
     */
    peek() {
        return this.heap[0];
    }
    /**
     * Inserts a new element into the heap
     */
    push(value) {
        this.heap.push(value);
        this.siftUp(this.heap.length - 1);
    }
    /**
     * Removes and returns the root element
     */
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        const root = this.heap[0];
        const last = this.heap.pop();
        if (!this.isEmpty()) {
            this.heap[0] = last;
            this.siftDown(0);
        }
        return root;
    }
    /**
     * Removes all elements from the heap
     */
    clear() {
        this.heap = [];
    }
    /**
     * Creates a heap from an array of elements
     */
    static heapify(array, comparator) {
        const heap = this instanceof MinHeap ? new MinHeap(comparator) : new MaxHeap(comparator);
        array.forEach(item => heap.push(item));
        return heap;
    }
    /**
     * Gets the parent index of a node
     */
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    /**
     * Gets the left child index of a node
     */
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }
    /**
     * Gets the right child index of a node
     */
    getRightChildIndex(index) {
        return 2 * index + 2;
    }
    /**
     * Swaps two elements in the heap
     */
    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
}
/**
 * MinHeap implementation where the root is the smallest element
 */
class MinHeap extends Heap {
    constructor(comparator) {
        super(comparator);
    }
    siftUp(index) {
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) {
                break;
            }
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }
    siftDown(index) {
        const size = this.heap.length;
        while (true) {
            let smallest = index;
            const left = this.getLeftChildIndex(index);
            const right = this.getRightChildIndex(index);
            if (left < size && this.compare(this.heap[left], this.heap[smallest]) < 0) {
                smallest = left;
            }
            if (right < size && this.heap[right] !== undefined && this.compare(this.heap[right], this.heap[smallest]) < 0) {
                smallest = right;
            }
            if (smallest === index) {
                break;
            }
            this.swap(index, smallest);
            index = smallest;
        }
    }
}
/**
 * MaxHeap implementation where the root is the largest element
 */
class MaxHeap extends Heap {
    constructor(comparator) {
        super(comparator);
    }
    siftUp(index) {
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.compare(this.heap[index], this.heap[parentIndex]) <= 0) {
                break;
            }
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }
    siftDown(index) {
        const size = this.heap.length;
        while (true) {
            let largest = index;
            const left = this.getLeftChildIndex(index);
            const right = this.getRightChildIndex(index);
            if (left < size && this.heap[left] !== undefined && this.compare(this.heap[left], this.heap[largest]) > 0) {
                largest = left;
            }
            if (right < size && this.heap[right] !== undefined && this.compare(this.heap[right], this.heap[largest]) > 0) {
                largest = right;
            }
            if (largest === index) {
                break;
            }
            this.swap(index, largest);
            index = largest;
        }
    }
}
/**
 * Custom comparator for large numbers
 */
function createLargeNumberComparator() {
    return (a, b) => {
        return a > b ? 1 : a < b ? -1 : 0;
    };
}

/**
 * Class representing the Ackermann function computation structure
 * Implements caching and relationship tracking between values
 */
class AckermannStructure {
    constructor() {
        this.nodes = new Map();
        this.maxComputedM = -1;
        this.maxComputedN = -1;
        this.heap = new MaxHeap(createLargeNumberComparator());
    }
    /**
     * Generates a unique key for node storage
     */
    static getNodeKey(m, n) {
        return `${m},${n}`;
    }
    /**
     * Computes the Ackermann function value
     * Uses recursion with memoization
     */
    computeAckermann(m, n) {
        // Handle invalid inputs
        if (m < 0 || n < 0) {
            throw new Error('Ackermann function undefined for negative numbers');
        }
        // Check if already computed
        const key = AckermannStructure.getNodeKey(m, n);
        const existing = this.nodes.get(key);
        if (existing) {
            return existing.value;
        }
        // Compute based on Ackermann function definition
        let value;
        try {
            if (m === 0) {
                value = BigInt(n + 1);
            }
            else if (n === 0) {
                value = this.computeAckermann(m - 1, 1);
            }
            else {
                const inner = this.computeAckermann(m, n - 1);
                // Convert bigint to number for recursion, being careful about size
                const innerNum = inner <= BigInt(Number.MAX_SAFE_INTEGER)
                    ? Number(inner)
                    : Number.MAX_SAFE_INTEGER;
                value = this.computeAckermann(m - 1, innerNum);
            }
        }
        catch (error) {
            // Handle stack overflow or computation limits
            if (error instanceof RangeError) {
                return BigInt(Number.MAX_SAFE_INTEGER);
            }
            throw error;
        }
        return value;
    }
    /**
     * Adds a new node to the structure
     */
    addNode(m, n) {
        const key = AckermannStructure.getNodeKey(m, n);
        if (this.nodes.has(key)) {
            return this.nodes.get(key);
        }
        // Create new node
        const value = this.computeAckermann(m, n);
        const node = { m, n, value };
        this.nodes.set(key, node);
        // Link to existing nodes
        const prevMKey = AckermannStructure.getNodeKey(m - 1, n);
        const prevNKey = AckermannStructure.getNodeKey(m, n - 1);
        if (this.nodes.has(prevMKey)) {
            const prevM = this.nodes.get(prevMKey);
            node.prevM = prevM;
            prevM.nextM = node;
        }
        if (this.nodes.has(prevNKey)) {
            const prevN = this.nodes.get(prevNKey);
            node.prevN = prevN;
            prevN.nextN = node;
        }
        // Update tracking
        this.maxComputedM = Math.max(this.maxComputedM, m);
        this.maxComputedN = Math.max(this.maxComputedN, n);
        this.heap.push(value);
        return node;
    }
    /**
     * Builds nodes for a range of m and n values
     */
    buildRange(mRange, nRange) {
        for (let m = 0; m <= mRange; m++) {
            for (let n = 0; n <= nRange; n++) {
                this.addNode(m, n);
            }
        }
    }
    /**
     * Gets the computation path to reach A(m,n)
     */
    getComputationPath(m, n) {
        const path = [];
        const key = AckermannStructure.getNodeKey(m, n);
        let current = this.nodes.get(key);
        while (current) {
            path.push({
                m: current.m,
                n: current.n,
                value: current.value
            });
            // Follow computation path backwards
            if (current.m === 0) {
                break;
            }
            else if (current.n === 0) {
                current = this.nodes.get(AckermannStructure.getNodeKey(current.m - 1, 1));
            }
            else {
                const prevN = this.nodes.get(AckermannStructure.getNodeKey(current.m, current.n - 1));
                if (prevN) {
                    path.push({
                        m: prevN.m,
                        n: prevN.n,
                        value: prevN.value
                    });
                }
                // Convert bigint to number safely for the next lookup
                const nextValue = prevN?.value ?? BigInt(0);
                const safeNextValue = nextValue <= BigInt(Number.MAX_SAFE_INTEGER)
                    ? Number(nextValue)
                    : Number.MAX_SAFE_INTEGER;
                current = this.nodes.get(AckermannStructure.getNodeKey(current.m - 1, safeNextValue));
            }
        }
        return path.reverse();
    }
    /**
     * Analyzes growth rate for a fixed m value
     */
    analyzeGrowthRate(m) {
        const growth = new Map();
        let prevValue = BigInt(1);
        for (let n = 0; n <= this.maxComputedN; n++) {
            const key = AckermannStructure.getNodeKey(m, n);
            const node = this.nodes.get(key);
            if (!node || node.value >= BigInt(Number.MAX_SAFE_INTEGER)) {
                break;
            }
            growth.set(n, {
                value: node.value,
                increase: node.value - prevValue,
                multiplier: prevValue === BigInt(0) ? BigInt(0) : node.value / prevValue
            });
            prevValue = node.value;
        }
        return growth;
    }
    /**
     * Gets the largest computed value
     */
    getLargestValue() {
        return this.heap.peek() ?? BigInt(0);
    }
    /**
     * Gets a specific Ackermann value if it exists
     */
    getValue(m, n) {
        return this.nodes.get(AckermannStructure.getNodeKey(m, n))?.value;
    }
}

/**
 * Class representing a node in the number tree
 */
class NumberNode {
    constructor(value) {
        this.value = typeof value === 'bigint' ? value : BigInt(value);
        this.left = null;
        this.right = null;
        this.parent = null;
        this.height = 1;
        this.size = 1;
        this.sum = this.value;
    }
    /**
     * Updates node statistics based on children
     */
    updateStats() {
        this.height = 1 + Math.max(this.left?.height ?? 0, this.right?.height ?? 0);
        this.size = 1 + (this.left?.size ?? 0) + (this.right?.size ?? 0);
        this.sum = this.value +
            (this.left?.sum ?? BigInt(0)) +
            (this.right?.sum ?? BigInt(0));
    }
    /**
     * Gets balance factor of the node
     */
    getBalance() {
        return (this.left?.height ?? 0) - (this.right?.height ?? 0);
    }
    /**
     * Gets complete statistics for the node and its subtree
     */
    getStats() {
        return {
            height: this.height,
            size: this.size,
            sum: this.sum,
            min: this.findMin().value,
            max: this.findMax().value
        };
    }
    /**
     * Finds minimum value node in the subtree
     */
    findMin() {
        let current = this;
        while (current.left) {
            current = current.left;
        }
        return current;
    }
    /**
     * Finds maximum value node in the subtree
     */
    findMax() {
        let current = this;
        while (current.right) {
            current = current.right;
        }
        return current;
    }
}
/**
 * AVL Tree implementation specialized for handling large numbers
 */
class NumberTree {
    constructor(comparator) {
        this.root = null;
        this.comparator = comparator ?? ((a, b) => {
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        });
    }
    /**
     * Gets the root node if it exists
     */
    getRoot() {
        return this.root;
    }
    /**
     * Inserts a new value into the tree
     */
    insert(value) {
        const newValue = typeof value === 'bigint' ? value : BigInt(value);
        this.root = this.insertNode(this.root, newValue);
        return this.find(newValue);
    }
    /**
     * Recursively inserts a new node
     */
    insertNode(node, value) {
        if (!node) {
            return new NumberNode(value);
        }
        const compareResult = this.comparator(value, node.value);
        if (compareResult < 0) {
            node.left = this.insertNode(node.left, value);
            node.left.parent = node;
        }
        else if (compareResult > 0) {
            node.right = this.insertNode(node.right, value);
            node.right.parent = node;
        }
        else {
            return node; // Duplicate value, return existing node
        }
        node.updateStats();
        return this.balance(node);
    }
    /**
     * Balances a node using AVL rotations
     */
    balance(node) {
        const balance = node.getBalance();
        // Left heavy
        if (balance > 1) {
            if (node.left && node.left.getBalance() < 0) {
                node.left = this.rotateLeft(node.left);
            }
            return this.rotateRight(node);
        }
        // Right heavy
        if (balance < -1) {
            if (node.right && node.right.getBalance() > 0) {
                node.right = this.rotateRight(node.right);
            }
            return this.rotateLeft(node);
        }
        return node;
    }
    /**
     * Performs left rotation
     */
    rotateLeft(node) {
        const rightChild = node.right;
        const rightLeftChild = rightChild.left;
        rightChild.left = node;
        node.right = rightLeftChild;
        if (rightLeftChild) {
            rightLeftChild.parent = node;
        }
        rightChild.parent = node.parent;
        node.parent = rightChild;
        node.updateStats();
        rightChild.updateStats();
        return rightChild;
    }
    /**
     * Performs right rotation
     */
    rotateRight(node) {
        const leftChild = node.left;
        const leftRightChild = leftChild.right;
        leftChild.right = node;
        node.left = leftRightChild;
        if (leftRightChild) {
            leftRightChild.parent = node;
        }
        leftChild.parent = node.parent;
        node.parent = leftChild;
        node.updateStats();
        leftChild.updateStats();
        return leftChild;
    }
    /**
     * Removes a value from the tree
     */
    remove(value) {
        const searchValue = typeof value === 'bigint' ? value : BigInt(value);
        const nodeToRemove = this.find(searchValue);
        if (!nodeToRemove) {
            return false;
        }
        this.root = this.removeNode(this.root, searchValue);
        return true;
    }
    /**
     * Recursively removes a node
     */
    removeNode(node, value) {
        if (!node) {
            return null;
        }
        const compareResult = this.comparator(value, node.value);
        if (compareResult < 0) {
            node.left = this.removeNode(node.left, value);
            if (node.left) {
                node.left.parent = node;
            }
        }
        else if (compareResult > 0) {
            node.right = this.removeNode(node.right, value);
            if (node.right) {
                node.right.parent = node;
            }
        }
        else {
            // Node to delete found
            if (!node.left) {
                return node.right;
            }
            if (!node.right) {
                return node.left;
            }
            // Node has two children
            const successor = node.right.findMin();
            node.value = successor.value;
            node.right = this.removeNode(node.right, successor.value);
            if (node.right) {
                node.right.parent = node;
            }
        }
        node.updateStats();
        return this.balance(node);
    }
    /**
     * Finds a node by value
     */
    find(value) {
        const searchValue = typeof value === 'bigint' ? value : BigInt(value);
        let current = this.root;
        while (current) {
            const compareResult = this.comparator(searchValue, current.value);
            if (compareResult === 0) {
                return current;
            }
            current = compareResult < 0 ? current.left : current.right;
        }
        return null;
    }
    /**
     * Traverses the tree in specified order and returns values
     */
    traverse(order = 'inOrder', config = {}) {
        const result = [];
        const traverse = (node, depth = 0) => {
            if (!node || (config.maxDepth !== undefined && depth >= config.maxDepth)) {
                return;
            }
            if (order === 'preOrder') {
                result.push(node.value);
            }
            if (!config.skipSubtrees) {
                traverse(node.left, depth + 1);
            }
            if (order === 'inOrder') {
                result.push(node.value);
            }
            if (!config.skipSubtrees) {
                traverse(node.right, depth + 1);
            }
            if (order === 'postOrder') {
                result.push(node.value);
            }
        };
        traverse(this.root);
        return result;
    }
    /**
     * Gets overall tree statistics
     */
    getTreeStats() {
        return this.root?.getStats() ?? null;
    }
    /**
     * Gets the nth smallest value in the tree
     */
    getNthValue(n) {
        if (!this.root || n < 1 || n > this.root.size) {
            return null;
        }
        const findNth = (node, position) => {
            if (!node) {
                return null;
            }
            const leftSize = node.left?.size ?? 0;
            if (position === leftSize + 1) {
                return node.value;
            }
            if (position <= leftSize) {
                return findNth(node.left, position);
            }
            return findNth(node.right, position - leftSize - 1);
        };
        return findNth(this.root, n);
    }
    /**
     * Gets a range of values between start and end (inclusive)
     */
    getRange(start, end) {
        const startValue = typeof start === 'bigint' ? start : BigInt(start);
        const endValue = typeof end === 'bigint' ? end : BigInt(end);
        const result = [];
        const collectRange = (node) => {
            if (!node) {
                return;
            }
            if (this.comparator(node.value, startValue) >= 0 &&
                this.comparator(node.value, endValue) <= 0) {
                collectRange(node.left);
                result.push(node.value);
                collectRange(node.right);
            }
            else if (this.comparator(node.value, startValue) > 0) {
                collectRange(node.left);
            }
            else {
                collectRange(node.right);
            }
        };
        collectRange(this.root);
        return result;
    }
}

/**
 * A specialized array implementation for handling large numbers and providing
 * efficient operations with segment tree support
 */
class BigArray {
    constructor(options = {}) {
        const { initialCapacity = 16, growthFactor = 2, comparator = ((a, b) => {
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        }) } = options;
        this.capacity = initialCapacity;
        this.growthFactor = growthFactor;
        this.comparator = comparator;
        this.size = 0;
        this.data = new Array(this.capacity);
        this.segmentTree = new Array(4 * this.capacity).fill(null);
    }
    /**
     * Gets the current size of the array
     */
    getSize() {
        return this.size;
    }
    /**
     * Gets the current capacity of the array
     */
    getCapacity() {
        return this.capacity;
    }
    /**
     * Resizes the internal array when needed
     */
    resize(newCapacity) {
        const newData = new Array(newCapacity);
        for (let i = 0; i < this.size; i++) {
            newData[i] = this.data[i];
        }
        this.data = newData;
        this.capacity = newCapacity;
        this.rebuildSegmentTree();
    }
    /**
     * Appends an element to the end of the array
     */
    push(value) {
        try {
            if (this.size >= this.capacity) {
                this.resize(this.capacity * this.growthFactor);
            }
            this.data[this.size] = value;
            this.updateSegmentTree(0, this.size, value);
            this.size++;
            return { success: true, value: this.size - 1 };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error during push'
            };
        }
    }
    /**
     * Removes and returns the last element
     */
    pop() {
        if (this.size === 0) {
            return { success: false, error: 'Array is empty' };
        }
        const value = this.data[this.size - 1];
        this.size--;
        // Shrink array if it's too sparse
        if (this.size < this.capacity / (this.growthFactor * 2)) {
            this.resize(Math.max(16, Math.floor(this.capacity / this.growthFactor)));
        }
        return { success: true, value };
    }
    /**
     * Gets element at specified index
     */
    get(index) {
        if (index < 0 || index >= this.size) {
            return { success: false, error: 'Index out of bounds' };
        }
        return { success: true, value: this.data[index] };
    }
    /**
     * Sets element at specified index
     */
    set(index, value) {
        if (index < 0 || index >= this.size) {
            return { success: false, error: 'Index out of bounds' };
        }
        const oldValue = this.data[index];
        this.data[index] = value;
        this.updateSegmentTree(0, index, value);
        return { success: true, value: oldValue };
    }
    /**
     * Rebuilds the segment tree after major changes
     */
    rebuildSegmentTree() {
        this.segmentTree = new Array(4 * this.capacity).fill(null);
        if (this.size > 0) {
            this.buildSegmentTree(0, 0, this.size - 1);
        }
    }
    /**
     * Builds a segment tree node recursively
     */
    buildSegmentTree(node, start, end) {
        if (start === end) {
            this.segmentTree[node] = {
                value: this.data[start],
                start,
                end
            };
            return;
        }
        const mid = Math.floor((start + end) / 2);
        this.buildSegmentTree(2 * node + 1, start, mid);
        this.buildSegmentTree(2 * node + 2, mid + 1, end);
        const leftNode = this.segmentTree[2 * node + 1];
        const rightNode = this.segmentTree[2 * node + 2];
        if (leftNode && rightNode) {
            this.segmentTree[node] = {
                value: this.comparator(leftNode.value, rightNode.value) >= 0
                    ? leftNode.value
                    : rightNode.value,
                start,
                end
            };
        }
    }
    /**
     * Updates the segment tree after a value change
     */
    updateSegmentTree(node, index, value) {
        if (!this.segmentTree[node]) {
            return;
        }
        const currentNode = this.segmentTree[node];
        if (currentNode.start === currentNode.end) {
            currentNode.value = value;
            return;
        }
        const mid = Math.floor((currentNode.start + currentNode.end) / 2);
        if (index <= mid) {
            this.updateSegmentTree(2 * node + 1, index, value);
        }
        else {
            this.updateSegmentTree(2 * node + 2, index, value);
        }
        const leftNode = this.segmentTree[2 * node + 1];
        const rightNode = this.segmentTree[2 * node + 2];
        if (leftNode && rightNode) {
            currentNode.value = this.comparator(leftNode.value, rightNode.value) >= 0
                ? leftNode.value
                : rightNode.value;
        }
    }
    /**
     * Queries the maximum value in a range
     */
    queryRange(start, end) {
        if (start < 0 || end >= this.size || start > end) {
            return { success: false, error: 'Invalid range' };
        }
        const result = this.querySegmentTree(0, start, end);
        return result
            ? { success: true, value: result }
            : { success: false, error: 'Range query failed' };
    }
    /**
     * Recursively queries the segment tree
     */
    querySegmentTree(node, queryStart, queryEnd) {
        const currentNode = this.segmentTree[node];
        if (!currentNode) {
            return null;
        }
        if (queryStart <= currentNode.start && queryEnd >= currentNode.end) {
            return currentNode.value;
        }
        if (queryEnd < currentNode.start || queryStart > currentNode.end) {
            return null;
        }
        const leftResult = this.querySegmentTree(2 * node + 1, queryStart, queryEnd);
        const rightResult = this.querySegmentTree(2 * node + 2, queryStart, queryEnd);
        if (leftResult === null)
            return rightResult;
        if (rightResult === null)
            return leftResult;
        return this.comparator(leftResult, rightResult) >= 0 ? leftResult : rightResult;
    }
    /**
     * Creates a heap from the current array
     */
    toHeap(isMin = true) {
        const heap = isMin
            ? new MinHeap(this.comparator)
            : new MaxHeap(this.comparator);
        for (let i = 0; i < this.size; i++) {
            if (this.data[i] !== undefined) {
                if (this.data[i] !== undefined) {
                    heap.push(this.data[i]);
                }
            }
        }
        return heap;
    }
    /**
     * Sorts the array in-place
     */
    sort(ascending = true) {
        const heap = this.toHeap(!ascending);
        for (let i = this.size - 1; i >= 0; i--) {
            const value = heap.pop();
            if (value !== undefined) {
                this.data[i] = value;
            }
        }
        this.rebuildSegmentTree();
    }
    /**
     * Returns array as native array
     */
    toArray() {
        return this.data.slice(0, this.size);
    }
}

/**
 * Default options for power tower computations
 */
const DEFAULT_OPTIONS$1 = {
    maxHeight: 100,
    maxValue: BigInt(Number.MAX_SAFE_INTEGER),
    checkOverflow: true,
    precision: 0
};
/**
 * Class representing a power tower (tetration) computation structure
 * Handles expressions of the form: a↑↑b = a^(a^(a^...)) (b times)
 */
class PowerTower {
    constructor(options = {}) {
        this.options = { ...DEFAULT_OPTIONS$1, ...options };
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    /**
     * Creates a new power tower node
     */
    createNode(value, height) {
        return {
            value,
            height,
            evaluated: false,
            previous: null,
            next: null
        };
    }
    /**
     * Validates power tower height
     */
    validateHeight(height) {
        if (height < 0) {
            throw new ValidationError$1('Height cannot be negative');
        }
        if (height > this.options.maxHeight) {
            throw new ValidationError$1(`Height exceeds maximum of ${this.options.maxHeight}`);
        }
    }
    /**
     * Validates value for computation
     */
    validateValue(value) {
        validateNonNegative(value);
        if (this.options.checkOverflow && value > this.options.maxValue) {
            throw new OverflowError$1(`Value exceeds maximum of ${this.options.maxValue}`);
        }
    }
    /**
     * Computes power with overflow checking
     */
    computePower(base, exponent) {
        if (exponent === BigInt(0)) {
            return BigInt(1);
        }
        if (exponent === BigInt(1)) {
            return base;
        }
        let result = base;
        for (let i = BigInt(1); i < exponent; i++) {
            if (this.options.checkOverflow) {
                // Check if next multiplication would overflow
                const next = result * base;
                if (next > this.options.maxValue) {
                    throw new OverflowError$1('Power computation would overflow');
                }
                result = next;
            }
            else {
                result *= base;
            }
        }
        return result;
    }
    /**
     * Builds a power tower of specified height with given base
     */
    build(base, height) {
        this.validateHeight(height);
        const baseValue = typeof base === 'bigint' ? base : BigInt(base);
        this.validateValue(baseValue);
        this.clear(); // Clear existing tower
        for (let i = 0; i < height; i++) {
            const node = this.createNode(baseValue, i + 1);
            if (!this.head) {
                this.head = node;
                this.tail = node;
            }
            else {
                node.previous = this.tail;
                this.tail.next = node;
                this.tail = node;
            }
            this.size++;
        }
    }
    /**
     * Evaluates the power tower up to specified height
     */
    evaluate(height) {
        if (!this.head) {
            return BigInt(1); // Empty tower evaluates to 1
        }
        const targetHeight = height ?? this.size;
        this.validateHeight(targetHeight);
        let current = this.head;
        let result = current.value;
        let currentHeight = 1;
        try {
            while (current.next && currentHeight < targetHeight) {
                result = this.computePower(current.next.value, result);
                current.evaluated = true;
                current = current.next;
                currentHeight++;
            }
            current.evaluated = true;
            return result;
        }
        catch (error) {
            if (error instanceof OverflowError$1) {
                // Mark nodes up to current height as evaluated
                let node = this.head;
                while (node !== current) {
                    node.evaluated = true;
                    node = node.next;
                }
                throw error;
            }
            throw error;
        }
    }
    /**
     * Gets the current height of the power tower
     */
    getHeight() {
        return this.size;
    }
    /**
     * Checks if the tower can be evaluated to a given height
     */
    isComputable(height) {
        try {
            const targetHeight = height ?? this.size;
            this.validateHeight(targetHeight);
            // Check first few levels without full computation
            let current = this.head;
            let currentHeight = 0;
            while (current && currentHeight < targetHeight) {
                // Quick check for obvious overflow conditions
                if (current.value > BigInt(4) && currentHeight > 3) {
                    return false;
                }
                current = current.next;
                currentHeight++;
            }
            // Try actual computation with a lower overflow threshold
            const safeOptions = { ...this.options, maxValue: this.options.maxValue >> BigInt(1) };
            const safeTower = new PowerTower(safeOptions);
            safeTower.build(this.head.value, targetHeight);
            safeTower.evaluate();
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Gets the computation state at each level
     */
    getState() {
        const state = [];
        let current = this.head;
        while (current) {
            state.push({
                height: current.height,
                value: current.value,
                evaluated: current.evaluated
            });
            current = current.next;
        }
        return state;
    }
    /**
     * Clears the power tower
     */
    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    /**
     * Gets the maximum computationally feasible height for a given base
     */
    static getMaxFeasibleHeight(base) {
        const baseValue = typeof base === 'bigint' ? base : BigInt(base);
        validateNonNegative(baseValue);
        if (baseValue === BigInt(0))
            return 0;
        if (baseValue === BigInt(1))
            return Infinity;
        if (baseValue === BigInt(2))
            return 4; // 2↑↑4 is already enormous
        if (baseValue === BigInt(3))
            return 3; // 3↑↑3 is already astronomical
        if (baseValue === BigInt(4))
            return 2;
        return 1; // For bases > 4, only height 1 is reliably computable
    }
    /**
     * Creates a string representation of the power tower
     */
    toString() {
        if (!this.head) {
            return "Empty Tower";
        }
        let result = this.head.value.toString();
        let current = this.head;
        while (current.next) {
            result = `${current.next.value}^(${result})`;
            current = current.next;
        }
        return result;
    }
}

/**
 * Formatting utilities for Hypernum library
 * Provides functions for formatting large numbers and converting between different representations
 */
// Default formatting options
const DEFAULT_OPTIONS = {
    notation: 'standard',
    precision: 0,
    grouping: true,
    groupSize: 3,
    decimalSeparator: '.',
    groupSeparator: ',',
};
/**
 * Formats a BigInt value according to specified options
 */
const formatBigInt = (value, options = {}) => {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    // Handle negative numbers
    const isNegative = value < BigInt(0);
    const absValue = isNegative ? -value : value;
    let result;
    switch (opts.notation) {
        case 'scientific':
            result = formatScientific(absValue, opts).coefficient + 'e' +
                formatScientific(absValue, opts).exponent;
            break;
        case 'engineering':
            result = formatEngineering(absValue, opts);
            break;
        case 'compact':
            result = formatCompact(absValue, opts);
            break;
        default:
            result = formatStandard(absValue, opts);
    }
    return isNegative ? '-' + result : result;
};
/**
 * Formats a number in standard notation with grouping
 */
const formatStandard = (value, options) => {
    let str = value.toString();
    if (!options.grouping) {
        return str;
    }
    // Apply grouping from the right
    const result = [];
    let position = str.length;
    while (position > 0) {
        const start = Math.max(0, position - options.groupSize);
        result.unshift(str.slice(start, position));
        position = start;
    }
    return result.join(options.groupSeparator);
};
/**
 * Converts a number to scientific notation
 */
const formatScientific = (value, options) => {
    if (value === BigInt(0)) {
        return { coefficient: '0', exponent: 0 };
    }
    const str = value.toString();
    const exponent = str.length - 1;
    let coefficient = str[0] || '';
    coefficient += options.decimalSeparator + str.slice(1, options.precision + 1);
    return {
        coefficient: coefficient,
        exponent: exponent,
    };
};
/**
 * Formats a number in engineering notation (exponents divisible by 3)
 */
const formatEngineering = (value, options) => {
    if (value === BigInt(0)) {
        return '0';
    }
    const str = value.toString();
    const len = str.length;
    const exponent = Math.floor((len - 1) / 3) * 3;
    let coefficient = '';
    const digitsBeforePoint = len - exponent;
    for (let i = 0; i < Math.min(len, digitsBeforePoint + options.precision); i++) {
        if (i === digitsBeforePoint && i < len) {
            coefficient += options.decimalSeparator;
        }
        coefficient += str[i];
    }
    return `${coefficient}e${exponent}`;
};
/**
 * Formats a number in compact notation (K, M, B, T)
 */
const formatCompact = (value, options) => {
    const suffixes = ['', 'K', 'M', 'B', 'T', 'Q'];
    const str = value.toString();
    const len = str.length;
    if (len <= 3) {
        return formatStandard(value, options);
    }
    const suffixIndex = Math.min(Math.floor((len - 1) / 3), suffixes.length - 1);
    const suffix = suffixes[suffixIndex];
    const scale = BigInt(10) ** BigInt(suffixIndex * 3);
    const scaledValue = value / scale;
    let result = scaledValue.toString();
    if (options.precision > 0) {
        const remainder = value % scale;
        if (remainder > BigInt(0)) {
            const decimalPart = remainder.toString().padStart(3, '0').slice(0, options.precision);
            result += options.decimalSeparator + decimalPart;
        }
    }
    return result + suffix;
};
/**
 * Parses a formatted string back to BigInt
 */
const parseBigIntString = (str, options = {}) => {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    // Remove grouping separators
    let cleanStr = str.replace(new RegExp(`\\${opts.groupSeparator}`, 'g'), '');
    // Handle scientific notation
    if (cleanStr.toLowerCase().includes('e')) {
        const [coefficient, exponent] = cleanStr.toLowerCase().split('e');
        const base = BigInt(10);
        const exp = BigInt(exponent || '0');
        return BigInt(Math.floor(Number(coefficient))) * (base ** exp);
    }
    // Handle suffixes
    const suffixMap = new Map([
        ['k', BigInt(1000)],
        ['m', BigInt(1000000)],
        ['b', BigInt(1000000000)],
        ['t', BigInt(1000000000000)],
        ['q', BigInt(1000000000000000)],
    ]);
    const suffix = cleanStr.slice(-1).toLowerCase();
    const multiplier = suffixMap.get(suffix);
    if (multiplier) {
        cleanStr = cleanStr.slice(0, -1);
        const value = BigInt(Math.floor(Number(cleanStr)));
        return value * multiplier;
    }
    // Handle regular numbers
    return BigInt(cleanStr);
};
/**
 * Normalizes a string representation for comparison
 */
const normalizeNumberString = (str) => {
    // Remove all spaces and separators
    str = str.replace(/[\s,]/g, '');
    // Handle scientific notation
    if (str.toLowerCase().includes('e')) {
        const [coefficient, exponent] = str.toLowerCase().split('e');
        const exp = parseInt(exponent || '0');
        const coef = parseFloat(coefficient || '0');
        return (coef * Math.pow(10, exp)).toString();
    }
    return str;
};
/**
 * Formats a number for display in a tree structure
 */
const formatTreeValue = (value, depth = 0) => {
    const indent = '  '.repeat(depth);
    return `${indent}${formatBigInt(value, { notation: 'compact' })}`;
};
/**
 * Formats a range of numbers for display
 */
const formatRange = (start, end, options = {}) => {
    return `[${formatBigInt(start, options)} ... ${formatBigInt(end, options)}]`;
};
/**
 * Formats a percentage
 */
const formatPercentage = (value, total, precision = 2) => {
    if (total === BigInt(0)) {
        throw new ValidationError$1('Cannot calculate percentage with zero total');
    }
    const percentage = (Number(value) * 100) / Number(total);
    return `${percentage.toFixed(precision)}%`;
};

/**
 * Comparison operations module for Hypernum library
 * Provides functions for comparing large numbers with precision support
 */
({
    precision: 0,
    roundingMode: exports.RoundingMode.HALF_EVEN,
    tolerance: 0
});

/**
 * Conversion operations module for Hypernum library
 * Provides functions for converting numbers between different formats and bases
 */
({
    precision: 0,
    roundingMode: exports.RoundingMode.HALF_EVEN,
    uppercase: false,
    prefix: false,
    minDigits: 1
});

/**
 * Hypernum - A TypeScript/JavaScript library for large number operations
 * Provides comprehensive tools for handling large numbers and complex mathematical operations
 */
/**
 * Library version
 */
const VERSION = '0.1.0';
/**
 * Creates a new Hypernum instance with custom configuration
 */
function createHypernum(config) {
    const finalConfig = mergeConfig(config || {});
    validateConfig(finalConfig);
    return {
        config: finalConfig,
        arithmetic,
        bitwise,
        power: power$2,
        AckermannStructure,
        BigArray,
        NumberTree,
        MinHeap,
        MaxHeap,
        PowerTower
    };
}
/**
 * Default instance with basic configuration
 */
var index = createHypernum();

exports.AckermannStructure = AckermannStructure;
exports.BigArray = BigArray;
exports.ComputationLimitError = ComputationLimitError;
exports.DEFAULT_ARRAY_GROWTH_FACTOR = DEFAULT_ARRAY_GROWTH_FACTOR;
exports.DEFAULT_CACHE_SIZE = DEFAULT_CACHE_SIZE;
exports.DEFAULT_DECIMAL_SEPARATOR = DEFAULT_DECIMAL_SEPARATOR;
exports.DEFAULT_GROUP_SEPARATOR = DEFAULT_GROUP_SEPARATOR;
exports.DEFAULT_GROUP_SIZE = DEFAULT_GROUP_SIZE;
exports.DEFAULT_HEAP_INITIAL_CAPACITY = DEFAULT_HEAP_INITIAL_CAPACITY;
exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS$5;
exports.DEFAULT_TREE_MAX_DEPTH = DEFAULT_TREE_MAX_DEPTH;
exports.DataStructureError = DataStructureError;
exports.DivisionByZeroError = DivisionByZeroError;
exports.ERROR_MESSAGES = ERROR_MESSAGES;
exports.FEATURES = FEATURES;
exports.FormatError = FormatError;
exports.HeapPropertyError = HeapPropertyError;
exports.HypernumError = HypernumError;
exports.IndexError = IndexError;
exports.MAX_ACKERMANN_M = MAX_ACKERMANN_M;
exports.MAX_ACKERMANN_N = MAX_ACKERMANN_N;
exports.MAX_BITS = MAX_BITS;
exports.MAX_CACHE_SIZE = MAX_CACHE_SIZE;
exports.MAX_COMPUTATION_STEPS = MAX_COMPUTATION_STEPS;
exports.MAX_FACTORIAL_INPUT = MAX_FACTORIAL_INPUT;
exports.MAX_GROUP_SIZE = MAX_GROUP_SIZE;
exports.MAX_POWER_BASE = MAX_POWER_BASE;
exports.MAX_POWER_EXPONENT = MAX_POWER_EXPONENT;
exports.MAX_PRECISION = MAX_PRECISION;
exports.MAX_ROMAN_VALUE = MAX_ROMAN_VALUE;
exports.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;
exports.MAX_TETRATION_HEIGHT = MAX_TETRATION_HEIGHT;
exports.MIN_ARRAY_CAPACITY = MIN_ARRAY_CAPACITY;
exports.MIN_ROMAN_VALUE = MIN_ROMAN_VALUE;
exports.MIN_SAFE_INTEGER = MIN_SAFE_INTEGER;
exports.MaxHeap = MaxHeap;
exports.MinHeap = MinHeap;
exports.NEGATIVE_ONE = NEGATIVE_ONE;
exports.NUMBER_UNITS = NUMBER_UNITS;
exports.NumberTree = NumberTree;
exports.ONE = ONE;
exports.OverflowError = OverflowError$1;
exports.PERFORMANCE = PERFORMANCE;
exports.PowerTower = PowerTower;
exports.PrecisionError = PrecisionError;
exports.RomanNumeralError = RomanNumeralError;
exports.TEN = TEN;
exports.TWO = TWO;
exports.TreeError = TreeError;
exports.UnderflowError = UnderflowError;
exports.VERSION = VERSION;
exports.ValidationError = ValidationError$1;
exports.ZERO = ZERO;
exports.arithmetic = arithmetic;
exports.bitwise = bitwise;
exports.calculateRequiredPrecision = calculateRequiredPrecision;
exports.checkAdditionOverflow = checkAdditionOverflow;
exports.checkMultiplicationOverflow = checkMultiplicationOverflow;
exports.checkPowerOverflow = checkPowerOverflow;
exports.createError = createError;
exports.createHypernum = createHypernum;
exports.default = index;
exports.equalWithinPrecision = equalWithinPrecision;
exports.formatBigInt = formatBigInt;
exports.formatPercentage = formatPercentage;
exports.formatRange = formatRange;
exports.formatTreeValue = formatTreeValue;
exports.isHypernumError = isHypernumError;
exports.normalizeNumberString = normalizeNumberString;
exports.normalizePrecision = normalizePrecision;
exports.parseBigIntString = parseBigIntString;
exports.power = power$1;
exports.round = round;
exports.scaleByPowerOfTen = scaleByPowerOfTen;
exports.scaledDivision = scaledDivision;
exports.toBigInt = toBigInt;
exports.validateNonNegative = validateNonNegative;
exports.validatePositive = validatePositive;
exports.wrapError = wrapError;
//# sourceMappingURL=index.cjs.map
