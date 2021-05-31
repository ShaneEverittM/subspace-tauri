import React, { ChangeEvent, SetStateAction } from 'react';
import { Box, Container, createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import { None, Option, Some } from 'ts-results';
import { Cell, isNumber } from '../utils';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            maxWidth: 100
        },
    }),
);

type ScalarInputProps = {
    value: Option<number>,
    setValue: React.Dispatch<SetStateAction<Cell>>
}

function ScalarInput({value, setValue}: ScalarInputProps) {
    const classes = useStyles();

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let valueStr = e.target.value;

        // If user entered an invalid string, or emptied the TextField
        if (isNumber(valueStr)) {
            setValue(Some(Number(valueStr)));
        } else {
            // Not valid number, could be due to bad input, or just an empty string
            let curVal: Option<number> = value;
            if (e.target.value === '') {
                // If input was emtpy, clear screen and state
                e.target.value = '';
                setValue(None);
            } else if (curVal.some) {
                // If there is a value and the last input wasn't nothing, maintain last valid state on screen
                e.target.value = curVal.unwrap().toString();
            } else {
                // If we had no value and user entered bad input, keep it empty
                e.target.value = '';
            }
        }
    };

    return (
        <Container>
            <Box style={ {display: 'flex', justifyContent: 'center', alignItems: 'center'} }>
                <TextField
                    className={ classes.textField }
                    required
                    variant='outlined'
                    size='small'
                    value={ value.unwrapOr('') }
                    onChange={ handleInput }
                />
            </Box>
        </Container>
    );
}

export default ScalarInput;