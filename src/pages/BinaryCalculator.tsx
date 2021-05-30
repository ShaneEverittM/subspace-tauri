import React, { useReducer, useState } from 'react';

import { BinaryOperationPanel, MatrixInput, OperatorSymbol } from '../components';

import { Box, Container } from '@material-ui/core';
import { OperatorType } from '../components/Operator';
import { make2d, makeReducer } from '../utils';
import { None, Option } from 'ts-results';


type BinaryCalculatorProps = {
    dimension: number
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
            <BinaryOperationPanel operator={ operator } rightValues={ rightValues } leftValues={ leftValues }
                                  setOperator={ setOperator } dimension={ dimension }/>
        </Container>
    );
}

export default BinaryCalculator;