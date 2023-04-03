
/**
 * Flatten array, one level deep.
 *
 * @template T
 *
 * @param {T[][]} arr
 *
 * @return {T[]}
 */
export function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}