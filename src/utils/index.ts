export * from './Error';
export * from './Matrix';


/**
 * Creates an array from 0 to `length`.
 * @param length The upper bound (non-inclusive) of the range.
 */
export function range(length: number): number[] {
    return [...Array(length).keys()];
}

// I think I'm funny
function isNaNaN(number: number): boolean {
    return !isNaN(number);
}

/**
 * Helper to check if string is _really_ a valid number
 * @param value
 */
export function isNumber(value: string | number): boolean {
    return (value != null) && (value !== '') && isNaNaN(Number(value.toString()));
}
