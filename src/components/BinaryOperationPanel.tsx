import React, { SetStateAction, useState } from 'react';

import { Box, Button, Container, Grid } from '@material-ui/core';
import { dispatchByOp, Matrix, packBinaryArguments, range } from '../utils';
import { OperatorType } from './Operator';
import { Option } from 'ts-results';
import { OutputRow } from './index';


type OperationPanelProps = {
    operator: OperatorType
    rightValues: Array<Array<Option<number>>>
    leftValues: Array<Array<Option<number>>>
    setOperator: React.Dispatch<SetStateAction<OperatorType>>
    dimension: number
}

let opToFunc: Record<OperatorType, string> = {
    plus: 'add_f64',
    minus: 'sub_f64',
    divide: 'div_f64',
};

function BinaryOperationPanel({operator, rightValues, leftValues, dimension}: OperationPanelProps) {
    const [result, setResult] = useState(new Matrix<number>([]));
    const [validResult, setValidResult] = useState(false);

    const submit = () => {
        let maybeArgs = packBinaryArguments(leftValues, rightValues);

        const callBack = (res: Matrix<number>) => {
            setResult(res);
            setValidResult(true);
        };

        if (maybeArgs.ok) {
            dispatchByOp(operator, opToFunc, maybeArgs.val, callBack);
        } else {
            console.log(maybeArgs.val);
            return;
        }
    };


    return (
        <Container>
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

export default BinaryOperationPanel;