import React from 'react';

function MatrixInput() {
    return (
        <div style={ {display: 'flex'} }>
            <form>
                <input type='text'/>
                <input type='text'/>
                <input type='text'/>
                <input type='text'/>
            </form>
        </div>
    );
}

export default MatrixInput;