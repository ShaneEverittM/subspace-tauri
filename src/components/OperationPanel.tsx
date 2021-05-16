import React, { SetStateAction } from 'react';

import { Button, Container } from '@material-ui/core';
import { handleError, Matrix, Maybe } from '../utils';
import { OperatorType } from './Operator';
import { invoke } from '@tauri-apps/api/tauri';


type OperationPanelProps = {
    operator: OperatorType
    rightValues: Array<Array<Maybe<number>>>
    leftValues: Array<Array<Maybe<number>>>
    rightErrors: Array<Array<boolean>>
    leftErrors: Array<Array<boolean>>
    setOperator: React.Dispatch<SetStateAction<OperatorType>>
}

function OperationPanel({operator, rightValues, rightErrors, leftValues, leftErrors}: OperationPanelProps) {

    const submit = () => {
        console.log('Verifying...');
        if (!rightValues.flat().every(e => e)) {
            // error
            console.log('OOPS I SHIDDED');
        }
        if (!leftValues.flat().every(e => e)) {
            // error
            console.log('OOPS I SHIDDED');
        }

        if (rightErrors.flat().some(e => e)) {
            // error
            console.log('OOPS I SHIDDED');
        }

        if (leftErrors.flat().some(e => e)) {
            // error
            console.log('OOPS I SHIDDED');
        }

        switch (operator) {
            case 'plus':
                invoke<Matrix<number>>('add', {v1: leftValues, v2: rightValues})
                    .then(console.log)
                    .catch(handleError);
                break;
            case 'minus':
                break;
            case 'divide':
                break;
        }
    };

    return (
        <Container>
            <Button variant='contained' onClick={ submit }>Calculate</Button>
        </Container>
    );
}

export default OperationPanel;