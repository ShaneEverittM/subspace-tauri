import React, { SetStateAction, useState } from 'react';

import { Box, Button, Container, Grid } from '@material-ui/core';
import { handleError, Matrix, packArguments, range } from '../utils';
import { OperatorType } from './Operator';
import { invoke } from '@tauri-apps/api/tauri';
import { Option } from 'ts-results';


type OperationPanelProps = {
    operator: OperatorType
    rightValues: Array<Array<Option<number>>>
    leftValues: Array<Array<Option<number>>>
    setOperator: React.Dispatch<SetStateAction<OperatorType>>
    dimension: number
}

type OutputRowProps = {
    dimension: number,
    rowNumber: number,
    row: Array<number>
}

let opToFuncObj = {
    plus: 'add_f64',
    minus: 'sub_f64',
    divide: 'div_f64'
};

function OperationPanel({operator, rightValues, leftValues, dimension}: OperationPanelProps) {
    const [result, setResult] = useState(new Matrix<number>([]));
    const [validResult, setValidResult] = useState(false);

    const setValidResultTrue = () => setValidResult(true);

    const submit = () => {
        let maybeArgs = packArguments(leftValues, rightValues);

        if (maybeArgs.ok) {
            console.log(`invoking ${ opToFuncObj[operator] }`);
            // index is safe because typescript is really neat :^)
            invoke<Matrix<number>>(opToFuncObj[operator], maybeArgs.unwrap())
                .then((res) => {
                    console.log(`result: ${ res.elements }`);
                    setResult(res);
                })
                .then(setValidResultTrue)
                .catch(handleError);
        } else {
            console.log(maybeArgs.val);
            return;
        }
    };


    function OutputRow({dimension, rowNumber, row}: OutputRowProps) {
        return (
            <>
                { range(dimension).map((col) => {
                    // Concatenate digits to form unique ID to appease React
                    return (
                        <Grid item key={ rowNumber + '' + col } xs={ 4 }>
                            <Box style={ {display: 'flex', justifyContent: 'center'} }>{ row[col] }</Box>
                        </Grid>
                    );
                }) }
            </>
        );
    }

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

export default OperationPanel;