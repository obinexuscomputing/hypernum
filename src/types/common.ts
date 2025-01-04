/**
 * Common type definitions for Hypernum library
 * Contains core types used throughout the library's modules
 */

import { RoundingMode } from '../utils/precision';

/**
 * Valid input types for numeric values
 */
export type NumericInput = bigint | string | number;

/**
 * Result type for operations that may fail
 */
export type Result<T> = {
  success: boolean;
  value?: T;
  error?: string;
};

/**
 * Base options interface for operations
 */
export interface BaseOptions {
  /** Decimal precision for operations */
  precision?: number;
  /** Rounding mode for decimal operations */
  roundingMode?: RoundingMode;
  /** Whether to check for overflow */
  checkOverflow?: boolean;
  /** Maximum allowed computation steps */
  maxSteps?: number;
}

/**
 * Comparison function type
 * Returns:
 * -1: a < b
 *  0: a = b
 *  1: a > b
 */
export type Comparator<T> = (a: T, b: T) => -1 | 0 | 1;

/**
 * Node statistics for tree operations
 */
export interface NodeStats {
  height: number;
  size: number;
  sum: bigint;
  min: bigint;
  max: bigint;
}

/**
 * Configuration for traversal operations
 */
export interface TraversalConfig {
  /** Include node statistics in traversal */
  includeStats?: boolean;
  /** Skip processing subtrees */
  skipSubtrees?: boolean;
  /** Maximum depth to traverse */
  maxDepth?: number;
}

/**
 * Options for number formatting
 */
export interface FormatOptions extends BaseOptions {
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
 * Data structure initialization options
 */
export interface DataStructureOptions<T> {
  /** Initial capacity */
  initialCapacity?: number;
  /** Growth factor for dynamic resizing */
  growthFactor?: number;
  /** Custom comparison function */
  comparator?: Comparator<T>;
  /** Enable caching of computed values */
  enableCache?: boolean;
  /** Maximum cache size */
  maxCacheSize?: number;
}

/**
 * Operation performance metrics
 */
export interface OperationMetrics {
  /** Operation execution time in milliseconds */
  executionTime: number;
  /** Number of computation steps performed */
  steps: number;
  /** Peak memory usage in bytes */
  memoryUsage: number;
  /** Whether operation hit computation limits */
  hitLimits: boolean;
}

/**
 * Cache configuration
 */
export interface CacheConfig {
  /** Maximum number of entries */
  maxSize: number;
  /** Time-to-live in milliseconds */
  ttl?: number;
  /** Eviction policy */
  evictionPolicy?: 'LRU' | 'LFU' | 'FIFO';
}

/**
 * Numeric range specification
 */
export interface NumericRange {
  /** Start of range (inclusive) */
  start: bigint;
  /** End of range (inclusive) */
  end: bigint;
  /** Step size for iteration */
  step?: bigint;
}

/**
 * Progress callback for long-running operations
 */
export type ProgressCallback = (progress: {
  /** Percentage complete (0-100) */
  percentage: number;
  /** Current operation phase */
  phase: string;
  /** Estimated time remaining in milliseconds */
  estimatedTimeRemaining?: number;
}) => void;

/**
 * Operation status type
 */
export type OperationStatus = 'pending' | 'running' | 'completed' | 'failed';

/**
 * Supported number bases for conversion
 */
export type NumberBase = 2 | 8 | 10 | 16;

/**
 * Mathematical constants configuration
 */
export interface MathConstantsConfig {
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
export interface DebugConfig {
  /** Enable detailed logging */
  verbose: boolean;
  /** Track operation performance */
  trackPerformance?: boolean;
  /** Log level */
  logLevel?: 'error' | 'warn' | 'info' | 'debug';
  /** Custom logger function */
  logger?: (message: string, level: string) => void;
}