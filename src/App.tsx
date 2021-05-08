import React, {useEffect, useState} from 'react';
import './styles/App.css';
import {handleError} from "./utils";
import {add} from "./api"


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
