import React, { useReducer, useState } from 'react';

import { MatrixInput, OperationPanel, OperatorSymbol } from '../components';

import { Box, Container } from '@material-ui/core';
import { make2d, Matrix, Maybe } from '../utils';
import { OperatorType } from '../components/Operator';


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
function makeReducer<T>(): (previous: Matrix<T>, action: Action<T>) => Matrix<T> {
    return function (previous: Matrix<T>, action: Action<T>): Matrix<T> {
        const {row, col, newVal} = action;
        previous[row][col] = newVal;
        return previous;
    };
}

function BinaryCalculator({dimension}: BinaryCalculatorProps) {
    const [leftValues, setLetValue] = useReducer(makeReducer<Maybe<number>>(), make2d<Maybe<number>>(dimension, undefined));
    const [leftErrors, setLeftErrors] = useReducer(makeReducer<boolean>(), make2d<boolean>(dimension, false));
    const [rightValues, setRightValue] = useReducer(makeReducer<Maybe<number>>(), make2d<Maybe<number>>(dimension, undefined));
    const [rightErrors, setRightError] = useReducer(makeReducer<boolean>(), make2d<boolean>(dimension, false));
    const [operator, setOperator] = useState('plus' as OperatorType);

    return (
        <Container>
            <Box style={ {display: 'flex', flexDirection: 'row', justifyContent: 'space-between'} }>
                { /* Left matrix */ }
                <MatrixInput dimension={ dimension } values={ leftValues } setValue={ setLetValue }
                             errors={ leftErrors }
                             setError={ setLeftErrors }/>

                <OperatorSymbol operator={ operator }/>

                { /* Right matrix */ }
                <MatrixInput dimension={ dimension } values={ rightValues } setValue={ setRightValue }
                             errors={ rightErrors }
                             setError={ setRightError }/>
            </Box>

            { /* Operations that can be applied to either or both */ }
            <OperationPanel operator={ operator } rightValues={ rightValues } rightErrors={ rightErrors }
                            leftValues={ leftValues } leftErrors={ leftErrors } setOperator={ setOperator }/>
        </Container>
    );
}

export default BinaryCalculator;