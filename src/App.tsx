import React, {useEffect, useState} from 'react';
import './App.css';
import {handleError} from "./Error";
import {add} from "./Arithmetic"


function App() {
    let [sum, setSum] = useState(new Array<Array<number>>())

    useEffect(() => {
        add([[1, 2], [3, 4]], [[1, 2], [3, 4]]).then(setSum).catch(handleError)
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                {sum}
            </header>
        </div>
    );
}

export default App;
