import React from 'react';
import { MatrixInput, OperationPanel } from '../components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';

function ArithmeticCalculator() {
    return (
        <Container>
            <Button variant='contained' color='primary'>
                <Link to='/'>Home</Link>
            </Button>
            <Box style={ {display: 'flex', flexDirection: 'row', justifyContent: 'space-between'} }>
                { /* Left matrix */ }
                <MatrixInput/>

                <Box style={ {display: 'flex'} }>+</Box>

                { /* Right matrix */ }
                <MatrixInput/>
            </Box>

            { /* Operations that can be applied to either or both */ }
            <OperationPanel/>
        </Container>
    );
}

export default ArithmeticCalculator;