import React, { useEffect, useState } from 'react';

import { add } from '../api';
import { handleError } from '../utils';

import { Container, Typography } from '@material-ui/core';

function Splash() {
    let [sum, setSum] = useState(new Array<Array<number>>());

    useEffect(() => {
        add([[1, 2], [3, 4]], [[1, 2], [3, 4]]).then(setSum).catch(handleError);
    }, []);

    return (
        <Container>
            <Typography> Math Result: { sum } </Typography>
        </Container>
    );
}

export default Splash;