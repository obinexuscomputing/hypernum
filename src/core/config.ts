/**
 * Configuration type definitions for Hypernum library
 * Defines all configuration options and their default values
 */

import { RoundingMode } from '../utils/precision';
import { 
  Comparator,
  FormatOptions,
  DebugConfig,
  CacheConfig,
  MathConstantsConfig
} from '../types/common';

/**
 * Global library configuration
 */
export interface HypernumConfig {
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
 * Configuration for arithmetic operations
 */
export interface ArithmeticConfig {
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
export interface DataStructuresConfig {
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
export interface FormattingConfig extends FormatOptions {
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
export interface PerformanceConfig {
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
export interface FeatureFlags {
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
 * Default configuration values
 */
export const DEFAULT_CONFIG: HypernumConfig = {
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
 * Type guard to check if an object is a valid HypernumConfig
 */
export function isValidConfig(config: unknown): config is HypernumConfig {
  if (typeof config !== 'object' || config === null) {
    return false;
  }

  const requiredKeys: Array<keyof HypernumConfig> = [
    'arithmetic',
    'dataStructures',
    'formatting',
    'performance',
    'debug',
    'features'
  ];

  return requiredKeys.every(key => key in config);
}

/**
 * Merges custom configuration with defaults
 */
export function mergeConfig(custom: Partial<HypernumConfig>): HypernumConfig {
  return {
    ...DEFAULT_CONFIG,
    ...custom,
    arithmetic: { ...DEFAULT_CONFIG.arithmetic, ...custom.arithmetic },
    dataStructures: { ...DEFAULT_CONFIG.dataStructures, ...custom.dataStructures },
    formatting: { ...DEFAULT_CONFIG.formatting, ...custom.formatting },
    performance: { ...DEFAULT_CONFIG.performance, ...custom.performance },
    debug: { ...DEFAULT_CONFIG.debug, ...custom.debug },
    features: { ...DEFAULT_CONFIG.features, ...custom.features }
  };
}

/**
 * Validates configuration values
 * @throws {ValidationError} if configuration is invalid
 */
export function validateConfig(config: HypernumConfig): void {
  // Validate arithmetic config
  if (config.arithmetic.defaultPrecision < 0) {
    throw new Error('Default precision cannot be negative');
  }
  if (config.arithmetic.maxComputationSteps <= 0) {
    throw new Error('Max computation steps must be positive');
  }

  // Validate data structures config
  if (config.dataStructures.array.initialCapacity <= 0) {
    throw new Error('Initial capacity must be positive');
  }
  if (config.dataStructures.array.growthFactor <= 1) {
    throw new Error('Growth factor must be greater than 1');
  }

  // Validate formatting config
  if (config.formatting.groupSize !== undefined && config.formatting.groupSize <= 0) {
    throw new Error('Group size must be positive');
  }

  // Validate performance config
  if (config.performance.samplingRate < 0 || config.performance.samplingRate > 1) {
    throw new Error('Sampling rate must be between 0 and 1');
  }
}