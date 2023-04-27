type PropertyName = string | number | symbol;

/**
 * Copy the values of all of the enumerable own properties from one or more source objects to a
 * target object. Returns the target object.
 *
 * @param target The target object to copy to.
 * @param source The source object from which to copy properties.
 */
export function assign<T, U>(target: T, source: U): T & U;

/**
 * Copy the values of all of the enumerable own properties from one or more source objects to a
 * target object. Returns the target object.
 *
 * @param target The target object to copy to.
 * @param source1 The first source object from which to copy properties.
 * @param source2 The second source object from which to copy properties.
 */
export function assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;

/**
 * Copy the values of all of the enumerable own properties from one or more source objects to a
 * target object. Returns the target object.
 *
 * @param target The target object to copy to.
 * @param source1 The first source object from which to copy properties.
 * @param source2 The second source object from which to copy properties.
 * @param source3 The third source object from which to copy properties.
 */
export function assign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;

/**
 * Copy the values of all of the enumerable own properties from one or more source objects to a
 * target object. Returns the target object.
 *
 * @param target The target object to copy to.
 * @param sources One or more source objects from which to copy properties
 */
export function assign<T>(target: T, ...sources: any[]): T;

/**
 * Gets a nested property of a given object, with an optional default value.
 *
 * @param target The target of the get operation.
 * @param path The path to the nested value.
 * @param defaultValue The result to return if the property does not exist.
 *
 * @return any
 */
export function get(target: any, path: (string|number)[], defaultValue?: any): any;

/**
 * Sets a nested property of a given object to the specified value.
 *
 * This mutates the object and returns it.
 *
 * @param target The target of the set operation.
 * @param path The path to the nested value.
 * @param value The value to set.
 *
 * @return the element
 */
export function set<T>(target: T, path: PropertyName[], value: any): T;

/**
 * Pick properties from the given target.
 *
 * @param target
 * @param properties
 *
 * @return
 */
export function pick<T, V extends keyof T>(target: T, properties: Array<V>): Pick<T, V>;

/**
 * Pick properties from the given target.
 *
 * @param target
 * @param properties
 *
 * @return
 */
export function pick<T, V extends PropertyName[]>(target: T, properties: V): Partial<T>;

/**
 * Pick all target properties, excluding the given ones.
 *
 * @param target
 * @param properties
 *
 * @return target
 */
export function omit<T, V extends keyof T>(target: T, properties: V): Omit<T, V>;

/**
 * Pick all target properties, excluding the given ones.
 *
 * @param target
 * @param properties
 *
 * @return target
 */
export function omit<T, V extends PropertyName[]>(target: T, properties: V): Pick<T, Exclude<keyof T, V[number]>>;

/**
 * Copy the values of all of the enumerable own properties from one or more source objects to a
 * target object. Returns the target object.
 * @param target The target object to copy to.
 * @param sources One or more source objects from which to copy properties
 */
export function merge(target: object, ...sources: any[]): any;