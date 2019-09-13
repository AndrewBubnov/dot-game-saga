import React from 'react';
import Main from "./components/Field/Field";
import ControlUnit from "./components/ControlUnit/ControlUnit";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import './App.css';


function App() {
    return (
        <div className="App">
            <div>
                <ControlUnit />
                <div style={{display: 'flex'}}>
                    <Main />
                    <LeaderBoard/>
                </div>
            </div>
        </div>
    );
}

export default App;
