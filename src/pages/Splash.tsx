import { Box, Container, Typography } from '@material-ui/core';
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
                <Typography> Math Result: { sum } </Typography>
            </Box>
        </Container>
    );
}

export default Splash;