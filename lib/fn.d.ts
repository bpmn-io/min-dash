type AnyFunction = (...args: any[]) => any;

type WrappedFunction<T extends AnyFunction> = (...args: Parameters<T>) => void;

export type DebouncedFunction<T extends AnyFunction> = {
  (...args: Parameters<T>): void;
  flush: () => void;
  cancel: () => void;
};

/**
 * Debounce fn, calling it only once if
 * the given time elapsed between calls.
 *
 * @param fn
 * @param timeout
 *
 * @return debounced function
 */
export function debounce<T extends AnyFunction>(fn: T, timeout: number): DebouncedFunction<T>;

/**
 * Throttle fn, calling at most once
 * in the given interval.
 *
 * @param fn
 * @param interval
 *
 * @return throttled function
 */
export function throttle<T extends AnyFunction>(fn: T, interval: number): WrappedFunction<T>;

/**
 * Bind function against target <this>.
 *
 * @param fn
 * @param target
 *
 * @return bound function
 */
export function bind<T extends Function>(fn: T, target: object): T;