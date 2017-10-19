
export function isUndefined(obj) {
  return obj === null || obj === undefined;
}

export function isArray(obj) {
  return !isUndefined(obj.length);
}

export function isObject(obj) {
  return typeof obj === 'object';
}

export function isNumber(obj) {
  return typeof obj === 'number';
}

export function isFunction(obj) {
  return typeof obj === 'function';
}

export function isString(obj) {
  return typeof obj === 'string';
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