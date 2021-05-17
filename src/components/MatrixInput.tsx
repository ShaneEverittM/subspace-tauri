import React, { ChangeEvent } from 'react';

import { isNumber, Maybe, range } from '../utils';
import { Action } from '../pages/BinaryCalculator';

import { Box, Container, createStyles, Grid, makeStyles, TextField, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        textField: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        grid: {
            justifyContent: 'center'
        }
    }),
);

type MatrixRowProps = {
    dimension: number,
    row: number
}

type MatrixInputProps = {
    dimension: number
    values: Array<Array<Maybe<number>>>
    setValue: React.Dispatch<Action<Maybe<number>>>
}

function MatrixInput({dimension, values, setValue}: MatrixInputProps) {
    const classes = useStyles();

    const handleInput = (row: number, col: number) => (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let valueStr = e.target.value;

        // If user entered an invalid string, or emptied the TextField
        if (isNumber(valueStr)) {
            setValue({row, col, newVal: Number(valueStr)});
        } else {
            // Not valid number, could be due to bad input, or just an empty string
            let curVal = values[row][col];
            if (e.target.value === '') {
                // If input was emtpy, clear screen and state
                e.target.value = '';
                setValue({row, col, newVal: undefined});
            } else if (curVal) {
                // If there is a value and the last input wasn't nothing, maintain last valid state on screen
                e.target.value = curVal.toString();
            } else {
                // If we had no value and user entered bad input, keep it empty
                e.target.value = '';
            }
        }
    };

    // Sub-component for each row of the matrix
    function FormRow({dimension, row}: MatrixRowProps) {
        return (
            <>
                { range(dimension).map((col) => {
                    // Concatenate digits to form unique ID to appease React
                    return (<Grid item key={ row + '' + col } xs={ 4 }>
                        <TextField
                            className={ classes.textField }
                            required
                            variant='outlined'
                            size='small'
                            value={ values[row][col] }
                            onChange={ handleInput(row, col) }
                        />
                    </Grid>);
                }) }
            </>
        );
    }

    return (
        <Container className={ classes.root }>
            { /* 'clone' causes the underlying DOM node used by Box to just be the child node instead of a new div */ }
            <Box justifyContent='center' clone>
                <Grid container spacing={ 1 }>
                    { range(dimension).map((row) => (
                        <Grid key={ row + 1 } container item xs={ 12 } spacing={ 1 } wrap='nowrap'>
                            <FormRow dimension={ dimension } row={ row }/>
                        </Grid>
                    )) }
                </Grid>
            </Box>
        </Container>
    );
}

export default MatrixInput;