/**
 * Precision utilities for Hypernum library
 * Provides functions for handling decimal precision and rounding operations
 */
/**
 * Rounding modes for decimal operations
 */
declare enum RoundingMode {
    FLOOR = "FLOOR",// Round towards negative infinity
    CEIL = "CEIL",// Round towards positive infinity
    DOWN = "DOWN",// Round towards zero
    UP = "UP",// Round away from zero
    HALF_EVEN = "HALF_EVEN",// Round to nearest even number when tied (Banker's rounding)
    HALF_UP = "HALF_UP",// Round up when tied
    HALF_DOWN = "HALF_DOWN"
}
/**
 * Scale a bigint by a power of 10
 */
declare const scaleByPowerOfTen: (value: bigint, power: number) => bigint;
/**
 * Round a number according to specified mode and precision
 */
declare const round: (value: bigint, precision?: number, mode?: RoundingMode) => bigint;
/**
 * Calculate precision required to represent a number without loss
 */
declare const calculateRequiredPrecision: (value: bigint) => number;
/**
 * Normalize two numbers to the same precision
 */
declare const normalizePrecision: (a: bigint, b: bigint, precisionA: number, precisionB: number) => [bigint, bigint];
/**
 * Scale a division operation to achieve desired precision
 */
declare const scaledDivision: (numerator: bigint, denominator: bigint, precision: number, roundingMode?: RoundingMode) => bigint;
/**
 * Check if two numbers are equal within a specified precision
 */
declare const equalWithinPrecision: (a: bigint, b: bigint, precision: number) => boolean;

/**
 * Arithmetic operations module for Hypernum library
 * Provides high-precision arithmetic operations with BigInt support
 */

/**
 * Options for arithmetic operations
 */
interface ArithmeticOptions {
    precision?: number;
    roundingMode?: RoundingMode;
    checkOverflow?: boolean;
}
/**
 * Adds two numbers with optional precision and overflow checking
 */
