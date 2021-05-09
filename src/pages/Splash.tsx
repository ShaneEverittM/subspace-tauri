import { Box, Container, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { add } from '../api';
import { handleError } from '../utils';

function Splash() {
    let [sum, setSum] = useState(new Array<Array<number>>());

    useEffect(() => {
        add([[1, 2], [3, 4]], [[1, 2], [3, 4]]).then(setSum).catch(handleError);
    }, []);

    return (
        <Container>
            <Box>
                <Typography> { sum } </Typography>
            </Box>
            <Button variant='contained' color='primary' component={ Link } to='/arithmetic-calculator'>
                Calculator
            </Button>
        </Container>
    );
}

export default Splash;