import React, { useReducer, useState } from 'react';

import { MatrixInput, OperatorSymbol, ScalarInput, ScalarOperationPanel } from '../components';

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

    const [rightValue, setRightValue] = useState(None as Option<number>);

    const [operator, setOperator] = useState('plus' as OperatorType);

    return (
        <Container>
            <Box style={ {display: 'flex', flexDirection: 'row', justifyContent: 'space-between'} }>
                { /* Left matrix */ }
                <MatrixInput dimension={ dimension } values={ leftValues } setValue={ setLetValue }
                />

                <OperatorSymbol operator={ operator }/>

                { /* Scalar */ }
                <ScalarInput value={ rightValue } setValue={ setRightValue }/>

            </Box>

            { /* Operations that can be applied to either or both */ }
            <ScalarOperationPanel operator={ operator } rightValue={ rightValue } leftValues={ leftValues }
                                  setOperator={ setOperator } dimension={ dimension }/>
        </Container>
    );
}

export default BinaryCalculator;
