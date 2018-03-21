
/**
 * Flatten array, one level deep.
 *
 * @param {Array<?>} arr
 *
 * @return {Array<?>}
 */
export function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}