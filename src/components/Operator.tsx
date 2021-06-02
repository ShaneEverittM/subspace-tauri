import React from 'react';

import { Box } from '@material-ui/core';

export const operators = ['plus', 'minus', 'divide', 'multiply'] as const;
export type OperatorType = typeof operators[number];

type OperatorProps = {
    operator: OperatorType
}

export function getSymbol(operator: OperatorType): string {
    switch (operator) {
        case 'minus':
            return '-';
        case 'divide':
            return '/';
        case 'plus':
            return '+';
        case 'multiply':
            return 'x';
    }
}

function Operator({operator}: OperatorProps) {
    return (
        <Box fontSize={ 24 } style={ {display: 'flex', alignItems: 'center'} }>
            { getSymbol(operator) }
        </Box>
    );
}

export default Operator;