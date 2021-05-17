import React, { SetStateAction, useState } from 'react';

import { Box, Button, Container, Grid } from '@material-ui/core';
import { handleError, Matrix, Maybe, range } from '../utils';
import { OperatorType } from './Operator';
import { invoke } from '@tauri-apps/api/tauri';


type OperationPanelProps = {
    operator: OperatorType
    rightValues: Array<Array<Maybe<number>>>
    leftValues: Array<Array<Maybe<number>>>
    setOperator: React.Dispatch<SetStateAction<OperatorType>>
    dimension: number
}

type OutputRowProps = {
    dimension: number,
    rowNumber: number,
    row: Array<number>
}

function OperationPanel({operator, rightValues, leftValues, dimension}: OperationPanelProps) {
    const [result, setResult] = useState(new Array<Array<number>>());
    const [validResult, setValidResult] = useState(false);

    const submit = () => {
        if (!rightValues.flat().every(e => e)) {
            // error
            console.log('OOPS I SHIDDED');
        }
        if (!leftValues.flat().every(e => e)) {
            // error
            console.log('OOPS I SHIDDED');
        }

        switch (operator) {
            case 'plus':
                invoke<Matrix<number>>('add', {v1: leftValues, v2: rightValues})
                    .then(setResult)
                    .then(() => setValidResult(true))
                    .catch(handleError);
                break;
            case 'minus':
                break;
            case 'divide':
                break;
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
                            <OutputRow dimension={ dimension } rowNumber={ row } row={ result[row] }/>
                        </Grid>
                    )) : '' }
                </Grid>
            </Box>
        </Container>
    );
}

export default OperationPanel;