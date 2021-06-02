import { Array2d, make2d } from './Matrix';


/**
 * Resizes the matrix, filling with a  given value
 */
export type ResizeAction<T> = { type: 'resize', newSize: number, filler: T }


/**
 * Updates an individual cell to a new value
 */
export type CellUpdateAction<T> = { type: 'cell-update', row: number, col: number, newVal: T }

/**
 * Represents the possible actions that can be applied to matrices held in state.
 */
export type Action<T> = ResizeAction<T> | CellUpdateAction<T>

/**
 * Creates a specialized reducer function for the `useReducer` hook.
 */
export function makeReducer<T>(): (previous: Array2d<T>, action: Action<T>) => Array2d<T> {
    return function (previous: Array2d<T>, action: Action<T>): Array2d<T> {
        switch (action.type) {
            case 'resize':
                let {newSize, filler} = action;
                return make2d(newSize, filler);
            case 'cell-update':
                const {row, col, newVal} = action;
                previous[row][col] = newVal;
                return previous;
        }
    };
}