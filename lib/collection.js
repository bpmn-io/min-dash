import {
  isUndefined,
  ensureArray,
  isArray
} from './lang';


/**
 * Find element in collection.
 *
 * @param  {Array|Object} collection
 * @param  {Function} matcher
 *
 * @return {Object}
 */
export function find(collection, matcher) {

  return forEach(collection, function(val, key) {
    if (matcher(val, key)) {
      return val;
    }
  });

}


/**
 * Find element in collection.
 *
 * @param  {Array|Object} collection
 * @param  {Function} matcher
 *
 * @return {Array} result
 */
export function filter(collection, matcher) {

  let result = [];

  forEach(collection, function(val, key) {
    if (matcher(val, key)) {
      result.push(val);
    }
  });

  return result;
}

function noop(arg) {
  return arg;
}

function toNum(arg) {
  return Number(arg);
}

/**
 * Iterate over collection; returning something
 * (non-undefined) will stop iteration.
 *
 * @param  {Array|Object} collection
 * @param  {Function} iterator
 *
 * @return {Object} return result that stopped the iteration
 */
export function forEach(collection, iterator) {

  if (isUndefined(collection)) {
    return;
  }

  const convertKey = isArray(collection) ? toNum : noop;

  for (let key in collection) {

    if (collection.hasOwnProperty(key)) {
      let val = collection[key];

      let result = iterator(val, convertKey(key));

      if (result !== undefined) {
        return result;
      }
    }
  }
}

/**
 * Return collection without element.
 *
 * @param  {Array} arr
 * @param  {Function} matcher
 *
 * @return {Array}
 */
export function without(arr, matcher) {

  if (isUndefined(arr)) {
    return;
  }

  ensureArray(arr);

  if (typeof matcher !== 'function') {
    let obj = matcher;

    matcher = function(e) {
      return e == obj;
    };
  }

  return arr.filter(function(el, idx) {
    return !matcher(el, idx);
  });

}


/**
 * Create an object pattern matcher.
 *
 * @example
 *
 * const matcher = createMatcher({ id: 1 });
 *
 * var element = find(elements, matcher);
 *
 * @param  {Object} pattern
 *
 * @return {Function} matcherFn
 */
export function createMatcher(pattern) {

  return function(el) {

    return !find(pattern, function(val, key) {
      return el[key] !== val;
    });

  };
}