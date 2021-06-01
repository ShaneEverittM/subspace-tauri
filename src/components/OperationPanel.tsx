import React, { SetStateAction, useState } from 'react';

import { Box, Button, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import {
    Action,
    ApiArguments,
    ApiResult,
    Cell,
    dispatchByName,
    Either,
    Matrix,
    MatrixType,
    packArguments,
    ScalarType
} from '../utils';
import { getSymbol, OperatorType } from './Operator';
import { None } from 'ts-results';
import { ButtonPair } from '../components';
import { ExpandLess as UpArrow, ExpandMore as DownArrow } from '@material-ui/icons';


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

type UnaryOpsProps = {
    handler: (func: string) => () => void
    style: React.CSSProperties,
}

function UnaryOps({handler, style}: UnaryOpsProps) {
    return (
        <Box style={ {display: 'flex', flexDirection: 'row', alignItems: 'center', ...style} }>
            <Button style={ {margin: '2px'} } variant='contained' onClick={ handler('transpose_f64') }>
                Transpose
            </Button>
            <Button style={ {margin: '2px'} } variant='contained' onClick={ handler('invert_f64') }>
                Invert
            </Button>
            <Button style={ {margin: '2px'} } variant='contained' onClick={ handler('determinant_f64') }>
                Determinant
            </Button>
        </Box>
    );
}


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
    } = props;

    const [matrixResult, setMatrixResult] = useState(new Matrix<number>([]));
    const [numericResult, setNumericResult] = useState(0);
    const [validMatrixResult, setValidMatrixResult] = useState(false);
    const [validNumericResult, setValidNumericResult] = useState(false);


    const getOperator = (op: OperatorType): string => {
        if (scalar) {
            return opToScalarFunc[op];
        } else {
            return opToBinaryFunc[op];
        }
    };

    const submit = () => {
        let apiArgs: ApiArguments;
        if (right.type === 'scalar') {
            apiArgs = {type: 'scalar', m: leftMatrixValues, x: right.value};
        } else {
            apiArgs = {type: 'binary', m1: leftMatrixValues, m2: right.value};
        }
        let maybeArgs = packArguments(apiArgs);

        const callBack = (res: ApiResult) => {
            if (res.type === 'matrix') {
                setMatrixResult(res.mat);
                setValidMatrixResult(true);
                setValidNumericResult(false);
            } else {
                setNumericResult(res.num);
                setValidNumericResult(true);
                setValidMatrixResult(false);
            }
        };

        if (maybeArgs.ok) {
            dispatchByName(getOperator(operator), maybeArgs.val, callBack);
        } else {
            console.log(maybeArgs.val);
            return;
        }
    };

    const changeOperatorTo = (operator: OperatorType) => () => {
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

        setValidNumericResult(false);
        setValidMatrixResult(false);
        setDimension(newDimension);
    };


    // Triple curried function!
    const handleUnary = (position: 'left' | 'right') => (func: string) => () => {
        const callBack = (res: ApiResult) => {
            if (res.type === 'matrix') {
                setMatrixResult(res.mat);
                setValidMatrixResult(true);
                setValidNumericResult(false);
            } else {
                setNumericResult(res.num);
                setValidNumericResult(true);
                setValidMatrixResult(false);
            }
        };

        let values;
        if (position === 'left') {
            values = leftMatrixValues;
        } else {
            if (right.type === 'scalar') {
                // Should not happen
                return;
            } else {
                values = right.value;
            }
        }

        const maybeArgs = packArguments({type: 'unary', m: values});
        if (maybeArgs.ok && maybeArgs.val.type === 'unary') {
            dispatchByName(func, {type: 'unary', m: maybeArgs.val.m}, callBack);
        }
    };

    const renderResult = () => {
        if (validMatrixResult) {
            return (
                <Table>
                    <TableBody>
                        { matrixResult.elements.map((row, i) => <TableRow key={ i }>{ row.map((entry, j) =>
                            <TableCell key={ i * 31 + j }>{ entry }</TableCell>) }</TableRow>) }
                    </TableBody>
                </Table>
            );
        } else if (validNumericResult) {
            return <Box>{ numericResult }</Box>;
        } else {
            return <div/>;
        }
    };


    return (
        <>
            {/* Left hand unary ops */ }
            <UnaryOps style={ {gridArea: 'leftUnaryOps'} } handler={ handleUnary('left') }/>

            {/* Operator selection */ }
            <Box style={ {
                gridArea: 'operatorChanger',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            } }>
                { validOperators.map((o, i) => {
                    return (
                        <Box key={ i } style={ {display: 'flex', justifyContent: 'center', padding: '5px'} }>
                            < Button variant='contained'
                                     onClick={ changeOperatorTo(o) }>{ getSymbol(o) }</Button>
                        </Box>);
                }) }
            </Box>

            {/* Right hand unary ops */ }
            { right.type === 'matrix' ?
                <UnaryOps style={ {gridArea: 'rightUnaryOps'} } handler={ handleUnary('right') }/> :
                <Box style={ {gridArea: 'rightUnaryOps'} }/> }


            <Box style={ {gridArea: 'dimension'} }>
                <ButtonPair LeftComponent={ DownArrow } onLeftButtonClick={ bumpDimension('down') }
                            RightComponent={ UpArrow }
                            onRightButtonClick={ bumpDimension('up') }/>
            </Box>
            <Box style={ {gridArea: 'submit'} }>
                <Button variant='contained' onClick={ submit }>Calculate</Button>
            </Box>
            <Box style={ {
                gridArea: 'result',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '50px',
                fontSize: '24',
            } }>
                { renderResult() }
            </Box>
        </>
    );
}

export default OperationPanel;