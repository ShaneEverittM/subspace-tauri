import { range } from '../utils';
import { Box, Grid } from '@material-ui/core';
import React from 'react';

export type OutputRowProps = {
    dimension: number,
    rowNumber: number,
    row: Array<number>
}

function OutputRow({dimension, rowNumber, row}: OutputRowProps) {
    return (
        <>
            { range(dimension).map((col) => {
                // Concatenate digits to form unique ID to appease React
                return (
                    <Grid item key={ rowNumber + '' + col } xs={ 4 }>
                        <Box style={ {display: 'flex', justifyContent: 'center'} }>{ row[col] }</Box>
                    </Grid>
                );
            }) }
        </>
    );
}

export default OutputRow;