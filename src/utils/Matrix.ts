import { Err, Ok, Option, Result } from 'ts-results';

/**
 * Helper for creating a two dimensional `Array<Array<T>>` with a given value for all elements.
 *
 * Creates a 'square' 2d array
 *
 * @param size The number of and size of each `Array<T>`.
 * @param init An optional initial value for all elements.
 */
export function make2d<T>(size: number, init?: T): Array2d<T> {
    if (init) {
        return [...Array(size)].map((_) => Array<T>(size).fill(init));
    } else {
        return [...Array(size)].map((_) => Array<T>(size));
    }
}

export type Array2d<T> = Array<Array<T>>

/**
 * Analog type for basis::Matrix<T>
 */
export class Matrix<T> {
    elements: Array<Array<T>>;

    constructor(elements: Array<Array<T>>) {
        this.elements = elements;
    }
}

/**
 * Takes the internal representation we use for React state and transforms it into the argument object
 * expected by Tauri, with error checking.
 *
 * @param left The values for the left matrix
 * @param right The values for the right matrix
 */
export function packArguments(left: Array<Array<Option<number>>>, right: Array<Array<Option<number>>>):
    Result<{ m1: Matrix<number>, m2: Matrix<number> }, 'invalid input'> {

    let m1: Matrix<number>;
    let m2: Matrix<number>;

    if (left.flat().every(e => e.some)) {
        m1 = new Matrix(left.map(row => row.map(e => e.unwrap())));
    } else {
        return Err('invalid input');
    }

    if (right.flat().every(e => e.some)) {
        m2 = new Matrix(right.map(row => row.map(e => e.unwrap())));
    } else {
        return Err('invalid input');
    }

    return Ok({m1, m2});
}