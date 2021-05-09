import React from 'react';
import { MatrixInput, OperationPanel } from '../components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';

type BinaryCalculatorProps = {
    dimension: number
}

function BinaryCalculator({dimension}: BinaryCalculatorProps) {
    return (
        <Container>
            <Button variant='contained' color='primary' component={ Link } to='/'>
                Home
            </Button>
            <Box style={ {display: 'flex', flexDirection: 'row', justifyContent: 'space-between'} }>
                { /* Left matrix */ }
                <MatrixInput dimension={ dimension }/>

                <Box fontSize={ 24 } style={ {display: 'flex', alignItems: 'center'} }>x</Box>

                { /* Right matrix */ }
                <MatrixInput dimension={ dimension }/>
            </Box>

            { /* Operations that can be applied to either or both */ }
            <OperationPanel/>
        </Container>
    );
}

export default BinaryCalculator;