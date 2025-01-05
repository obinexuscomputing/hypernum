/**
 * Hypernum - A TypeScript/JavaScript library for large number operations
 * Provides comprehensive tools for handling large numbers and complex mathematical operations
 */

import { HypernumConfig, mergeConfig, validateConfig } from './core';
import { power } from './operations';
import arithmetic from './operations/arithmetic';
import bitwise from './operations/bitwise';
import { AckermannStructure, BigArray, NumberTree, PowerTower } from './structures';

// Core functionality
export * from './core/constants';
export * from './core/errors';

// Data structures
export { AckermannStructure } from './structures/Ackermann';
export { BigArray } from './structures/BigArray';
export { NumberTree } from './structures/NumberTree';
export { MinHeap, MaxHeap,  } from './storage/index';
export type {Comparator} from './storage/index';
export { PowerTower } from './structures/PowerTower';

// Operations
export { default as arithmetic } from './operations/arithmetic';
export { default as bitwise } from './operations/bitwise';
export { default as power } from './operations/power';

// Utility functions
export {
  toBigInt,
  validateNonNegative,
  validatePositive,
  checkAdditionOverflow,
  checkMultiplicationOverflow,
  checkPowerOverflow,
  ValidationError,
  OverflowError
} from './utils/validation';

export {
  formatBigInt,
  parseBigIntString,
  normalizeNumberString,
  formatTreeValue,
  formatRange,
  formatPercentage
} from './utils/formatting';

export {
  RoundingMode,
  round,
  scaleByPowerOfTen,
  scaledDivision,
  normalizePrecision,
  calculateRequiredPrecision,
  equalWithinPrecision
} from './utils/precision';

// Configuration types
export type {
  HypernumConfig,
  BasicConfig,
  FullConfig,
  ArithmeticConfig,
  DataStructuresConfig,
  FormattingConfig,
  PerformanceConfig,
  FeatureFlags
} from './types/core.d.ts';

export {
  DEFAULT_BASIC_CONFIG,
  DEFAULT_FULL_CONFIG,
  validateConfig,
  mergeConfig,
  isFullConfig,
  isBasicConfig
} from './types/common';

// Common types
export type {
  NumericInput,
  Result,
  BaseOptions,
  FormatOptions,
  CacheConfig,
  MathConstantsConfig,
  DebugConfig,
  NumericRange,
  OperationStatus,
  PerformanceMetrics,
  NodeStats,
  OperationOptions
} from './types/common';

/**
 * Library version
 */
export const VERSION = '0.1.0';

/**
 * Creates a new Hypernum instance with custom configuration
 */
export function createHypernum(config?: Partial<HypernumConfig>) {
  const finalConfig = mergeConfig(config || {});
  validateConfig(finalConfig);
  
  return {
    config: finalConfig,
    arithmetic,
    bitwise,
    power,
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
export default createHypernum();