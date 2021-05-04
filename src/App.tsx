import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {invoke} from '@tauri-apps/api/tauri'

function App() {
    let [sum, setSum] = useState(new Array<Array<number>>())
    useEffect(() => {
        invoke<Array<Array<number>>>('add', {
            v1: [[1, 2], [3, 4]],
            v2: [[1, 2], [3, 4]]
        }).then(setSum).catch(console.log)
    }, [])
    return (
        <div className="App">
            <header className="App-header">
                <header>{sum}</header>
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
