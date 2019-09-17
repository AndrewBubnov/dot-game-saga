import React from 'react';
import Field from "./components/Field/Field";
import ControlUnit from "./components/ControlUnit/ControlUnit";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import './App.css';

function App() {
    return (
        <div className="App">
            <div>
                <ControlUnit/>
                <div className='main-container'>
                    <div className='field-container'>
                        <ScoreBoard/>
                        <Field/>
                    </div>
                    <LeaderBoard/>
                </div>
            </div>
        </div>
    );
}

export default App;
