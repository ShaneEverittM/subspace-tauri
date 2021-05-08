import React from 'react';
import { MatrixInput, OperationPanel } from '../components';
import '../styles/ArithmeticCalculator.css';

function ArithmeticCalculator() {
    return (
        <div>
            <div style={ {display: 'flex', flexDirection: 'row', justifyContent: 'space-between'} }>
                { /* Left matrix */ }
                <MatrixInput/>

                <div style={ {display: 'flex'} }>+</div>

                { /* Right matrix */ }
                <MatrixInput/>
            </div>

            { /* Operations that can be applied to either or both */ }
            <OperationPanel/>
        </div>
    );
}

export default ArithmeticCalculator;