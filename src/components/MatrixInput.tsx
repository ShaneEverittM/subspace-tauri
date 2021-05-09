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

function MatrixInput({dimension}: MatrixInputProps) {
    const [values, setValues] = useState([...Array(dimension)].map((_) => Array<number | undefined>(dimension).fill(undefined)));
    const [errors, setErrors] = useState([...Array(dimension)].map((_) => Array<boolean>(dimension).fill(false)));
    const [focused, setFocused] = useState([...Array(dimension)].map((_) => Array<boolean>(dimension).fill(false)));
    const classes = useStyles();


    const handleInput = (row: number, col: number) => (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        console.log(`row: {}, col: {}`, row, col);

        let newFocused = [...Array(dimension)].map((_) => Array<boolean>(dimension).fill(false));
        newFocused[row][col] = true;
        setFocused(newFocused);


        let number = Number.parseInt(e.target.value, 10);
        if (Number.isNaN(number) || e.target.value === '') {
            // // // Set error
            let newErrors = errors;
            newErrors[row][col] = true;
            setErrors(newErrors);

            // // Store value
            let newValues = values;
            newValues[row][col] = undefined;
            // Same reference therefore no re-render >:^(
            setValues(newValues);


            console.log(errors);
        } else {
            // // Clear error
            let newErrors = errors;
            newErrors[row][col] = false;
            setErrors(newErrors);

            // // Store value
            let newValues = values;
            newValues[row][col] = number;
            // Same reference therefore no re-render >:^(
            setValues(newValues);

            console.log(values);
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