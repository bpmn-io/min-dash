const slice = Array.prototype.slice;

/**
 * Debounce fn, calling it only once if
 * the given time elapsed between calls.
 *
 * @param  {Function} fn
 * @param  {Number} timeout
 *
 * @return {Function} debounced function
 */
export function debounce(fn, timeout) {

  var timer;

  return function() {

    var args = slice.call(arguments);

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function() {
      fn(...args);
    }, timeout);
  };

}

/**
 * Throttle fn, calling at most once
 * in the given interval.
 *
 * @param  {Function} fn
 * @param  {Number} interval
 *
 * @return {Function} throttled function
 */
export function throttle(fn, interval) {

  let throttling = false;

  return function(...args) {

    if (throttling) {
      return;
    }

    fn(...args);
    throttling = true;

    setTimeout(() => {
      throttling = false;
    }, interval);
  };
}

/**
 * Bind function against target <this>.
 *
 * @param  {Function} fn
 * @param  {Object}   target
 *
 * @return {Function} bound function
 */
export function bind(fn, target) {
  return fn.bind(target);
}