import React from 'react';

import { Box } from '@material-ui/core';

export type OperatorType = 'plus' | 'minus' | 'divide'

type OperatorProps = {
    operator: OperatorType
}

function getSymbol(operator: OperatorType): string {
    console.log(`looking up symbol: ${ operator }`);
    switch (operator) {
        case 'minus':
            return '-';
        case 'divide':
            return '/';
        case 'plus':
            return '+';
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