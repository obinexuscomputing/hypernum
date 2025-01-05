/**
 * Hypernum - A TypeScript/JavaScript library for large number operations
 * Provides comprehensive tools for handling large numbers and complex mathematical operations
 */

import { HypernumConfig, mergeConfig, validateConfig } from './core';
import { Hypernum } from './core/hypernum';

// Package version
const VERSION: string = '0.1.0';

// Core exports
export { Hypernum } from './core/hypernum';
export * from './core/constants';
export * from './core/common';
export * from './core/config';

// Re-export errors with explicit names to avoid conflicts
export { 
  HypernumError,
  ComputationLimitError,
  DataStructureError,
  DivisionByZeroError,
  FormatError,
  HeapPropertyError,
  IndexError,
  PrecisionError,
  RomanNumeralError,
  TreeError,
  UnderflowError
} from './core/errors';

// Data structures with explicit exports
export { AckermannStructure } from './structures/Ackermann';
export { BigArray } from './structures/BigArray';
export { NumberTree } from './structures/NumberTree';
export { PowerTower } from './structures/PowerTower';
export { MinHeap, MaxHeap } from './storage/Heap';
export type { Comparator } from './storage/Heap';

// Operations with explicit exports to avoid conflicts
export {
  add,
  subtract,
  multiply,
  divide,
  remainder,
  abs,
  sign,
  gcd,
  lcm
} from './operations/arithmetic';

export {
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
} from './operations/bitwise';

export {
  compare,
  equals,
  lessThan,
  lessThanOrEqual,
  greaterThan,
  greaterThanOrEqual,
  between,
  max,
  min,
  clamp,
  allEqual,
  isAscending,
  isDescending,
  createComparator
} from './operations/comparison';

export {
  toBinary,
  toOctal,
  toHexadecimal,
  toBase,
  fromBase,
  toFraction,
  fromFraction,
  fromScientific,
  toScientific,
  fromRoman,
  toRoman
} from './operations/conversion';

export {
  factorial,
  binomial,
  subfactorial,
  risingFactorial,
  fallingFactorial,
  multiFactorial,
  primorial
} from './operations/factorial';

export {
  power,
  sqrt,
  nthRoot,
  tetration,
  superRoot
} from './operations/power';

// Utils with explicit exports
export {
  toBigInt,
  validateNonNegative,
  validatePositive,
  checkAdditionOverflow,
  checkMultiplicationOverflow,
  checkPowerOverflow
} from './utils/validation';

export {
  formatBigInt,
  parseBigIntString,
  normalizeNumberString
} from './utils/formatting';

export {
  RoundingMode,
  round,
  scaleByPowerOfTen,
  scaledDivision,
  normalizePrecision
} from './utils/precision';

/**
 * Creates a new Hypernum instance with custom configuration
 */
export function createHypernum(config?: Partial<HypernumConfig>): Hypernum {
  const mergedConfig = mergeConfig(config || {});
  validateConfig(mergedConfig);
  
  // Extract the basic config properties based on whether it's a BasicConfig or FullConfig
  const instanceConfig = {
    precision: 'arithmetic' in mergedConfig 
      ? mergedConfig.arithmetic.defaultPrecision 
      : mergedConfig.precision,
    roundingMode: 'arithmetic' in mergedConfig 
      ? mergedConfig.arithmetic.defaultRoundingMode 
      : mergedConfig.roundingMode,
    checkOverflow: 'arithmetic' in mergedConfig 
      ? mergedConfig.arithmetic.checkOverflow 
      : mergedConfig.checkOverflow,
    maxSteps: 'arithmetic' in mergedConfig 
      ? mergedConfig.arithmetic.maxComputationSteps 
      : mergedConfig.maxSteps,
    debug: typeof mergedConfig.debug === 'object' 
      ? mergedConfig.debug.verbose 
      : !!mergedConfig.debug
  };
  
  return new Hypernum(instanceConfig);
}

// Default instance
export const defaultHypernum = createHypernum();

// Export version
export { VERSION };

// Default export
export default Hypernum;