declare function add(a: bigint | string | number, b: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Subtracts two numbers with optional precision and overflow checking
 */
declare function subtract(a: bigint | string | number, b: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Multiplies two numbers with optional precision and overflow checking
 */
declare function multiply(a: bigint | string | number, b: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Divides two numbers with specified precision and rounding
 */
declare function divide(numerator: bigint | string | number, denominator: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Calculates remainder with optional precision
 */
declare function remainder(a: bigint | string | number, b: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Raises a number to a power with optional precision
 */
declare function power$1(base: bigint | string | number, exponent: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Calculates the square root with specified precision
 */
declare function sqrt$1(value: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Calculates the absolute value
 */
declare function abs(value: bigint | string | number): bigint;
/**
 * Returns the sign of a number (-1, 0, or 1)
 */
declare function sign(value: bigint | string | number): bigint;
/**
 * Calculates the greatest common divisor of two numbers
 */
declare function gcd(a: bigint | string | number, b: bigint | string | number): bigint;
/**
 * Calculates the least common multiple of two numbers
 */
declare function lcm(a: bigint | string | number, b: bigint | string | number): bigint;
declare const _default$3: {
    add: typeof add;
    subtract: typeof subtract;
    multiply: typeof multiply;
    divide: typeof divide;
    remainder: typeof remainder;
    power: typeof power$1;
    sqrt: typeof sqrt$1;
    abs: typeof abs;
    sign: typeof sign;
    gcd: typeof gcd;
    lcm: typeof lcm;
};

/**
 * Bitwise operations module for Hypernum library
 * Provides functions for bit-level manipulations of large numbers
 */
/**
 * Options for bitwise operations
 */
interface BitwiseOptions {
    /** Maximum bits to consider in operations */
    maxBits?: number;
    /** Whether to throw on overflow */
    strict?: boolean;
}
/**
 * Performs bitwise AND operation
 */
declare function and(a: bigint | string | number, b: bigint | string | number): bigint;
/**
 * Performs bitwise OR operation
 */
declare function or(a: bigint | string | number, b: bigint | string | number): bigint;
/**
 * Performs bitwise XOR operation
 */
declare function xor(a: bigint | string | number, b: bigint | string | number): bigint;
/**
 * Performs bitwise NOT operation
 */
declare function not(value: bigint | string | number): bigint;
/**
 * Performs left shift operation
 */
declare function leftShift(value: bigint | string | number, shift: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Performs right shift operation
 */
declare function rightShift(value: bigint | string | number, shift: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Performs unsigned right shift operation
 * Note: BigInt doesn't have >>> operator, so we implement it manually
 */
declare function unsignedRightShift(value: bigint | string | number, shift: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Rotates bits left by specified amount
 */
declare function rotateLeft(value: bigint | string | number, rotation: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Rotates bits right by specified amount
 */
declare function rotateRight(value: bigint | string | number, rotation: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Counts number of set bits (1s)
 */
declare function popCount(value: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Returns number of trailing zero bits
 */
declare function trailingZeros(value: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Returns number of leading zero bits
 */
declare function leadingZeros(value: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Returns bit at specified position
 */
declare function getBit(value: bigint | string | number, position: bigint | string | number, options?: BitwiseOptions): boolean;
/**
 * Sets bit at specified position
 */
declare function setBit(value: bigint | string | number, position: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Clears bit at specified position
 */
declare function clearBit(value: bigint | string | number, position: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Toggles bit at specified position
 */
declare function toggleBit(value: bigint | string | number, position: bigint | string | number, options?: BitwiseOptions): bigint;
declare const _default$2: {
    and: typeof and;
    or: typeof or;
    xor: typeof xor;
    not: typeof not;
    leftShift: typeof leftShift;
    rightShift: typeof rightShift;
    unsignedRightShift: typeof unsignedRightShift;
    rotateLeft: typeof rotateLeft;
    rotateRight: typeof rotateRight;
    popCount: typeof popCount;
    trailingZeros: typeof trailingZeros;
    leadingZeros: typeof leadingZeros;
    getBit: typeof getBit;
    setBit: typeof setBit;
    clearBit: typeof clearBit;
    toggleBit: typeof toggleBit;
};

/**
 * Common type definitions for Hypernum library
 * Contains shared types used throughout the library's modules
 */

/**
 * Base options interface for operations
 */
interface BaseOptions$1 {
    /** Decimal precision for operations */
    precision?: number;
    /** Rounding mode for decimal operations */
    roundingMode?: RoundingMode;
    /** Whether to check for overflow */
    checkOverflow?: boolean;
}
/**
 * Options for number formatting
 */
interface FormatOptions$2 extends BaseOptions$1 {
    /** Number notation style */
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
    /** Enable grouping separators */
    grouping?: boolean;
    /** Size of digit groups */
    groupSize?: number;
    /** Decimal point character */
    decimalSeparator?: string;
    /** Grouping separator character */
    groupSeparator?: string;
    /** Convert to uppercase (for special formats) */
    uppercase?: boolean;
}
/**
 * Cache configuration
 */
interface CacheConfig$1 {
    /** Maximum number of entries */
    maxSize: number;
    /** Time-to-live in milliseconds */
    ttl?: number;
    /** Eviction policy */
    evictionPolicy?: 'LRU' | 'LFU' | 'FIFO';
}
/**
 * Mathematical constants configuration
 */
interface MathConstantsConfig$1 {
    /** Precision for constant calculations */
    precision: number;
    /** Enable caching of computed values */
    cache?: boolean;
    /** Custom calculation algorithm */
    algorithm?: 'series' | 'iteration' | 'approximation';
}
/**
 * Debug configuration
 */
interface DebugConfig$1 {
    /** Enable detailed logging */
    verbose: boolean;
    /** Track operation performance */
    trackPerformance: boolean;
    /** Log level */
    logLevel: 'error' | 'warn' | 'info' | 'debug';
}

/**
 * Configuration type definitions for Hypernum library
 * Defines all configuration options and their default values
 */

/**
 * Basic configuration options for simple usage
 */
interface BasicConfig$2 {
    /** Decimal precision for operations */
    precision?: number;
    /** Rounding mode for decimal operations */
    roundingMode?: RoundingMode;
    /** Whether to check for overflow */
    checkOverflow?: boolean;
    /** Maximum allowed computation steps */
    maxSteps?: number;
    /** Enable debug mode */
    debug?: boolean;
}
/**
 * Configuration for arithmetic operations
 */
interface ArithmeticConfig$2 {
    /** Default precision for decimal operations */
    defaultPrecision: number;
    /** Default rounding mode */
    defaultRoundingMode: RoundingMode;
    /** Whether to check for overflow by default */
    checkOverflow: boolean;
    /** Maximum steps for iterative calculations */
    maxComputationSteps: number;
    /** Configure automatic precision adjustment */
    autoPrecision: {
        enabled: boolean;
        maxPrecision: number;
        minPrecision: number;
    };
    /** Constants calculation configuration */
    constants: MathConstantsConfig$1;
}
/**
 * Configuration for data structures
 */
interface DataStructuresConfig$2 {
    /** Array configuration */
    array: {
        initialCapacity: number;
        growthFactor: number;
        maxSize: number;
    };
    /** Tree configuration */
    tree: {
        maxDepth: number;
        autoBalance: boolean;
        nodeLimit: number;
    };
    /** Heap configuration */
    heap: {
        initialCapacity: number;
        growthPolicy: 'double' | 'linear' | 'fibonacci';
        validatePropertyOnOperation: boolean;
    };
    /** Cache configuration */
    cache: CacheConfig$1 & {
        enabled: boolean;
        persistToDisk: boolean;
        compressionEnabled: boolean;
    };
}
/**
 * Configuration for number formatting
 */
interface FormattingConfig$2 extends FormatOptions$2 {
    /** Scientific notation configuration */
    scientific: {
        /** Minimum exponent to trigger scientific notation */
        minExponent: number;
        /** Maximum significant digits */
        maxSignificantDigits: number;
        /** Exponent separator character */
        exponentSeparator: string;
    };
    /** Engineering notation configuration */
    engineering: {
        /** Use SI prefixes */
        useSIPrefixes: boolean;
        /** Custom unit definitions */
        customUnits?: Map<number, string>;
    };
    /** Localization settings */
    localization: {
        /** Locale identifier */
        locale: string;
        /** Custom number formatting */
        numberFormat?: Intl.NumberFormatOptions;
        /** Use locale-specific grouping */
        useLocaleGrouping: boolean;
    };
}
/**
 * Configuration for performance monitoring
 */
interface PerformanceConfig$2 {
    /** Enable performance tracking */
    enableTracking: boolean;
    /** Sampling rate for metrics (0-1) */
    samplingRate: number;
    /** Performance thresholds */
    thresholds: {
        /** Warning threshold in milliseconds */
        warnThresholdMs: number;
        /** Error threshold in milliseconds */
        errorThresholdMs: number;
        /** Maximum allowed memory usage in bytes */
        maxMemoryBytes: number;
    };
    /** Metrics collection configuration */
    metrics: {
        /** Enable detailed operation timing */
        timing: boolean;
        /** Track memory usage */
        memory: boolean;
        /** Track cache performance */
        cache: boolean;
        /** Custom metrics to track */
        custom?: Map<string, (operation: any) => number>;
    };
}
/**
 * Feature flags for optional functionality
 */
interface FeatureFlags$2 {
    /** Enable experimental features */
    experimentalFeatures: boolean;
    /** Use WebAssembly implementations when available */
    useWasm: boolean;
    /** Enable worker thread support */
    workerThreads: boolean;
    /** Enable SharedArrayBuffer support */
    sharedArrayBuffer: boolean;
    /** Enable BigInt64Array support */
    bigIntTypedArrays: boolean;
}
/**
 * Full configuration interface with all options
 */
interface FullConfig$2 {
    /** Arithmetic operation configuration */
    arithmetic: ArithmeticConfig$2;
    /** Data structure configuration */
    dataStructures: DataStructuresConfig$2;
    /** Formatting configuration */
    formatting: FormattingConfig$2;
    /** Performance configuration */
    performance: PerformanceConfig$2;
    /** Debug configuration */
    debug: DebugConfig$1;
    /** Feature flags */
    features: FeatureFlags$2;
}
/**
 * Combined configuration type that can be either basic or full
 */
type HypernumConfig$2 = BasicConfig$2 | FullConfig$2;

/**
 * Custom error types for Hypernum library
 * Provides specific error classes for different types of errors that can occur
 * during mathematical operations and data structure manipulations
 */
/**
 * Base error class for Hypernum library
 * All other error classes inherit from this
 */
declare class HypernumError extends Error {
    constructor(message: string);
}
/**
 * Error for arithmetic underflow conditions
 */
declare class UnderflowError extends HypernumError {
    constructor(message?: string);
}
/**
 * Error for division by zero
 */
declare class DivisionByZeroError extends HypernumError {
    constructor(message?: string);
}
/**
 * Error for precision-related issues
 */
declare class PrecisionError extends HypernumError {
    constructor(message?: string);
}
/**
 * Error for computation limits exceeded
 */
declare class ComputationLimitError extends HypernumError {
    constructor(message?: string);
}
/**
 * Error for invalid operations on data structures
 */
declare class DataStructureError extends HypernumError {
    constructor(message: string);
}
/**
 * Error for heap property violations
 */
declare class HeapPropertyError extends DataStructureError {
    constructor(message?: string);
}
/**
 * Error for tree-related issues
 */
declare class TreeError extends DataStructureError {
    constructor(message?: string);
}
/**
 * Error for array index out of bounds
 */
declare class IndexError extends DataStructureError {
    constructor(message?: string);
}
/**
 * Error for invalid number format or conversion
 */
declare class FormatError extends HypernumError {
    constructor(message: string);
}
/**
 * Error for invalid Roman numeral operations
 */
declare class RomanNumeralError extends FormatError {
    constructor(message?: string);
}
/**
 * Type guard to check if an error is a Hypernum error
 */
declare function isHypernumError(error: unknown): error is HypernumError;
/**
 * Helper function to wrap unknown errors into HypernumError
 */
declare function wrapError(error: unknown): HypernumError;
/**
 * Helper function to create an appropriate error from a message and optional type
 */
declare function createError(message: string, type?: string): HypernumError;

/**
 * Core constants for Hypernum library
 * Defines fundamental values and limits used across the library
 */
declare const MAX_SAFE_INTEGER: bigint;
declare const MIN_SAFE_INTEGER: bigint;
declare const MAX_PRECISION = 100;
declare const MAX_COMPUTATION_STEPS = 1000;
declare const MAX_BITS = 1024;
declare const ZERO: bigint;
declare const ONE: bigint;
declare const TWO: bigint;
declare const TEN: bigint;
declare const NEGATIVE_ONE: bigint;
declare const MAX_POWER_BASE: bigint;
declare const MAX_POWER_EXPONENT: bigint;
declare const MAX_TETRATION_HEIGHT: bigint;
declare const MAX_FACTORIAL_INPUT: bigint;
declare const DEFAULT_TREE_MAX_DEPTH = 1000;
declare const DEFAULT_HEAP_INITIAL_CAPACITY = 16;
declare const DEFAULT_ARRAY_GROWTH_FACTOR = 2;
declare const MIN_ARRAY_CAPACITY = 16;
declare const DEFAULT_DECIMAL_SEPARATOR = ".";
declare const DEFAULT_GROUP_SEPARATOR = ",";
declare const DEFAULT_GROUP_SIZE = 3;
declare const MAX_GROUP_SIZE = 10;
declare const MIN_ROMAN_VALUE = 1;
declare const MAX_ROMAN_VALUE = 3999;
declare const MAX_ACKERMANN_M = 4;
declare const MAX_ACKERMANN_N = 1000;
declare const DEFAULT_CACHE_SIZE = 1000;
declare const MAX_CACHE_SIZE = 10000;
declare const ERROR_MESSAGES: {
    readonly OVERFLOW: "Operation would result in overflow";
    readonly UNDERFLOW: "Operation would result in underflow";
    readonly NEGATIVE_ROOT: "Cannot compute root of negative number";
    readonly NEGATIVE_EXPONENT: "Negative exponents not supported for integers";
    readonly DIVISION_BY_ZERO: "Division by zero";
    readonly INVALID_PRECISION: "Precision must be non-negative and not exceed MAX_PRECISION";
    readonly INVALID_BASE: "Base must be a positive integer";
    readonly INVALID_ROMAN: "Invalid Roman numeral";
    readonly COMPUTATION_LIMIT: "Computation exceeded maximum allowed steps";
    readonly NEGATIVE_INDEX: "Array index cannot be negative";
    readonly TREE_DEPTH_EXCEEDED: "Maximum tree depth exceeded";
    readonly INVALID_HEAP_PROPERTY: "Heap property violation detected";
};
declare const FEATURES: {
    readonly OVERFLOW_CHECKING: true;
    readonly AUTOMATIC_PRECISION: true;
    readonly MEMOIZATION: true;
    readonly TREE_BALANCING: true;
    readonly DEBUG_MODE: false;
};
declare const DEFAULT_OPTIONS: {
    readonly precision: 0;
    readonly roundingMode: "HALF_EVEN";
    readonly checkOverflow: true;
    readonly maxSteps: 1000;
    readonly grouping: true;
    readonly uppercase: false;
    readonly cache: true;
};
declare const NUMBER_UNITS: readonly [{
    readonly value: 1n;
    readonly symbol: "";
}, {
    readonly value: 1000n;
    readonly symbol: "K";
}, {
    readonly value: 1000000n;
    readonly symbol: "M";
}, {
    readonly value: 1000000000n;
    readonly symbol: "B";
}, {
    readonly value: 1000000000000n;
    readonly symbol: "T";
}, {
    readonly value: 1000000000000000n;
    readonly symbol: "Q";
}];
declare const PERFORMANCE: {
    readonly WARN_THRESHOLD_MS: 100;
    readonly ERROR_THRESHOLD_MS: 1000;
    readonly MAX_ARRAY_SIZE: 1000000;
    readonly MAX_TREE_SIZE: 1000000;
};

/**
 * Interface representing an Ackermann node in the computation structure
 */
interface IAckermannNode {
    m: number;
    n: number;
    value: bigint;
    prevM?: IAckermannNode;
    prevN?: IAckermannNode;
    nextM?: IAckermannNode;
    nextN?: IAckermannNode;
}
/**
 * Type for Ackermann computation path step
 */
type ComputationStep = {
    m: number;
    n: number;
    value: bigint;
};
/**
 * Type for growth rate analysis
 */
type GrowthAnalysis = {
    value: bigint;
    increase: bigint;
    multiplier: bigint;
};
/**
 * Class representing the Ackermann function computation structure
 * Implements caching and relationship tracking between values
 */
declare class AckermannStructure {
    private nodes;
    private maxComputedM;
    private maxComputedN;
    private heap;
    constructor();
    /**
     * Generates a unique key for node storage
     */
    private static getNodeKey;
    /**
     * Computes the Ackermann function value
     * Uses recursion with memoization
     */
    private computeAckermann;
    /**
     * Adds a new node to the structure
     */
    addNode(m: number, n: number): IAckermannNode;
    /**
     * Builds nodes for a range of m and n values
     */
    buildRange(mRange: number, nRange: number): void;
    /**
     * Gets the computation path to reach A(m,n)
     */
    getComputationPath(m: number, n: number): ComputationStep[];
    /**
     * Analyzes growth rate for a fixed m value
     */
    analyzeGrowthRate(m: number): Map<number, GrowthAnalysis>;
    /**
     * Gets the largest computed value
     */
    getLargestValue(): bigint;
    /**
     * Gets a specific Ackermann value if it exists
     */
    getValue(m: number, n: number): bigint | undefined;
}

/**
 * Represents the result of a comparison operation
 * -1: first value is less than second value
 *  0: values are equal
 *  1: first value is greater than second value
 */
type ComparisonResult = -1 | 0 | 1;
/**
 * Generic comparator function type for heap elements
 */
type Comparator<T> = (a: T, b: T) => ComparisonResult;
/**
 * Abstract base heap class implementing common heap operations
 */
declare abstract class Heap<T> {
    protected heap: T[];
    protected readonly compare: Comparator<T>;
    constructor(comparator: Comparator<T>);
    /**
     * Gets the size of the heap
     */
    size(): number;
    /**
     * Checks if the heap is empty
     */
    isEmpty(): boolean;
    /**
     * Peeks at the root element without removing it
     */
    peek(): T | undefined;
    /**
     * Inserts a new element into the heap
     */
    push(value: T): void;
    /**
     * Removes and returns the root element
     */
    pop(): T | undefined;
    /**
     * Removes all elements from the heap
     */
    clear(): void;
    /**
     * Creates a heap from an array of elements
     */
    static heapify<T extends {}>(array: T[], comparator: Comparator<T>): Heap<T>;
    /**
     * Gets the parent index of a node
     */
    protected getParentIndex(index: number): number;
    /**
     * Gets the left child index of a node
     */
    protected getLeftChildIndex(index: number): number;
    /**
     * Gets the right child index of a node
     */
    protected getRightChildIndex(index: number): number;
    /**
     * Swaps two elements in the heap
     */
    protected swap(i: number, j: number): void;
    /**
     * Moves an element up the heap until heap property is satisfied
     */
    protected abstract siftUp(index: number): void;
    /**
     * Moves an element down the heap until heap property is satisfied
     */
    protected abstract siftDown(index: number): void;
}
/**
 * MinHeap implementation where the root is the smallest element
 */
declare class MinHeap<T> extends Heap<T> {
    constructor(comparator: Comparator<T>);
    protected siftUp(index: number): void;
    protected siftDown(index: number): void;
}
/**
 * MaxHeap implementation where the root is the largest element
 */
declare class MaxHeap<T> extends Heap<T> {
    constructor(comparator: Comparator<T>);
    protected siftUp(index: number): void;
    protected siftDown(index: number): void;
}

/**
 * Interface for tree node statistics
 */
interface NodeStats$1 {
    height: number;
    size: number;
    sum: bigint;
    min: bigint;
    max: bigint;
}
/**
 * Interface for tree traversal configuration
 */
interface TraversalConfig {
    includeStats?: boolean;
    skipSubtrees?: boolean;
    maxDepth?: number;
}
/**
 * Class representing a node in the number tree
 */
declare class NumberNode {
    value: bigint;
    left: NumberNode | null;
    right: NumberNode | null;
    parent: NumberNode | null;
    height: number;
    size: number;
    sum: bigint;
    constructor(value: bigint | string | number);
    /**
     * Updates node statistics based on children
     */
    updateStats(): void;
    /**
     * Gets balance factor of the node
     */
    getBalance(): number;
    /**
     * Gets complete statistics for the node and its subtree
     */
    getStats(): NodeStats$1;
    /**
     * Finds minimum value node in the subtree
     */
    findMin(): NumberNode;
    /**
     * Finds maximum value node in the subtree
     */
    findMax(): NumberNode;
}
/**
 * AVL Tree implementation specialized for handling large numbers
 */
declare class NumberTree {
    private root;
    private readonly comparator;
    constructor(comparator?: Comparator<bigint>);
    /**
     * Gets the root node if it exists
     */
    getRoot(): NumberNode | null;
    /**
     * Inserts a new value into the tree
     */
    insert(value: bigint | string | number): NumberNode;
    /**
     * Recursively inserts a new node
     */
    private insertNode;
    /**
     * Balances a node using AVL rotations
     */
    private balance;
    /**
     * Performs left rotation
     */
    private rotateLeft;
    /**
     * Performs right rotation
     */
    private rotateRight;
    /**
     * Removes a value from the tree
     */
    remove(value: bigint | string | number): boolean;
    /**
     * Recursively removes a node
     */
    private removeNode;
    /**
     * Finds a node by value
     */
    find(value: bigint | string | number): NumberNode | null;
    /**
     * Traverses the tree in specified order and returns values
     */
    traverse(order?: 'inOrder' | 'preOrder' | 'postOrder', config?: TraversalConfig): bigint[];
    /**
     * Gets overall tree statistics
     */
    getTreeStats(): NodeStats$1 | null;
    /**
     * Gets the nth smallest value in the tree
     */
    getNthValue(n: number): bigint | null;
    /**
     * Gets a range of values between start and end (inclusive)
     */
    getRange(start: bigint | string | number, end: bigint | string | number): bigint[];
}

/**
 * Type for BigArray operation result
 */
type OperationResult<T> = {
    success: boolean;
    value?: T;
    error?: string;
};
/**
 * Options for BigArray initialization
 */
interface BigArrayOptions<T> {
    initialCapacity?: number;
    growthFactor?: number;
    comparator?: Comparator<T>;
}
/**
 * A specialized array implementation for handling large numbers and providing
 * efficient operations with segment tree support
 */
declare class BigArray<T> {
    private data;
    private segmentTree;
    private readonly growthFactor;
    private readonly comparator;
    private size;
    private capacity;
    constructor(options?: BigArrayOptions<T>);
    /**
     * Gets the current size of the array
     */
    getSize(): number;
    /**
     * Gets the current capacity of the array
     */
    getCapacity(): number;
    /**
     * Resizes the internal array when needed
     */
    private resize;
    /**
     * Appends an element to the end of the array
     */
    push(value: T): OperationResult<number>;
    /**
     * Removes and returns the last element
     */
    pop(): OperationResult<T>;
    /**
     * Gets element at specified index
     */
    get(index: number): OperationResult<T>;
    /**
     * Sets element at specified index
     */
    set(index: number, value: T): OperationResult<T>;
    /**
     * Rebuilds the segment tree after major changes
     */
    private rebuildSegmentTree;
    /**
     * Builds a segment tree node recursively
     */
    private buildSegmentTree;
    /**
     * Updates the segment tree after a value change
     */
    private updateSegmentTree;
    /**
     * Queries the maximum value in a range
     */
    queryRange(start: number, end: number): OperationResult<T>;
    /**
     * Recursively queries the segment tree
     */
    private querySegmentTree;
    /**
     * Creates a heap from the current array
     */
    toHeap(isMin?: boolean): MinHeap<T> | MaxHeap<T>;
    /**
     * Sorts the array in-place
     */
    sort(ascending?: boolean): void;
    /**
     * Returns array as native array
     */
    toArray(): T[];
}

/**
 * Interface for power tower computation options
 */
interface PowerTowerOptions {
    maxHeight?: number;
    maxValue?: bigint;
    checkOverflow?: boolean;
    precision?: number;
}
/**
 * Class representing a power tower (tetration) computation structure
 * Handles expressions of the form: a↑↑b = a^(a^(a^...)) (b times)
 */
declare class PowerTower {
    private readonly options;
    private head;
    private tail;
    private size;
    constructor(options?: PowerTowerOptions);
    /**
     * Creates a new power tower node
     */
    private createNode;
    /**
     * Validates power tower height
     */
    private validateHeight;
    /**
     * Validates value for computation
     */
    private validateValue;
    /**
     * Computes power with overflow checking
     */
    private computePower;
    /**
     * Builds a power tower of specified height with given base
     */
    build(base: bigint | number | string, height: number): void;
    /**
     * Evaluates the power tower up to specified height
     */
    evaluate(height?: number): bigint;
    /**
     * Gets the current height of the power tower
     */
    getHeight(): number;
    /**
     * Checks if the tower can be evaluated to a given height
     */
    isComputable(height?: number): boolean;
    /**
     * Gets the computation state at each level
     */
    getState(): {
        height: number;
        value: bigint;
        evaluated: boolean;
    }[];
    /**
     * Clears the power tower
     */
    clear(): void;
    /**
     * Gets the maximum computationally feasible height for a given base
     */
    static getMaxFeasibleHeight(base: bigint | number | string): number;
    /**
     * Creates a string representation of the power tower
     */
    toString(): string;
}

/**
 * Formatting utilities for Hypernum library
 * Provides functions for formatting large numbers and converting between different representations
 */
interface FormatOptions$1 {
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
    precision?: number;
    grouping?: boolean;
    groupSize?: number;
    decimalSeparator?: string;
    groupSeparator?: string;
}
/**
 * Formats a BigInt value according to specified options
 */
declare const formatBigInt: (value: bigint, options?: FormatOptions$1) => string;
/**
 * Parses a formatted string back to BigInt
 */
declare const parseBigIntString: (str: string, options?: FormatOptions$1) => bigint;
/**
 * Normalizes a string representation for comparison
 */
declare const normalizeNumberString: (str: string) => string;
/**
 * Formats a number for display in a tree structure
 */
declare const formatTreeValue: (value: bigint, depth?: number) => string;
/**
 * Formats a range of numbers for display
 */
declare const formatRange: (start: bigint, end: bigint, options?: FormatOptions$1) => string;
/**
 * Formats a percentage
 */
declare const formatPercentage: (value: bigint, total: bigint, precision?: number) => string;

/**
 * Validation utilities for Hypernum library
 * Provides type checking and validation functions for large number operations
 */
declare class ValidationError extends Error {
    constructor(message: string);
}
declare class OverflowError extends Error {
    constructor(message: string);
}
declare const toBigInt: (value: unknown) => bigint;
declare const checkAdditionOverflow: (a: bigint, b: bigint) => void;
declare const checkMultiplicationOverflow: (a: bigint, b: bigint) => void;
declare const checkPowerOverflow: (base: bigint, exponent: bigint) => void;
declare const validatePositive: (value: bigint) => void;
declare const validateNonNegative: (value: bigint) => void;

/**
 * Power operations module for Hypernum library
 * Provides efficient implementations for exponentiation and related operations
 */

/**
 * Options for power operations
 */
interface PowerOptions {
    /** Precision for decimal operations */
    precision?: number;
    /** Rounding mode for decimal operations */
    roundingMode?: RoundingMode;
    /** Whether to check for overflow */
    checkOverflow?: boolean;
    /** Maximum allowed computation steps */
    maxSteps?: number;
}
/**
 * Raises a number to an integer power using binary exponentiation
 */
declare function power(baseValue: bigint | string | number, exponentValue: bigint | string | number, options?: PowerOptions): bigint;
/**
 * Calculates square root using Newton's method
 */
declare function sqrt(value: bigint | string | number, options?: PowerOptions): bigint;
/**
 * Calculates nth root using Newton's method
 */
declare function nthRoot(value: bigint | string | number, n: bigint | string | number, options?: PowerOptions): bigint;
/**
 * Calculates tetration (repeated exponentiation)
 * a↑↑n = a^(a^(a^...)) (n times)
 */
declare function tetration(base: bigint | string | number, height: bigint | string | number, options?: PowerOptions): bigint;
/**
 * Calculates super-root (inverse tetration)
 * Finds x where x↑↑n = value
 */
declare function superRoot(value: bigint | string | number, height: bigint | string | number, options?: PowerOptions): bigint;
declare const _default$1: {
    power: typeof power;
    sqrt: typeof sqrt;
    nthRoot: typeof nthRoot;
    tetration: typeof tetration;
    superRoot: typeof superRoot;
};

/**
 * Valid input types for numeric values
 */
type NumericInput = bigint | string | number;

/**
 * Result type for operations that may fail
 */
type Result<T> = {
  success: boolean;
  value?: T;
  error?: string;
};

/**
 * Base options interface for operations
 */
interface BaseOptions {
  precision?: number;
  roundingMode?: RoundingMode;
  checkOverflow?: boolean;
}

/**
 * Basic configuration options
 */
interface BasicConfig$1 {
  precision?: number;
  roundingMode?: RoundingMode;
  checkOverflow?: boolean;
  maxSteps?: number;
  debug?: boolean;
}

/**
 * Configuration for arithmetic operations
 */
interface ArithmeticConfig$1 {
  defaultPrecision: number;
  defaultRoundingMode: RoundingMode;
  checkOverflow: boolean;
  maxComputationSteps: number;
  autoPrecision: {
    enabled: boolean;
    maxPrecision: number;
    minPrecision: number;
  };
  constants: MathConstantsConfig;
}

/**
 * Configuration for data structures
 */
interface DataStructuresConfig$1 {
  array: {
    initialCapacity: number;
    growthFactor: number;
    maxSize: number;
  };
  tree: {
    maxDepth: number;
    autoBalance: boolean;
    nodeLimit: number;
  };
  heap: {
    initialCapacity: number;
    growthPolicy: 'double' | 'linear' | 'fibonacci';
    validatePropertyOnOperation: boolean;
  };
  cache: CacheConfig & {
    enabled: boolean;
    persistToDisk: boolean;
    compressionEnabled: boolean;
  };
}

/**
 * Configuration for number formatting
 */
interface FormattingConfig$1 extends FormatOptions {
  scientific: {
    minExponent: number;
    maxSignificantDigits: number;
    exponentSeparator: string;
  };
  engineering: {
    useSIPrefixes: boolean;
    customUnits?: Map<number, string>;
  };
  localization: {
    locale: string;
    numberFormat?: Intl.NumberFormatOptions;
    useLocaleGrouping: boolean;
  };
}

/**
 * Configuration for performance monitoring
 */
interface PerformanceConfig$1 {
  enableTracking: boolean;
  samplingRate: number;
  thresholds: {
    warnThresholdMs: number;
    errorThresholdMs: number;
    maxMemoryBytes: number;
  };
  metrics: {
    timing: boolean;
    memory: boolean;
    cache: boolean;
    custom?: Map<string, (operation: any) => number>;
  };
}

/**
 * Feature flags for optional functionality
 */
interface FeatureFlags$1 {
  experimentalFeatures: boolean;
  useWasm: boolean;
  workerThreads: boolean;
  sharedArrayBuffer: boolean;
  bigIntTypedArrays: boolean;
}

/**
 * Full configuration interface
 */
interface FullConfig$1 {
  arithmetic: ArithmeticConfig$1;
  dataStructures: DataStructuresConfig$1;
  formatting: FormattingConfig$1;
  performance: PerformanceConfig$1;
  debug: DebugConfig;
  features: FeatureFlags$1;
}

/**
 * Combined configuration type
 */
type HypernumConfig$1 = BasicConfig$1 | FullConfig$1;

/**
 * Default basic configuration
 */
declare const DEFAULT_BASIC_CONFIG: Required<BasicConfig$1> = {
  precision: 0,
  roundingMode: RoundingMode.HALF_EVEN,
  checkOverflow: true,
  maxSteps: 1000,
  debug: false
};

/**
 * Default full configuration
 */
declare const DEFAULT_FULL_CONFIG: FullConfig$1 = {
  arithmetic: {
    defaultPrecision: 0,
    defaultRoundingMode: RoundingMode.HALF_EVEN,
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
      maxSize: 1_000_000
    },
    tree: {
      maxDepth: 1000,
      autoBalance: true,
      nodeLimit: 1_000_000
    },
    heap: {
      initialCapacity: 16,
      growthPolicy: 'double',
      validatePropertyOnOperation: true
    },
    cache: {
      enabled: true,
      maxSize: 1000,
      ttl: 3600000,
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
      maxMemoryBytes: 1024 * 1024 * 1024
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
declare function isFullConfig(config: HypernumConfig$1): config is FullConfig$1 {
  return 'arithmetic' in config && 'dataStructures' in config;
}

/**
 * Type guard to check if config is a basic configuration
 */
declare function isBasicConfig(config: HypernumConfig$1): config is BasicConfig$1 {
  return !isFullConfig(config);
}

/**
 * Validates configuration values
 */
declare function validateConfig(config: HypernumConfig$1): void {
  if (isFullConfig(config)) {
    validateFullConfig(config);
  } else {
    validateBasicConfig(config);
  }
}

/**
 * Merges configuration with appropriate defaults
 */
declare function mergeConfig(custom: Partial<HypernumConfig$1> = {}): HypernumConfig$1 {
  if (isFullConfig(custom)) {
    return {
      ...DEFAULT_FULL_CONFIG,
      ...custom,
      arithmetic: { ...DEFAULT_FULL_CONFIG.arithmetic, ...custom.arithmetic },
      dataStructures: { ...DEFAULT_FULL_CONFIG.dataStructures, ...custom.dataStructures },
      formatting: { ...DEFAULT_FULL_CONFIG.formatting, ...custom.formatting },
      performance: { ...DEFAULT_FULL_CONFIG.performance, ...custom.performance },
      debug: { ...DEFAULT_FULL_CONFIG.debug, ...custom.debug },
      features: { ...DEFAULT_FULL_CONFIG.features, ...custom.features }
    };
  }
  
  return {
    ...DEFAULT_BASIC_CONFIG,
    ...custom
  };
}

// Additional required types
interface FormatOptions {
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  precision?: number;
  grouping?: boolean;
  groupSize?: number;
  decimalSeparator?: string;
  groupSeparator?: string;
  uppercase?: boolean;
}

interface CacheConfig {
  maxSize: number;
  ttl?: number;
  evictionPolicy?: 'LRU' | 'LFU' | 'FIFO';
}

interface MathConstantsConfig {
  precision: number;
  cache?: boolean;
  algorithm?: 'series' | 'iteration' | 'approximation';
}

interface DebugConfig {
  verbose: boolean;
  trackPerformance: boolean;
  logLevel: 'error' | 'warn' | 'info' | 'debug';
}

interface NumericRange {
  min: bigint;
  max: bigint;
}

interface OperationStatus {
  success: boolean;
  message: string;
}

interface PerformanceMetrics {
  timing: number;
  memory: number;
  cache: number;
  custom: Map<string, number>;
}

interface NodeStats {
  depth: number;
  children: number;
  size: number;
}

interface OperationOptions {
  precision?: number;
  roundingMode?: RoundingMode;
  checkOverflow?: boolean;
  maxSteps?: number;
  debug?: boolean;
}

/**
 * Basic configuration options for simple usage
 */
interface BasicConfig {
  /** Decimal precision for operations */
  precision?: number;
  /** Rounding mode for decimal operations */
  roundingMode?: RoundingMode;
  /** Whether to check for overflow */
  checkOverflow?: boolean;
  /** Maximum allowed computation steps */
  maxSteps?: number;
  /** Enable debug mode */
  debug?: boolean;
}

/**
 * Configuration for arithmetic operations
 */
interface ArithmeticConfig {
  /** Default precision for decimal operations */
  defaultPrecision: number;
  /** Default rounding mode */
  defaultRoundingMode: RoundingMode;
  /** Whether to check for overflow by default */
  checkOverflow: boolean;
  /** Maximum steps for iterative calculations */
  maxComputationSteps: number;
  /** Configure automatic precision adjustment */
  autoPrecision: {
    enabled: boolean;
    maxPrecision: number;
    minPrecision: number;
  };
  /** Constants calculation configuration */
  constants: MathConstantsConfig;
}

/**
 * Configuration for data structures
 */
interface DataStructuresConfig {
  /** Array configuration */
  array: {
    initialCapacity: number;
    growthFactor: number;
    maxSize: number;
  };
  /** Tree configuration */
  tree: {
    maxDepth: number;
    autoBalance: boolean;
    nodeLimit: number;
  };
  /** Heap configuration */
  heap: {
    initialCapacity: number;
    growthPolicy: 'double' | 'linear' | 'fibonacci';
    validatePropertyOnOperation: boolean;
  };
  /** Cache configuration */
  cache: CacheConfig & {
    enabled: boolean;
    persistToDisk: boolean;
    compressionEnabled: boolean;
  };
}

/**
 * Configuration for number formatting
 */
interface FormattingConfig extends FormatOptions {
  /** Scientific notation configuration */
  scientific: {
    minExponent: number;
    maxSignificantDigits: number;
    exponentSeparator: string;
  };
  /** Engineering notation configuration */
  engineering: {
    useSIPrefixes: boolean;
    customUnits?: Map<number, string>;
  };
  /** Localization settings */
  localization: {
    locale: string;
    numberFormat?: Intl.NumberFormatOptions;
    useLocaleGrouping: boolean;
  };
}

/**
 * Configuration for performance monitoring
 */
interface PerformanceConfig {
  /** Enable performance tracking */
  enableTracking: boolean;
  /** Sampling rate for metrics (0-1) */
  samplingRate: number;
  /** Performance thresholds */
  thresholds: {
    warnThresholdMs: number;
    errorThresholdMs: number;
    maxMemoryBytes: number;
  };
  /** Metrics collection configuration */
  metrics: {
    timing: boolean;
    memory: boolean;
    cache: boolean;
    custom?: Map<string, (operation: any) => number>;
  };
}

/**
 * Feature flags for optional functionality
 */
interface FeatureFlags {
  /** Enable experimental features */
  experimentalFeatures: boolean;
  /** Use WebAssembly implementations when available */
  useWasm: boolean;
  /** Enable worker thread support */
  workerThreads: boolean;
  /** Enable SharedArrayBuffer support */
  sharedArrayBuffer: boolean;
  /** Enable BigInt64Array support */
  bigIntTypedArrays: boolean;
}

/**
 * Complete configuration interface
 */
interface FullConfig {
  /** Arithmetic operation configuration */
  arithmetic: ArithmeticConfig;
  /** Data structure configuration */
  dataStructures: DataStructuresConfig;
  /** Formatting configuration */
  formatting: FormattingConfig;
  /** Performance configuration */
  performance: PerformanceConfig;
  /** Debug configuration */
  debug: DebugConfig;
  /** Feature flags */
  features: FeatureFlags;
}

/**
 * Combined configuration type that can be either basic or full
 */
type HypernumConfig = BasicConfig | FullConfig;

/**
 * Library version
 */
declare const VERSION = "0.1.0";
/**
 * Creates a new Hypernum instance with custom configuration
 */
declare function createHypernum(config?: Partial<HypernumConfig$2>): {
    config: HypernumConfig$2;
    arithmetic: {
        add: typeof add;
        subtract: typeof subtract;
        multiply: typeof multiply;
        divide: typeof divide;
        remainder: typeof remainder;
        power: typeof power$1;
        sqrt: typeof sqrt$1;
        abs: typeof abs;
        sign: typeof sign;
        gcd: typeof gcd;
        lcm: typeof lcm;
    };
    bitwise: {
        and: typeof and;
        or: typeof or;
        xor: typeof xor;
        not: typeof not;
        leftShift: typeof leftShift;
        rightShift: typeof rightShift;
        unsignedRightShift: typeof unsignedRightShift;
        rotateLeft: typeof rotateLeft;
        rotateRight: typeof rotateRight;
        popCount: typeof popCount;
        trailingZeros: typeof trailingZeros;
        leadingZeros: typeof leadingZeros;
        getBit: typeof getBit;
        setBit: typeof setBit;
        clearBit: typeof clearBit;
        toggleBit: typeof toggleBit;
    };
    power: typeof power$1;
    AckermannStructure: typeof AckermannStructure;
    BigArray: typeof BigArray;
    NumberTree: typeof NumberTree;
    MinHeap: typeof MinHeap;
    MaxHeap: typeof MaxHeap;
    PowerTower: typeof PowerTower;
};
/**
 * Default instance with basic configuration
 */
declare const _default: {
    config: HypernumConfig$2;
    arithmetic: {
        add: typeof add;
        subtract: typeof subtract;
        multiply: typeof multiply;
        divide: typeof divide;
        remainder: typeof remainder;
        power: typeof power$1;
        sqrt: typeof sqrt$1;
        abs: typeof abs;
        sign: typeof sign;
        gcd: typeof gcd;
        lcm: typeof lcm;
    };
    bitwise: {
        and: typeof and;
        or: typeof or;
        xor: typeof xor;
        not: typeof not;
        leftShift: typeof leftShift;
        rightShift: typeof rightShift;
        unsignedRightShift: typeof unsignedRightShift;
        rotateLeft: typeof rotateLeft;
        rotateRight: typeof rotateRight;
        popCount: typeof popCount;
        trailingZeros: typeof trailingZeros;
        leadingZeros: typeof leadingZeros;
        getBit: typeof getBit;
        setBit: typeof setBit;
        clearBit: typeof clearBit;
        toggleBit: typeof toggleBit;
    };
    power: typeof power$1;
    AckermannStructure: typeof AckermannStructure;
    BigArray: typeof BigArray;
    NumberTree: typeof NumberTree;
    MinHeap: typeof MinHeap;
    MaxHeap: typeof MaxHeap;
    PowerTower: typeof PowerTower;
};

export { AckermannStructure, type ArithmeticConfig, type BaseOptions, type BasicConfig, BigArray, type CacheConfig, type Comparator, ComputationLimitError, DEFAULT_ARRAY_GROWTH_FACTOR, DEFAULT_BASIC_CONFIG, DEFAULT_CACHE_SIZE, DEFAULT_DECIMAL_SEPARATOR, DEFAULT_FULL_CONFIG, DEFAULT_GROUP_SEPARATOR, DEFAULT_GROUP_SIZE, DEFAULT_HEAP_INITIAL_CAPACITY, DEFAULT_OPTIONS, DEFAULT_TREE_MAX_DEPTH, DataStructureError, type DataStructuresConfig, type DebugConfig, DivisionByZeroError, ERROR_MESSAGES, FEATURES, type FeatureFlags, FormatError, type FormatOptions, type FormattingConfig, type FullConfig, HeapPropertyError, type HypernumConfig, HypernumError, IndexError, MAX_ACKERMANN_M, MAX_ACKERMANN_N, MAX_BITS, MAX_CACHE_SIZE, MAX_COMPUTATION_STEPS, MAX_FACTORIAL_INPUT, MAX_GROUP_SIZE, MAX_POWER_BASE, MAX_POWER_EXPONENT, MAX_PRECISION, MAX_ROMAN_VALUE, MAX_SAFE_INTEGER, MAX_TETRATION_HEIGHT, MIN_ARRAY_CAPACITY, MIN_ROMAN_VALUE, MIN_SAFE_INTEGER, type MathConstantsConfig, MaxHeap, MinHeap, NEGATIVE_ONE, NUMBER_UNITS, type NodeStats, NumberTree, type NumericInput, type NumericRange, ONE, type OperationOptions, type OperationStatus, OverflowError, PERFORMANCE, type PerformanceConfig, type PerformanceMetrics, PowerTower, PrecisionError, type Result, RomanNumeralError, RoundingMode, TEN, TWO, TreeError, UnderflowError, VERSION, ValidationError, ZERO, _default$3 as arithmetic, _default$2 as bitwise, calculateRequiredPrecision, checkAdditionOverflow, checkMultiplicationOverflow, checkPowerOverflow, createError, createHypernum, _default as default, equalWithinPrecision, formatBigInt, formatPercentage, formatRange, formatTreeValue, isBasicConfig, isFullConfig, isHypernumError, mergeConfig, normalizeNumberString, normalizePrecision, parseBigIntString, _default$1 as power, round, scaleByPowerOfTen, scaledDivision, toBigInt, validateConfig, validateNonNegative, validatePositive, wrapError };
