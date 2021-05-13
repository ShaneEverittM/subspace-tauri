import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import { handleError, Matrix } from '../utils';

import { Container, Typography } from '@material-ui/core';

function Splash() {
    let [sum, setSum] = useState(new Array<Array<number>>());

    useEffect(() => {
        invoke<Matrix<number>>('add', {v1: [[1, 2], [3, 4]], v2: [[1, 2], [3, 4]]})
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