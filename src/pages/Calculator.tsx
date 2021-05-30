import { OperatorType } from '../components/Operator';
import React, { useReducer, useState } from 'react';
import { make2d, makeReducer, packBinaryArguments, packScalarArguments } from '../utils';
import { None, Option } from 'ts-results';
import { Box, Container } from '@material-ui/core';
import { MatrixInput, OperationPanel, OperatorSymbol, ScalarInput } from '../components';

type CalculatorProps = {
    dimension: number,
    operators: OperatorType[]
    scalar: boolean
}


function Calculator(props: CalculatorProps) {
    const {dimension, operators, scalar} = props;

    const [left, leftUpdater] = useReducer(
        makeReducer<Option<number>>(),
        make2d<Option<number>>(dimension, None)
    );

    const [operator, setOperator] = useState('plus' as OperatorType);
    const [rightScalar, rightScalarUpdater] = useState(None as Option<number>);
    const [right, rightUpdater] = useReducer(
        makeReducer<Option<number>>(),
        make2d<Option<number>>(dimension, None)
    );


    const getRight = () => {
        if (scalar) {
            return <ScalarInput value={ rightScalar } setValue={ rightScalarUpdater }/>;
        } else {
            return <MatrixInput dimension={ dimension } values={ right } setValue={ rightUpdater }/>;
        }
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
            <OperationPanel scalar={ scalar } operator={ operator } validOperators={ operators }
                            right={ scalar ? rightScalar : right } left={ left }
                            setOperator={ setOperator } dimension={ dimension }
                            packingFunction={ scalar ? packScalarArguments : packBinaryArguments }/>
        </Container>
    );

}

export default Calculator;