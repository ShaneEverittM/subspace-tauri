import React, { ChangeEvent, useState } from 'react';
import { Box, Container, createStyles, Grid, makeStyles, TextField, Theme } from '@material-ui/core';
import { range } from '../utils';

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

function updateUsing<T>(
    setter: React.Dispatch<Array<Array<T>>>,
    initial: Array<Array<T>>,
    change: (arr: Array<Array<T>>) => void
) {
    let newArray = initial;
    change(newArray);
    setter(newArray);
}

function MatrixInput({dimension}: MatrixInputProps) {
    const [values, setValues] = useState(make2d<Cell>(dimension, undefined));
    const [errors, setErrors] = useState(make2d<boolean>(dimension, false));
    const [focused, setFocused] = useState(make2d<boolean>(dimension, false));
    const classes = useStyles();

    const handleInput = (row: number, col: number) => (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // Store current cell as focused so that across reloads the cursor appears stationary
        updateUsing(setFocused, make2d(dimension, false), (arr) => arr[row][col] = true);

        let number = Number.parseInt(e.target.value, 10);
        if (Number.isNaN(number) || e.target.value === '') {
            // Set error
            updateUsing(setErrors, errors, (arr) => arr[row][col] = true);

            // Set value to undefined
            updateUsing(setValues, values, (arr) => arr[row][col] = undefined);
        } else {
            // Clear error
            updateUsing(setErrors, errors, (arr) => arr[row][col] = false);

            // Set value to current input value
            updateUsing(setValues, values, (arr) => arr[row][col] = number);
        }
    };

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
                            inputProps={ {value: values[row][col]} }
                            onChange={ handleInput(row, col) }
                        />
                    </Grid>);
                }) }
            </>
        );
    }

    return (
        <Container className={ classes.root }>
            { /* 'clone' causes the underlying DOM node used byt Box to just be the child node instead of a new div */ }
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