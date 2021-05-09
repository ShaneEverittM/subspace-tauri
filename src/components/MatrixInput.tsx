import React, { ChangeEvent, useReducer, useState } from 'react';

import { range } from '../utils';

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
}

type Cell = number | undefined

function make2d<T>(size: number, init: T): Array<Array<T>> {
    return [...Array(size)].map((_) => Array<T>(size).fill(init));
}

function valueReducer(
    previous: Array<Array<Cell>>,
    action: { row: number, col: number, newVal: number | undefined }): Array<Array<Cell>> {
    let {row, col, newVal} = action;
    previous[row][col] = newVal;
    return previous;
}

function errorReducer(
    previous: Array<Array<boolean>>,
    action: { row: number, col: number, newVal: boolean }): Array<Array<boolean>> {
    let {row, col, newVal} = action;
    previous[row][col] = newVal;
    return previous;
}


function MatrixInput({dimension}: MatrixInputProps) {
    const [values, setValue] = useReducer(valueReducer, make2d<Cell>(dimension, undefined));
    const [errors, setError] = useReducer(errorReducer, make2d<boolean>(dimension, false));
    const [focused, setFocused] = useState(make2d<boolean>(dimension, false));
    const classes = useStyles();

    const handleInput = (row: number, col: number) => (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // By creating a new focused array, React's state hook will see it as a new value, this will trigger a state
        // update refreshing the error state but also store what was focused so that the user does not lose their place.
        let newFocused = make2d(dimension, false);
        newFocused[row][col] = true;
        setFocused(newFocused);

        let newVal = Number.parseInt(e.target.value, 10);

        // If user entered an invalid string, or emptied the TextField
        if (Number.isNaN(newVal) || e.target.value === '') {
            // Set error
            setError({row, col, newVal: true});

            // Set value to undefined
            setValue({row, col, newVal: undefined});
        } else {
            // Clear error
            setError({row, col, newVal: false});

            // Set value to current input value
            setValue({row, col, newVal});
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
                            autoFocus={ focused[row][col] }
                            error={ errors[row][col] }
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
                    { range(dimension).map((i) => (
                        <Grid key={ i + 1 } container item xs={ 12 } spacing={ 1 } wrap='nowrap'>
                            <FormRow dimension={ dimension } row={ i }/>
                        </Grid>
                    )) }
                </Grid>
            </Box>
        </Container>
    );
}

export default MatrixInput;