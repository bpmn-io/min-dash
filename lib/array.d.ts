import { ArrayCollection } from './collection.js';

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

/**
 * Flatten array, one level deep.
 *
 * @param arr
 *
 * @return
 */
export function flatten<T>(arr: ArrayCollection<T> | null | undefined): Flatten<T>[];