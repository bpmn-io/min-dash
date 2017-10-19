export function isArray(obj) {
  return !isUndefined(obj.length);
}


export function isUndefined(obj) {
  return obj === null || obj === undefined;
}


/**
 * Ensure collection is an array.
 *
 * @param {Object} obj
 */
export function ensureArray(obj) {

  // sufficient in most cases
  if (isUndefined(obj.length)) {
    throw new Error('Objects not supported');
  }
}