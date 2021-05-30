import { Array2d } from './Matrix';

/**
 * Represents the action applied to matrices held in state.
 *
 * @typeParam The value the matrix holds.
 */
export type Action<T> = { row: number, col: number, newVal: T }

/**
 * Creates a specialized reducer function for `useReducer`.
 *
 * @typeParam The type of the element of the Matrix being edited.
 */
export function makeReducer<T>(): (previous: Array2d<T>, action: Action<T>) => Array2d<T> {
    return function (previous: Array2d<T>, action: Action<T>): Array2d<T> {
        const {row, col, newVal} = action;
        previous[row][col] = newVal;
        return previous;
    };
}