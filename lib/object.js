import { forEach } from './collection';


/**
 * Convenience wrapper for `Object.assign`.
 *
 * @param {Object} target
 * @param {...Object} others
 *
 * @return {Object} the target
 */
export function assign(target, ...others) {
  return Object.assign(target, ...others);
}

/**
 * Pick given properties from the target object.
 *
 * @param {Object} target
 * @param {Collection} properties
 *
 * @return {Object} target
 */
export function pick(target, properties) {

  var result = {};

  var obj = Object(target);

  forEach(properties, function(prop) {

    if (prop in obj) {
      result[prop] = target[prop];
    }
  });

  return result;
}