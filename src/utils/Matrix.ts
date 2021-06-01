import { Err, Ok, Option, Result } from 'ts-results';
import { invoke } from '@tauri-apps/api/tauri';
import { handleError } from './Error';
import React from 'react';
import { Action } from './Reducer';

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

export type Cell = Option<number>;

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

type BinaryArgs = {
    type: 'binary'
    m1: Cell[][]
    m2: Cell[][]
}

type ScalarArgs = {
    type: 'scalar'
    m: Cell[][]
    x: Cell
}

type UnaryArgs = {
    type: 'unary'
    m: Cell[][]
}

type PackedBinaryArguments = {
    type: 'binary'
    m1: Matrix<number>
    m2: Matrix<number>
}

type PackedUnaryArguments = {
    type: 'unary'
    m: Matrix<number>
}

type PackedScalarArguments = {
    type: 'scalar'
    m: Matrix<number>
    x: number
}

export type ApiArguments = BinaryArgs | UnaryArgs | ScalarArgs
export type PackedArguments = PackedBinaryArguments | PackedUnaryArguments | PackedScalarArguments;
export type ApiPackResult = Result<PackedArguments, 'invalid input'>

type MatrixResponse = {
    type: 'matrix',
    mat: Matrix<number>,
}

type NumberResponse = {
    type: 'number',
    num: number,
}
export type ApiResult = MatrixResponse | NumberResponse


export function packArguments(args: ApiArguments): ApiPackResult {
    switch (args.type) {
        case 'unary':
            return packUnaryArguments(args.m);
        case 'binary':
            return packBinaryArguments(args.m1, args.m2);
        case 'scalar':
            return packScalarArguments(args.m, args.x);

    }
}


export function packUnaryArguments(values: Cell[][]): ApiPackResult {
    if (values.flat().every(e => e.some)) {
        return Ok({type: 'unary', m: new Matrix(values.map(row => row.map(e => e.unwrap())))});
    } else {
        return Err('invalid input');
    }

}

/**
 * Takes the internal representation we use for React state and transforms it into the argument object
 * expected by Tauri, with error checking.
 *
 * @param left The values for the left matrix
 * @param right The values for the right matrix
 */
export function packBinaryArguments(left: Cell[][], right: Cell[][]): ApiPackResult {

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

    return Ok({type: 'binary', m1, m2});
}

export function packScalarArguments(left: Cell[][], right: Cell): ApiPackResult {

    let m: Matrix<number>;
    let x: number;

    if (left.flat().every(e => e.some)) {
        m = new Matrix(left.map(row => row.map(e => e.unwrap())));
    } else {
        return Err('invalid input');
    }

    if (right.some) {
        x = right.unwrap();
    } else {
        return Err('invalid input');
    }

    return Ok({type: 'scalar', m, x});
}

export function dispatchByName(
    funcName: string,
    args: PackedArguments,
    callBack: (res: ApiResult) => void,
) {
    invoke<Matrix<number> | number>(funcName, args)
        .then((m) => {
            if (typeof m === 'number') {
                callBack({type: 'number', num: m});
            } else {
                callBack({type: 'matrix', mat: m});
            }
        })
        .catch(handleError);
}

export type ScalarType = {
    type: 'scalar'
    value: Cell
    setter: React.Dispatch<React.SetStateAction<Cell>>
}
export type MatrixType = {
    type: 'matrix'
    value: Cell[][]
    setter: React.Dispatch<Action<Cell>>
}