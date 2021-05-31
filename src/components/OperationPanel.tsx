import React, { SetStateAction, useState } from 'react';

import { Box, Button, Container, Grid, TextField } from '@material-ui/core';
import { Action, dispatchByOp, Matrix, range } from '../utils';
import { getSymbol, OperatorType } from './Operator';
import { None, Option } from 'ts-results';
import { OutputRow } from '../components';
import { StateType } from '../pages/Calculator';


export type OperationPanelProps = {
    scalar: boolean,
    operator: OperatorType
    validOperators: OperatorType[]
    right: Option<number>[][] | Option<number>
    rightUpdater: StateType
    left: Option<number>[][]
    leftUpdater: React.Dispatch<Action<Option<number>>>
    setOperator: React.Dispatch<SetStateAction<OperatorType>>
    packingFunction: (a: any, b: any) => any,
    dimension: number
    setDimension: React.Dispatch<SetStateAction<number>>
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
    const {
        scalar,
        operator,
        validOperators,
        setOperator,
        right,
        rightUpdater,
        left,
        leftUpdater,
        dimension,
        setDimension,
        packingFunction
    } = props;

    const [result, setResult] = useState(new Matrix<number>([]));
    const [validResult, setValidResult] = useState(false);
    const [localDimension, setLocalDimension] = useState(dimension);


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
                <TextField
                    // className={ classes.textField }
                    required
                    variant='outlined'
                    size='small'
                    type='number'
                    value={ localDimension }
                    onChange={ (e) => {
                        setLocalDimension(Number(e.target.value));
                    } }
                    onKeyPress={ (e) => {
                        if (e.key === 'Enter') {
                            leftUpdater({type: 'extend', newSize: localDimension, filler: None});
                            if (rightUpdater.type === 'matrix') {
                                rightUpdater.setter({type: 'extend', newSize: localDimension, filler: None});
                            }
                            setDimension(localDimension);
                        }
                    } }
                />
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