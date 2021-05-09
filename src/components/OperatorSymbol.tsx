import React from 'react';

import { Box } from '@material-ui/core';

type Symbol = 'plus' | 'minus' | 'divide'

type OperatorSymbolProps = {
    symbol: Symbol
}

function getSymbol(symbol: Symbol): string {
    switch (symbol) {
        case 'minus':
            return '-';
        case 'divide':
            return '/';
        case 'plus':
            return '+';
    }
}

function OperatorSymbol({symbol}: OperatorSymbolProps) {
    return (
        <Box fontSize={ 24 } style={ {display: 'flex', alignItems: 'center'} }>
            { getSymbol(symbol) }
        </Box>
    );
}

export default OperatorSymbol;