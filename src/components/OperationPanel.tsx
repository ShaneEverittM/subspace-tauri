import React, { SetStateAction, useState } from 'react';

import { Box, Button, Container, Grid } from '@material-ui/core';
import { Action, Cell, dispatchByOp, Either, Matrix, MatrixType, range, ScalarType } from '../utils';
import { getSymbol, OperatorType } from './Operator';
import { None } from 'ts-results';
import { ButtonPair, OutputRow } from '../components';
import { ExpandLess, ExpandMore } from '@material-ui/icons';


export type OperationPanelProps = {
    /// If the operation is between a matrix and a scalar
    scalar: boolean,
    /// The operator
    operator: OperatorType
    /// Updater dispatch for the operator
    setOperator: React.Dispatch<SetStateAction<OperatorType>>
    /// Valid operators that can be selected
    validOperators: OperatorType[]
    /// An object for interfacing with the right operand, be it a matrix or scalar
    right: Either<MatrixType, ScalarType>
    /// The values in the left matrix
    leftMatrixValues: Cell[][]
    /// Updater dispatch for an index in the left matrix
    updateLeftMatrix: React.Dispatch<Action<Cell>>
    /// Function used to transform the states into argument for the Tauri API
    packingFunction: (a: any, b: any) => any,
    /// The current dimension
    dimension: number
    /// Updater dispatch for the dimension
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
        leftMatrixValues,
        updateLeftMatrix,
        dimension,
        setDimension,
        packingFunction
    } = props;

    const [result, setResult] = useState(new Matrix<number>([]));
    const [validResult, setValidResult] = useState(false);


    const getOperator = (op: OperatorType): string => {
        if (scalar) {
            return opToScalarFunc[op];
        } else {
            return opToBinaryFunc[op];
        }
    };

    const submit = () => {
        let maybeArgs = packingFunction(leftMatrixValues, right.value);

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

    const bumpDimension = (direction: 'up' | 'down') => () => {
        let newDimension;

        if (direction === 'up') {
            newDimension = dimension + 1;
        } else if (dimension !== 1) {
            newDimension = dimension - 1;
        } else {
            return;
        }

        updateLeftMatrix({type: 'resize', newSize: newDimension, filler: None});

        if (right.type === 'matrix') {
            right.setter({type: 'resize', newSize: newDimension, filler: None});
        }

        setValidResult(false);
        setDimension(newDimension);
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
                <ButtonPair LeftComponent={ ExpandMore } onLeftButtonClick={ bumpDimension('down') }
                            RightComponent={ ExpandLess }
                            onRightButtonClick={ bumpDimension('up') }/>
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