import { OperatorType } from '../components/Operator';
import React, { useReducer, useState } from 'react';
import { Either, make2d, makeReducer, MatrixType, ScalarType } from '../utils';
import { None, Option } from 'ts-results';
import { Box, Container } from '@material-ui/core';
import { MatrixInput, OperationPanel, OperatorSymbol, ScalarInput } from '../components';
import { OperationPanelProps } from '../components/OperationPanel';

type CalculatorProps = {
    validOperators: OperatorType[]
    scalar: boolean
}

function Calculator({validOperators, scalar}: CalculatorProps) {
    // Set default dimension to 3
    const [dimension, setDimension] = useState(3);

    // Left side is always a matrix, initialize its values
    const [left, updateLeft] = useReducer(
        makeReducer<Option<number>>(),
        make2d<Option<number>>(dimension, None)
    );

    // Default operator is 'plus'
    const [operator, setOperator] = useState('plus' as OperatorType);

    // Initialize both state for both matrix and scalar, one will stay unchanged from initial and unused.
    // This is because hook must be top level, so conditional initialization is difficult.
    const [rightScalar, updateRightScalar] = useState<Option<number>>(None);
    const [rightMatrix, updateRightMatrix] = useReducer(
        makeReducer<Option<number>>(),
        make2d<Option<number>>(dimension, None)
    );

    // Set right handler based of desired right operand
    let rightHandler: Either<MatrixType, ScalarType> = scalar ?
        {type: 'scalar', value: rightScalar, setter: updateRightScalar} :
        {type: 'matrix', value: rightMatrix, setter: updateRightMatrix};

    // Used for conditional rendering based on operands
    const getRight = () => {
        if (rightHandler.type === 'scalar') {
            return <ScalarInput value={ rightHandler.value } setValue={ rightHandler.setter }/>;
        } else {
            return <MatrixInput dimension={ dimension } values={ rightHandler.value }
                                setValue={ rightHandler.setter }/>;
        }
    };


    // Extracting props out of JSX for cleanliness
    const operationPanelProps: OperationPanelProps = {
        scalar,
        operator,
        validOperators,
        leftMatrixValues: left,
        setOperator,
        dimension,
        setDimension,
        updateLeftMatrix: updateLeft,
        right: rightHandler
    };

    return (
        <Container>
            <Box style={ {display: 'flex', flexDirection: 'row', justifyContent: 'space-between'} }>
                { /* Left matrix */ }
                <MatrixInput dimension={ dimension } values={ left } setValue={ updateLeft }/>

                <OperatorSymbol operator={ operator }/>

                { /* Scalar or Matrix */ }
                { getRight() }
            </Box>

            { /* Operations that can be applied to both */ }
            <OperationPanel { ...operationPanelProps }/>
        </Container>
    );

}

export default Calculator;