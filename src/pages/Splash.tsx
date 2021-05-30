import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import { Array2d, handleError } from '../utils';

import { Container, Typography } from '@material-ui/core';

function Splash() {
    let [sum, setSum] = useState(new Array<Array<number>>());

    useEffect(() => {
        invoke<Array2d<number>>('add', {v1: [[1, 2], [3, 4]], v2: [[1, 2], [3, 4]]})
            .then(setSum)
            .catch(handleError);
    }, []);

    return (
        <Container>
            <Typography> Math Result: { sum } </Typography>
        </Container>
    );
}

export default Splash;