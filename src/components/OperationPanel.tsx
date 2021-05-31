import React, { SetStateAction, useState } from 'react';

import { Box, Button, Container, Grid } from '@material-ui/core';
import { dispatchByOp, Matrix, range } from '../utils';
import { getSymbol, OperatorType } from './Operator';
import { Option } from 'ts-results';
import { OutputRow } from '../components';

// type BinaryPacker = (left: Option<number>[][], right: Option<number>[][])
//     => Result<{ m1: Matrix<number>, m2: Matrix<number> }, 'invalid input'>;
//
// type ScalarPacker = (left: Option<number>[][], right: Option<number>)
//     => Result<{ m: Matrix<number>, x: number }, 'invalid input'>;

export type OperationPanelProps = {
    scalar: boolean,
    operator: OperatorType
    validOperators: OperatorType[]
    right: Option<number>[][] | Option<number>
    left: Option<number>[][]
    setOperator: React.Dispatch<SetStateAction<OperatorType>>
    packingFunction: (a: any, b: any) => any,
    dimension: number
}

const opToScalarFunc: Record<OperatorType, string> = {
    plus: 'scalar_add_f64',
    minus: 'scalar_sub_f64',
    divide: 'scalar_div_f64',
    multiply: 'scalar_mul_f64'
};

const opToBinaryFunc: Record<OperatorType, string> = {
    plus: 'add_f64',
    minus: 'sub_f64',
    // This button isn't presented, so this is fine
    divide: '',
    multiply: 'mul_f64'
};


function OperationPanel(props: OperationPanelProps) {
    const {scalar, operator, validOperators, setOperator, right, left, dimension, packingFunction} = props;
    const [result, setResult] = useState(new Matrix<number>([]));
    const [validResult, setValidResult] = useState(false);


    const getOperator = (op: OperatorType): string => {
        if (scalar) {
            return opToScalarFunc[op];
        } else {
            return opToBinaryFunc[op];
        }
    };

    const submit = () => {
        let maybeArgs = packingFunction(left, right);

        const callBack = (res: Matrix<number>) => {
            setResult(res);
            setValidResult(true);
        };

        if (maybeArgs.ok) {
            dispatchByOp(operator, getOperator, maybeArgs.val, callBack);
        } else {
            console.log(maybeArgs.val);
            return;
        }
    };

    const changeOperator = (operator: OperatorType) => () => {
        setOperator(operator);
    };


    return (
        <Container>
            <Box style={ {display: 'flex', flexDirection: 'row', justifyContent: 'space-around'} }>
                { validOperators.map((o, i) => {
                    return (<Box key={ i } style={ {display: 'flex', justifyContent: 'center', paddingTop: '50px'} }>
                        <Button variant='contained' onClick={ changeOperator(o) }>{ getSymbol(o) }</Button>
                    </Box>);
                }) }
            </Box>
            <Box style={ {display: 'flex', justifyContent: 'center', paddingTop: '50px'} }>
                <Button variant='contained' onClick={ submit }>Calculate</Button>
            </Box>
            <Box style={ {
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '50px',
                fontSize: '24',
            } }>
                <Grid container spacing={ 1 }>
                    { validResult ? range(dimension).map((row) => (
                        <Grid key={ row + 1 } container item xs={ 12 } spacing={ 1 } wrap='nowrap'>
                            <OutputRow dimension={ dimension } rowNumber={ row } row={ result.elements[row] }/>
                        </Grid>
                    )) : '' }
                </Grid>
            </Box>
        </Container>
    );
}

export default OperationPanel;