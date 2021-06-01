import React, { ChangeEvent } from 'react';

import { Action, Cell, isNumber, range } from '../utils';

import { Box, Container, createStyles, Grid, makeStyles, TextField, Theme } from '@material-ui/core';
import { None, Some } from 'ts-results';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            padding: theme.spacing(1),
            textAlign: 'center',
            maxWidth: 125,
            justifySelf: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

type MatrixRowProps = {
    dimension: number,
    row: number
}

type MatrixInputProps = {
    dimension: number
    values: Array<Array<Cell>>
    setValue: React.Dispatch<Action<Cell>>
}

function MatrixInput({dimension, values, setValue}: MatrixInputProps) {
    const classes = useStyles();

    const handleInput = (row: number, col: number) => (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            let valueStr = e.target.value;

            // If user entered an invalid string, or emptied the TextField
            if (isNumber(valueStr)) {
                setValue({type: 'cell-update', row, col, newVal: Some(Number(valueStr))});
            } else {
                // Not valid number, could be due to bad input, or just an empty string
                let curVal = values[row][col];
                if (e.target.value === '') {
                    // If input was emtpy, clear screen and state
                    e.target.value = '';
                    setValue({type: 'cell-update', row, col, newVal: None});
                } else if (curVal.some) {
                    // If there is a value and the last input wasn't nothing, maintain last valid state on screen
                    e.target.value = curVal.unwrap().toString();
                } else {
                    // If we had no value and user entered bad input, keep it empty
                    e.target.value = '';
                }
            }
        }
    ;

    // Sub-component for each row of the matrix
    function FormRow({dimension, row}: MatrixRowProps) {
        return (
            <>
                { range(dimension).map((col) => {
                    // Concatenate digits to form unique ID to appease React
                    return (<Grid item key={ row + '' + col }>
                        <Box style={ {display: 'flex', justifyContent: 'center'} }>
                            <TextField
                                className={ classes.textField }
                                required
                                variant='outlined'
                                size='small'
                                value={ values[row][col].unwrapOr(undefined) }
                                onChange={ handleInput(row, col) }
                            />
                        </Box>
                    </Grid>);
                }) }
            </>
        );
    }

    return (
        <Container>
            <Grid justify='center' container spacing={ 1 }>
                { range(dimension).map((row) => (
                    <Grid justify='center' key={ row + 1 } container item spacing={ 1 } wrap='nowrap'>
                        <FormRow dimension={ dimension } row={ row }/>
                    </Grid>
                )) }
            </Grid>
        </Container>
    );

}

export default MatrixInput;