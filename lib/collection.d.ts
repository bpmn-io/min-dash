
export type Matcher<T> =
  ((e: T) => boolean) |
  ((e: T, idx: number) => boolean) |
  ((e: T, key: string) => boolean) |
  any;

export type Extractor<T, U=T[keyof T]> = ((e: T) => U) | string | number;

export type ArrayCollection<T> = Array<T>;
export type StringKeyValueCollection<T> = { [key: string]: T };
export type NumberKeyValueCollection<T> = { [key: number]: T };
export type KeyValueCollection<T> = StringKeyValueCollection<T> | NumberKeyValueCollection<T>;
export type Collection<T> = KeyValueCollection<T> | ArrayCollection<T> | null | undefined;

/**
 * Find element in collection.
 *
 * @param collection
 * @param matcher
 *
 * @return
 */
export function find<T>(collection: Collection<T>, matcher: Matcher<T>): T | undefined;

/**
 * Find element index in collection.
 *
 * @param collection
 * @param matcher
 *
 * @return
 */
export function findIndex<T>(collection: Collection<T>, matcher: Matcher<T>): number | undefined;

/**
 * Find element in collection.
 *
 * @param collection
 * @param matcher
 *
 * @return result
 */
export function filter<T>(collection: Collection<T>, matcher: Matcher<T>): T[];

/**
 * Iterate over collection; returning something
 * (non-undefined) will stop iteration.
 *
 * @param collection
 * @param iterator
 *
 * @return return result that stopped the iteration
 */
export function forEach<T>(collection: Collection<T>, iterator: (item: T, convertKey: any /* TODO */) => boolean | void): T;

/**
 * Return collection without element.
 *
 * @param arr
 * @param matcher
 *
 * @return
 */
export function without<T>(arr: T[], matcher: Matcher<T>): T[];

/**
 * Reduce collection, returning a single result.
 *
 * @param collection
 * @param iterator
 * @param result
 *
 * @return result returned from last iterator
 */
export function reduce<T, V>(collection: Collection<T>, iterator: (result: V, entry: T, index: any) => V, result: V): V;

/**
 * Return true if every element in the collection
 * matches the criteria.
 *
 * @param collection
 * @param matcher
 *
 * @return
 */
export function every<T>(collection: Collection<T>, matcher: Matcher<T>): boolean;

/**
 * Return true if some elements in the collection
 * match the criteria.
 *
 * @param collection
 * @param matcher
 *
 * @return
 */
export function some<T>(collection: Collection<T>, matcher: Matcher<T>): boolean;

/**
 * Transform a collection into another collection
 * by piping each member through the given fn.
 *
 * @param collection
 * @param fn
 *
 * @return transformed collection
 */
export function map<T, U>(collection: Collection<T>, fn: (value: T, key: number) => U): U[];

/**
 * Get the collections keys.
 *
 * @param collection
 *
 * @return
 */
export function keys<T>(collection: Collection<T>): T extends Array<any> ? number[] : (keyof T)[];

/**
 * Shorthand for `keys(o).length`.
 *
 * @param collection
 *
 * @return
 */
export function size<T>(collection: Collection<T>): number;

/**
 * Get the values in the collection.
 *
 * @param collection
 *
 * @return
 */
export function values<T>(collection: Collection<T>): T[];

/**
 * Group collection members by attribute.
 *
 * @param collection
 * @param extractor
 *
 * @return map with { attrValue => [ a, b, c ] }
 */
export function groupBy<T>(collection: Collection<T>, extractor: Extractor<T>, grouped?: any): { [attrValue: string]: any[] };

export function uniqueBy<T>(extractor: Extractor<T>, ...collections: Collection<T>[]): T[];
export function unionBy<T>(extractor: Extractor<T>, ...collections: Collection<T>[]): T[];

/**
 * Sort collection by criteria.
 *
 * @param collection
 * @param extractor
 *
 * @return
 */
export function sortBy<T>(collection: Collection<T>, extractor: Extractor<T, number | string>): T[];

/**
 * Create an object pattern matcher.
 *
 * @example
 *
 * const matcher = matchPattern({ id: 1 });
 *
 * let element = find(elements, matcher);
 *
 * @param pattern
 *
 * @return matcherFn
 */
export function matchPattern<T>(pattern: T): (e: any) => boolean;
