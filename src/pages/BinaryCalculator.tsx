import React, { useReducer, useState } from 'react';

import { MatrixInput, OperationPanel, OperatorSymbol } from '../components';

import { Box, Container } from '@material-ui/core';
import { OperatorType } from '../components/Operator';
import { Array2d, make2d } from '../utils';
import { None, Option } from 'ts-results';


type BinaryCalculatorProps = {
    dimension: number
}

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
function makeReducer<T>(): (previous: Array2d<T>, action: Action<T>) => Array2d<T> {
    return function (previous: Array2d<T>, action: Action<T>): Array2d<T> {
        const {row, col, newVal} = action;
        previous[row][col] = newVal;
        return previous;
    };
}

function BinaryCalculator({dimension}: BinaryCalculatorProps) {

    // Initialize states of left and right matrices
    const [leftValues, setLetValue] = useReducer(
        makeReducer<Option<number>>(),
        make2d<Option<number>>(dimension, None)
    );

    const [rightValues, setRightValue] = useReducer(
        makeReducer<Option<number>>(),
        make2d<Option<number>>(dimension, None)
    );

    const [operator, setOperator] = useState('plus' as OperatorType);

    return (
        <Container>
            <Box style={ {display: 'flex', flexDirection: 'row', justifyContent: 'space-between'} }>
                { /* Left matrix */ }
                <MatrixInput dimension={ dimension } values={ leftValues } setValue={ setLetValue }
                />

                <OperatorSymbol operator={ operator }/>

                { /* Right matrix */ }
                <MatrixInput dimension={ dimension } values={ rightValues } setValue={ setRightValue }
                />
            </Box>

            { /* Operations that can be applied to either or both */ }
            <OperationPanel operator={ operator } rightValues={ rightValues } leftValues={ leftValues }
                            setOperator={ setOperator } dimension={ dimension }/>
        </Container>
    );
}

export default BinaryCalculator;