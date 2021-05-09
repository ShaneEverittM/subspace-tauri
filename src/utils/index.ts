export * from './Error';

export function range(length: number): number[] {
    return [...Array(length).keys()];
}