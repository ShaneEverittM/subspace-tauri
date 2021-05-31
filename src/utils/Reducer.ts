import { Array2d, make2d } from './Matrix';


export type ExtendAction<T> = { type: 'extend', newSize: number, filler: T }

/**
 * Represents the action applied to matrices held in state.
 *
 * @typeParam The value the matrix holds.
 */
export type CellUpdateAction<T> = { type: 'cell-update', row: number, col: number, newVal: T }

export type Action<T> = ExtendAction<T> | CellUpdateAction<T>

/**
 * Creates a specialized reducer function for `useReducer`.
 *
 * @typeParam The type of the element of the Matrix being edited.
 */
export function makeReducer<T>(): (previous: Array2d<T>, action: Action<T>) => Array2d<T> {
    return function (previous: Array2d<T>, action: Action<T>): Array2d<T> {
        if (action.type === 'cell-update') {
            const {row, col, newVal} = action;
            previous[row][col] = newVal;
            return previous;
        } else {
            let {newSize, filler} = action;
            return make2d(newSize, filler);
        }
    };
}