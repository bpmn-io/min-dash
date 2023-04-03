export type DebouncedFunction = {
  (...args: any[]): any;
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
export function debounce(fn: Function, timeout: number): DebouncedFunction;

/**
 * Throttle fn, calling at most once
 * in the given interval.
 *
 * @param fn
 * @param interval
 *
 * @return throttled function
 */
export function throttle(fn: Function, interval: number): (...args: any[]) => void;

/**
 * Bind function against target <this>.
 *
 * @param fn
 * @param target
 *
 * @return bound function
 */
export function bind<T extends Function>(fn: T, target: object): T;