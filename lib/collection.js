import {
  isUndefined,
  ensureArray,
  isArray,
  isString
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


export function reduce(collection, iterator, result) {

  forEach(collection, function(value, idx) {
    result = iterator(result, value, idx);
  });

  return result;
}


/**
 * Return true if every element in the collection
 * matches the criteria.
 *
 * @param  {Object|Array} collection
 * @param  {Function} matcher
 *
 * @return {Boolean}
 */
export function every(collection, matcher) {

  var matches = forEach(collection, function(val, key) {
    if (!matcher(val, key)) {
      return false;
    }
  });

  return isUndefined(matches) ? true : false;
}


/**
 * Return true if some elements in the collection
 * match the criteria.
 *
 * @param  {Object|Array} collection
 * @param  {Function} matcher
 *
 * @return {Boolean}
 */
export function some(collection, matcher) {

  var matches = forEach(collection, function(val, key) {
    if (matcher(val, key)) {
      return true;
    }
  });

  return isUndefined(matches) ? false : true;
}


/**
 * Group collection members by attribute.
 *
 * @param  {Object|Array} collection
 * @param  {String} attr
 *
 * @return {Object} map with { attrValue => [ a, b, c ] }
 */
export function groupBy(collection, attr, grouped = {}) {

  forEach(collection, function(val) {
    var discriminator = val[attr] || '_';

    var group = grouped[discriminator];

    if (!group) {
      group = grouped[discriminator] = [];
    }

    group.push(val);
  });

  return grouped;
}


export function uniqueBy(attr, ...collections) {

  var grouped = {};

  forEach(collections, (c) => groupBy(c, attr, grouped));

  return map(grouped, function(val, key) {
    return val[0];
  });
}


export function unionBy(attr, ...collections) {
  return uniqueBy(attr, ...collections);
}


export function map(collection, fn) {

  var result = [];

  forEach(collection, function(val, key) {
    result.push(fn(val, key));
  });

  return result;
}


/**
 * Sort collection by criteria.
 *
 * @param  {Object|Array} collection
 * @param  {String|Function} criteria
 *
 * @return {Array}
 */
export function sortBy(collection, criteria) {

  var computeCriteria = isString(criteria) ? criteria : function(obj) {
    return obj[criteria];
  };

  var sorted = [];

  forEach(collection, function(value) {
    var disc = computeCriteria(value);

    var entry = {
      d: disc,
      v: value
    };

    for (var idx = 0; idx < sorted.length; idx++) {
      let { d } = sorted[idx];

      if (d > disc) {
        sorted.splice(idx, 0, entry);
        break;
      }
    }
  });

  return map(sorted, (e) => e.v);
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