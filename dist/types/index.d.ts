/**
 * Hypernum - A TypeScript/JavaScript library for large number operations
 * Provides comprehensive tools for handling large numbers and complex mathematical operations
 */
import { HypernumConfig } from './core';
import { power } from './operations';
import { MinHeap, MaxHeap } from './storage/Heap';
import { AckermannStructure, BigArray, NumberTree, PowerTower } from './structures';
export * from './core/constants';
export * from './core/errors';
export { AckermannStructure } from './structures/Ackermann';
export { BigArray } from './structures/BigArray';
export { NumberTree } from './structures/NumberTree';
export { MinHeap, MaxHeap, } from './storage/index';
export type { Comparator } from './storage/index';
export { PowerTower } from './structures/PowerTower';
export { default as arithmetic } from './operations/arithmetic';
export { default as bitwise } from './operations/bitwise';
export { default as power } from './operations/power';
export { toBigInt, validateNonNegative, validatePositive, checkAdditionOverflow, checkMultiplicationOverflow, checkPowerOverflow, ValidationError, OverflowError } from './utils/validation';
export { formatBigInt, parseBigIntString, normalizeNumberString, formatTreeValue, formatRange, formatPercentage } from './utils/formatting';
export { RoundingMode, round, scaleByPowerOfTen, scaledDivision, normalizePrecision, calculateRequiredPrecision, equalWithinPrecision } from './utils/precision';
export type { HypernumConfig, BasicConfig, FullConfig, ArithmeticConfig, DataStructuresConfig, FormattingConfig, PerformanceConfig, FeatureFlags } from './types/core';
export type { DEFAULT_BASIC_CONFIG, DEFAULT_FULL_CONFIG, validateConfig, mergeConfig, isFullConfig, isBasicConfig } from './types/common';
export type { NumericInput, Result, BaseOptions, FormatOptions, CacheConfig, MathConstantsConfig, DebugConfig, NumericRange, OperationStatus, PerformanceMetrics, NodeStats, OperationOptions } from './types/common';
/**
 * Library version
 */
export declare const VERSION = "0.1.0";
/**
 * Creates a new Hypernum instance with custom configuration
 */
export declare function createHypernum(config?: Partial<HypernumConfig>): {
    config: HypernumConfig;
    arithmetic: {
        add: typeof import("./operations").add;
        subtract: typeof import("./operations").subtract;
        multiply: typeof import("./operations").multiply;
        divide: typeof import("./operations").divide;
        remainder: typeof import("./operations").remainder;
        power: typeof power;
        sqrt: typeof import("./operations").sqrt;
        abs: typeof import("./operations").abs;
        sign: typeof import("./operations").sign;
        gcd: typeof import("./operations").gcd;
        lcm: typeof import("./operations").lcm;
    };
    bitwise: {
        and: typeof import("./operations").and;
        or: typeof import("./operations").or;
        xor: typeof import("./operations").xor;
        not: typeof import("./operations").not;
        leftShift: typeof import("./operations").leftShift;
        rightShift: typeof import("./operations").rightShift;
        unsignedRightShift: typeof import("./operations").unsignedRightShift;
        rotateLeft: typeof import("./operations").rotateLeft;
        rotateRight: typeof import("./operations").rotateRight;
        popCount: typeof import("./operations").popCount;
        trailingZeros: typeof import("./operations").trailingZeros;
        leadingZeros: typeof import("./operations").leadingZeros;
        getBit: typeof import("./operations").getBit;
        setBit: typeof import("./operations").setBit;
        clearBit: typeof import("./operations").clearBit;
        toggleBit: typeof import("./operations").toggleBit;
    };
    power: typeof power;
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
    config: HypernumConfig;
    arithmetic: {
        add: typeof import("./operations").add;
        subtract: typeof import("./operations").subtract;
        multiply: typeof import("./operations").multiply;
        divide: typeof import("./operations").divide;
        remainder: typeof import("./operations").remainder;
        power: typeof power;
        sqrt: typeof import("./operations").sqrt;
        abs: typeof import("./operations").abs;
        sign: typeof import("./operations").sign;
        gcd: typeof import("./operations").gcd;
        lcm: typeof import("./operations").lcm;
    };
    bitwise: {
        and: typeof import("./operations").and;
        or: typeof import("./operations").or;
        xor: typeof import("./operations").xor;
        not: typeof import("./operations").not;
        leftShift: typeof import("./operations").leftShift;
        rightShift: typeof import("./operations").rightShift;
        unsignedRightShift: typeof import("./operations").unsignedRightShift;
        rotateLeft: typeof import("./operations").rotateLeft;
        rotateRight: typeof import("./operations").rotateRight;
        popCount: typeof import("./operations").popCount;
        trailingZeros: typeof import("./operations").trailingZeros;
        leadingZeros: typeof import("./operations").leadingZeros;
        getBit: typeof import("./operations").getBit;
        setBit: typeof import("./operations").setBit;
        clearBit: typeof import("./operations").clearBit;
        toggleBit: typeof import("./operations").toggleBit;
    };
    power: typeof power;
    AckermannStructure: typeof AckermannStructure;
    BigArray: typeof BigArray;
    NumberTree: typeof NumberTree;
    MinHeap: typeof MinHeap;
    MaxHeap: typeof MaxHeap;
    PowerTower: typeof PowerTower;
};
export default _default;
//# sourceMappingURL=index.d.ts.map