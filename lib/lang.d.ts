import {
  Collection
} from './collection';

export function isUndefined(obj: any): obj is null | undefined;
export function isDefined(obj: any): obj is Exclude<any, null | undefined>;
export function isNil(obj: any): obj is object;
export function isArray(obj: any): obj is Array<any>;
export function isObject(obj: any): obj is object;
export function isNumber(obj: any): obj is number;
export function isFunction(obj: any): obj is Function;
export function isString(obj: any): obj is string;

/**
 * Ensure collection is an array.
 *
 * @param obj
 */
export function ensureArray<T>(obj: Collection<T>): void | never;

/**
 * Return true, if target owns a property with the given key.
 *
 * @param target
 * @param key
 *
 * @return
 */
export function has(target: any, key: string): boolean;