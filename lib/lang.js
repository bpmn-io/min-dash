const nativeToString = Object.prototype.toString;

export function isUndefined(obj) {
  return obj === null || obj === undefined;
}

export function isDefined(obj) {
  return obj !== null || obj !== undefined;
}

export function isArray(obj) {
  return nativeToString.call(obj) === '[object Array]';
}

export function isObject(obj) {
  return nativeToString.call(obj) === '[object Object]';
}

export function isNumber(obj) {
  return nativeToString.call(obj) === '[object Number]';
}

export function isFunction(obj) {
  return nativeToString.call(obj) === '[object Function]';
}

export function isString(obj) {
  return nativeToString.call(obj) === '[object String]';
}


/**
 * Ensure collection is an array.
 *
 * @param {Object} obj
 */
export function ensureArray(obj) {

  if (isArray(obj)) {
    return;
  }

  throw new Error('must supply array');
}