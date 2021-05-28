export * from './Error';

/**
 * Creates an array from 0 to `length`.
 * @param length The upper bound (non-inclusive) of the range.
 */
export function range(length: number): number[] {
    return [...Array(length).keys()];
}

/**
 * Creates a two dimensional `Array<Array<T>>` with a given value for all elements.
 *
 * @param size The number of and size of each `Array<T>`.
 * @param init An optional initial value for all elements.
 */
export function make2d<T>(size: number, init: T): Vec2d<T> {
    return [...Array(size)].map((_) => Array<T>(size).fill(init));
}

/**
 * Represents a type that might not be there in in situation where the `?` operator is not valid.
 *
 * @typeParam The type that might be there.
 */
export type Maybe<T> = T | undefined

export type Vec2d<T> = Array<Array<T>>

export function isNumber(value: string | number): boolean {
    return ((value != null) &&
        (value !== '') &&
        !isNaN(Number(value.toString())));
}

export class Matrix<T> {
    elements: Array<Array<T>>;

    constructor(elements: Array<Array<T>>) {
        this.elements = elements;
    }
}
