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