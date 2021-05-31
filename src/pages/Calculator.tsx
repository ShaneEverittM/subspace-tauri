import { OperatorType } from '../components/Operator';
import React, { useReducer, useState } from 'react';
import { Action, make2d, makeReducer, packBinaryArguments, packScalarArguments } from '../utils';
import { None, Option } from 'ts-results';
import { Box, Container } from '@material-ui/core';
import { MatrixInput, OperationPanel, OperatorSymbol, ScalarInput } from '../components';
import { OperationPanelProps } from '../components/OperationPanel';

type CalculatorProps = {
    dimension: number,
    validOperators: OperatorType[]
    scalar: boolean
}

type ScalarType = {
    type: 'scalar'
    value: Option<number>
    setter: React.Dispatch<React.SetStateAction<Option<number>>>
}

type MatrixType = {
    type: 'matrix'
    value: Option<number>[][]
    setter: React.Dispatch<Action<Option<number>>>
}


type StateType = MatrixType | ScalarType;


function Calculator(props: CalculatorProps) {
    const {dimension, validOperators, scalar} = props;

    const packingFunction = scalar ? packScalarArguments : packBinaryArguments;

    const [left, leftUpdater] = useReducer(
        makeReducer<Option<number>>(),
        make2d<Option<number>>(dimension, None)
    );

    const [operator, setOperator] = useState('plus' as OperatorType);

    // Initialize both state types, one will stay unchanged from initial and unused
    const [rightScalar, rightScalarUpdater] = useState<Option<number>>(None);
    const [rightMatrix, rightMatrixUpdater] = useReducer(
        makeReducer<Option<number>>(),
        make2d<Option<number>>(dimension, None)
    );

    const getRightState = (): StateType => {
        if (scalar) {
            return {type: 'scalar', value: rightScalar, setter: rightScalarUpdater};
        } else {
            return {type: 'matrix', value: rightMatrix, setter: rightMatrixUpdater};
        }
    };

    let right: StateType = getRightState();

    const getRight = () => {
        if (right.type === 'scalar') {
            return <ScalarInput value={ right.value } setValue={ right.setter }/>;
        } else {
            return <MatrixInput dimension={ dimension } values={ right.value } setValue={ right.setter }/>;
        }
    };


    const operationPanelProps: OperationPanelProps = {
        scalar,
        operator,
        validOperators,
        right: right.value,
        left,
        setOperator,
        dimension,
        packingFunction
    };

    return (
        <Container>
            <Box style={ {display: 'flex', flexDirection: 'row', justifyContent: 'space-between'} }>
                { /* Left matrix */ }
                <MatrixInput dimension={ dimension } values={ left } setValue={ leftUpdater }/>

                <OperatorSymbol operator={ operator }/>

                { /* Scalar */ }
                { getRight() }


            </Box>

            { /* Operations that can be applied to both */ }
            <OperationPanel { ...operationPanelProps }/>
        </Container>
    );

}

export default Calculator;